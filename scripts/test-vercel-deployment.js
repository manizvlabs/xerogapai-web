// Test script for Vercel deployment file upload functionality
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

// Replace this with your actual Vercel deployment URL
const VERCEL_URL = process.env.VERCEL_DEPLOYMENT_URL || 'https://vyaptix-website.vercel.app';

console.log('🧪 Testing Vercel deployment file upload...');
console.log('📍 Target URL:', VERCEL_URL);

if (!VERCEL_URL || VERCEL_URL.includes('vyaptix-website.vercel.app')) {
    console.log('⚠️  Please set VERCEL_DEPLOYMENT_URL environment variable with your actual Vercel URL');
    console.log('💡 Example: VERCEL_DEPLOYMENT_URL=https://your-project.vercel.app');
    process.exit(1);
}

// Create test data
const testFormData = new FormData();
testFormData.append('firstName', 'Vercel');
testFormData.append('lastName', 'Test');
testFormData.append('email', 'vercel-test@example.com');
testFormData.append('company', 'Vercel Test Company');
testFormData.append('service', 'ai-review-generation');
testFormData.append('description', 'Testing file upload on Vercel deployment');

// Create a test file
const testContent = `This is a test file uploaded from Vercel deployment test.
Timestamp: ${new Date().toISOString()}
Environment: Vercel Serverless Function
Test ID: ${Math.random().toString(36).substr(2, 9)}`;

const testBuffer = Buffer.from(testContent);
testFormData.append('attachments', testBuffer, {
    filename: 'vercel-test-attachment.txt',
    contentType: 'text/plain'
});

console.log('📤 Sending test form data with attachment to Vercel...');

try {
    const response = await fetch(`${VERCEL_URL}/api/submit-to-zoho`, {
        method: 'POST',
        body: testFormData,
        // Don't set Content-Type - let it be set automatically for FormData
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📋 Raw response:', responseText);

    let result;
    try {
        result = JSON.parse(responseText);
    } catch (parseError) {
        console.log('❌ Response is not valid JSON');
    }

    if (response.ok && result.success) {
        console.log('✅ Vercel deployment test passed! Lead created successfully');

        if (result.attachments && result.attachments.length > 0) {
            console.log('📎 Attachment upload results:');
            result.attachments.forEach((attachment, index) => {
                console.log(`  ${index + 1}. ${attachment.fileName}: ${attachment.status}`);
                if (attachment.error) {
                    console.log(`     Error: ${attachment.error}`);
                }
            });
        } else {
            console.log('⚠️  No attachments processed');
        }

        if (result.leadId) {
            console.log('🎯 Lead ID:', result.leadId);
        }
    } else {
        console.log('❌ Vercel deployment test failed!');
        if (result.error) {
            console.log('Error:', result.error);
        }
    }
} catch (error) {
    console.error('❌ Network or deployment error:', error.message);

    if (error.code === 'ENOTFOUND') {
        console.log('💡 The Vercel deployment URL might be incorrect or the deployment might be down');
    }
}