/*
  # Create Contact Submissions and Newsletter Tables

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text)
      - `message` (text, required)
      - `created_at` (timestamptz)
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `subscribed_at` (timestamptz)
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on both tables
    - Add insert policy for anonymous users to submit contact forms
    - Add insert policy for anonymous users to subscribe to newsletter
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    length(name) > 0 AND
    length(email) > 0 AND
    length(message) > 0
  );

CREATE POLICY "Allow anonymous newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (length(email) > 0);
