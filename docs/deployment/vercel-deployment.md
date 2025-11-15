# Vercel Deployment Guide

This comprehensive guide will walk you through deploying your VyaptIX website to Vercel, including environment variable configuration, GitHub integration, and production optimizations.

## Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Domain name (optional, Vercel provides free subdomain)
- GitHub Personal Access Token

## Step 1: Prepare Your Repository

### 1.1 Environment Variables
Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Update the following key variables in `.env.local`:
```env
NEXT_PUBLIC_SITE_DOMAIN="www.vyaptix.ai"
NEXT_PUBLIC_SITE_URL="https://www.vyaptix.ai"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
GITHUB_PAT="ghp_your_github_personal_access_token"
```

### 1.2 Vercel Configuration
Create `vercel.json` in your project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

## Step 2: Deploy to Vercel

### 2.1 Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `manizvlabs/vyaptix-web`
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`

### 2.2 Environment Variables
In Vercel dashboard, go to Project Settings → Environment Variables and add:

#### Required Variables
```env
NEXT_PUBLIC_SITE_DOMAIN=www.vyaptix.ai
NEXT_PUBLIC_SITE_URL=https://www.vyaptix.ai
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

#### GitHub Integration
```env
GITHUB_PAT=ghp_your_github_personal_access_token
GITHUB_REPO_OWNER=manizvlabs
GITHUB_REPO_NAME=xerogapai-web
GITHUB_REPO_URL=https://github.com/manizvlabs/xerogapai-web
```

#### Email Configuration
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=support@www.vyaptix.ai
EMAIL_TO=support@www.vyaptix.ai
```

#### Theme & Features
```env
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false
```

#### Social Media
```env
NEXT_PUBLIC_TWITTER_HANDLE=@xerogapai
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/zero-digital
NEXT_PUBLIC_GITHUB_URL=https://github.com/manizvlabs/xerogapai-web
```

### 2.3 Deploy Settings
Configure deployment settings:
- **Production Branch**: `main`
- **Preview Branches**: `feature/*`, `develop`
- **Auto Deploy**: Enabled
- **Build Cache**: Enabled

## Step 3: Custom Domain Setup

### 3.1 Add Custom Domain
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain: `www.vyaptix.ai`
4. Add subdomain: `www.www.vyaptix.ai`

### 3.2 DNS Configuration
Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 SSL Certificate
- Vercel automatically provides SSL certificates
- Enable "Force HTTPS" in Project Settings → Domains

## Step 4: GitHub Integration

### 4.1 GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:packages` (Write packages to GitHub Package Registry)
   - `admin:org` (if deploying from organization)
4. Copy the token and add it to Vercel environment variables as `GITHUB_PAT`

### 4.2 GitHub Actions Integration
Create `.github/workflows/vercel-deploy.yml`:

```yaml
name: Vercel Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
      - name: Build project
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## Step 5: Performance Optimization

### 5.1 Next.js Configuration
Update `next.config.ts` for Vercel:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  images: {
    domains: ['www.vyaptix.ai'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### 5.2 Vercel Analytics
Enable Vercel Analytics in your project:
1. Go to Project Settings → Analytics
2. Enable "Vercel Analytics"
3. Add to your app:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 5.3 Image Optimization
Vercel provides automatic image optimization. Use Next.js Image component:

```typescript
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="XeroGap AI Logo"
  width={200}
  height={60}
  priority
/>
```

## Step 6: Monitoring & Analytics

### 6.1 Google Analytics 4
1. Create Google Analytics 4 property
2. Get Measurement ID
3. Add to environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 6.2 Vercel Analytics
- Built-in performance monitoring
- Real-time visitor analytics
- Core Web Vitals tracking

### 6.3 Error Tracking
Add Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.ts`:
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## Step 7: Security & Headers

### 7.1 Security Headers
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
        }
      ]
    }
  ]
}
```

### 7.2 Environment Security
- Never commit `.env.local` to version control
- Use Vercel's environment variable encryption
- Rotate secrets regularly

## Step 8: API Routes & Functions

### 8.1 Serverless Functions
Vercel automatically handles Next.js API routes as serverless functions:

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Process contact form
  // Send email, save to database, etc.
  
  return NextResponse.json({ success: true })
}
```

### 8.2 Edge Functions
For global edge deployment:

```typescript
// src/app/api/hello/route.ts
export const runtime = 'edge'

export async function GET() {
  return new Response('Hello from the edge!')
}
```

## Step 9: Backup & Recovery

### 9.1 Automated Backups
- Vercel automatically backs up deployments
- Enable "Deploy notifications" for monitoring
- Use GitHub Actions for additional backup strategies

### 9.2 Disaster Recovery
- Keep local copies of your code
- Document all environment variables
- Test deployment process regularly

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18)
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding new variables
   - Check variable names for typos

3. **Custom Domain Issues**
   - Verify DNS propagation (can take 24-48 hours)
   - Check SSL certificate status
   - Ensure domain is properly configured

4. **Performance Issues**
   - Enable Vercel's CDN
   - Optimize images
   - Use Vercel's image optimization features
   - Check Core Web Vitals

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Cost Estimation

### Vercel Free Tier (Hobby)
- 100GB bandwidth/month
- 100 serverless function executions/day
- 1 concurrent build
- 1 custom domain
- Community support

### Vercel Pro ($20/month)
- 1TB bandwidth/month
- 1M serverless function executions/month
- 6 concurrent builds
- Unlimited custom domains
- Priority support
- Advanced analytics

### Additional Costs
- Domain registration: $10-15/year
- Email service (Resend): $20/month for 50k emails
- Analytics (Google Analytics): Free
- Error tracking (Sentry): Free tier available

## Next Steps

1. **Set up monitoring**: Configure alerts for build failures and downtime
2. **Implement CI/CD**: Use GitHub Actions for automated testing
3. **Add CMS**: Consider integrating Strapi or Contentful
4. **Performance monitoring**: Set up Lighthouse CI for performance tracking
5. **Security scanning**: Implement automated security checks
6. **A/B testing**: Use Vercel's built-in A/B testing features

## Environment Variables Reference

### Required for Production
```env
NEXT_PUBLIC_SITE_DOMAIN=www.vyaptix.ai
NEXT_PUBLIC_SITE_URL=https://www.vyaptix.ai
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GITHUB_PAT=ghp_your_github_personal_access_token
```

### Optional but Recommended
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
RESEND_API_KEY=re_your_resend_api_key
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

---

**Need help?** Contact the development team or check the [GitHub repository](https://github.com/manizvlabs/xerogapai-web) for support.
