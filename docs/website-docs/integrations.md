# Integrations

## 1. Supabase (PostgreSQL)

**Purpose:** Persist contact form submissions to a managed PostgreSQL database.

**Files:**
- `src/services/contactService.ts` — Supabase client + `createContact()` function
- `prisma/schema.prisma` — Contact model definition

**Auth:** Anon key via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Security Note:** The Supabase anon key is exposed to the browser (VITE_ prefix). Row-level security (RLS) policies must be configured in Supabase dashboard to prevent unauthorized reads. Verify RLS is enabled on the `contacts` table.

**Contact Fields Stored:**
- Personal: salutation, firstName, lastName, email, phone
- Company: company, jobTitle, website, companySize, industry, annualRevenue, employees, rating
- Address: street, city, state, country, zip
- Consultation: preferredDate, preferredTime, timezone, goals, challenges, budget, timeline, notes
- System: createdAt, ipAddress, userAgent

---

## 2. Zoho CRM

**Purpose:** Create leads in Zoho CRM from contact form submissions.

**Files:**
- `src/services/zohoService.ts` — OAuth2 token management + lead creation
- `api/submit-to-zoho.ts` — Vercel serverless function entry point

**Auth:** OAuth2 with refresh token rotation
- `VITE_ZOHO_CLIENT_ID`
- `VITE_ZOHO_CLIENT_SECRET`
- `VITE_ZOHO_REFRESH_TOKEN`

**Security Note:** These are currently using VITE_ prefix which exposes them to the browser bundle. This is a security risk. These must be moved to Vercel environment variables WITHOUT the VITE_ prefix and only accessed server-side in the `/api/` function. See [security-review.md](../qa-docs/security-review.md).

**Token Handling:**
- Access token is cached in memory with a 5-minute safety margin before expiry
- On 401 response, token is refreshed automatically
- Retry logic: max 3 retries with exponential backoff
- Refresh token is rotated on each OAuth call (Zoho standard behavior)

**Lead Field Mapping (Custom Zoho Fields):**

| Form Field | Zoho CRM Field |
|---|---|
| firstName + lastName | Last_Name |
| email | Email |
| phone | Phone |
| company | Company |
| jobTitle | Title |
| serviceInterested | Custom: Service_Interested |
| companySize | Custom: Company_Size |
| industry | Industry |
| annualRevenue | Annual_Revenue |
| goals | Custom: Goals |
| challenges | Custom: Challenges |
| budget | Custom: Budget |
| timeline | Custom: Timeline |
| preferredDate + preferredTime | Custom: Preferred_Meeting_Time |

**File Attachments:**
- Max 10MB per file
- Handled by Formidable (production/Vercel) or Multer (local dev)
- Attached to Zoho lead after creation via separate API call

---

## 3. External Review Platform

**URL:** `https://reviews.vyaptix.ai`

**Purpose:** Separate product — the actual AI Review Generation platform where customers collect Google reviews.

**Integration with website:** Internal links only — no API integration. The website markets the product; the platform is a separate codebase/domain.

---

## 4. OpenAI (Configured, Not Yet Active)

**Environment Variable:** `OPENAI_API_KEY`

**Status:** API key is configured in environment but no active OpenAI calls in current codebase. Placeholder for future features.

---

## 5. Social Media Links

Hardcoded in `src/components/layout/Footer.tsx`:
- Instagram: `https://www.instagram.com/vyaptixai/`
- LinkedIn: `https://www.linkedin.com/company/vyaptix-ai`
- Twitter/X: `https://x.com/Vyaptix_ai`
- Facebook: `https://facebook.com` (placeholder — not brand-specific URL)

**Action Required:** Update Facebook link to actual VyaptIX Facebook page URL.
