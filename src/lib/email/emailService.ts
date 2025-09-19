export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  source: 'assessment' | 'demo' | 'consultation' | 'contact' | 'newsletter' | 'blog';
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface EmailSequence {
  id: string;
  name: string;
  trigger: string;
  emails: EmailTemplate[];
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
  delay: number; // minutes after trigger
  conditions?: Record<string, any>;
}

class EmailService {
  private static instance: EmailService;
  private sequences: EmailSequence[] = [];

  private constructor() {
    this.initializeSequences();
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeSequences() {
    // Assessment completion sequence
    this.sequences.push({
      id: 'assessment_completed',
      name: 'AI Assessment Follow-up',
      trigger: 'assessment_completed',
      emails: [
        {
          subject: 'Your AI Readiness Report is Ready!',
          html: this.generateAssessmentReportEmail(),
          delay: 5, // 5 minutes
        },
        {
          subject: 'How to Get Started with AI Automation',
          html: this.generateGettingStartedEmail(),
          delay: 1440, // 24 hours
        },
        {
          subject: 'AI Success Stories from Similar Businesses',
          html: this.generateCaseStudiesEmail(),
          delay: 4320, // 72 hours
        },
      ]
    });

    // Demo booking sequence
    this.sequences.push({
      id: 'demo_booked',
      name: 'Demo Preparation & Follow-up',
      trigger: 'demo_booked',
      emails: [
        {
          subject: 'Demo Confirmation & Preparation Guide',
          html: this.generateDemoConfirmationEmail(),
          delay: 5,
        },
        {
          subject: 'What to Expect During Your AI Demo',
          html: this.generateDemoPreparationEmail(),
          delay: 1440,
        },
        {
          subject: 'Post-Demo: Next Steps & Resources',
          html: this.generatePostDemoEmail(),
          delay: 60, // 1 hour after demo
        },
      ]
    });

    // Newsletter signup sequence
    this.sequences.push({
      id: 'newsletter_signup',
      name: 'Newsletter Welcome',
      trigger: 'newsletter_signup',
      emails: [
        {
          subject: 'Welcome to XeroGap AI Insights!',
          html: this.generateWelcomeEmail(),
          delay: 5,
        },
        {
          subject: 'Your First AI Automation Guide',
          html: this.generateFirstGuideEmail(),
          delay: 2880, // 48 hours
        },
      ]
    });
  }

  async captureLead(leadData: LeadData): Promise<{ success: boolean; leadId?: string; error?: string }> {
    try {
      // Track lead capture with analytics
      if (typeof window !== 'undefined' && window.trackCTA) {
        window.trackCTA({
          action: 'capture',
          category: 'lead',
          label: `lead_${leadData.source}`,
          cta_type: leadData.source,
          value: 100
        });
      }

      // In a real implementation, this would integrate with:
      // - CRM systems (HubSpot, Salesforce, Zoho)
      // - Email marketing platforms (Mailchimp, SendGrid, Klaviyo)
      // - Lead scoring systems

      console.log('Lead captured:', leadData);

      // Simulate API call
      const response = await this.simulateLeadCapture(leadData);

      if (response.success) {
        // Trigger appropriate email sequence
        await this.triggerEmailSequence(leadData.source, leadData);

        return { success: true, leadId: response.leadId };
      }

      return { success: false, error: response.error };

    } catch (error) {
      console.error('Lead capture failed:', error);
      return { success: false, error: 'Failed to capture lead' };
    }
  }

  private async simulateLeadCapture(leadData: LeadData): Promise<{ success: boolean; leadId?: string; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success/failure (90% success rate)
    if (Math.random() > 0.1) {
      return {
        success: true,
        leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    }

    return {
      success: false,
      error: 'Email already exists in our system'
    };
  }

  private async triggerEmailSequence(trigger: string, leadData: LeadData): Promise<void> {
    const sequence = this.sequences.find(seq => seq.trigger === trigger);

    if (!sequence) {
      console.log(`No email sequence found for trigger: ${trigger}`);
      return;
    }

    console.log(`Triggering email sequence: ${sequence.name}`);

    // Schedule emails based on sequence
    sequence.emails.forEach((email, index) => {
      setTimeout(() => {
        this.sendEmail(email, leadData);
      }, email.delay * 60 * 1000); // Convert minutes to milliseconds
    });
  }

  private async sendEmail(emailTemplate: EmailTemplate, leadData: LeadData): Promise<void> {
    // In a real implementation, this would integrate with email service providers
    console.log('Sending email:', {
      to: leadData.email,
      subject: emailTemplate.subject,
      leadData
    });

    // Track email send event
    if (typeof window !== 'undefined' && window.trackCTA) {
      window.trackCTA({
        action: 'send',
        category: 'email',
        label: emailTemplate.subject,
        cta_type: 'email'
      });
    }
  }

  // Email template generators
  private generateAssessmentReportEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937; text-align: center;">Your AI Readiness Report is Ready!</h1>
        <p>Thank you for completing the AI Readiness Assessment. We've analyzed your responses and created a personalized report with:</p>
        <ul>
          <li>Your current AI readiness score</li>
          <li>Recommended AI solutions for your business</li>
          <li>Implementation roadmap and timeline</li>
          <li>Expected ROI and cost savings</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="/assessment/report" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Your Report</a>
        </div>
        <p>Have questions? Reply to this email or <a href="/consultation">schedule a free consultation</a>.</p>
      </div>
    `;
  }

  private generateGettingStartedEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">How to Get Started with AI Automation</h1>
        <p>Based on your assessment results, here's how to begin your AI transformation journey:</p>
        <h2>Quick Wins (1-2 weeks)</h2>
        <ul>
          <li>Start with WhatsApp automation for customer service</li>
          <li>Implement basic workflow automation</li>
          <li>Set up AI-powered content generation</li>
        </ul>
        <h2>Medium-term Goals (1-3 months)</h2>
        <ul>
          <li>Deploy enterprise knowledge copilots</li>
          <li>Implement sales intelligence automation</li>
          <li>Set up compliance monitoring</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="/demo" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Book a Demo</a>
        </div>
      </div>
    `;
  }

  private generateCaseStudiesEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">AI Success Stories from Similar Businesses</h1>
        <p>See how businesses like yours have transformed operations with AI:</p>

        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3>Manufacturing Company - 75% Reduction in Support Queries</h3>
          <p>Implemented enterprise knowledge copilots, reducing average response time from 4 hours to 15 minutes.</p>
        </div>

        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3>Retail Chain - 85% Faster Customer Response</h3>
          <p>WhatsApp automation handling 10,000+ monthly inquiries with intelligent routing.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="/case-studies" style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View All Case Studies</a>
        </div>
      </div>
    `;
  }

  private generateDemoConfirmationEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">Demo Confirmed! 🎉</h1>
        <p>Thank you for booking your AI automation demo. We're excited to show you how our solutions can transform your business.</p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>What to expect:</h3>
          <ul>
            <li>45-minute personalized demonstration</li>
            <li>Live examples from your industry</li>
            <li>Q&A session with our AI experts</li>
            <li>Custom recommendations for your business</li>
          </ul>
        </div>

        <p><strong>Need to reschedule?</strong> <a href="/demo">Update your booking here</a></p>
      </div>
    `;
  }

  private generateDemoPreparationEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">Preparing for Your AI Demo</h1>
        <p>To make the most of your demo session, please prepare the following:</p>

        <h2>Before the Demo:</h2>
        <ul>
          <li>Identify your biggest operational challenges</li>
          <li>Prepare questions about AI implementation</li>
          <li>Think about your current technology stack</li>
          <li>Consider your budget and timeline</li>
        </ul>

        <h2>During the Demo:</h2>
        <ul>
          <li>Share specific use cases from your business</li>
          <li>Ask about integration with your existing tools</li>
          <li>Discuss ROI and implementation timelines</li>
        </ul>

        <p>Need help preparing? <a href="/consultation">Schedule a pre-demo consultation</a></p>
      </div>
    `;
  }

  private generatePostDemoEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">Thank You for Attending Our Demo!</h1>
        <p>We hope you found the demo valuable and insightful. Here's what happens next:</p>

        <h2>Next Steps:</h2>
        <ol>
          <li><strong>Proposal Review:</strong> We'll send a customized proposal within 24 hours</li>
          <li><strong>Technical Consultation:</strong> Schedule a technical deep-dive if needed</li>
          <li><strong>Implementation Planning:</strong> Discuss timelines and requirements</li>
          <li><strong>Onboarding:</strong> Begin the implementation process</li>
        </ol>

        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Questions about the demo?</h3>
          <p>Reply to this email or <a href="/contact">contact our team directly</a>.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="/consultation" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Schedule Follow-up</a>
        </div>
      </div>
    `;
  }

  private generateWelcomeEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">Welcome to XeroGap AI Insights! 🚀</h1>
        <p>Thank you for subscribing to our AI automation insights. You're now part of a community of forward-thinking business leaders.</p>

        <h2>What you'll receive:</h2>
        <ul>
          <li>Weekly AI automation trends and insights</li>
          <li>Case studies from successful implementations</li>
          <li>Exclusive access to new feature announcements</li>
          <li>Tips for maximizing AI ROI</li>
        </ul>

        <h2>Getting Started:</h2>
        <p>As a welcome gift, here's your <a href="/assessment">free AI readiness assessment</a> to discover automation opportunities in your business.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="/assessment" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Take Free Assessment</a>
        </div>
      </div>
    `;
  }

  private generateFirstGuideEmail(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937;">Your First AI Automation Guide</h1>
        <p>Welcome to your AI journey! This guide will help you understand the fundamentals of AI automation for business.</p>

        <h2>AI Automation Fundamentals:</h2>
        <ul>
          <li><strong>Process Automation:</strong> Automate repetitive tasks and workflows</li>
          <li><strong>Customer Service:</strong> 24/7 intelligent customer support</li>
          <li><strong>Data Analysis:</strong> Extract insights from your business data</li>
          <li><strong>Content Generation:</strong> AI-powered marketing and content creation</li>
        </ul>

        <h2>Quick Wins to Start With:</h2>
        <ol>
          <li>Customer inquiry automation</li>
          <li>Email response generation</li>
          <li>Data entry and processing</li>
          <li>Report generation</li>
        </ol>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>💡 Pro Tip:</h3>
          <p>Start small with one process, measure the impact, then scale to other areas of your business.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="/services" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Explore Services</a>
        </div>
      </div>
    `;
  }
}

export const emailService = EmailService.getInstance();
