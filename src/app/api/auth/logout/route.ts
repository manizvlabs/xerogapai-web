import { NextRequest, NextResponse } from 'next/server';
import { revokeToken } from '@/lib/auth-jwt';
import { withRateLimit } from '@/lib/rate-limit';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

async function logoutHandler(request: NextRequest): Promise<Response> {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value;

    if (refreshToken) {
      // Revoke the refresh token
      await revokeToken(refreshToken);
    }

    // Log logout event
    logSecurityEvent('user_logout', {}, request);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear cookies
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    response.cookies.set('refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    logSecurityEvent('logout_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, request);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(logoutHandler, 'login');