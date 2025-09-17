# Environment Variables Guide

This guide explains all environment variables used in the Zero Digital website and how to configure them for different environments.

## Quick Setup

Copy the example file and customize:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## Environment Variables Reference

### Site Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_SITE_NAME` | Website name | "Zero Digital" | No |
| `NEXT_PUBLIC_SITE_TAGLINE` | Main tagline | "AI-Powered Digital Transformation" | No |
| `NEXT_PUBLIC_DOMAIN` | Primary domain | "zerodigital.ai" | No |
| `NEXT_PUBLIC_SITE_URL` | Full site URL | "https://zerodigital.ai" | No |
| `NEXT_PUBLIC_LOCATION` | Business location | "Hyderabad, India" | No |
| `NEXT_PUBLIC_PHONE` | Contact phone | "+917702661991" | No |
| `NEXT_PUBLIC_EMAIL` | Contact email | "info@zerodigital.ai" | No |
| `NEXT_PUBLIC_BUSINESS_TYPE` | Target audience | "all" | No |

### Theme Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_ENABLE_THEME_SWITCHER` | Enable theme toggle | "true" | No |
| `NEXT_PUBLIC_DEFAULT_THEME` | Default theme | "light" | No |

### Social Media Links

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile | "https://linkedin.com/company/zerodigital" | No |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter profile | "https://twitter.com/zerodigital" | No |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile | "https://instagram.com/zerodigital" | No |

### Analytics & Tracking

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | "GA-XXXXXXXXXX" | No |

### Email Service

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EMAIL_SERVICE_API_KEY` | Email service API key | "" | No |
| `CONTACT_EMAIL` | Contact form recipient | "info@zerodigital.ai" | No |

### GitHub Integration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GITHUB_CLI_OAUTH_TOKEN` | GitHub CLI OAuth token | "" | No |

### Deployment Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_VERCEL_URL` | Vercel deployment URL | Auto-generated | No |
| `NEXT_PUBLIC_NETLIFY_URL` | Netlify deployment URL | Auto-generated | No |

## Environment-Specific Configurations

### Development (.env.local)

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Zero Digital"
NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
NEXT_PUBLIC_DOMAIN="localhost:4010"
NEXT_PUBLIC_SITE_URL="http://localhost:4010"

# Theme Configuration
NEXT_PUBLIC_ENABLE_THEME_SWITCHER="true"
NEXT_PUBLIC_DEFAULT_THEME="light"

# Analytics (Disabled for development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# Email Service (Mock for development)
EMAIL_SERVICE_API_KEY=""
CONTACT_EMAIL="info@zerodigital.ai"
```

### Production (Vercel)

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Zero Digital"
NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
NEXT_PUBLIC_DOMAIN="zerodigital.ai"
NEXT_PUBLIC_SITE_URL="https://zerodigital.ai"

# Theme Configuration
NEXT_PUBLIC_ENABLE_THEME_SWITCHER="true"
NEXT_PUBLIC_DEFAULT_THEME="light"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="GA-XXXXXXXXXX"

# Email Service
EMAIL_SERVICE_API_KEY="your_production_api_key"
CONTACT_EMAIL="info@zerodigital.ai"

# GitHub Integration
GITHUB_CLI_OAUTH_TOKEN="your_production_token"
```

### Production (Netlify)

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Zero Digital"
NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
NEXT_PUBLIC_DOMAIN="zerodigital.ai"
NEXT_PUBLIC_SITE_URL="https://zerodigital.ai"

# Theme Configuration
NEXT_PUBLIC_ENABLE_THEME_SWITCHER="true"
NEXT_PUBLIC_DEFAULT_THEME="light"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="GA-XXXXXXXXXX"

# Email Service
EMAIL_SERVICE_API_KEY="your_production_api_key"
CONTACT_EMAIL="info@zerodigital.ai"
```

## Security Best Practices

### 1. Never Commit Sensitive Data

```bash
# Add to .gitignore
.env
.env.local
.env.production
.env.staging
```

### 2. Use Different Tokens for Different Environments

- **Development**: Use test/development tokens
- **Staging**: Use staging-specific tokens
- **Production**: Use production tokens with minimal permissions

### 3. Rotate Tokens Regularly

- GitHub tokens: Every 90 days
- API keys: Every 6 months
- Passwords: Every 3 months

### 4. Use Environment-Specific Files

```
.env.local          # Local development
.env.development    # Development environment
.env.staging        # Staging environment
.env.production     # Production environment
```

## Platform-Specific Notes

### Vercel

- Environment variables are set in the Vercel dashboard
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Variables are automatically available at build time

### Netlify

- Environment variables are set in Site settings
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Variables are available during build and runtime

### GitHub Pages

- Limited environment variable support
- Use build-time variables only
- Consider using GitHub Secrets for sensitive data

## Troubleshooting

### Common Issues

**Variables Not Loading:**
```bash
# Check if variable starts with NEXT_PUBLIC_
# Restart development server
npm run dev
```

**Build Errors:**
```bash
# Check for missing required variables
# Verify variable names match exactly
# Check for typos in variable names
```

**Production Issues:**
```bash
# Verify variables are set in hosting platform
# Check variable values are correct
# Ensure no trailing spaces or quotes
```

### Debugging

```bash
# Check loaded variables
console.log(process.env.NEXT_PUBLIC_SITE_NAME);

# Check all public variables
console.log(Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
```

## Migration Guide

### From .env to .env.local

1. Copy variables from `.env` to `.env.local`
2. Update variable names to match new format
3. Test locally with `npm run dev`
4. Deploy to staging for testing

### From Vercel to Netlify

1. Export variables from Vercel dashboard
2. Import variables to Netlify dashboard
3. Update any platform-specific variables
4. Test deployment

## Support

For questions about environment variables:

- Check this documentation
- Review platform-specific documentation
- Contact support through the website
- Create an issue in the repository

---

**Note**: Always test your configuration in a staging environment before deploying to production.
