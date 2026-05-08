// Test script for attachment upload functionality
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

console.log('🧪 Testing attachment upload to Zoho CRM...');

// Create test data
const testFormData = new FormData();
testFormData.append('firstName', 'Test');
testFormData.append('lastName', 'User');
testFormData.append('email', 'test@example.com');
testFormData.append('company', 'Test Company');
testFormData.append('service', 'ai-review-generation');
testFormData.append('description', 'Test message for attachment upload');

// Create a simple test file
const testContent = 'This is a test file for attachment upload.';
const testBuffer = Buffer.from(testContent);

// Test different ways to append the file
// Method 1: Direct buffer with filename
testFormData.append('attachments', testBuffer, {
  filename: 'test-attachment.txt',
  contentType: 'text/plain'
});

console.log('📤 Sending test form data with attachment...');

try {
  const response = await fetch('http://localhost:3000/api/submit-to-zoho', {
    method: 'POST',
    body: testFormData,
  });

  const result = await response.json();

  console.log('📡 Response status:', response.status);
  console.log('📋 Response data:', JSON.stringify(result, null, 2));

  if (response.ok && result.success) {
    console.log('✅ Test passed! Lead created successfully');

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
  } else {
    console.log('❌ Test failed!');
    if (result.error) {
      console.log('Error:', result.error);
    }
  }
} catch (error) {
  console.error('❌ Test error:', error.message);
}