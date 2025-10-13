import nodemailer from 'nodemailer';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

// Microsoft Graph API implementation
class MicrosoftGraphEmailService {
  private graphClient: Client;
  private userId: string;

  constructor() {
    this.userId = '44dcba14-cfef-49e7-bfb9-fda4b477ed8e'; // User's Object ID
    this.initializeGraphClient();
  }

  private initializeGraphClient() {
    if (!process.env.MS_GRAPH_CLIENT_ID || !process.env.MS_GRAPH_CLIENT_SECRET || !process.env.MS_GRAPH_TENANT_ID) {
      throw new Error('Microsoft Graph API credentials not configured');
    }

    const credential = new ClientSecretCredential(
      process.env.MS_GRAPH_TENANT_ID,
      process.env.MS_GRAPH_CLIENT_ID,
      process.env.MS_GRAPH_CLIENT_SECRET
    );

    this.graphClient = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        }
      }
    });
  }

  async sendEmail(emailData: EmailData, attachments?: EmailAttachment[]): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const message = {
        subject: emailData.subject,
        body: {
          contentType: 'html',
          content: emailData.html
        },
        toRecipients: [{
          emailAddress: {
            address: emailData.to
          }
        }]
      };

      const result = await this.graphClient
        .api(`/users/${this.userId}/sendMail`)
        .post({ message });

      return {
        success: true,
        messageId: `graph-${Date.now()}`
      };

    } catch (error) {
      console.error('Graph API email error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Graph API email sending failed'
      };
    }
  }

  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.graphClient.api(`/users/${this.userId}`).get();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Graph API connection failed'
      };
    }
  }
}

// SMTP implementation (legacy support)
class SMTPEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Microsoft Office 365 SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // false for TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Microsoft Office 365 specific settings
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });
  }

  async sendEmail(emailData: EmailData, attachments?: EmailAttachment[]): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Validate required environment variables
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('Microsoft 365 SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables.');
      }

      const mailOptions: nodemailer.SendMailOptions = {
        from: emailData.from || `"${process.env.SMTP_FROM_NAME || 'XeroGap AI'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        attachments: attachments?.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        })),
      };

      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
      };

    } catch (error) {
      console.error('Failed to send email:', error);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown email sending error',
      };
    }
  }

  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.transporter.verify();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection verification failed',
      };
    }
  }

  // Generate detailed assessment report email
  generateAssessmentReportEmail(assessmentData: any, userEmail: string): EmailData {
    const { score, totalScore, maxScore, answers, insights } = assessmentData;

    // Calculate readiness percentage
    const readinessPercentage = Math.round((score / maxScore) * 100);

    // Determine readiness level
    let readinessLevel = 'Beginner';
    let readinessColor = '#ef4444'; // red

    if (readinessPercentage >= 80) {
      readinessLevel = 'Advanced';
      readinessColor = '#10b981'; // green
    } else if (readinessPercentage >= 60) {
      readinessLevel = 'Intermediate';
      readinessColor = '#f59e0b'; // yellow
    }

    return {
      to: userEmail,
      subject: `Your AI Readiness Report - ${readinessPercentage}% Ready`,
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
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your AI Readiness Report</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Comprehensive Analysis & Recommendations</p>
            </div>

            <!-- Readiness Score -->
            <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <div style="display: inline-block; padding: 20px; border-radius: 50%; background-color: ${readinessColor}; color: white; margin-bottom: 20px;">
                <span style="font-size: 48px; font-weight: bold;">${readinessPercentage}%</span>
              </div>
              <h2 style="margin: 0; color: #1e293b; font-size: 24px;">AI Readiness Level: ${readinessLevel}</h2>
              <p style="margin: 10px 0 0 0; color: #64748b;">Score: ${score} out of ${maxScore} points</p>
            </div>

            <!-- Key Insights -->
            <div style="padding: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 20px;">Key Insights from Your Assessment</h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                ${insights?.map((insight: string) => `
                  <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #667eea; margin-top: 6px; margin-right: 12px; flex-shrink: 0;"></div>
                    <p style="margin: 0; color: #374151; line-height: 1.5;">${insight}</p>
                  </div>
                `).join('') || '<p style="margin: 0; color: #374151;">Your assessment has been analyzed and personalized recommendations are being prepared.</p>'}
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
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/consultation"
                 style="display: inline-block; background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin-right: 15px;">
                Book Free Consultation
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/demo"
                 style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
                Schedule Demo
              </a>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
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
Your AI Readiness Report - ${readinessPercentage}% Ready

AI Readiness Level: ${readinessLevel}
Score: ${score} out of ${maxScore} points

Key Insights:
${insights?.map((insight: string) => `- ${insight}`).join('\n') || 'Your assessment has been analyzed and personalized recommendations are being prepared.'}

Recommended Next Steps:
1. Book a Free Consultation - Discuss your results with our AI experts
2. Explore Our Solutions - Check out our AI-powered solutions
3. Start Small - Begin with one process automation

Visit ${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/consultation to book your consultation.

Questions? Contact us at support@xerogap.com
      `,
    };
  }
}

// Unified service that chooses between Graph API and SMTP
class Microsoft365EmailService {
  private graphService: MicrosoftGraphEmailService | null = null;
  private smtpService: SMTPEmailService | null = null;
  private useGraphApi: boolean;

  constructor() {
    // Check if Graph API credentials are configured
    this.useGraphApi = !!(process.env.MS_GRAPH_CLIENT_ID && process.env.MS_GRAPH_CLIENT_SECRET && process.env.MS_GRAPH_TENANT_ID);

    if (this.useGraphApi) {
      try {
        this.graphService = new MicrosoftGraphEmailService();
      } catch (error) {
        console.warn('Graph API initialization failed, falling back to SMTP:', error);
        this.useGraphApi = false;
      }
    }

    // Don't create SMTP service in constructor - use lazy initialization
    // this.smtpService will be created only when needed in sendEmail()
  }

  async sendEmail(emailData: EmailData, attachments?: EmailAttachment[]): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (this.useGraphApi && this.graphService) {
      return this.graphService.sendEmail(emailData, attachments);
    } else {
      // Lazy initialization of SMTP service
      if (!this.smtpService) {
        try {
          this.smtpService = new SMTPEmailService();
        } catch (error) {
          return {
            success: false,
            error: `SMTP service initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
          };
        }
      }
      return this.smtpService.sendEmail(emailData, attachments);
    }
  }

  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (this.useGraphApi && this.graphService) {
      return this.graphService.verifyConnection();
    } else {
      // Lazy initialization of SMTP service
      if (!this.smtpService) {
        try {
          this.smtpService = new SMTPEmailService();
        } catch (error) {
          return {
            success: false,
            error: `SMTP service initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
          };
        }
      }
      return this.smtpService.verifyConnection();
    }
  }

  // Generate detailed assessment report email
  generateAssessmentReportEmail(assessmentData: any, userEmail: string): EmailData {
    const { score, totalScore, maxScore, answers, insights } = assessmentData;

    // Calculate readiness percentage
    const readinessPercentage = Math.round((score / maxScore) * 100);

    // Determine readiness level
    let readinessLevel = 'Beginner';
    let readinessColor = '#ef4444'; // red

    if (readinessPercentage >= 80) {
      readinessLevel = 'Advanced';
      readinessColor = '#10b981'; // green
    } else if (readinessPercentage >= 60) {
      readinessLevel = 'Intermediate';
      readinessColor = '#f59e0b'; // yellow
    }

    return {
      to: userEmail,
      subject: `Your AI Readiness Report - ${readinessPercentage}% Ready`,
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
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your AI Readiness Report</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Comprehensive Analysis & Recommendations</p>
            </div>

            <!-- Readiness Score -->
            <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <div style="display: inline-block; padding: 20px; border-radius: 50%; background-color: ${readinessColor}; color: white; margin-bottom: 20px;">
                <span style="font-size: 48px; font-weight: bold;">${readinessPercentage}%</span>
              </div>
              <h2 style="margin: 0; color: #1e293b; font-size: 24px;">AI Readiness Level: ${readinessLevel}</h2>
              <p style="margin: 10px 0 0 0; color: #64748b;">Score: ${score} out of ${maxScore} points</p>
            </div>

            <!-- Key Insights -->
            <div style="padding: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 20px;">Key Insights from Your Assessment</h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                ${insights?.map((insight: string) => `
                  <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #667eea; margin-top: 6px; margin-right: 12px; flex-shrink: 0;"></div>
                    <p style="margin: 0; color: #374151; line-height: 1.5;">${insight}</p>
                  </div>
                `).join('') || '<p style="margin: 0; color: #374151;">Your assessment has been analyzed and personalized recommendations are being prepared.</p>'}
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
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/consultation"
                 style="display: inline-block; background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin-right: 15px;">
                Book Free Consultation
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/demo"
                 style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
                Schedule Demo
              </a>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
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
Your AI Readiness Report - ${readinessPercentage}% Ready

AI Readiness Level: ${readinessLevel}
Score: ${score} out of ${maxScore} points

Key Insights:
${insights?.map((insight: string) => `- ${insight}`).join('\n') || 'Your assessment has been analyzed and personalized recommendations are being prepared.'}

Recommended Next Steps:
1. Book a Free Consultation - Discuss your results with our AI experts
2. Explore Our Solutions - Check out our AI-powered solutions
3. Start Small - Begin with one process automation

Visit ${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/consultation to book your consultation.

Questions? Contact us at support@xerogap.com
      `,
    };
  }

  // Generate demo booking confirmation email
  generateDemoBookingEmail(bookingData: any, calendarResult?: { joinUrl?: string }): EmailData {
    const { firstName, lastName, email, companyName, preferredDate, preferredTime, consultationType } = bookingData;

    const startDateTime = new Date(`${preferredDate}T${preferredTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour meeting

    return {
      to: email,
      subject: `Demo Booked: ${consultationType} - ${startDateTime.toLocaleDateString()}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Demo Booking Confirmation</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Demo Booked Successfully!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Your AI automation demo is confirmed</p>
            </div>

            <!-- Booking Details -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Demo Details</h2>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Name:</span>
                  <span style="color: #1e293b; font-weight: 500;">${firstName} ${lastName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Email:</span>
                  <span style="color: #1e293b; font-weight: 500;">${email}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Company:</span>
                  <span style="color: #1e293b; font-weight: 500;">${companyName || 'Not provided'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Date:</span>
                  <span style="color: #1e293b; font-weight: 500;">${startDateTime.toLocaleDateString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Time:</span>
                  <span style="color: #1e293b; font-weight: 500;">${startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">Duration:</span>
                  <span style="color: #1e293b; font-weight: 500;">60 minutes</span>
                </div>
              </div>

              ${calendarResult?.joinUrl ? `
                <div style="background-color: #f0f9ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                  <h3 style="color: #1e40af; margin: 0 0 10px 0;">📅 Calendar Invite Sent!</h3>
                  <p style="margin: 0; color: #1e40af;">
                    A calendar invite has been added to your Outlook calendar with a Teams meeting link.
                    <a href="${calendarResult.joinUrl}" style="color: #3b82f6; text-decoration: underline;">Join Meeting</a>
                  </p>
                </div>
              ` : ''}

              <!-- What to Expect -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #92400e; margin: 0 0 10px 0;">What to Expect</h3>
                <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                  <li>Personalized demo based on your business needs</li>
                  <li>Live demonstration of AI automation features</li>
                  <li>Q&A session to address your specific questions</li>
                  <li>Next steps and implementation guidance</li>
                </ul>
              </div>

              <!-- Preparation Tips -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #059669; margin: 0 0 10px 0;">Preparation Tips</h3>
                <ul style="margin: 0; padding-left: 20px; color: #059669;">
                  <li>Have your current processes or challenges ready to discuss</li>
                  <li>Prepare questions about AI automation for your industry</li>
                  <li>Ensure you have a stable internet connection for the demo</li>
                </ul>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div style="padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/assessment"
                 style="display: inline-block; background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin-right: 15px;">
                Take AI Assessment
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/contact"
                 style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
                Contact Support
              </a>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                Questions about your demo? Reply to this email or contact us at
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
Demo Booking Confirmation

Demo Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Company: ${companyName || 'Not provided'}
- Date: ${startDateTime.toLocaleDateString()}
- Time: ${startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
- Duration: 60 minutes

${calendarResult?.joinUrl ? `Calendar invite sent with Teams meeting link: ${calendarResult.joinUrl}` : ''}

What to Expect:
- Personalized demo based on your business needs
- Live demonstration of AI automation features
- Q&A session to address your specific questions
- Next steps and implementation guidance

Preparation Tips:
- Have your current processes or challenges ready to discuss
- Prepare questions about AI automation for your industry
- Ensure you have a stable internet connection for the demo

Questions? Contact us at support@xerogap.com
      `,
    };
  }
}

export const microsoft365EmailService = new Microsoft365EmailService();
