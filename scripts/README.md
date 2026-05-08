# Scripts Directory

This directory contains utility scripts for development, testing, and maintenance of the VyaptIX website.

## Available Scripts

### Testing Scripts

- `test-supabase.js` - Test Supabase database connection and basic operations
- `test-zoho-api.js` - Test Zoho CRM API v2.2 integration
- `test-integration.js` - Test complete integration flow (Database + Zoho CRM)
- `test-form-submission.js` - Test the complete contact form submission workflow
- `test-prisma.js` - Test Prisma ORM connectivity (deprecated, now using Supabase client)
- `test-api-direct.js` - Direct API testing without Vercel environment
- `test-end-to-end.js` - End-to-end testing with simulated HTTP requests

### Development Scripts

- `local-api-server.js` - Express server to mimic Vercel serverless functions locally

## Usage

Run any script from the project root:

```bash
# Test Supabase connection
node scripts/test-supabase.js

# Test Zoho CRM integration
node scripts/test-zoho-api.js

# Test complete integration
node scripts/test-integration.js

# Test form submission workflow
node scripts/test-form-submission.js

# Run local API server (alternative to Vercel dev)
node scripts/local-api-server.js
```

## Environment Requirements

All scripts require the following environment variables to be set in `.env`:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `DATABASE_URL` - Supabase connection pooling URL
- `ZOHO_CLIENT_ID` - Zoho CRM OAuth client ID
- `ZOHO_CLIENT_SECRET` - Zoho CRM OAuth client secret
- `ZOHO_REFRESH_TOKEN` - Zoho CRM OAuth refresh token