# Vercel Postgres Setup Guide

This guide will help you set up Vercel Postgres for persistent contact management in the Zero Digital Website.

## 🎯 Overview

The Zero Digital Website currently uses file-based storage for contact form submissions. This guide will help you migrate to Vercel Postgres for persistent, scalable data storage that survives deployments.

## 📋 Prerequisites

- Vercel account with a deployed project
- Vercel CLI installed (`npm i -g vercel`)
- Access to your Vercel project dashboard

## 🚀 Step 1: Create Vercel Postgres Database

### Option A: Using Vercel Dashboard (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `zero-digital-website`
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name: `zero-digital-db`
7. Select a region close to your users (e.g., `iad1` for US East)
8. Click **Create**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create Postgres database
vercel storage create postgres zero-digital-db
```

## 🔧 Step 2: Configure Environment Variables

After creating the database, Vercel will automatically add these environment variables to your project:

- `POSTGRES_URL` - Connection string for the database
- `POSTGRES_PRISMA_URL` - Prisma-compatible connection string
- `POSTGRES_URL_NON_POOLING` - Non-pooling connection string
- `POSTGRES_USER` - Database username
- `POSTGRES_HOST` - Database host
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

### Verify Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Confirm these variables are present:
   - `POSTGRES_URL`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

## 🗄️ Step 3: Database Schema

The application will automatically create the required tables on first run. The schema includes:

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

-- Indexes for performance
CREATE INDEX idx_contacts_submitted_at ON contacts(submitted_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_service ON contacts(service);
```

## 📊 Step 4: Migrate Existing Data

If you have existing contact data in `data/contacts.json`, you can migrate it using the provided migration script:

```bash
# Run the migration script
npm run migrate:contacts
```

## 🧪 Step 5: Test the Integration

1. **Deploy the changes:**
   ```bash
   git add .
   git commit -m "feat: configure Vercel Postgres for contact management"
   git push origin feature/v2
   ```

2. **Test contact form submission:**
   - Visit your live site
   - Submit a test contact form
   - Check the admin panel to verify data persistence

3. **Verify database connection:**
   - Go to Vercel Dashboard → Storage
   - Click on your database
   - Check the **Tables** tab to see the `contacts` table

## 🔍 Step 6: Monitor and Verify

### Check Database Status

1. **Vercel Dashboard:**
   - Go to **Storage** → Your Database
   - Check **Tables** tab for `contacts` table
   - Monitor **Usage** tab for storage and query metrics

2. **Application Logs:**
   - Check Vercel function logs for database connection status
   - Look for "✅ Database initialized successfully" messages

### Test Contact Management

1. **Submit a contact form** on your live site
2. **Check admin panel** at `/admin/contacts`
3. **Verify data persistence** by refreshing the page
4. **Test search and filtering** functionality

## 🚨 Troubleshooting

### Common Issues

1. **Database not connecting:**
   - Verify environment variables are set correctly
   - Check if database is in the same region as your functions
   - Ensure database is not paused

2. **Schema creation fails:**
   - Check database permissions
   - Verify connection string format
   - Look for error messages in function logs

3. **Migration fails:**
   - Ensure database is accessible
   - Check file permissions for `data/contacts.json`
   - Verify JSON file format

### Debug Commands

```bash
# Check environment variables
vercel env ls

# View function logs
vercel logs

# Test database connection locally
npm run test:db
```

## 📈 Benefits of Vercel Postgres

- **Persistent Storage:** Data survives deployments and server restarts
- **Scalability:** Handles high traffic and large datasets
- **Performance:** Optimized for serverless functions
- **Security:** Built-in encryption and access controls
- **Monitoring:** Built-in metrics and logging
- **Backup:** Automatic backups and point-in-time recovery

## 🔄 Fallback Behavior

The application is designed to gracefully fall back to file storage if:
- Database connection fails
- Environment variables are missing
- Database is temporarily unavailable

This ensures your contact form always works, even during database maintenance.

## 📞 Support

If you encounter issues:

1. Check the [Vercel Postgres documentation](https://vercel.com/docs/storage/vercel-postgres)
2. Review application logs in Vercel Dashboard
3. Test database connection using the provided scripts
4. Contact Vercel support for database-specific issues

---

**Next Steps:** After completing this setup, your contact management system will be fully persistent and production-ready! 🎉
