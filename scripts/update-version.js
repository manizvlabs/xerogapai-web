#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get current date in YYYYMMDD format
const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const version = `1.0.0-${date}`;

// Path to .env.local
const envPath = path.join(__dirname, '..', '.env.local');

try {
  // Read the .env.local file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update the NEXT_PUBLIC_APP_VERSION line
  envContent = envContent.replace(
    /NEXT_PUBLIC_APP_VERSION=".*"/,
    `NEXT_PUBLIC_APP_VERSION="${version}"`
  );
  
  // Write the updated content back
  fs.writeFileSync(envPath, envContent);
  
  console.log(`✅ Version updated to: ${version}`);
} catch (error) {
  console.error('❌ Error updating version:', error.message);
  process.exit(1);
}
