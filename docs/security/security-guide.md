# Security Guide for Zero Digital Website

## 🔒 **Security Implementation Overview**

This document outlines the comprehensive security measures implemented to protect the Zero Digital website from various threats and attacks.

## 🛡️ **Security Features Implemented**

### **1. Authentication & Authorization**
- **JWT-based authentication** for admin access
- **Role-based access control** (admin only)
- **Secure session management** with HTTP-only cookies
- **Password protection** for admin routes

### **2. Rate Limiting & DoS Protection**
- **API rate limiting** to prevent abuse
- **IP-based blocking** for suspicious activity
- **Contact form protection** (5 submissions per hour)
- **Admin route protection** (20 requests per 15 minutes)
- **Login attempt limiting** (5 attempts per 15 minutes)

### **3. Content Protection**
- **Sensitive route blocking** (admin, API, config files)
- **File extension filtering** (.env, .json, .js, etc.)
- **Content sanitization** for all inputs
- **XSS protection** with Content Security Policy

### **4. Security Headers**
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Browser XSS protection
- **Content-Security-Policy**: Comprehensive CSP
- **Strict-Transport-Security**: HTTPS enforcement
- **Referrer-Policy**: Controls referrer information

### **5. Input Validation & Sanitization**
- **Email format validation**
- **Phone number validation**
- **Input sanitization** (removes malicious content)
- **CSRF protection** (ready for implementation)

## 🔐 **Admin Access**

### **Default Credentials**
```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials in production!

### **Environment Variables**
Add these to your `.env.local` file:

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
ADMIN_EMAIL=admin@zerodigital.ai
```

## 🚨 **Security Monitoring**

### **Logged Events**
The system logs the following security events:
- Login attempts (success/failure)
- Admin access
- Blocked sensitive content access
- Rate limit violations
- Contact form submissions
- Suspicious IP activity

### **Log Locations**
- **Development**: Console output
- **Production**: Should be sent to security monitoring service

## 🛠️ **Security Configuration**

### **Rate Limits**
```typescript
const RATE_LIMITS = {
  api: { windowMs: 15 * 60 * 1000, maxRequests: 100 },
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 5 },
  admin: { windowMs: 15 * 60 * 1000, maxRequests: 20 },
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 }
};
```

### **Protected Routes**
```typescript
const protectedRoutes = [
  '/admin',
  '/api/admin',
  '/api/auth',
  '/_next/static',
  '/.env',
  '/src',
  '/config',
  '/lib'
];
```

### **Sensitive File Extensions**
```typescript
const sensitiveExtensions = [
  '.env', '.json', '.js', '.ts', '.tsx', '.jsx',
  '.md', '.txt', '.log', '.sql', '.db', '.config'
];
```

## 🔍 **Security Testing**

### **Test Admin Access**
1. Visit `http://localhost:4010/admin`
2. Should redirect to login page
3. Login with admin credentials
4. Should access content management

### **Test Rate Limiting**
1. Submit contact form multiple times
2. Should block after 5 submissions per hour
3. Check response headers for rate limit info

### **Test Content Protection**
1. Try accessing `http://localhost:4010/.env`
2. Should return 403 Forbidden
3. Try accessing `http://localhost:4010/src/config/site.ts`
4. Should return 403 Forbidden

## 🚀 **Production Security Checklist**

### **Before Deployment**
- [ ] Change default admin credentials
- [ ] Set strong JWT secret
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set up security monitoring
- [ ] Configure firewall rules
- [ ] Set up backup procedures

### **Ongoing Security**
- [ ] Monitor security logs
- [ ] Update dependencies regularly
- [ ] Review access logs
- [ ] Test security measures
- [ ] Backup data regularly
- [ ] Monitor for vulnerabilities

## 🔧 **Security Maintenance**

### **Regular Updates**
- Update dependencies monthly
- Review security logs weekly
- Test admin access monthly
- Backup data daily

### **Incident Response**
1. **Detect**: Monitor logs for suspicious activity
2. **Analyze**: Identify the nature of the threat
3. **Contain**: Block malicious IPs if needed
4. **Eradicate**: Remove any compromised content
5. **Recover**: Restore from clean backups
6. **Learn**: Update security measures

## 📊 **Security Metrics**

### **Key Performance Indicators**
- Failed login attempts per day
- Rate limit violations per hour
- Blocked IP addresses
- Admin access frequency
- Contact form submission rate

### **Alert Thresholds**
- More than 10 failed logins per hour
- More than 50 rate limit violations per hour
- More than 5 blocked IPs per day
- Unusual admin access patterns

## 🆘 **Emergency Procedures**

### **If Compromised**
1. **Immediate**: Block suspicious IPs
2. **Short-term**: Change all passwords
3. **Medium-term**: Review and update security
4. **Long-term**: Implement additional measures

### **Contact Information**
- **Security Team**: security@zerodigital.ai
- **Admin Access**: admin@zerodigital.ai
- **Emergency**: +91-7702661991

## 📚 **Additional Resources**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Rate Limiting Strategies](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

---

**Remember**: Security is an ongoing process, not a one-time implementation. Regular monitoring and updates are essential for maintaining a secure website.
