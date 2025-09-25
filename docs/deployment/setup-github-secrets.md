# GitHub Secrets Setup Guide

## ⚠️ **SECURITY NOTICE**
**NEVER** commit API tokens or secrets to your repository. Always use GitHub Secrets for sensitive information.

## Required GitHub Secrets

Your GitHub Actions workflow requires these secrets to be set in your repository:

### 1. VERCEL_TOKEN
- **Description**: Vercel API token for deployment
- **How to get**: 
  1. Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
  2. Click "Create Token"
  3. Give it a name (e.g., "GitHub Actions Deploy")
  4. Copy the generated token

### 2. VERCEL_PROJECT_ID
- **Description**: Your Vercel project ID
- **How to get**:
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Select your project
  3. Go to Settings → General
  4. Copy the "Project ID"

### 3. VERCEL_ORG_ID
- **Description**: Your Vercel organization/team ID
- **How to get**:
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Go to Settings → General
  3. Copy the "Team ID"

## How to Set Secrets

### Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not already installed
brew install gh

# Login to GitHub
gh auth login

# Set secrets (replace with your actual values)
gh secret set VERCEL_TOKEN --repo manizvlabs/xerogapai-web
gh secret set VERCEL_PROJECT_ID --repo manizvlabs/xerogapai-web
gh secret set VERCEL_ORG_ID --repo manizvlabs/xerogapai-web
```

### Using GitHub Web Interface
1. Go to your repository: `https://github.com/manizvlabs/xerogapai-web`
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the exact names above

## Verify Setup
After setting all secrets, you can test the deployment by:
1. Going to the **Actions** tab in your repository
2. Clicking **"Vercel Deploy"** workflow
3. Clicking **"Run workflow"** button
4. Selecting **"Preview"** environment for testing

## Security Best Practices
- ✅ Use GitHub Secrets for all sensitive data
- ✅ Never commit tokens or API keys
- ✅ Rotate tokens regularly
- ✅ Use least-privilege access
- ❌ Never hardcode secrets in scripts
- ❌ Never commit .env files with secrets
