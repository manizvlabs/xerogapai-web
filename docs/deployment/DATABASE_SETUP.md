# Database Setup for Contact Form Management

## Overview

The contact form management system now supports **persistent data storage** using Vercel Postgres. This ensures that contact form submissions are **not lost** when the site is deployed or restarted.

## Current Behavior

- **Development**: Uses in-memory storage (data lost on restart)
- **Production**: Uses Vercel Postgres (data persists across deployments)

## Setting Up Vercel Postgres

### 1. Install Vercel Postgres

```bash
npm install @vercel/postgres
```

### 2. Create Vercel Postgres Database

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Choose a name for your database
7. Select a region close to your users

### 3. Environment Variables

Vercel will automatically add these environment variables to your project:

```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

### 4. Deploy to Vercel

The database schema will be automatically created when the first contact form is submitted.

## Database Schema

The system creates a `contacts` table with the following structure:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);
```

## Features

### ✅ **Data Persistence**
- Contact form submissions are stored in PostgreSQL
- Data survives deployments, restarts, and cold starts
- Automatic schema creation and migration

### ✅ **Fallback System**
- If database is unavailable, falls back to in-memory storage
- Graceful error handling
- No data loss during development

### ✅ **Performance Optimized**
- Database indexes for fast queries
- Connection pooling for scalability
- Efficient pagination and filtering

### ✅ **Security**
- SQL injection protection
- Input validation and sanitization
- Secure connection strings

## Testing

### Local Development
```bash
# Test contact form submission
curl -X POST "http://localhost:3000/api/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "service": "AI Content Automation",
    "message": "Test message"
  }'

# Test contact retrieval
curl -X GET "http://localhost:3000/api/contacts"

# Test statistics
curl -X GET "http://localhost:3000/api/contacts/stats"
```

### Production
The same API endpoints work in production with persistent storage.

## Migration from In-Memory Storage

If you have existing data in the in-memory storage, you can migrate it by:

1. Exporting the data from the current system
2. Importing it into the new database
3. Or simply let users resubmit forms (recommended for contact forms)

## Monitoring

### Database Health
- Check Vercel dashboard for database status
- Monitor connection usage
- Set up alerts for database errors

### Application Logs
- Database initialization logs
- Fallback activation logs
- Error tracking and monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check environment variables
   - Verify database is created in Vercel
   - Check network connectivity

2. **Schema Creation Failed**
   - Check database permissions
   - Verify SQL syntax
   - Check for existing table conflicts

3. **Fallback Activated**
   - Check database connection
   - Verify environment variables
   - Check Vercel Postgres status

### Debug Mode

Enable debug logging by setting:
```env
DEBUG_DATABASE=true
```

## Cost Considerations

### Vercel Postgres Pricing
- **Hobby**: $0/month (512MB storage, 1GB bandwidth)
- **Pro**: $20/month (8GB storage, 100GB bandwidth)
- **Team**: $20/month per member

### Storage Estimates
- Each contact submission: ~1KB
- 1,000 contacts: ~1MB
- 10,000 contacts: ~10MB

## Security Best Practices

1. **Environment Variables**
   - Never commit database credentials
   - Use Vercel's secure environment variable storage
   - Rotate credentials regularly

2. **Database Access**
   - Use connection pooling
   - Implement proper error handling
   - Monitor for suspicious activity

3. **Data Protection**
   - Encrypt sensitive data
   - Implement data retention policies
   - Regular backups

## Next Steps

1. **Set up Vercel Postgres** following the steps above
2. **Deploy to Vercel** to test the production setup
3. **Monitor the system** for any issues
4. **Set up backups** if needed for critical data
5. **Consider data retention policies** for GDPR compliance

The system is now production-ready with persistent data storage! 🚀
