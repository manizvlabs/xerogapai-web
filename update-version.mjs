#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current date in YYYYMMDD format
const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const version = `1.0.5-${date}`;

// Path to .env.local
const envPath = path.join(__dirname, '.env.local');

try {
  // Check if .env.local exists
  if (fs.existsSync(envPath)) {
    // Read the .env.local file
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update the NEXT_PUBLIC_APP_VERSION line
    envContent = envContent.replace(
      /NEXT_PUBLIC_APP_VERSION=.*/,
      `NEXT_PUBLIC_APP_VERSION="${version}"`
    );
    
    // Write the updated content back
    fs.writeFileSync(envPath, envContent);
    
    console.log(`✅ Version updated in .env.local to: ${version}`);
  } else {
    // .env.local doesn't exist, create it with the version
    const envContent = `# VyaptIX AI Website Environment Variables
# Auto-generated version file

# Site Configuration
NEXT_PUBLIC_SITE_NAME="VyaptIX AI"
NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
NEXT_PUBLIC_SITE_DOMAIN="vyaptix.ai"
NEXT_PUBLIC_LOCATION=""
NEXT_PUBLIC_PHONE="+917702661991"
NEXT_PUBLIC_EMAIL="support@vyaptix.com"
NEXT_PUBLIC_APP_VERSION="${version}"
NEXT_PUBLIC_COPYRIGHT_YEAR="2025"

# Security Configuration (CHANGE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-12345"
JWT_EXPIRES_IN="24h"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_EMAIL="support@vyaptix.com"

# Vercel Configuration
VERCEL_TOKEN="your-vercel-token"
VERCEL_ORG_ID="your-org-id"
VERCEL_PROJECT_ID="your-project-id"

# GitHub Configuration
GITHUB_CLI_OAUTH_TOKEN="your-github-cli-token"
GITHUB_PAT="your-github-pat"

# Database Configuration
DATABASE_URL="your-database-url"

# Email Configuration
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"

# Analytics Configuration
GOOGLE_ANALYTICS_ID="your-ga-id"
GOOGLE_TAG_MANAGER_ID="your-gtm-id"

# Social Media Configuration
FACEBOOK_APP_ID="your-facebook-app-id"
TWITTER_HANDLE="@VyaptIXai"
LINKEDIN_URL="https://linkedin.com/company/VyaptIXai"
INSTAGRAM_URL="https://instagram.com/VyaptIXai"

# API Configuration
API_BASE_URL="https://api.VyaptIX.ai"
API_VERSION="v1"

# Feature Flags
ENABLE_ANALYTICS="true"
ENABLE_CHATBOT="true"
ENABLE_BLOG="true"
ENABLE_PORTFOLIO="true"
ENABLE_CONTACT_FORM="true"
ENABLE_ADMIN_PANEL="true"

# Performance Configuration
ENABLE_IMAGE_OPTIMIZATION="true"
ENABLE_COMPRESSION="true"
ENABLE_CACHING="true"

# Development Configuration
NODE_ENV="production"
NEXT_PUBLIC_VERCEL_ENV="production"
`;

    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Created .env.local with version: ${version}`);
  }
  
  // Also update package.json version if needed
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.version !== '1.0.5') {
    packageJson.version = '1.0.5';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`✅ Updated package.json version to: 1.0.5`);
  }
  
  console.log(`✅ Version update completed successfully: ${version}`);
} catch (error) {
  console.error('❌ Error updating version:', error.message);
  // Don't exit with error in CI/CD environments, just log the error
  if (process.env.CI || process.env.VERCEL) {
    console.log('⚠️  Running in CI/CD environment, continuing build...');
    console.log(`ℹ️  Version will be set via environment variables: 1.0.5-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`);
  } else {
    process.exit(1);
  }
}
