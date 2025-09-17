# Vercel Deployment Guide

This guide will help you deploy your Zero Digital website to Vercel, a modern hosting platform optimized for Next.js applications.

## Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step 1: Prepare Your Repository

Ensure your repository is ready for deployment:

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign up/Login**: Use your GitHub account for seamless integration
3. **Import Project**: Click "New Project" and import your repository
4. **Configure Settings**:
   - Framework Preset: Next.js
   - Root Directory: `zero-website` (if your repo has multiple folders)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Deploy**: Click "Deploy" and wait for the build to complete

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
cd zero-website
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? zero-digital-website
# - Directory? ./
# - Override settings? N
```

## Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=Zero Digital
NEXT_PUBLIC_SITE_TAGLINE=AI-Powered Digital Transformation
NEXT_PUBLIC_DOMAIN=zerodigital.ai
NEXT_PUBLIC_SITE_URL=https://zerodigital.ai
NEXT_PUBLIC_LOCATION=Hyderabad, India
NEXT_PUBLIC_PHONE=+917702661991
NEXT_PUBLIC_EMAIL=info@zerodigital.ai

# Theme Configuration
NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true
NEXT_PUBLIC_DEFAULT_THEME=light

# Social Links
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/zerodigital
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/zerodigital
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/zerodigital

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=GA-XXXXXXXXXX

# Email Service (Optional)
EMAIL_SERVICE_API_KEY=your_email_service_api_key
CONTACT_EMAIL=info@zerodigital.ai

# GitHub Integration
GITHUB_CLI_OAUTH_TOKEN=your_github_token
```

3. **Redeploy** after adding environment variables

## Step 4: Custom Domain Setup

### 4.1 Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Add your domain: `zerodigital.ai`
3. Vercel will provide DNS configuration instructions

### 4.2 Configure DNS

Update your domain's DNS records:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4.3 SSL Certificate

Vercel automatically provides SSL certificates. Wait 24-48 hours for full propagation.

## Step 5: Performance Optimization

### 5.1 Enable Vercel Analytics

1. Go to **Analytics** tab in your project
2. Enable **Web Analytics** (free tier available)
3. Add the tracking code to your app

### 5.2 Configure Caching

Add to your `next.config.ts`:

```typescript
const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Step 6: Monitoring and Maintenance

### 6.1 Vercel Dashboard

Monitor your deployment:
- **Functions**: Serverless function logs
- **Analytics**: Performance metrics
- **Speed Insights**: Core Web Vitals

### 6.2 GitHub Integration

Enable automatic deployments:
1. Go to **Settings** → **Git**
2. Ensure **Production Branch** is set to `main`
3. Enable **Automatic deployments**

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check build logs in Vercel dashboard
# Common fixes:
npm run build  # Test locally first
```

**Environment Variables Not Working:**
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables

**Domain Not Working:**
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify DNS records match Vercel's requirements
- Wait 24-48 hours for full propagation

**Performance Issues:**
- Enable Vercel Analytics
- Check Core Web Vitals in dashboard
- Optimize images and assets

### Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support**: Available in Vercel dashboard

## Cost Estimation

### Vercel Pricing (as of 2024)

**Free Tier:**
- 100GB bandwidth/month
- Unlimited static sites
- 100 serverless function executions
- Perfect for small to medium websites

**Pro Tier ($20/month):**
- 1TB bandwidth/month
- Unlimited serverless functions
- Advanced analytics
- Priority support

**For Zero Digital:**
- **Recommended**: Free tier initially
- **Upgrade to Pro**: When traffic exceeds 100GB/month
- **Estimated Cost**: $0-20/month

## Next Steps

1. **Test Your Deployment**: Visit your Vercel URL
2. **Set Up Monitoring**: Enable analytics and error tracking
3. **Configure Email**: Set up contact form email service
4. **SEO Setup**: Submit sitemap to Google Search Console
5. **Performance**: Monitor Core Web Vitals and optimize

Your Zero Digital website is now live on Vercel! 🚀
