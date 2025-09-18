import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/auth-jwt';
import { withRateLimit } from '@/lib/rate-limit';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

async function refreshHandler(request: NextRequest): Promise<Response> {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not provided' },
        { status: 401 }
      );
    }

    // Refresh the access token
    const authResult = await refreshAccessToken(refreshToken);

    if (!authResult.success) {
      // Log failed refresh attempt
      logSecurityEvent('token_refresh_failed', {
        reason: authResult.error
      }, request);

      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    // Log successful refresh
    logSecurityEvent('token_refresh_success', {
      userId: authResult.user?.id
    }, request);

    // Create response with new access token
    const response = NextResponse.json({
      success: true,
      user: {
        id: authResult.user?.id,
        username: authResult.user?.username,
        email: authResult.user?.email,
        role: authResult.user?.role
      },
      token: authResult.token
    });

    // Set new access token cookie
    response.cookies.set('auth-token', authResult.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    logSecurityEvent('refresh_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, request);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(refreshHandler, 'login');
