#!/bin/bash

# GitHub Actions Secrets Setup Script
# This script helps you set up the required secrets for GitHub Actions

echo "🔧 Setting up GitHub Actions secrets for XeroGap AI website deployment..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh"
    echo "   or visit: https://cli.github.com/"
    exit 1
fi

# Check if user is logged in
if ! gh auth status &> /dev/null; then
    echo "❌ Please log in to GitHub CLI first:"
    echo "   gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"

# Get repository name
REPO_NAME="manizvlabs/xerogapai-web"
echo "📦 Repository: $REPO_NAME"

# Function to set secret
set_secret() {
    local secret_name=$1
    local secret_value=$2
    local description=$3
    
    echo "🔐 Setting $secret_name..."
    echo "$secret_value" | gh secret set "$secret_name" --repo "$REPO_NAME"
    echo "✅ $secret_name set successfully - $description"
}

# Vercel Token (you need to provide this)
echo "🔐 Please enter your Vercel API token:"
read -s VERCEL_TOKEN
set_secret "VERCEL_TOKEN" "$VERCEL_TOKEN" "Vercel API token for deployment"

echo ""
echo "📋 Next steps:"
echo "1. Get your Vercel Project ID:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Select your project"
echo "   - Go to Settings → General"
echo "   - Copy the 'Project ID'"
echo ""
echo "2. Get your Vercel Organization ID:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Go to Settings → General"
echo "   - Copy the 'Team ID'"
echo ""
echo "3. Set the remaining secrets:"
echo "   gh secret set VERCEL_PROJECT_ID --repo $REPO_NAME"
echo "   gh secret set VERCEL_ORG_ID --repo $REPO_NAME"
echo ""
echo "4. Test the deployment by pushing to main branch:"
echo "   git add ."
echo "   git commit -m 'Add CI/CD pipeline'"
echo "   git push origin main"
echo ""
echo "🎉 Setup complete! Your GitHub Actions workflow will now automatically deploy to Vercel."
