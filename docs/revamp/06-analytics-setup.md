# Analytics Setup Spec

## Tool: Microsoft Clarity

**Project ID:** `wwofub2i9i`
**Dashboard:** https://clarity.microsoft.com

**Why Clarity:**
- Free, no event limits
- Session recordings and heatmaps built-in — zero manual instrumentation needed
- Rage click, dead click, and scroll depth detection automatic
- Simple setup — one script, no SDK required
- GDPR-compliant when consent-gated

## What Was Implemented

- `src/components/ClarityProvider.tsx` — consent-gated component mounted in `app/(main)/layout.tsx`
- Clarity only loads after the user accepts cookies via the cookie banner
- Listens to `vyaptix:consent-accepted` event to initialize mid-session if consent is given

## Environment Variable

Add to `.env.local` and Vercel environment variables:

```
NEXT_PUBLIC_CLARITY_PROJECT_ID=wwofub2i9i
```

## What Clarity Tracks Automatically

- Page views and navigation paths
- Session recordings (full replay)
- Heatmaps (click, scroll, area)
- Rage clicks, dead clicks, excessive scrolling
- Device, browser, OS, and location

No manual event tracking calls are needed — Clarity handles everything automatically.

## Dashboard Setup

Log in at https://clarity.microsoft.com to view:
1. **Recordings** — watch real user sessions
2. **Heatmaps** — see where users click and scroll on each page
3. **Insights** — automatic rage click and dead click alerts
