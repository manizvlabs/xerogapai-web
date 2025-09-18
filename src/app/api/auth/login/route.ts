import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-jwt';
import { withRateLimit } from '@/lib/rate-limit';
import { applySecurityHeaders, sanitizeInput, logSecurityEvent } from '@/lib/security';

async function loginHandler(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    // Authenticate user
    const authResult = await authenticateUser(sanitizedUsername, sanitizedPassword);

    if (!authResult.success) {
      // Log failed login attempt
      logSecurityEvent('login_failed', {
        username: sanitizedUsername,
        reason: authResult.error
      }, request);

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Log successful login
    logSecurityEvent('login_success', {
      username: sanitizedUsername,
      userId: authResult.user?.id
    }, request);

    // Create response with tokens
    const response = NextResponse.json({
      success: true,
      user: {
        id: authResult.user?.id,
        username: authResult.user?.username,
        email: authResult.user?.email,
        role: authResult.user?.role
      },
      token: authResult.token,
      refreshToken: authResult.refreshToken
    });

    // Set HTTP-only cookies for tokens
    response.cookies.set('auth-token', authResult.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    });

    response.cookies.set('refresh-token', authResult.refreshToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    logSecurityEvent('login_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, request);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(loginHandler, 'login');
