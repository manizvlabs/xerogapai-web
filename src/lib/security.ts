import { NextRequest, NextResponse } from 'next/server';

// Security headers configuration
export const securityHeaders = {
  // Prevent XSS attacks
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()'
  ].join(', '),
  
  // HSTS (HTTP Strict Transport Security)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Cache Control for sensitive content
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// Admin-specific security headers
export const adminSecurityHeaders = {
  ...securityHeaders,
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private',
  'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive',
};

// Content protection rules
export const protectedRoutes = [
  '/api/admin',
  '/_next/static',
  '/.env',
  '/.env.local',
  '/.env.production',
  '/package.json',
  '/package-lock.json',
  '/yarn.lock',
  '/src',
  '/config',
  '/lib'
];

// Sensitive file extensions
export const sensitiveExtensions = [
  '.env',
  '.json',
  '.js',
  '.ts',
  '.tsx',
  '.jsx',
  '.md',
  '.txt',
  '.log',
  '.sql',
  '.db',
  '.config',
  '.conf'
];

// Check if route should be protected
export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

// Check if file extension is sensitive
export function isSensitiveFile(pathname: string): boolean {
  return sensitiveExtensions.some(ext => pathname.endsWith(ext));
}

// Apply security headers to response
export function applySecurityHeaders(response: NextResponse, isAdmin = false): NextResponse {
  const headers = isAdmin ? adminSecurityHeaders : securityHeaders;
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

// Block access to sensitive content
export function blockSensitiveContent(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  
  // Block protected routes
  if (isProtectedRoute(pathname)) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  
  // Block sensitive files
  if (isSensitiveFile(pathname)) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  
  return null;
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Generate CSRF token
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Verify CSRF token
export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken;
}

// Content filtering for admin routes
export function filterAdminContent(content: Record<string, unknown>): Record<string, unknown> {
  // Remove sensitive information
  const filtered = { ...content };
  
  // Remove any potential sensitive keys
  const sensitiveKeys = ['password', 'secret', 'token', 'key', 'auth'];
  sensitiveKeys.forEach(key => {
    if (filtered[key]) {
      delete filtered[key];
    }
  });
  
  return filtered;
}

// Log security events
export function logSecurityEvent(
  event: string, 
  details: Record<string, unknown>, 
  request: NextRequest
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    url: request.url,
    details
  };
  
  // In production, send to security monitoring service
  console.warn('Security Event:', logEntry);
}
