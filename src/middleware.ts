import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, requireAuth, isAdmin } from '@/lib/auth-simple';
import { 
  blockSensitiveContent, 
  applySecurityHeaders, 
  isProtectedRoute,
  logSecurityEvent 
} from '@/lib/security';
import { checkRateLimit, isIPBlocked } from '@/lib/rate-limit';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow admin login page without any checks
  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    return applySecurityHeaders(response, true);
  }

  // Block sensitive content
  const blockedResponse = blockSensitiveContent(request);
  if (blockedResponse) {
    logSecurityEvent('blocked_sensitive_content', {
      pathname,
      reason: 'Sensitive content access attempt'
    }, request);
    return blockedResponse;
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

  // Apply rate limiting for API routes
  if (pathname.startsWith('/api/')) {
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

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }

    const user = requireAuth(token);
    
    if (!user || !isAdmin(user)) {
      logSecurityEvent('unauthorized_admin_access', {
        pathname,
        userId: user?.id,
        reason: 'Invalid or insufficient permissions'
      }, request);
      
      // Redirect to login page instead of 403
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(response, true);
    }

    // Log admin access
    logSecurityEvent('admin_access', {
      pathname,
      userId: user.id,
      username: user.username
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
};
