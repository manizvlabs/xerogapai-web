#!/usr/bin/env node

import { config } from 'dotenv';
import { microsoft365EmailService } from '../src/lib/email/microsoft365-email.ts';

// Load environment variables
config({ path: '../.env.local' });

async function testEmailSending() {
  console.log('🧪 Testing Microsoft Office 365 Email Integration\n');

  // Test connection first
  console.log('🔍 Testing SMTP connection...');
  const connectionTest = await microsoft365EmailService.verifyConnection();

  if (!connectionTest.success) {
    console.error('❌ SMTP Connection failed:', connectionTest.error);
    console.log('\n📋 Please check your environment variables:');
    console.log('- SMTP_HOST: Should be "smtp.office365.com"');
    console.log('- SMTP_PORT: Should be "587"');
    console.log('- SMTP_USER: Your Office 365 email address');
    console.log('- SMTP_PASS: Your app password (not regular password)');
    console.log('\n🔑 To create an app password in Office 365:');
    console.log('1. Go to https://account.microsoft.com/security');
    console.log('2. Enable 2FA if not already enabled');
    console.log('3. Create an "App password" for this application');
    console.log('4. Use the generated app password as SMTP_PASS');
    return;
  }

  console.log('✅ SMTP Connection successful!\n');

  // Test email sending with sample assessment data
  console.log('📧 Testing email sending...');

  const sampleAssessmentData = {
    score: 75,
    totalScore: 100,
    maxScore: 100,
    answers: { 'q1': 'option_a', 'q2': 'option_b' },
    insights: [
      'Your business shows strong potential for AI automation',
      'Consider starting with customer service automation',
      'Focus on process optimization in the next quarter'
    ]
  };

  const result = await microsoft365EmailService.generateAssessmentReportEmail(sampleAssessmentData, process.env.SMTP_USER || 'test@example.com');

  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', result.messageId);
  } else {
    console.error('❌ Email sending failed:', result.error);
  }

  console.log('\n🎉 Email integration test completed!');
}

// Check if environment variables are set
function checkEnvironmentVariables() {
  // Check for Graph API credentials first (preferred)
  const graphRequired = ['MS_GRAPH_CLIENT_ID', 'MS_GRAPH_CLIENT_SECRET', 'MS_GRAPH_TENANT_ID'];
  const graphMissing = graphRequired.filter(key => !process.env[key]);

  if (graphMissing.length === 0) {
    console.log('✅ Microsoft Graph API credentials found - using OAuth 2.0');
    return true;
  }

  // Fall back to SMTP credentials
  const smtpRequired = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const smtpMissing = smtpRequired.filter(key => !process.env[key]);

  if (smtpMissing.length === 0) {
    console.log('✅ SMTP credentials found - using legacy SMTP');
    console.log('⚠️  Note: SMTP may not work with modern Office 365 accounts');
    return true;
  }

  // No credentials found
  console.log('❌ No email credentials configured!');
  console.log('');
  console.log('🔧 Choose one of these setup methods:');
  console.log('');
  console.log('📋 Option 1: Microsoft Graph API (RECOMMENDED)');
  console.log('   Follow: docs/security/microsoft-graph-setup.md');
  console.log('   Required variables:');
  console.log('   - MS_GRAPH_CLIENT_ID');
  console.log('   - MS_GRAPH_CLIENT_SECRET');
  console.log('   - MS_GRAPH_TENANT_ID');
  console.log('');
  console.log('📬 Option 2: SMTP (Legacy - may not work)');
  console.log('   Required variables:');
  console.log('   - SMTP_HOST=smtp.office365.com');
  console.log('   - SMTP_PORT=587');
  console.log('   - SMTP_USER=your-email@yourdomain.com');
  console.log('   - SMTP_PASS=your-password-or-app-password');
  console.log('');

  return false;
}

// Run the test
if (checkEnvironmentVariables()) {
  testEmailSending().catch(error => {
    console.error('💥 Test failed with error:', error.message);
    process.exit(1);
  });
} else {
  process.exit(1);
}
