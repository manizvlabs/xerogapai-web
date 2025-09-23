import { NextRequest, NextResponse } from 'next/server';
import {
  blockSensitiveContent,
  applySecurityHeaders,
  logSecurityEvent
} from '@/lib/security';
import { checkRateLimit, isIPBlocked } from '@/lib/rate-limit';
import { requireAuth } from '@/lib/auth-jwt';

// Use the same JWT_SECRET as the login API
const MIDDLEWARE_JWT_SECRET = 'p4s028GCng2A52WfnWbBukY7xUmVlgtBGlEPtY+sWKi/LW39d2GU9+nX2fHEpPakzsTrq9M3IaMr/Mp7eIlDYw==';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware executed for:', pathname);
  console.log('Auth token cookie:', request.cookies.get('auth-token')?.value ? '✅' : '❌');

  // Allow admin routes and auth API routes without sensitive content blocking
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/auth') || pathname.startsWith('/api/admin')) {
    // Admin routes and auth API routes are handled separately below
  } else {
    // Block sensitive content for other routes
    const blockedResponse = blockSensitiveContent(request);
    if (blockedResponse) {
      logSecurityEvent('blocked_sensitive_content', {
        pathname,
        reason: 'Sensitive content access attempt'
      }, request);
      return blockedResponse;
    }
  }

  // Check if IP is blocked
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   request.headers.get('x-real-ip') || 'unknown';
  
  if (isIPBlocked(clientIP)) {
    logSecurityEvent('blocked_ip', {
      ip: clientIP,
      pathname
    }, request);
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Apply rate limiting for API routes (skip routes that handle their own rate limiting)
  if (pathname.startsWith('/api/')) {
    // Skip rate limiting for routes that already handle it via withRateLimit wrapper
    const skipRateLimitRoutes = [
      '/api/auth/login',
      '/api/auth/logout',
      '/api/auth/refresh',
      '/api/auth/verify',
      '/api/contact',
      '/api/admin/content',
      '/api/admin/users',
      '/api/contacts',
      '/api/content'
    ];

    const shouldSkip = skipRateLimitRoutes.some(route => pathname.startsWith(route));

    if (!shouldSkip) {
      let rateLimitType = 'api';
      if (pathname.startsWith('/api/auth')) {
        rateLimitType = 'login';
      } else if (pathname.startsWith('/api/admin')) {
        rateLimitType = 'admin';
      }

      const rateLimit = checkRateLimit(request, rateLimitType);
      if (!rateLimit.allowed) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            }
          }
        );
      }
    }
  }

  // Protect admin pages (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      logSecurityEvent('admin_page_access_denied', {
        pathname,
        reason: 'No token provided'
      }, request);
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }

    // Verify token using JWT auth
    console.log('Middleware: Verifying token:', token?.substring(0, 20) + '...');
    const payload = requireAuth(token);
    console.log('Middleware: Token verification result:', !!payload);

    if (!payload) {
      logSecurityEvent('admin_page_access_denied', {
        pathname,
        reason: 'Invalid token'
      }, request);
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }

    // Check if user is admin
    if (payload.role !== 'admin') {
      logSecurityEvent('admin_page_access_denied', {
        pathname,
        reason: 'Insufficient permissions'
      }, request);
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }

    // Log admin page access
    logSecurityEvent('admin_page_access', {
      pathname,
      userId: payload.userId,
      username: payload.username
    }, request);
  }

  // Apply security headers to all responses
  const response = NextResponse.next();
  
  if (pathname.startsWith('/admin')) {
    return applySecurityHeaders(response, true);
  }
  
  return applySecurityHeaders(response, false);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
  // Force middleware to run on admin routes
  unstable_allowDynamic: ['/admin/**'],
  // Use Node.js runtime for JWT verification
  runtime: 'nodejs',
};
