import { NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Log logout event
    logSecurityEvent('logout', {}, request);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear the auth token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
