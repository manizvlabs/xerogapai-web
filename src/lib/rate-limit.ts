import { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMITS = {
  // General API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
  },
  // Contact form
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 contact form submissions per hour
  },
  // Admin routes
  admin: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20, // 20 admin requests per window
  },
  // Login attempts
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 login attempts per window
  }
};

// In-memory store for rate limiting (in production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  }
}

// Get client identifier
function getClientId(request: NextRequest): string {
  // Try to get real IP from headers (for production with proxy)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return clientIp;
}

// Rate limiting function
export function checkRateLimit(
  request: NextRequest, 
  type: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = getClientId(request);
  const key = `${clientId}:${type}`;
  const now = Date.now();
  const limit = RATE_LIMITS[type];
  
  // Clean up expired entries periodically
  if (Math.random() < 0.1) { // 10% chance
    cleanupExpiredEntries();
  }
  
  const current = requestCounts.get(key);
  
  if (!current || now > current.resetTime) {
    // First request or window expired
    requestCounts.set(key, {
      count: 1,
      resetTime: now + limit.windowMs
    });
    
    return {
      allowed: true,
      remaining: limit.maxRequests - 1,
      resetTime: now + limit.windowMs
    };
  }
  
  if (current.count >= limit.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: current.resetTime
    };
  }
  
  // Increment counter
  current.count++;
  requestCounts.set(key, current);
  
  return {
    allowed: true,
    remaining: limit.maxRequests - current.count,
    resetTime: current.resetTime
  };
}

// Rate limiting middleware
export function withRateLimit(
  handler: (request: NextRequest) => Promise<Response>,
  type: keyof typeof RATE_LIMITS
) {
  return async (request: NextRequest): Promise<Response> => {
    const rateLimit = checkRateLimit(request, type);
    
    if (!rateLimit.allowed) {
      return new Response(
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
            'X-RateLimit-Limit': RATE_LIMITS[type].maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }
    
    // Add rate limit headers to response
    const response = await handler(request);
    response.headers.set('X-RateLimit-Limit', RATE_LIMITS[type].maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
    
    return response;
  };
}

// IP-based blocking for suspicious activity
const blockedIPs = new Set<string>();
const suspiciousIPs = new Map<string, { count: number; lastSeen: number }>();

export function isIPBlocked(ip: string): boolean {
  return blockedIPs.has(ip);
}

export function markSuspiciousActivity(ip: string): void {
  const now = Date.now();
  const current = suspiciousIPs.get(ip);
  
  if (!current) {
    suspiciousIPs.set(ip, { count: 1, lastSeen: now });
    return;
  }
  
  // Reset if more than 1 hour has passed
  if (now - current.lastSeen > 60 * 60 * 1000) {
    suspiciousIPs.set(ip, { count: 1, lastSeen: now });
    return;
  }
  
  current.count++;
  current.lastSeen = now;
  suspiciousIPs.set(ip, current);
  
  // Block IP if too many suspicious activities
  if (current.count >= 10) {
    blockedIPs.add(ip);
    console.warn(`IP ${ip} blocked due to suspicious activity`);
  }
}

export function unblockIP(ip: string): void {
  blockedIPs.delete(ip);
  suspiciousIPs.delete(ip);
}
