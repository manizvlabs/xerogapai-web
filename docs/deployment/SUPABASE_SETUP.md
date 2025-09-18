# Supabase Setup Guide

This guide will help you set up Supabase PostgreSQL for persistent contact management in the Zero Digital Website.

## 🎯 Overview

The Zero Digital Website uses Supabase as the primary database for contact form submissions. Supabase offers a generous free tier with 500MB database storage and 50,000 monthly active users, making it perfect for small to medium businesses.

## 📋 Prerequisites

- Supabase account (free at [supabase.com](https://supabase.com))
- Vercel account with deployed project
- Access to your project's environment variables

## 🚀 Step 1: Create Supabase Project

### Create New Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Choose your organization
4. Fill in project details:
   - **Name**: `zero-digital-website`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `us-east-1` for US East)
5. Click **"Create new project"**
6. Wait for the project to be ready (2-3 minutes)

### Get Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## 🔧 Step 2: Configure Environment Variables

### In Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `zero-digital-website`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key | Supabase anonymous key |

### In Local Development

Create or update `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🗄️ Step 3: Create Database Schema

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run this SQL to create the contacts table:

```sql
-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_submitted_at ON contacts(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_service ON contacts(service);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on contacts" ON contacts
  FOR ALL USING (true);
```

### Option B: Automatic Creation

The application will automatically create the table on first API call if it doesn't exist.

## 📊 Step 4: Migrate Existing Data

If you have existing contact data in `data/contacts.json`, migrate it:

```bash
# Test Supabase connection first
npm run test:supabase

# Migrate existing contacts
npm run migrate:supabase
```

## 🧪 Step 5: Test the Integration

### Test Database Connection

```bash
npm run test:supabase
```

### Test Contact Form

1. **Deploy the changes:**
   ```bash
   git add .
   git commit -m "feat: configure Supabase for contact management"
   git push origin feature/v2
   ```

2. **Test contact form submission:**
   - Visit your live site
   - Submit a test contact form
   - Check the admin panel to verify data persistence

3. **Verify in Supabase:**
   - Go to Supabase Dashboard → Table Editor
   - Check the `contacts` table for new submissions

## 🔍 Step 6: Monitor and Verify

### Check Database Status

1. **Supabase Dashboard:**
   - Go to **Table Editor** → `contacts` table
   - Monitor **Logs** for any errors
   - Check **Database** → **Usage** for storage metrics

2. **Application Logs:**
   - Check Vercel function logs for database connection status
   - Look for "✅ Supabase database initialized successfully" messages

### Test Contact Management

1. **Submit a contact form** on your live site
2. **Check admin panel** at `/admin/contacts`
3. **Verify data persistence** by refreshing the page
4. **Test search and filtering** functionality

## 🚨 Troubleshooting

### Common Issues

1. **Database not connecting:**
   - Verify environment variables are set correctly
   - Check if Supabase project is active
   - Ensure database password is correct

2. **Schema creation fails:**
   - Check database permissions
   - Verify SQL syntax
   - Look for error messages in Supabase logs

3. **Migration fails:**
   - Ensure database is accessible
   - Check file permissions for `data/contacts.json`
   - Verify JSON file format

### Debug Commands

```bash
# Check environment variables
vercel env ls

# Test Supabase connection
npm run test:supabase

# View function logs
vercel logs
```

## 📈 Benefits of Supabase

- **Free Tier**: 500MB database storage, 50,000 monthly active users
- **Real-time**: Built-in real-time subscriptions
- **Authentication**: Built-in user authentication system
- **API**: Auto-generated REST and GraphQL APIs
- **Dashboard**: Beautiful admin interface
- **Security**: Row Level Security (RLS) built-in
- **Backup**: Automatic backups and point-in-time recovery

## 🔄 Fallback Behavior

The application is designed to gracefully fall back to file storage if:
- Supabase connection fails
- Environment variables are missing
- Database is temporarily unavailable

This ensures your contact form always works, even during database maintenance.

## 🔐 Security Considerations

### Row Level Security (RLS)

The contacts table has RLS enabled. You can customize the policies based on your needs:

```sql
-- Example: Only allow authenticated users to read contacts
CREATE POLICY "Only authenticated users can read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Example: Allow anyone to insert contacts (for contact forms)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);
```

### API Keys

- **Anon Key**: Safe to use in client-side code
- **Service Role Key**: Keep secret, only use in server-side code

## 📞 Support

If you encounter issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review application logs in Vercel Dashboard
3. Check Supabase logs in the dashboard
4. Test database connection using the provided scripts
5. Contact Supabase support for database-specific issues

## 🎉 Next Steps

After completing this setup:

1. **Monitor Usage**: Check Supabase dashboard for storage and usage metrics
2. **Set up Alerts**: Configure alerts for storage limits
3. **Backup Strategy**: Review Supabase backup settings
4. **Security Review**: Customize RLS policies for your needs
5. **Performance**: Monitor query performance and optimize as needed

---

**Congratulations!** Your contact management system is now powered by Supabase and fully persistent! 🚀
