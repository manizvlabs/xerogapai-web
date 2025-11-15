#!/usr/bin/env node

/**
 * Check current rate limiting configuration
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Rate limiting configuration from environment variables
const RATE_LIMITS = {
  // General API endpoints
  api: {
    windowMs: parseInt(process.env.RATE_LIMIT_API_WINDOW_MS || '900000'), // 15 minutes default
    maxRequests: parseInt(process.env.RATE_LIMIT_API_MAX_REQUESTS || '100'), // 100 requests default
  },
  // Contact form
  contact: {
    windowMs: parseInt(process.env.RATE_LIMIT_CONTACT_WINDOW_MS || '86400000'), // 24 hours default (1 day)
    maxRequests: parseInt(process.env.RATE_LIMIT_CONTACT_MAX_REQUESTS || '1000'), // 1000 submissions default
  },
  // Admin routes
  admin: {
    windowMs: parseInt(process.env.RATE_LIMIT_ADMIN_WINDOW_MS || '900000'), // 15 minutes default
    maxRequests: parseInt(process.env.RATE_LIMIT_ADMIN_MAX_REQUESTS || '200'), // 200 requests default (more lenient)
  },
  // Login attempts
  login: {
    windowMs: parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW_MS || '900000'), // 15 minutes default
    maxRequests: parseInt(process.env.RATE_LIMIT_LOGIN_MAX_REQUESTS || '50'), // 50 attempts default (more lenient)
  }
};

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}

console.log('🔒 Rate Limiting Configuration');
console.log('===============================\n');

Object.entries(RATE_LIMITS).forEach(([type, config]) => {
  const windowTime = formatTime(config.windowMs);
  const requests = config.maxRequests;

  console.log(`📋 ${type.toUpperCase()}:`);
  console.log(`   • ${requests} requests per ${windowTime}`);
  console.log(`   • Window: ${config.windowMs}ms (${windowTime})`);

  // Show requests per day for contact form
  if (type === 'contact') {
    const windowsPerDay = (24 * 60 * 60 * 1000) / config.windowMs;
    const dailyLimit = Math.floor(config.maxRequests * windowsPerDay);
    console.log(`   • Daily capacity: ~${dailyLimit} submissions`);
  }

  console.log('');
});

console.log('📝 Environment Variables (override defaults):');
console.log('   RATE_LIMIT_CONTACT_WINDOW_MS=86400000');
console.log('   RATE_LIMIT_CONTACT_MAX_REQUESTS=1000');
console.log('   RATE_LIMIT_API_WINDOW_MS=900000');
console.log('   RATE_LIMIT_API_MAX_REQUESTS=100');
console.log('');

console.log('🧪 Test Commands:');
console.log('   npm run test:consultation');
console.log('   npm run test:consultation:manual valid');
console.log('');

console.log('✅ Contact forms now allow 1000 submissions per 24 hours!');
