# Security Review

**Date:** 2026-04-21  
**Scope:** VyaptIX website codebase — client bundle, serverless API, environment variables, data collection

---

## Critical Issues

### 1. Zoho CRM OAuth Credentials Exposed in Client Bundle

**Severity: CRITICAL**

**Location:** `.env` / `src/services/zohoService.ts`

**Problem:** `VITE_ZOHO_CLIENT_ID`, `VITE_ZOHO_CLIENT_SECRET`, and `VITE_ZOHO_REFRESH_TOKEN` use the `VITE_` prefix. Vite injects all `VITE_` variables into the client-side JavaScript bundle at build time. Anyone can inspect the built JS and extract these credentials.

With these credentials, an attacker can:
- Create unlimited fake leads in your Zoho CRM
- Read or modify your Zoho CRM data
- Exhaust your Zoho API limits

**Fix:**
1. Remove `VITE_` prefix from all Zoho variables in `.env`
2. In `api/submit-to-zoho.ts`, read them via `process.env.ZOHO_CLIENT_ID` (server-side only)
3. Remove all references to `import.meta.env.VITE_ZOHO_*` from any client-side file
4. Rotate the compromised refresh token in Zoho OAuth settings immediately

---

### 2. No Rate Limiting on Contact Form API

**Severity: HIGH**

**Location:** `api/submit-to-zoho.ts`

**Problem:** The `/api/submit-to-zoho` endpoint has no rate limiting. A bot can submit thousands of requests per second, flooding your Zoho CRM with fake leads and potentially exhausting Zoho API quota.

**Fix:**
- Add Vercel's built-in rate limiting (available on Pro plan)
- Or implement Redis-based rate limiting via Upstash (serverless-friendly)
- Minimum: limit to 5 submissions per IP per hour

---

### 3. No CSRF Protection on API Endpoint

**Severity: MEDIUM**

**Location:** `api/submit-to-zoho.ts`

**Problem:** The form submission API accepts requests from any origin (CORS headers are set permissively). Cross-origin form submission attacks are possible.

**Fix:**
- Add an `Origin` header check in the serverless function
- Restrict CORS to `https://vyaptix.com` and `https://www.vyaptix.com`
- Or implement a CSRF token in the form

---

### 4. No Cookie Consent / GDPR Banner

**Severity: HIGH (Legal Risk)**

**Problem:** The website collects IP addresses, user agents, and personal data via the contact form without:
- A cookie consent banner
- A clear privacy notice at point of data collection
- A link to a Privacy Policy on the contact page

This violates GDPR (EU), CCPA (California), and ironically, DPDP (India — which VyaptIX sold as a compliance product).

**Fix:**
- Implement a cookie consent banner (e.g., CookieYes, Cookiebot, or custom)
- Create a Privacy Policy page at `/privacy-policy`
- Create a Terms of Service page at `/terms-of-service`
- Add "By submitting, you agree to our Privacy Policy" text to the contact form
- Update `Footer.tsx` to link to real `/privacy-policy` and `/terms-of-service` pages

---

### 5. File Upload Without Content-Type Validation

**Severity: MEDIUM**

**Location:** `api/submit-to-zoho.ts`

**Problem:** File uploads are accepted without validating that the uploaded file is actually the declared file type. A malicious user could rename a script as `document.pdf` and upload it.

**Fix:**
- Validate file MIME type using magic bytes (not just extension)
- Use a library like `file-type` to detect actual content
- Restrict allowed types explicitly: PDF, DOC, DOCX, JPG, PNG only

---

### 6. Supabase Anon Key — Verify Row-Level Security

**Severity: MEDIUM**

**Location:** `src/services/contactService.ts`

**Problem:** The Supabase anon key is exposed in the client bundle (via `VITE_SUPABASE_ANON_KEY`). This is normal for Supabase, but it requires Row-Level Security (RLS) to be correctly configured, otherwise anyone with the anon key can read all contact submissions.

**Fix:**
- Verify RLS is enabled on the `contacts` table in Supabase dashboard
- Policy should allow INSERT for anon role, but SELECT only for authenticated roles
- Test: try reading contacts via the anon key from browser console — should return empty/error

---

### 7. Privacy Policy and Terms Pages Are Placeholders

**Severity: MEDIUM (Legal Risk)**

**Location:** `src/components/layout/Footer.tsx`

**Problem:** Footer links "Privacy Policy" and "Terms of Service" both point to `#`. These are legal requirements for any website collecting personal data.

**Fix:** Create dedicated pages at `/privacy-policy` and `/terms-of-service`.

---

## Low Severity / Best Practice Gaps

| Issue | Location | Recommendation |
|---|---|---|
| No Content Security Policy header | Vercel config | Add CSP via `vercel.json` headers |
| No X-Frame-Options header | Vercel config | Add `X-Frame-Options: DENY` |
| No referrer policy | index.html | Add `<meta name="referrer" content="strict-origin-when-cross-origin">` |
| Facebook URL placeholder | Footer.tsx | Replace `https://facebook.com` with actual brand page |
| Error messages potentially expose internals | zohoService.ts | Ensure caught errors return generic messages to client |

---

## Security Checklist for Pre-Launch

- [ ] Rotate Zoho refresh token (treat as compromised)
- [ ] Move Zoho credentials to server-side env vars (no VITE_ prefix)
- [ ] Implement rate limiting on `/api/submit-to-zoho`
- [ ] Add CORS restriction to production domain only
- [ ] Verify Supabase RLS policies
- [ ] Add file type validation for uploads
- [ ] Create Privacy Policy page
- [ ] Create Terms of Service page
- [ ] Add cookie consent banner
- [ ] Add security headers in `vercel.json`
