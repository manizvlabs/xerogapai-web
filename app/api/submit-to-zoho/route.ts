import { NextRequest, NextResponse } from 'next/server';
import { createZohoService, type ZohoLeadData } from '@/src/services/zohoService';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const get = (key: string) => (formData.get(key) as string) || '';

    const twitter = get('twitter').replace(/^@/, '');
    const noOfEmployeesRaw = get('noOfEmployees');
    const emailOptOutRaw = get('emailOptOut');
    const preferredDateRaw = get('preferredDate');

    // Build enriched description
    const service = get('service');
    const description = get('description');
    const consultationGoals = get('consultationGoals');
    const currentChallenges = get('currentChallenges');
    const budget = get('budget');
    const timeline = get('timeline');
    const additionalNotes = get('additionalNotes');
    const notes = get('notes');

    let fullDescription = description;
    if (service) fullDescription = `Service Interested In: ${service}\n\n${fullDescription}`;
    if (consultationGoals || currentChallenges || budget || timeline || additionalNotes) {
      fullDescription += '\n\nConsultation Details:\n';
      if (consultationGoals) fullDescription += `Goals: ${consultationGoals}\n`;
      if (currentChallenges) fullDescription += `Challenges: ${currentChallenges}\n`;
      if (budget) fullDescription += `Budget: ${budget}\n`;
      if (timeline) fullDescription += `Timeline: ${timeline}\n`;
      if (additionalNotes) fullDescription += `Additional Notes: ${additionalNotes}\n`;
    }
    if (notes) fullDescription += `\n\nAdditional Notes:\n${notes}`;

    const leadData: ZohoLeadData = {
      firstName: get('firstName'),
      lastName: get('lastName'),
      email: get('email'),
      mobile: get('mobile') || undefined,
      company: get('company') || undefined,
      service: service || undefined,
      description: fullDescription.trim(),
      salutation: get('salutation') || undefined,
      secondaryEmail: get('secondaryEmail') || undefined,
      jobTitle: get('jobTitle') || undefined,
      companySize: get('companySize') || undefined,
      industry: get('industry') || undefined,
      website: get('website') || undefined,
      annualRevenue: get('annualRevenue') || undefined,
      noOfEmployees: noOfEmployeesRaw ? parseInt(noOfEmployeesRaw) : undefined,
      rating: get('rating') || undefined,
      street: get('street') || undefined,
      city: get('city') || undefined,
      state: get('state') || undefined,
      country: get('country') || undefined,
      zipCode: get('zipCode') || undefined,
      skypeId: get('skypeId') || undefined,
      twitter: twitter || undefined,
      fax: get('fax') || undefined,
      emailOptOut: emailOptOutRaw === 'true',
      preferredDate: preferredDateRaw ? new Date(preferredDateRaw) : undefined,
      preferredTime: get('preferredTime') || undefined,
      timezone: get('timezone') || undefined,
      consultationGoals: consultationGoals || undefined,
      currentChallenges: currentChallenges || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
      additionalNotes: additionalNotes || undefined,
      consultationType: get('consultationType') || undefined,
      notes: notes || undefined,
    };

    const zohoService = createZohoService();
    if (!zohoService) {
      return NextResponse.json(
        { error: 'Server configuration error: Zoho service unavailable.' },
        { status: 500 }
      );
    }

    const crmData = await zohoService.createLead(leadData);
    const leadId = crmData.data?.[0]?.details?.id;

    // Handle file attachments
    const attachmentResults: Array<{ fileName: string; status: 'success' | 'failed'; error?: string }> = [];
    const attachmentFiles = formData.getAll('attachments') as File[];

    if (attachmentFiles.length > 0 && leadId) {
      const accessToken = await zohoService.getAccessToken();

      await Promise.all(
        attachmentFiles.map(async (file) => {
          if (!(file instanceof File)) return;
          const attachmentFormData = new FormData();
          attachmentFormData.append('file', file, file.name);

          const res = await fetch(
            `https://crm.zoho.in/crm/v2.2/Leads/${leadId}/Attachments`,
            {
              method: 'POST',
              headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
              body: attachmentFormData,
            }
          );

          if (res.ok) {
            attachmentResults.push({ fileName: file.name, status: 'success' });
          } else {
            const errText = await res.text();
            attachmentResults.push({ fileName: file.name, status: 'failed', error: errText });
          }
        })
      );
    }

    return NextResponse.json(
      {
        success: true,
        zohoResponse: crmData,
        leadId,
        attachments: attachmentResults.length > 0 ? attachmentResults : undefined,
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Zoho submission error:', error);

    const status = message.includes('Token refresh failed')
      ? 500
      : message.includes('Network request failed') || message.includes('ECONNRESET')
      ? 503
      : message.includes('429')
      ? 429
      : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
