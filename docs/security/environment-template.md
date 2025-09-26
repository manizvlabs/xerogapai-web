# Environment Variables Template

Create a `.env.local` file in the root directory with these variables:

```bash
# XeroGap AI Website Environment Variables

# Site Configuration
NEXT_PUBLIC_SITE_NAME="XeroGap AI"
NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
NEXT_PUBLIC_SITE_DOMAIN="xerogap.com"
NEXT_PUBLIC_LOCATION=""
NEXT_PUBLIC_PHONE="+917702661991"
NEXT_PUBLIC_EMAIL="support@xerogap.com"
NEXT_PUBLIC_APP_VERSION="1.0.5-20250925"
NEXT_PUBLIC_COPYRIGHT_YEAR="2025"

# Security Configuration (CHANGE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-12345"
JWT_EXPIRES_IN="24h"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_EMAIL="support@xerogap.com"

# Vercel Configuration
VERCEL_TOKEN="your-vercel-token"
VERCEL_ORG_ID="your-org-id"
VERCEL_PROJECT_ID="your-project-id"

# GitHub Configuration
GITHUB_CLI_OAUTH_TOKEN="your-github-cli-token"
GITHUB_PAT="your-github-pat"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Contact Form
CONTACT_EMAIL="support@xerogap.com"

# Microsoft Office 365 SMTP Configuration
# Get these from your Microsoft 365 admin portal or Azure AD app registration
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@yourdomain.com"
SMTP_PASS="your-app-password-or-oauth-token"
SMTP_FROM_NAME="XeroGap AI"
SMTP_FROM_EMAIL="noreply@xerogap.com"

# Alternative: Microsoft Graph API Configuration (for modern Office 365 accounts)
# This is the RECOMMENDED approach if app passwords are not available
MS_GRAPH_CLIENT_ID="your-azure-app-client-id"
MS_GRAPH_CLIENT_SECRET="your-azure-app-client-secret"
MS_GRAPH_TENANT_ID="your-azure-tenant-id"

# See docs/security/microsoft-graph-setup.md for detailed setup instructions

# Development
NODE_ENV="development"
```

## Important Security Notes:

1. **Change default credentials** before production deployment
2. **Use strong JWT secret** (at least 32 characters)
3. **Never commit .env.local** to version control
4. **Use different credentials** for each environment
5. **Rotate secrets regularly** in production
