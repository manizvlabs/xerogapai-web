// Email Template System
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  variables: string[];
}

export interface TemplateData {
  [key: string]: any;
}

export interface AssessmentReportData extends TemplateData {
  score: number;
  totalScore: number;
  maxScore: number;
  answers: any;
  insights: string[];
  readinessPercentage: number;
  readinessLevel: string;
  readinessColor: string;
}

// Template registry
export const emailTemplates: Record<string, EmailTemplate> = {};

// Template helper functions
export function registerTemplate(template: EmailTemplate): void {
  emailTemplates[template.id] = template;
}

export function getTemplate(templateId: string): EmailTemplate | undefined {
  return emailTemplates[templateId];
}

export function renderTemplate(template: EmailTemplate, data: TemplateData): { subject: string; html: string; text?: string } {
  let subject = template.subject;
  let html = template.html;
  let text = template.text;

  // Replace variables in template
  template.variables.forEach(variable => {
    const regex = new RegExp(`{{${variable}}}`, 'g');
    const value = data[variable];

    if (value !== undefined) {
      subject = subject.replace(regex, String(value));
      html = html.replace(regex, String(value));
      if (text) {
        text = text.replace(regex, String(value));
      }
    }
  });

  return { subject, html, text };
}
