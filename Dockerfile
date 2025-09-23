# Base image
FROM node:18-slim AS base

# Dependencies layer
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 300000 && \
    yarn install --frozen-lockfile --network-concurrency 1

# Build layer
FROM base AS builder
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=1024"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env .env
RUN yarn build

# Production runner
FROM node:18-slim AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
