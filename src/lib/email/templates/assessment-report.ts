import { registerTemplate, EmailTemplate, AssessmentReportData } from './index';

// Assessment Report Email Template
const assessmentReportTemplate: EmailTemplate = {
  id: 'assessment-report',
  name: 'AI Assessment Report',
  subject: 'Your AI Readiness Report - {{readinessPercentage}}% Ready',
  variables: [
    'readinessPercentage',
    'readinessLevel',
    'readinessColor',
    'score',
    'maxScore',
    'insightsDisplay',
    'insightsText',
    'consultationUrl',
    'demoUrl'
  ],
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your AI Readiness Report</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
          <div style="width: 120px; height: 40px; margin: 0 auto 20px auto; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            🚀 XeroGap AI
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your AI Readiness Report</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Comprehensive Analysis & Recommendations</p>
        </div>

        <!-- Readiness Score -->
        <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          <div style="display: inline-block; padding: 20px; border-radius: 50%; background-color: {{readinessColor}}; color: white; margin-bottom: 20px;">
            <span style="font-size: 48px; font-weight: bold;">{{readinessPercentage}}%</span>
          </div>
          <h2 style="margin: 0; color: #1e293b; font-size: 24px;">AI Readiness Level: {{readinessLevel}}</h2>
          <p style="margin: 10px 0 0 0; color: #64748b;">Score: {{score}} out of {{maxScore}} points</p>
        </div>

        <!-- Key Insights -->
        <div style="padding: 30px;">
          <h3 style="color: #1e293b; margin-bottom: 20px;">Key Insights from Your Assessment</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            {{insightsDisplay}}
          </div>
        </div>

        <!-- Recommendations -->
        <div style="padding: 0 30px 30px;">
          <h3 style="color: #1e293b; margin-bottom: 20px;">Recommended Next Steps</h3>
          <div style="space-y: 4">
            <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #3b82f6; margin-bottom: 15px;">
              <div style="margin-right: 15px; color: #3b82f6; font-weight: bold;">1.</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e293b;">Book a Free Consultation</h4>
                <p style="margin: 0; color: #64748b;">Discuss your results with our AI experts and get a customized implementation plan.</p>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; margin-bottom: 15px;">
              <div style="margin-right: 15px; color: #f59e0b; font-weight: bold;">2.</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e293b;">Explore Our Solutions</h4>
                <p style="margin: 0; color: #64748b;">Check out our AI-powered solutions that match your business needs.</p>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; padding: 15px; background-color: #f0fdf4; border-left: 4px solid #10b981; margin-bottom: 15px;">
              <div style="margin-right: 15px; color: #10b981; font-weight: bold;">3.</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e293b;">Start Small</h4>
                <p style="margin: 0; color: #64748b;">Begin with one process automation to see immediate results.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div style="padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <a href="{{consultationUrl}}"
             style="display: inline-block; background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin-right: 15px;">
            Book Free Consultation
          </a>
          <a href="{{demoUrl}}"
             style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
            Schedule Demo
          </a>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <div style="width: 80px; height: 30px; margin: 0 auto 15px auto; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; color: white; box-shadow: 0 1px 4px rgba(0,0,0,0.1);">
            🚀 XeroGap AI
          </div>
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            Questions about your report? Reply to this email or contact us at
            <a href="mailto:support@xerogap.com" style="color: #667eea;">support@xerogap.com</a>
          </p>
          <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px;">
            © 2025 XeroGap AI. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `,
  text: `
Your AI Readiness Report - {{readinessPercentage}}% Ready

AI Readiness Level: {{readinessLevel}}
Score: {{score}} out of {{maxScore}} points

Key Insights:
{{insightsText}}

Recommended Next Steps:
1. Book a Free Consultation - Discuss your results with our AI experts
2. Explore Our Solutions - Check out our AI-powered solutions
3. Start Small - Begin with one process automation

Visit {{consultationUrl}} to book your consultation.

Questions? Contact us at support@xerogap.com
  `
};

// Register the template
registerTemplate(assessmentReportTemplate);

export { assessmentReportTemplate };
