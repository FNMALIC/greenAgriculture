#!/bin/bash


LOG_FILE="/var/log/traefik-monitor.log"
TIMEOUT=10

declare -A DOMAIN_PROJECTS=(
    ["codees-cm.com"]="$HOME/blog-codees"
    ["www.codees-cm.com"]="$HOME/blog-codees"
    ["insurance.codees-cm.com"]="$HOME/insurance/insurance-front"
    ["api.codees-cm.com"]="$HOME/insurance/insurance-backend"
    ["admin.tondo.codees-cm.com"]="$HOME/tondo/tondo-admin"
    ["api.tondo.codees-cm.com"]="$HOME/tondo/tondo-backend"

)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_url() {
    local url="$1"
    local response_code

    response_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "$url")

    if [[ "$response_code" -ge 200 && "$response_code" -lt 400 ]]; then
        return 0
    else
        return 1
    fi
}

get_traefik_domains() {
    local domains=()

    if curl -s --max-time 5 "$TRAEFIK_API/api/http/routers" > /dev/null 2>&1; then
        domains=($(curl -s "$TRAEFIK_API/api/http/routers" | jq -r '.[].rule' | grep -oE 'Host\(`[^`]+`\)' | sed 's/Host(`//g' | sed 's/`)//g' | sort -u))
    else
        log "Warning: Cannot connect to Traefik API at $TRAEFIK_API"
        log "Please configure domains manually in the script or fix Traefik API access"
        return 1
    fi

    echo "${domains[@]}"
}

find_docker_project() {
    local domain="$1"
    local project_path=""

    local search_paths=(
        "/opt"
        "/var/www"
        "/home"
        "/srv"
        "$HOME"
    )

    for path in "${search_paths[@]}"; do
        if [[ -d "$path" ]]; then
            while IFS= read -r -d '' compose_file; do
                local dir=$(dirname "$compose_file")
                if grep -r "traefik.http.routers.*\.rule.*$domain" "$dir" > /dev/null 2>&1; then
                    project_path="$dir"
                    break 2
                fi
            done < <(find "$path" -name "docker-compose.yml" -o -name "docker-compose.yaml" -print0 2>/dev/null)
        fi
    done

    echo "$project_path"
}

restart_docker_project() {
    local project_path="$1"
    local domain="$2"

    if [[ -z "$project_path" ]]; then
        log "ERROR: Could not find Docker Compose project for domain: $domain"
        return 1
    fi

    log "Restarting Docker Compose project at: $project_path"

    cd "$project_path" || {
        log "ERROR: Cannot change to directory: $project_path"
        return 1
    }

    if docker-compose down; then
        log "Successfully stopped services for $domain"
    else
        log "ERROR: Failed to stop services for $domain"
        return 1
    fi

    sleep 5

    if docker-compose up -d; then
        log "Successfully restarted services for $domain"
        return 0
    else
        log "ERROR: Failed to start services for $domain"
        return 1
    fi
}

monitor_domains() {
    log "Starting domain monitoring check..."

    declare -A DOMAIN_PROJECTS=(
         ["codees-cm.com"]="$HOME/blog-codees"
         ["www.codees-cm.com"]="$HOME/blog-codees"
         ["insurance.codees-cm.com"]="$HOME/insurance/insurance-front"
         ["api.codees-cm.com"]="$HOME/insurance/insurance-backend"
         ["admin.tondo.codees-cm.com"]="$HOME/tondo/tondo-admin"
         ["api.tondo.codees-cm.com"]="$HOME/tondo/tondo-backend"
    )

    local domains=("${!DOMAIN_PROJECTS[@]}")
    local failed_domains=()

    log "Using manual domain configuration with ${#domains[@]} domains"

    # Check each domain
    for domain in "${domains[@]}"; do
        if [[ -n "$domain" ]]; then
            log "Checking domain: $domain"

            if check_url "https://$domain" || check_url "http://$domain"; then
                echo -e "${GREEN}✓${NC} $domain is accessible"
            else
                echo -e "${RED}✗${NC} $domain is not accessible"
                log "ALERT: Domain $domain is not responding"
                failed_domains+=("$domain")
            fi
        fi
    done

    if [[ ${#failed_domains[@]} -gt 0 ]]; then
        log "Found ${#failed_domains[@]} failed domain(s). Attempting to restart..."

        for domain in "${failed_domains[@]}"; do
            local project_path="${DOMAIN_PROJECTS[$domain]}"

            if [[ -n "$project_path" && -d "$project_path" ]]; then
                restart_docker_project "$project_path" "$domain"

                sleep 30
                if check_url "https://$domain" || check_url "http://$domain"; then
                    log "SUCCESS: Domain $domain is now accessible after restart"
                else
                    log "WARNING: Domain $domain is still not accessible after restart"
                fi
            else
                log "ERROR: Invalid or missing project path for domain: $domain (Path: $project_path)"
            fi
        done
    else
        log "All domains are accessible. No action needed."
    fi

    log "Domain monitoring check completed."
}

check_dependencies() {
    local missing_deps=()

    command -v curl >/dev/null 2>&1 || missing_deps+=("curl")
    command -v docker-compose >/dev/null 2>&1 || missing_deps+=("docker-compose")

    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log "ERROR: Missing required dependencies: ${missing_deps[*]}"
        log "Please install them using:"
        log "Ubuntu/Debian: sudo apt-get install curl docker-compose"
        log "CentOS/RHEL: sudo yum install curl docker-compose"
        exit 1
    fi
}

mkdir -p "$(dirname "$LOG_FILE")"
touch "$LOG_FILE"

main() {
    log "=== Traefik Domain Monitor Started ==="

    check_dependencies
    monitor_domains

    log "=== Traefik Domain Monitor Finished ==="
}

main "$@"