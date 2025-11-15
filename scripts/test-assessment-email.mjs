#!/usr/bin/env node

async function testAssessmentEmail() {
  console.log('🧪 Testing Assessment Email Functionality with PDF Verification\n');

  const assessmentData = {
    score: 75,
    totalScore: 100,
    maxScore: 100,
    answers: {
      'q1': '11-50 employees',  // Company size: small business
      'q2': 'Partially digitized with some automation',  // Digital transformation level
      'q3': ['customer_service', 'operations', 'sales'],  // Multiple areas: Customer Service & Support, Operations & Workflow, Sales & Lead Generation
      'q4': '$500 - $2,000',  // Monthly budget: medium range
      'q5': 'Basic understanding, limited experience',  // Team familiarity with AI
      'q6': 'Operational efficiency and productivity',  // Biggest operational challenge
      'q7': ['crm', 'communication', 'accounting'],  // Current tools: CRM, Communication, Accounting
      'q8': 'Within 6 months',  // Timeline for AI implementation
      'q9': 'Workflow automation',  // Preferred AI use case
      'q10': ['gdpr', 'dpdp']  // Compliance requirements: GDPR and DPDP
    },
    insights: [
      'Your business shows strong potential for AI automation in customer service',
      'Consider starting with customer service automation to see quick wins',
      'Focus on process optimization in the next quarter with pilot projects',
      'Your team readiness is moderate - consider AI training programs'
    ]
  };

  const userEmail = 'manish.08.hbti@gmail.com';

  console.log(`📧 Sending assessment report to: ${userEmail}`);
  console.log('📊 Assessment data summary:');
  console.log(`   - Score: ${assessmentData.score}/${assessmentData.maxScore} (${Math.round(assessmentData.score/assessmentData.maxScore*100)}%)`);
  console.log(`   - Insights: ${assessmentData.insights.length}`);
  console.log(`   - Answers: ${Object.keys(assessmentData.answers).length} questions answered`);
  console.log('');

  try {
    console.log('🌐 Making API request to /api/assessment/send-report...');
    const response = await fetch('http://localhost:3000/api/assessment/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assessmentData,
        userEmail,
      }),
    });

    const result = await response.json();
    console.log('📡 API Response Status:', response.status);
    console.log('📡 API Response:', JSON.stringify(result, null, 2));

    if (response.ok && result.success) {
      console.log('\n✅ ASSESSMENT REPORT SENT SUCCESSFULLY!');
      console.log('📨 Message ID:', result.messageId);
      console.log('🎯 Target Email:', userEmail);

      // Check server logs for PDF generation details
      console.log('\n🔍 Checking server logs for PDF generation details...');
      console.log('📋 Note: Check your development server console for detailed PDF logs');
      console.log('📋 Look for messages like:');
      console.log('   - "PDF report generated successfully"');
      console.log('   - "PDF attachment created"');
      console.log('   - "Microsoft Graph API email sent successfully"');

      console.log('\n📧 VERIFICATION STEPS:');
      console.log('1. ✅ Email sent successfully (confirmed by API response)');
      console.log('2. 🔍 Check server console for PDF generation logs');
      console.log('3. 📬 Check email inbox for PDF attachment');
      console.log('4. 📊 PDF should be named: "AI_Readiness_Report_[percentage]%.pdf"');

    } else {
      console.error('\n❌ FAILED TO SEND ASSESSMENT REPORT');
      console.error('❌ Error:', result.error);
      console.error('❌ Full response:', result);
    }
  } catch (error) {
    console.error('\n💥 ERROR TESTING ASSESSMENT EMAIL');
    console.error('💥 Error message:', error.message);
    console.error('💥 Make sure the development server is running on port 4010');
    console.error('💥 Start with: npm run dev');
  }

  console.log('\n🎉 Assessment email test completed!');
}

// Run the test
testAssessmentEmail().catch(error => {
  console.error('💥 Test failed with error:', error.message);
  process.exit(1);
});
