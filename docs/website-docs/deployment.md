# Deployment

## Platform: Vercel

The website is deployed on Vercel using the following architecture:
- **Frontend:** Static React SPA (built by Vite, served from Vercel CDN)
- **Backend:** Serverless functions under `/api/` directory

---

## Deployment Flow

```
git push → Vercel auto-deploy (branch-based)
    ├── main branch → Production (vyaptix.com)
    └── develop / feature branches → Preview URLs
```

---

## Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```
All `/api/*` requests are routed to the serverless functions in the `/api/` directory.

---

## Environment Variables in Vercel

Set via Vercel Dashboard → Project Settings → Environment Variables.

| Variable | Environment |
|---|---|
| `VITE_SUPABASE_URL` | Production, Preview |
| `VITE_SUPABASE_ANON_KEY` | Production, Preview |
| `VITE_ZOHO_CLIENT_ID` | Production only |
| `VITE_ZOHO_CLIENT_SECRET` | Production only |
| `VITE_ZOHO_REFRESH_TOKEN` | Production only |
| `OPENAI_API_KEY` | Production only |

**Important:** Variables prefixed with `VITE_` are injected at build time into the client bundle. Never put secrets in VITE_ variables. Zoho credentials should be moved to non-VITE_ variables accessible only in serverless functions.

---

## Serverless Function Limits (Vercel Hobby/Pro)

| Limit | Hobby | Pro |
|---|---|---|
| Function timeout | 10s | 60s |
| Max file upload | 4.5MB (body) | 4.5MB (body) |
| Regions | Single | Multiple |

Note: The contact form allows 10MB file uploads, but Vercel's default body limit is 4.5MB. Review whether this causes upload failures in production.

---

## Custom Domain

- Production domain: `vyaptix.com` (assumed — confirm in Vercel dashboard)
- Review platform: `reviews.vyaptix.ai` (separate deployment)

---

## Performance Targets (Core Web Vitals)

| Metric | Target | Current Risk |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | High — 759KB logo PNG |
| FID / INP (Interactivity) | < 200ms | Medium |
| CLS (Layout Shift) | < 0.1 | Low |

**Immediate fix needed:** Compress `public/final_logo_-_light.png` (759KB → < 20KB SVG or WebP).
