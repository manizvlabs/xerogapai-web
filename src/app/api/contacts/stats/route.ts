import { NextRequest, NextResponse } from 'next/server';
import { contactStore } from '@/lib/contact-storage';
import { applySecurityHeaders } from '@/lib/security';

// GET /api/contacts/stats - Get contact statistics
export async function GET(request: NextRequest) {
  try {
    const stats = contactStore.getStats();

    const response = NextResponse.json({
      success: true,
      data: stats
    });

    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    
    const response = NextResponse.json({
      success: false,
      error: 'Failed to fetch contact statistics'
    }, { status: 500 });

    return applySecurityHeaders(response, false);
  }
}
