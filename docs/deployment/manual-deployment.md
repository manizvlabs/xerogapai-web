# Manual Deployment Guide

## Overview

The deployment pipeline has been configured to run **manually only** to help you manage your Vercel free tier deployments wisely. This prevents automatic deployments on every commit and gives you full control over when to deploy.

## How to Deploy

### 1. Go to GitHub Actions
- Navigate to your repository: `https://github.com/manizvlabs/xerogapai-web`
- Click on the **"Actions"** tab
- You'll see the **"Vercel Deploy"** workflow

### 2. Trigger Manual Deployment
- Click on **"Vercel Deploy"** workflow
- Click the **"Run workflow"** button (green button on the right)
- Fill in the deployment options:

#### Deployment Options:

**Environment:**
- **Production** - Deploys to `https://xerogapai-web.vercel.app/` (your live website)
- **Preview** - Creates a preview deployment (for testing changes)

**Deploy Message (Optional):**
- Add a custom message describing what you're deploying
- Example: "Added new contact form validation"

**Skip Tests (Optional):**
- ✅ **Checked** - Faster deployment, skips linting and type checking
- ❌ **Unchecked** - Full deployment with all tests (recommended for production)

### 3. Recommended Deployment Strategy

#### For Production Deployments:
- ✅ **Environment**: Production
- ✅ **Skip Tests**: Unchecked (run full tests)
- ✅ **Deploy Message**: Describe the changes

#### For Testing/Preview:
- ✅ **Environment**: Preview
- ✅ **Skip Tests**: Checked (faster for testing)
- ✅ **Deploy Message**: "Testing new feature"

## Benefits of Manual Deployment

1. **💰 Cost Control** - Only deploy when you actually need to
2. **🎯 Quality Control** - Review changes before deploying
3. **⚡ Faster Development** - No waiting for deployments on every commit
4. **🔒 Production Safety** - Prevent accidental deployments

## Current Status

- ✅ **Local Development**: `http://localhost:4010` (always available)
- ✅ **Production Website**: `https://xerogapai-web.vercel.app/` (manual deployment only)
- ✅ **GitHub Repository**: All changes are saved and versioned

## Quick Commands

```bash
# Start local development
npm run dev

# Build locally (test before deploying)
npm run build

# Check deployment status
gh run list --limit 5
```

## Troubleshooting

If a deployment fails:
1. Check the GitHub Actions logs for specific errors
2. Test locally with `npm run build` first
3. Try deploying as "Preview" first to test
4. Contact support if issues persist

---

**Remember**: Your local development server (`npm run dev`) is always available for testing changes before deploying to production! 🚀
