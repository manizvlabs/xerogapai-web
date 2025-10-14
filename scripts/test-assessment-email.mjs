#!/usr/bin/env node

async function testAssessmentEmail() {
  console.log('🧪 Testing Assessment Email Functionality\n');

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
  console.log('📊 Assessment data:', JSON.stringify(assessmentData, null, 2));

  try {
    const response = await fetch('http://localhost:4010/api/assessment/send-report', {
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

    if (response.ok && result.success) {
      console.log('✅ Assessment report sent successfully!');
      console.log('📨 Message ID:', result.messageId);
    } else {
      console.error('❌ Failed to send assessment report:', result.error);
    }
  } catch (error) {
    console.error('💥 Error testing assessment email:', error.message);
  }

  console.log('\n🎉 Assessment email test completed!');
}

// Run the test
testAssessmentEmail().catch(error => {
  console.error('💥 Test failed with error:', error.message);
  process.exit(1);
});
