# Netlify Deployment Guide

This guide will walk you through deploying your XeroGap AI website to Netlify, including environment variable configuration and GitHub integration.

## Prerequisites

- GitHub repository with your code
- Netlify account (free tier available)
- Domain name (optional, Netlify provides free subdomain)

## Step 1: Prepare Your Repository

### 1.1 Environment Variables
Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Update the following key variables in `.env.local`:
```env
NEXT_PUBLIC_SITE_DOMAIN="your-domain.com"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
GITHUB_PAT="ghp_your_github_personal_access_token"
```

### 1.2 Build Configuration
Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_ENV = "production"
  NEXT_PUBLIC_APP_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
  NEXT_PUBLIC_APP_ENV = "preview"
```

## Step 2: Deploy to Netlify

### 2.1 Connect Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" as your Git provider
4. Select your repository: `manizvlabs/zero-digital-website`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18

### 2.2 Environment Variables
In Netlify dashboard, go to Site settings → Environment variables and add:

#### Required Variables
```env
NEXT_PUBLIC_SITE_DOMAIN=your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

#### Optional Variables
```env
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true
NEXT_PUBLIC_TWITTER_HANDLE=@xerogapai
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/xerogapai
```

#### GitHub Integration
```env
GITHUB_PAT=ghp_your_github_personal_access_token
GITHUB_REPO_OWNER=manizvlabs
GITHUB_REPO_NAME=zero-digital-website
```

#### Email Configuration (if using contact form)
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@your-domain.com
EMAIL_TO=info@your-domain.com
```

## Step 3: Custom Domain Setup

### 3.1 Add Custom Domain
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `your-domain.com`
4. Follow DNS configuration instructions

### 3.2 DNS Configuration
Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### 3.3 SSL Certificate
- Netlify automatically provides SSL certificates
- Enable "Force HTTPS" in Site settings → Domain management

## Step 4: GitHub Integration

### 4.1 GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `write:packages` (Write packages to GitHub Package Registry)
4. Copy the token and add it to Netlify environment variables as `GITHUB_PAT`

### 4.2 Automatic Deployments
- Netlify automatically deploys on every push to main branch
- Preview deployments are created for pull requests
- Configure branch settings in Site settings → Build & deploy → Branch deploys

## Step 5: Performance Optimization

### 5.1 Build Optimization
Add to `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

### 5.2 Netlify Functions (Optional)
For server-side functionality, create `netlify/functions/` directory:

```javascript
// netlify/functions/contact.js
exports.handler = async (event, context) => {
  // Handle contact form submissions
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' })
  }
}
```

## Step 6: Monitoring & Analytics

### 6.1 Google Analytics
1. Create Google Analytics 4 property
2. Get Measurement ID
3. Add to environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 6.2 Netlify Analytics
- Enable in Site settings → Analytics
- View traffic, form submissions, and performance metrics

### 6.3 Error Tracking
Consider adding Sentry for error tracking:
```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Step 7: Security & Headers

### 7.1 Security Headers
Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
```

## Step 8: Backup & Recovery

### 8.1 Automated Backups
- Netlify automatically backs up your site
- Enable "Deploy notifications" for monitoring
- Consider using GitHub Actions for additional backup strategies

### 8.2 Disaster Recovery
- Keep local copies of your code
- Document all environment variables
- Test deployment process regularly

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18)
   - Verify all dependencies are in `package.json`
   - Check build logs in Netlify dashboard

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding new variables
   - Check variable names for typos

3. **Custom Domain Issues**
   - Verify DNS propagation (can take 24-48 hours)
   - Check SSL certificate status
   - Ensure domain is properly configured

4. **Performance Issues**
   - Enable Netlify's CDN
   - Optimize images
   - Use Netlify's image optimization features

### Support Resources
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Community](https://community.netlify.com/)

## Cost Estimation

### Netlify Free Tier
- 100GB bandwidth/month
- 300 build minutes/month
- 1 concurrent build
- Basic form handling (100 submissions/month)

### Netlify Pro ($19/month)
- 1TB bandwidth/month
- 3,000 build minutes/month
- 3 concurrent builds
- Advanced form handling
- Priority support

### Additional Costs
- Domain registration: $10-15/year
- Email service (Resend): $20/month for 50k emails
- Analytics (Google Analytics): Free

## Next Steps

1. **Set up monitoring**: Configure alerts for build failures and downtime
2. **Implement CI/CD**: Use GitHub Actions for automated testing
3. **Add CMS**: Consider integrating Strapi or Contentful
4. **Performance monitoring**: Set up Lighthouse CI for performance tracking
5. **Security scanning**: Implement automated security checks

---

**Need help?** Contact the development team or check the [GitHub repository](https://github.com/manizvlabs/zero-digital-website) for support.
