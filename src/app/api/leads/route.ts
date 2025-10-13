import { NextRequest, NextResponse } from 'next/server';
import { ContactDatabase, initializeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, companyName, phone, source } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Initialize database
    await initializeDatabase();

    // Store lead in database
    const contact = await ContactDatabase.createContact({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email,
      phone: phone || '',
      company: companyName || '',
      service: source || 'assessment',
      message: `Lead captured from ${source || 'assessment'}`,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      contactId: contact.id,
      leadId: `lead_${Date.now()}`
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
