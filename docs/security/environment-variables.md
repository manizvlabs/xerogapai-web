# Environment Variables Reference

This document provides a comprehensive reference for all environment variables used in the XeroGap AI website.

## Quick Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` for your environment
3. Never commit `.env.local` to version control

## Variable Categories

### 🌐 Site Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_SITE_NAME` | Website name | `"XeroGap AI"` | ✅ |
| `NEXT_PUBLIC_SITE_TAGLINE` | Website tagline | `"AI-Powered Digital Transformation"` | ✅ |
| `NEXT_PUBLIC_SITE_DOMAIN` | Primary domain | `"zerodigital.ai"` | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Full website URL | `"https://zerodigital.ai"` | ✅ |

### 🎨 Theme Configuration
| Variable | Description | Options | Default |
|----------|-------------|---------|---------|
| `NEXT_PUBLIC_DEFAULT_THEME` | Default theme | `light`, `dark`, `system` | `light` |
| `NEXT_PUBLIC_ENABLE_THEME_SWITCHER` | Enable theme toggle | `true`, `false` | `true` |

### 📞 Contact & Business
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_COMPANY_NAME` | Company name | `"XeroGap AI"` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Contact email | `"info@zerodigital.ai"` |
| `NEXT_PUBLIC_COMPANY_PHONE` | Phone number | `"+91 98765 43210"` |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Business address | `"Hyderabad, Telangana, India"` |

### 📊 Analytics & Tracking
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID | ✅ |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | ❌ |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification | ❌ |

### 📧 Email Configuration
| Variable | Description | Service |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Email provider | `resend`, `sendgrid`, `mailgun` |
| `RESEND_API_KEY` | Resend API key | Resend |
| `SENDGRID_API_KEY` | SendGrid API key | SendGrid |
| `MAILGUN_API_KEY` | Mailgun API key | Mailgun |
| `EMAIL_FROM` | From email address | All services |
| `EMAIL_TO` | To email address | All services |

### 🔗 GitHub Integration
| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_CLI_OAUTH_TOKEN` | GitHub CLI OAuth Token (expires ~90 days) | ✅ |
| `GITHUB_PAT` | Personal Access Token (alternative) | ❌ |
| `GITHUB_REPO_OWNER` | Repository owner | ✅ |
| `GITHUB_REPO_NAME` | Repository name | ✅ |
| `GITHUB_REPO_URL` | Full repository URL | ✅ |

### 🚀 Deployment
| Variable | Description | Platform |
|----------|-------------|----------|
| `VERCEL_PROJECT_ID` | Vercel project ID | Vercel |
| `VERCEL_ORG_ID` | Vercel organization ID | Vercel |
| `NETLIFY_SITE_ID` | Netlify site ID | Netlify |
| `NETLIFY_ACCESS_TOKEN` | Netlify access token | Netlify |

### 🔒 Security
| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | JWT signing secret | ✅ |
| `RATE_LIMIT_MAX` | API rate limit | ❌ |
| `CORS_ORIGIN` | Allowed origins | ❌ |

### 🛠️ Development
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `development` |
| `DEV_PORT` | Development port | `4010` |
| `DEBUG` | Debug mode | `false` |

### 🎛️ Feature Flags
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENABLE_BLOG` | Enable blog section | `true` |
| `NEXT_PUBLIC_ENABLE_PORTFOLIO` | Enable portfolio | `true` |
| `NEXT_PUBLIC_ENABLE_TESTIMONIALS` | Enable testimonials | `true` |
| `NEXT_PUBLIC_ENABLE_NEWSLETTER` | Enable newsletter | `false` |
| `NEXT_PUBLIC_ENABLE_CHAT` | Enable chat widget | `false` |

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
DEBUG=true
VERBOSE_LOGGING=true
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Preview/Staging
```env
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=preview
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Security Best Practices

### ✅ Do's
- Use strong, unique values for secrets
- Rotate secrets regularly
- Use different values for different environments
- Never commit `.env.local` to version control
- Use environment-specific files (`.env.development`, `.env.production`)

### ❌ Don'ts
- Don't use weak passwords or predictable secrets
- Don't share secrets in chat or email
- Don't commit secrets to version control
- Don't use the same secrets across environments
- Don't hardcode secrets in your code

## Common Issues

### Variable Not Working
1. Check if variable starts with `NEXT_PUBLIC_` for client-side access
2. Verify the variable name is correct (case-sensitive)
3. Restart the development server after adding new variables
4. Check if the variable is properly set in your deployment platform

### Build Failures
1. Ensure all required variables are set
2. Check for typos in variable names
3. Verify variable values are properly quoted
4. Check deployment platform environment variable settings

## Platform-Specific Notes

### Vercel
- Environment variables are set in Project Settings
- Variables are automatically available in all environments
- Use different values for Preview and Production

### Netlify
- Environment variables are set in Site Settings
- Variables are available in build and runtime
- Use different values for different branches

### Local Development
- Use `.env.local` for local development
- Variables are loaded automatically by Next.js
- Restart the server after changing variables

## Getting Help

If you encounter issues with environment variables:

1. Check this documentation
2. Review the deployment guides
3. Check the GitHub repository issues
4. Contact the development team

---

**Remember**: Environment variables are crucial for your application's security and functionality. Always keep them secure and up-to-date!
