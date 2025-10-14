-- Add consultation-specific columns to contacts table
-- Run this in your Supabase SQL Editor

ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS job_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS company_size VARCHAR(50),
ADD COLUMN IF NOT EXISTS industry VARCHAR(100),
ADD COLUMN IF NOT EXISTS website VARCHAR(255),
ADD COLUMN IF NOT EXISTS preferred_date DATE,
ADD COLUMN IF NOT EXISTS preferred_time TIME,
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50),
ADD COLUMN IF NOT EXISTS consultation_goals TEXT,
ADD COLUMN IF NOT EXISTS current_challenges TEXT,
ADD COLUMN IF NOT EXISTS budget VARCHAR(50),
ADD COLUMN IF NOT EXISTS timeline VARCHAR(50),
ADD COLUMN IF NOT EXISTS additional_notes TEXT,
ADD COLUMN IF NOT EXISTS consultation_type VARCHAR(100);

-- Create indexes for consultation queries
CREATE INDEX IF NOT EXISTS idx_contacts_consultation_type ON contacts(consultation_type);
CREATE INDEX IF NOT EXISTS idx_contacts_preferred_date ON contacts(preferred_date);
CREATE INDEX IF NOT EXISTS idx_contacts_industry ON contacts(industry);

-- Update RLS policies to include new columns
-- (The existing policy should already cover all columns since it uses 'true')
