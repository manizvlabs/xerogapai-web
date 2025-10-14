import { getTemplate, renderTemplate, AssessmentReportData, emailTemplates } from './index';
import { EmailAttachment } from '../microsoft365-email';

// In-memory cache for assessment data
interface CachedAssessmentData {
  email: string;
  data: any;
  timestamp: number;
}

class AssessmentCache {
  private static instance: AssessmentCache;
  private cache: Map<string, CachedAssessmentData> = new Map();
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  static getInstance(): AssessmentCache {
    if (!AssessmentCache.instance) {
      AssessmentCache.instance = new AssessmentCache();
    }
    return AssessmentCache.instance;
  }

  store(email: string, data: any): void {
    this.cache.set(email, {
      email,
      data,
      timestamp: Date.now()
    });
    console.log(`Assessment data cached for ${email}`);
  }

  get(email: string): any | null {
    const cached = this.cache.get(email);
    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(email);
      return null;
    }

    return cached.data;
  }

  clear(email: string): void {
    this.cache.delete(email);
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [email, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.TTL) {
        this.cache.delete(email);
      }
    }
  }
}

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
  private assessmentCache = AssessmentCache.getInstance();

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

  storeAssessmentData(email: string, data: any): void {
    this.assessmentCache.store(email, data);
  }

  async renderAssessmentReportEmail(assessmentData: any, email?: string): Promise<{ subject: string; html: string; text?: string; attachments?: EmailAttachment[] }> {
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

    // Generate PDF attachment (will use cached data if available)
    const attachments = await this.generateAssessmentReportPDF(email || '');

    return {
      ...rendered,
      attachments
    };
  }

  async generateAssessmentReportPDF(email: string): Promise<EmailAttachment[] | undefined> {
    try {
      // Check if puppeteer is available
      if (!puppeteer) {
        console.log('Puppeteer not available, skipping PDF generation');
        return undefined;
      }

      // Get cached assessment data
      const cachedData = this.assessmentCache.get(email);
      if (!cachedData) {
        console.log(`No cached assessment data found for ${email}`);
        return undefined;
      }

      console.log(`Generating PDF report for ${email}...`);

      // Generate PDF HTML using cached data
      const pdfHtml = this.generateDetailedPDFHTML(cachedData);

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
        filename: `AI_Readiness_Report_${cachedData.readinessPercentage}%.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }];

      console.log(`PDF report generated successfully for ${email}`);
      return attachments;

    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Return undefined to continue without PDF attachment
      return undefined;
    }
  }

  private generateDetailedPDFHTML(data: any): string {
    const { score, maxScore, answers, insights, readinessPercentage, readinessLevel, readinessColor } = data;

    // Calculate category scores if available
    const categoryScores = this.calculateCategoryScores(answers);

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
            page-break-inside: avoid;
            position: relative;
          }

          .header .logo {
            width: 150px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
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
            border-bottom: 3px solid #e2e8f0;
            margin-bottom: 30px;
            page-break-inside: avoid;
          }

          .score-circle {
            display: inline-block;
            padding: 40px;
            border-radius: 50%;
            background-color: ${readinessColor};
            color: white;
            margin-bottom: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }

          .score-circle span {
            font-size: 56px;
            font-weight: bold;
            display: block;
          }

          .score-circle .percentage {
            font-size: 18px;
            margin-top: 5px;
          }

          .score-section h2 {
            margin: 0 0 10px 0;
            font-size: 28px;
            color: #1e293b;
          }

          .score-section p {
            margin: 0;
            color: #64748b;
            font-size: 16px;
          }

          .analytics-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
            page-break-inside: avoid;
          }

          .analytics-card {
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
          }

          .analytics-card h3 {
            margin: 0 0 15px 0;
            color: #1e293b;
            font-size: 18px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
          }

          .category-scores {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .category-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }

          .category-name {
            font-weight: 600;
            color: #374151;
          }

          .category-score {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
          }

          .insights-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }

          .insights-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-size: 22px;
            border-bottom: 3px solid #10b981;
            padding-bottom: 8px;
          }

          .insights-list {
            background-color: #f0fdf4;
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #bbf7d0;
          }

          .insight-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #10b981;
          }

          .insight-item:last-child {
            margin-bottom: 0;
          }

          .insight-bullet {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #10b981;
            margin-top: 6px;
            margin-right: 15px;
            flex-shrink: 0;
          }

          .recommendations-section {
            page-break-inside: avoid;
          }

          .recommendations-section h3 {
            color: #1e293b;
            margin-bottom: 25px;
            font-size: 22px;
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 8px;
          }

          .recommendation-item {
            display: flex;
            align-items: flex-start;
            padding: 20px;
            background-color: #fef3c7;
            border-left: 5px solid #f59e0b;
            margin-bottom: 20px;
            border-radius: 0 8px 8px 0;
          }

          .recommendation-item:last-child {
            margin-bottom: 0;
          }

          .recommendation-number {
            margin-right: 20px;
            color: #f59e0b;
            font-weight: bold;
            font-size: 20px;
          }

          .recommendation-content h4 {
            margin: 0 0 8px 0;
            color: #1e293b;
            font-size: 18px;
          }

          .recommendation-content p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
            line-height: 1.5;
          }

          .answers-section {
            margin-top: 40px;
            page-break-inside: avoid;
          }

          .answers-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 2px solid #8b5cf6;
            padding-bottom: 8px;
          }

          .answers-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .answer-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .answer-question {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }

          .answer-value {
            color: #64748b;
            font-size: 14px;
          }

          .footer {
            text-align: center;
            padding: 40px 0;
            border-top: 3px solid #e2e8f0;
            margin-top: 50px;
            color: #64748b;
            font-size: 12px;
            background: #f8fafc;
            border-radius: 8px;
          }

          .footer img {
            display: block;
            margin: 0 auto 15px auto;
          }

          .footer p {
            margin: 5px 0;
          }

          .footer .company-name {
            font-weight: bold;
            color: #1e293b;
            font-size: 14px;
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

            .header div[style*="background: linear-gradient"] {
              background: linear-gradient(45deg, #667eea, #764ba2) !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .footer div[style*="background: linear-gradient"] {
              background: linear-gradient(45deg, #667eea, #764ba2) !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .score-circle {
              background-color: ${readinessColor} !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .insight-bullet {
              background-color: #10b981 !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            .recommendation-item {
              background-color: #fef3c7 !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }

          .chart-container {
            width: 100%;
            height: 200px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0;
            border: 2px solid #e5e7eb;
          }

          .score-bar {
            height: 20px;
            background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
            border-radius: 10px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://xerogapai-web.vercel.app/logo.png" alt="XeroGap AI Logo" style="width: 150px; height: auto; margin: 0 auto 20px auto; display: block;">
          <h1>AI Readiness Assessment Report</h1>
          <p>Comprehensive Analysis & Strategic Recommendations</p>
        </div>

        <div class="score-section">
          <div class="score-circle">
            <span>${readinessPercentage}%</span>
            <div class="percentage">Readiness Level</div>
          </div>
          <h2>${readinessLevel} AI Readiness</h2>
          <p>Score: ${score} out of ${maxScore} points</p>
          <div class="score-bar" style="width: ${Math.min(readinessPercentage * 2, 200)}px;"></div>
        </div>

        <div class="analytics-section">
          <div class="analytics-card">
            <h3>📊 Category Breakdown</h3>
            <div class="category-scores">
              ${Object.entries(categoryScores).map(([category, score]) => `
                <div class="category-item">
                  <span class="category-name">${category}</span>
                  <span class="category-score">${score}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="analytics-card">
            <h3>🎯 Readiness Insights</h3>
            <div class="chart-container">
              <div style="text-align: center; color: #64748b;">
                <div style="font-size: 24px; font-weight: bold; color: ${readinessColor};">${readinessPercentage}%</div>
                <div>Overall Score</div>
              </div>
            </div>
          </div>
        </div>

        <div class="insights-section">
          <h3>🔍 Key Insights from Your Assessment</h3>
          <div class="insights-list">
            ${insights?.map((insight: string) => `
              <div class="insight-item">
                <div class="insight-bullet"></div>
                <div>
                  <p style="margin: 0; color: #166534; font-weight: 500; line-height: 1.6;">${insight}</p>
                </div>
              </div>
            `).join('') || '<p>Your assessment has been analyzed and personalized recommendations are being prepared.</p>'}
          </div>
        </div>

        ${Object.keys(answers || {}).length > 0 ? `
          <div class="answers-section">
            <h3>📋 Detailed Assessment Responses</h3>
            <div class="answers-grid">
              ${Object.entries(answers).map(([question, answer]) => `
                <div class="answer-item">
                  <div class="answer-question">Question ${question.replace('q', '')}</div>
                  <div class="answer-value">${answer}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="recommendations-section">
          <h3>🚀 Recommended Next Steps</h3>
          <div class="recommendation-item">
            <div class="recommendation-number">1.</div>
            <div class="recommendation-content">
              <h4>Book a Free Consultation</h4>
              <p>Discuss your results with our AI experts and get a customized implementation plan tailored to your business needs and current readiness level.</p>
            </div>
          </div>

          <div class="recommendation-item">
            <div class="recommendation-number">2.</div>
            <div class="recommendation-content">
              <h4>Explore Our Solutions</h4>
              <p>Based on your ${readinessPercentage}% readiness score, discover our comprehensive AI automation solutions designed to transform your business operations.</p>
            </div>
          </div>

          <div class="recommendation-item">
            <div class="recommendation-number">3.</div>
            <div class="recommendation-content">
              <h4>Start Small, Scale Fast</h4>
              <p>Begin with one high-impact process automation to see immediate results and build momentum for larger AI transformations across your organization.</p>
            </div>
          </div>
        </div>

        <div class="footer">
          <img src="https://xerogapai-web.vercel.app/logo.png" alt="XeroGap AI Logo" style="width: 80px; height: auto; margin: 0 auto 15px auto; display: block;">
          <p class="company-name">XeroGap AI</p>
          <p>AI-Powered Digital Transformation</p>
          <p>Questions about your report? Contact us at support@xerogap.com</p>
          <p>© 2025 XeroGap AI. All rights reserved.</p>
          <p>Report Generated: ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;
  }

  private calculateCategoryScores(answers: any): Record<string, number> {
    // Simple categorization based on question patterns
    const categories = {
      'Technology Infrastructure': 0,
      'Process Automation': 0,
      'Data Management': 0,
      'Team Readiness': 0,
      'Strategic Vision': 0
    };

    if (!answers) return categories;

    // Basic scoring logic - can be enhanced based on actual question structure
    Object.values(answers).forEach((answer: any) => {
      if (typeof answer === 'string') {
        if (answer.toLowerCase().includes('technology') || answer.toLowerCase().includes('system')) {
          categories['Technology Infrastructure'] += 20;
        }
        if (answer.toLowerCase().includes('process') || answer.toLowerCase().includes('workflow')) {
          categories['Process Automation'] += 20;
        }
        if (answer.toLowerCase().includes('data') || answer.toLowerCase().includes('analytics')) {
          categories['Data Management'] += 20;
        }
        if (answer.toLowerCase().includes('team') || answer.toLowerCase().includes('people')) {
          categories['Team Readiness'] += 20;
        }
        if (answer.toLowerCase().includes('strategy') || answer.toLowerCase().includes('vision')) {
          categories['Strategic Vision'] += 20;
        }
      }
    });

    return categories;
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
