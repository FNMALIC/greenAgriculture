# Scheduled Posts Feature

## Vercel Deployment Setup

### 1. Environment Variables (Vercel Dashboard)
Add these in your Vercel project settings:
```
CRON_SECRET=your-secure-cron-secret-key-here
VERCEL_URL=your-app.vercel.app
```

### 2. Automatic Cron (Vercel Pro Plan)
The `vercel.json` file enables automatic publishing every 5 minutes on Vercel Pro.

### 3. Manual Alternative (Free Plan)
Use external services like:
- **Uptime Robot**: Monitor `/api/cron/publish-scheduled` every 5 minutes
- **GitHub Actions**: Schedule workflow to call your API
- **Cron-job.org**: Free cron service

## Usage
1. Create posts with "Scheduled" status
2. Set future date/time
3. Posts auto-publish when due (Pro plan) or use manual trigger

## Limitations
- Vercel cron requires Pro plan ($20/month)
- Free plan: Use manual publishing or external cron services
