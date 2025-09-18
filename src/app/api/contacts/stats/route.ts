import { NextResponse } from 'next/server';
import { ContactDatabase, initializeDatabase } from '@/lib/database';
import { applySecurityHeaders } from '@/lib/security';

// GET /api/contacts/stats - Get contact statistics
export async function GET() {
  try {
    // Initialize database if needed
    await initializeDatabase();

    const stats = await ContactDatabase.getStats();

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
