import { NextRequest, NextResponse } from 'next/server';
import { 
  blockSensitiveContent, 
  applySecurityHeaders, 
  logSecurityEvent 
} from '@/lib/security';
import { checkRateLimit, isIPBlocked } from '@/lib/rate-limit';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
      const rateLimitType = pathname.startsWith('/api/auth') ? 'login' :
                           pathname.startsWith('/api/admin') ? 'admin' : 'api';

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
    const token = request.cookies.get('auth-token')?.value;
    
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

    // Simple token check (just verify it exists and is not expired)
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      // Decode base64url (JWT uses base64url, not base64)
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      const payload = JSON.parse(atob(padded));
      
      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        throw new Error('Token expired');
      }

      // Check if user is admin
      if (payload.role !== 'admin') {
        throw new Error('Insufficient permissions');
      }

      // Log admin page access
      logSecurityEvent('admin_page_access', {
        pathname,
        userId: payload.userId,
        username: payload.username
      }, request);
    } catch {
      logSecurityEvent('admin_page_access_denied', {
        pathname,
        reason: 'Invalid token or insufficient permissions'
      }, request);
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }
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
};
