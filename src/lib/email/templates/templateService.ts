import { getTemplate, renderTemplate, AssessmentReportData, emailTemplates } from './index';
import { EmailAttachment } from '../microsoft365-email';

// Dynamic import for puppeteer to avoid build issues
let puppeteer: any = null;
try {
  // Only load puppeteer if available
  puppeteer = require('puppeteer');
} catch (error) {
  console.log('Puppeteer not available, PDF generation will be skipped');
}

// Template Service for handling email templates and PDF generation
export class TemplateService {
  private static instance: TemplateService | null = null;
  private initialized = false;

  private constructor() {
    // Will be initialized asynchronously
  }

  static async getInstance(): Promise<TemplateService> {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService();
      await TemplateService.instance.initializeTemplates();
    }
    return TemplateService.instance;
  }

  private async initializeTemplates(): Promise<void> {
    // Import templates to register them
    await import('./assessment-report');
  }

  async renderAssessmentReportEmail(assessmentData: any): Promise<{ subject: string; html: string; text?: string; attachments?: EmailAttachment[] }> {
    const template = getTemplate('assessment-report');
    if (!template) {
      throw new Error('Assessment report template not found');
    }

    // Calculate readiness data
    const { score, totalScore, maxScore, answers, insights } = assessmentData;
    const readinessPercentage = Math.round((score / maxScore) * 100);

    let readinessLevel = 'Beginner';
    let readinessColor = '#ef4444'; // red

    if (readinessPercentage >= 80) {
      readinessLevel = 'Advanced';
      readinessColor = '#10b981'; // green
    } else if (readinessPercentage >= 60) {
      readinessLevel = 'Intermediate';
      readinessColor = '#f59e0b'; // yellow
    }

    // Generate insights display for HTML
    const insightsDisplay = insights?.map((insight: string) => `
      <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
        <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #667eea; margin-top: 6px; margin-right: 12px; flex-shrink: 0;"></div>
        <p style="margin: 0; color: #374151; line-height: 1.5;">${insight}</p>
      </div>
    `).join('') || '<p style="margin: 0; color: #374151;">Your assessment has been analyzed and personalized recommendations are being prepared.</p>';

    // Generate insights text for plain text version
    const insightsText = insights?.map((insight: string) => `- ${insight}`).join('\n') || 'Your assessment has been analyzed and personalized recommendations are being prepared.';

    const templateData = {
      score,
      totalScore,
      maxScore,
      answers,
      insights,
      readinessPercentage,
      readinessLevel,
      readinessColor,
      insightsDisplay,
      insightsText,
      consultationUrl: 'https://xerogapai-web.vercel.app/consultation',
      demoUrl: 'https://xerogapai-web.vercel.app/demo'
    };

    const rendered = renderTemplate(template, templateData);

    // Generate PDF attachment
    const attachments = await this.generateAssessmentReportPDF(templateData);

    return {
      ...rendered,
      attachments
    };
  }

  private async generateAssessmentReportPDF(data: AssessmentReportData): Promise<EmailAttachment[] | undefined> {
    try {
      // Check if puppeteer is available
      if (!puppeteer) {
        console.log('Puppeteer not available, skipping PDF generation');
        return undefined;
      }

      console.log('Generating PDF report...');

      // Generate PDF HTML (can be different from email HTML)
      const pdfHtml = this.generatePDFHTML(data);

      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-software-rasterizer',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      });

      const page = await browser.newPage();

      // Set viewport for better PDF generation
      await page.setViewport({ width: 1200, height: 800 });

      await page.setContent(pdfHtml, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        },
        printBackground: true,
        preferCSSPageSize: false,
        timeout: 30000
      });

      await browser.close();

      const attachments: EmailAttachment[] = [{
        filename: `AI_Readiness_Report_${data.readinessPercentage}%.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }];

      console.log('PDF report generated successfully');
      return attachments;

    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Return undefined to continue without PDF attachment
      return undefined;
    }
  }

  private generatePDFHTML(data: AssessmentReportData): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>AI Readiness Assessment Report</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #1e293b;
            line-height: 1.6;
            font-size: 12px;
          }

          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 12px;
            margin-bottom: 30px;
          }

          .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 700;
          }

          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
          }

          .score-section {
            text-align: center;
            padding: 40px 0;
            border-bottom: 2px solid #e2e8f0;
            margin-bottom: 30px;
            page-break-inside: avoid;
          }

          .score-circle {
            display: inline-block;
            padding: 30px;
            border-radius: 50%;
            background-color: ${data.readinessColor};
            color: white;
            margin-bottom: 20px;
          }

          .score-circle span {
            font-size: 48px;
            font-weight: bold;
          }

          .score-section h2 {
            margin: 0 0 10px 0;
            font-size: 24px;
          }

          .score-section p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
          }

          .insights-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }

          .insights-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
          }

          .insights-list {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
          }

          .insight-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
          }

          .insight-item:last-child {
            margin-bottom: 0;
          }

          .insight-bullet {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #667eea;
            margin-top: 6px;
            margin-right: 12px;
            flex-shrink: 0;
          }

          .recommendations-section {
            page-break-inside: avoid;
          }

          .recommendations-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 8px;
          }

          .recommendation-item {
            display: flex;
            align-items: flex-start;
            padding: 15px;
            background-color: #f0f9ff;
            border-left: 4px solid #3b82f6;
            margin-bottom: 15px;
            border-radius: 8px;
          }

          .recommendation-item:last-child {
            margin-bottom: 0;
          }

          .recommendation-number {
            margin-right: 15px;
            color: #3b82f6;
            font-weight: bold;
            font-size: 16px;
          }

          .recommendation-content h4 {
            margin: 0 0 6px 0;
            color: #1e293b;
            font-size: 16px;
          }

          .recommendation-content p {
            margin: 0;
            color: #64748b;
            font-size: 12px;
          }

          .footer {
            text-align: center;
            padding: 30px 0;
            border-top: 2px solid #e2e8f0;
            margin-top: 40px;
            color: #64748b;
            font-size: 12px;
          }

          .footer p {
            margin: 3px 0;
          }

          .page-break {
            page-break-before: always;
          }

          /* Print-specific styles */
          @media print {
            body {
              font-size: 11px;
            }

            .header {
              background: #667eea !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .score-circle {
              background-color: ${data.readinessColor} !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .insight-bullet {
              background-color: #667eea !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .recommendation-item {
              background-color: #f0f9ff !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AI Readiness Assessment Report</h1>
          <p>Comprehensive Analysis & Recommendations</p>
        </div>

        <div class="score-section">
          <div class="score-circle">
            <span>${data.readinessPercentage}%</span>
          </div>
          <h2>AI Readiness Level: ${data.readinessLevel}</h2>
          <p>Score: ${data.score} out of ${data.maxScore} points</p>
        </div>

        <div class="insights-section">
          <h3>Key Insights from Your Assessment</h3>
          <div class="insights-list">
            ${data.insights?.map((insight: string) => `
              <div class="insight-item">
                <div class="insight-bullet"></div>
                <p>${insight}</p>
              </div>
            `).join('') || '<p>Your assessment has been analyzed and personalized recommendations are being prepared.</p>'}
          </div>
        </div>

        <div class="recommendations-section">
          <h3>Recommended Next Steps</h3>
          <div class="recommendation-item">
            <div class="recommendation-number">1.</div>
            <div class="recommendation-content">
              <h4>Book a Free Consultation</h4>
              <p>Discuss your results with our AI experts and get a customized implementation plan tailored to your business needs.</p>
            </div>
          </div>

          <div class="recommendation-item">
            <div class="recommendation-number">2.</div>
            <div class="recommendation-content">
              <h4>Explore Our Solutions</h4>
              <p>Discover our comprehensive AI automation solutions designed to transform your business operations.</p>
            </div>
          </div>

          <div class="recommendation-item">
            <div class="recommendation-number">3.</div>
            <div class="recommendation-content">
              <h4>Start Small</h4>
              <p>Begin with one process automation to see immediate results and build momentum for larger transformations.</p>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>XeroGap AI</strong> - AI-Powered Digital Transformation</p>
          <p>Questions about your report? Contact us at support@xerogap.com</p>
          <p>© 2025 XeroGap AI. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }
}

// Export a promise that resolves to the template service instance
export const templateService = TemplateService.getInstance();
