# GitHub Actions Setup for Scheduled Posts

## 1. Add Repository Secrets
Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:
- `CRON_SECRET`: your-secure-cron-secret-key-here
- `VERCEL_URL`: https://your-app.vercel.app

## 2. Schedule
- Runs **twice daily**: 12:00 AM and 12:00 PM UTC
- Uses only **2 minutes/month** from free tier (2,000 minutes available)
- Manual trigger available in Actions tab

## 3. Cron Format
`0 0,12 * * *` means:
- `0` - At minute 0
- `0,12` - At hours 0 and 12 (midnight and noon)
- `* * *` - Every day, month, weekday
