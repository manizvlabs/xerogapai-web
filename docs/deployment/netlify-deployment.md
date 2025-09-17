# Netlify Deployment Guide

This guide will help you deploy your Zero Digital website to Netlify, a popular hosting platform for static sites and JAMstack applications.

## Prerequisites

- GitHub repository with your code
- Netlify account (free tier available)
- Domain name (optional, for custom domain)

## Step 1: Prepare Your Repository

Ensure your repository is ready for deployment:

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. **Visit Netlify**: Go to [netlify.com](https://netlify.com)
2. **Sign up/Login**: Use your GitHub account for seamless integration
3. **Import Project**: Click "New site from Git" and select your repository
4. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `out` (for static export) or `.next` (for serverless)
   - Node Version: `18` (or latest LTS)
5. **Deploy**: Click "Deploy site" and wait for the build to complete

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
cd zero-website
netlify deploy

# Follow the prompts:
# - Create & configure a new site? Y
# - Team: (select your team)
# - Site name: zero-digital-website
# - Directory to deploy: ./
```

## Step 3: Configure Environment Variables

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
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

### 4.1 Add Domain in Netlify

1. Go to **Domain management** → **Add custom domain**
2. Enter your domain: `zerodigital.ai`
3. Netlify will provide DNS configuration instructions

### 4.2 Configure DNS

Update your domain's DNS records:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: zero-digital-website.netlify.app
```

### 4.3 SSL Certificate

Netlify automatically provides SSL certificates. Wait 24-48 hours for full propagation.

## Step 5: Performance Optimization

### 5.1 Enable Netlify Analytics

1. Go to **Analytics** tab in your site
2. Enable **Netlify Analytics** (free tier available)
3. Monitor performance metrics

### 5.2 Configure Caching

Create `_headers` file in your `public` directory:

```
/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/api/*
  Cache-Control: public, max-age=0, must-revalidate
```

### 5.3 Enable Form Handling

1. Go to **Forms** tab
2. Enable **Form detection**
3. Set up form notifications

## Step 6: GitHub Integration

### 6.1 Continuous Deployment

1. Go to **Site settings** → **Build & deploy**
2. Ensure **Deploy settings** are configured:
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `out`
3. Enable **Deploy previews** for pull requests

### 6.2 Build Hooks

For manual deployments:
1. Go to **Site settings** → **Build & deploy** → **Build hooks**
2. Create a new build hook
3. Use the URL to trigger deployments

## Step 7: Monitoring and Maintenance

### 7.1 Netlify Dashboard

Monitor your deployment:
- **Deploys**: Build logs and status
- **Analytics**: Performance metrics
- **Forms**: Contact form submissions

### 7.2 Error Tracking

Set up error tracking:
1. Go to **Site settings** → **Functions**
2. Enable **Function logs**
3. Monitor serverless function performance

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check build logs in Netlify dashboard
# Common fixes:
npm run build  # Test locally first
npm run export  # For static sites
```

**Environment Variables Not Working:**
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check variable names match exactly

**Domain Not Working:**
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify DNS records match Netlify's requirements
- Wait 24-48 hours for full propagation

**Performance Issues:**
- Enable Netlify Analytics
- Check Core Web Vitals
- Optimize images and assets
- Use Netlify's CDN features

### Getting Help

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Community**: [community.netlify.com](https://community.netlify.com)
- **Support**: Available in Netlify dashboard

## Cost Estimation

### Netlify Pricing (as of 2024)

**Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited static sites
- Perfect for small to medium websites

**Pro Tier ($19/month):**
- 1TB bandwidth/month
- 1,000 build minutes/month
- Advanced analytics
- Priority support

**For Zero Digital:**
- **Recommended**: Free tier initially
- **Upgrade to Pro**: When traffic exceeds 100GB/month
- **Estimated Cost**: $0-19/month

## Next Steps

1. **Test Your Deployment**: Visit your Netlify URL
2. **Set Up Monitoring**: Enable analytics and error tracking
3. **Configure Email**: Set up contact form email service
4. **SEO Setup**: Submit sitemap to Google Search Console
5. **Performance**: Monitor Core Web Vitals and optimize

Your Zero Digital website is now live on Netlify! 🚀
