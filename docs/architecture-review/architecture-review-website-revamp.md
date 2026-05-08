# Solution Architecture Review — VyaptIX Website Revamp
**Reviewed by:** VyaptIX Solution Architect Agent  
**Date:** 2026-04-21  
**Input:** REVAMP-MASTER-PLAN.md + all website-docs + live codebase inspection  
**PM Review:** docs/pm-review/pm-review-website-revamp.md  
**Verdict:** Architecture is appropriate for the product's scale. 4 bugs found in live code. Security fix plan is 90% correct but needs one amendment. All new additions are architecturally straightforward. 6 missing technical decisions documented below.

---

## 1. Tech Stack Assessment

### Is the current stack appropriate for the revamp goals?

**Verdict: YES — stack is well-chosen for this use case. No changes needed.**

| Layer | Current | Assessment |
|---|---|---|
| React 18 + TypeScript | Marketing website SPA | ✅ Correct. A marketing website does not need SSR (Next.js) at this stage. Vite build is fast. TypeScript strict mode reduces runtime bugs. |
| React Router DOM v7 | Client-side routing | ✅ Correct. Note: v7 has breaking changes from v5/v6 — existing code appears to use v7 APIs correctly. Do not reference v6 docs. |
| Tailwind CSS v3 | Styling | ✅ Correct. Design tokens via tailwind.config.js is the right approach. Do NOT upgrade to Tailwind v4 during this revamp — breaking config changes, not worth the risk. |
| Vite 5.4 | Build tool | ✅ Correct. `VITE_` prefix convention is the one architectural issue (security) — detailed below. |
| Vercel + Serverless Functions | Hosting + API | ✅ Correct for this scale. Vercel Edge Network provides CDN, Functions handle the one server-side operation (Zoho CRM). No need for a dedicated backend. |
| Supabase (PostgreSQL) | Contact storage | ✅ Correct. Anon key + RLS is the standard Supabase pattern for client-side writes. Verify RLS is configured. |
| Zoho CRM | Lead management | ✅ Correct integration choice. OAuth2 is the right auth method. Architecture gap documented below. |
| Prisma 6.x | ORM | ⚠️ Partially used — schema exists in `prisma/schema.prisma` but Prisma is NOT used in the serverless function. `contactService.ts` uses the Supabase JS client directly, bypassing Prisma entirely. **Prisma is dead weight as currently configured** — either use it or remove it. |
| node-fetch | HTTP client in ZohoService | ⚠️ Minor: `node-fetch` is a Node.js 16-era polyfill. Vercel's runtime supports native `fetch` (Node 18+). Should be replaced with native fetch to reduce bundle size in the serverless function. |

### What NOT to change during this revamp

- React version (18 → 19 would be a separate upgrade)
- Tailwind v3 → v4 (risky, low return for this revamp)
- React Router v7 (already on latest)
- Vercel hosting (appropriate for current scale)

---

## 2. Architecture Diagram

### Current State

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (React SPA)                       │
│  Home  │  Solutions  │  AIReview  │  About  │  Blog/Contact │
│                                                              │
│  contactService.ts ──────────────────────────────────────┐  │
│  (Supabase JS client — writes directly to DB)            │  │
│                                                          │  │
│  Contact Form ──► POST /api/submit-to-zoho ─────────┐   │  │
└────────────────────────────────────────────────────┼──┼──┘
                                                     │  │
              ┌──────────────────────────────────────┘  │
              ▼                                          ▼
┌─────────────────────────────┐         ┌───────────────────────┐
│   Vercel Serverless Fn      │         │   Supabase (PostgreSQL)│
│   api/submit-to-zoho.ts     │         │   contacts table       │
│   ├── formidable (parse)    │         │   RLS: INSERT=anon     │
│   ├── zohoService.ts        │         │   SELECT=auth only     │
│   └── Zoho API calls        │         └───────────────────────┘
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Zoho CRM (India region)   │
│   crm.zoho.in/crm/v2.2      │
│   OAuth2 (refresh token)    │
│   Lead creation             │
│   File attachment upload    │
└─────────────────────────────┘

EXTERNAL LINKS ONLY (no API):
   reviews.vyaptix.ai  ←  separate product/codebase
```

### Target State (Post-Revamp)

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (React SPA)                           │
│                                                                  │
│  HelmetProvider (react-helmet-async)                             │
│  ├── SEO component on every page                                 │
│                                                                  │
│  PostHog JS (analytics)                                          │
│  ├── RouteTracker (fires $pageview on route change)              │
│  ├── trackEvent() on every CTA click                             │
│  └── Only fires if cookie-consent = 'accepted'                   │
│                                                                  │
│  CookieBanner (first-visit only, localStorage gated)             │
│                                                                  │
│  Pages:                                                          │
│  Home │ Solutions │ AIReview │ AgentMitra │ About │ Blog         │
│  Contact │ PrivacyPolicy │ TermsOfService │ 404                  │
│                                                                  │
│  contactService.ts ──────────────────────────────────────────┐  │
│  (6-field simplified payload — matches new Supabase schema)  │  │
│                                                              │  │
│  Contact Form ──► POST /api/submit-to-zoho ─────────────┐   │  │
└──────────────────────────────────────────────────────────┼───┼──┘
                                                           │   │
              ┌────────────────────────────────────────────┘   │
              ▼                                                 ▼
┌─────────────────────────────┐            ┌────────────────────────┐
│   Vercel Serverless Fn      │            │   Supabase (PostgreSQL) │
│   api/submit-to-zoho.ts     │            │   contacts table        │
│   ├── CORS: vyaptix.com only│            │   RLS verified ✅       │
│   ├── Rate limit: 5/IP/hr   │            └────────────────────────┘
│   ├── File type validation  │
│   ├── env: ZOHO_CLIENT_ID   │  ← no VITE_ prefix (server-side only)
│   └── zohoService.ts        │
└──────────────┬──────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Zoho CRM (India region)    │
│   crm.zoho.in/crm/v2.2       │
│   OAuth2 token: rotated ✅   │
│   6-field simplified payload │
└──────────────────────────────┘

STATIC ASSETS:
   public/vyaptix-logo.svg  (< 15KB — replacing 759KB PNG)
   public/sitemap.xml
   public/robots.txt
   public/og-default.jpg

EXTERNAL LINKS:
   reviews.vyaptix.ai  ←  external product
   calendly.com/vyaptix/30min  ←  demo booking
   posthog.com  ←  analytics ingest

SECURITY HEADERS (vercel.json):
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 3. Integration Architecture Review

### 3.1 Zoho CRM — Is the Integration Correctly Architected?

**Overall verdict: Well-built, but one critical bug and one structural issue found.**

#### ✅ What's correct

- `ZohoService` class with proper OAuth2 refresh token flow
- Retry logic with exponential backoff (3 retries, 1s/2s/3s delays)
- Token expiry managed with 5-minute safety margin
- Separate `createZohoService()` factory that checks env vars
- The serverless function (`api/submit-to-zoho.ts`) correctly uses `process.env` (server-side) — not `import.meta.env`

#### 🐛 Bug 1: Description field is built twice (content duplication)

**Location:** `api/submit-to-zoho.ts` lines 139–159 AND `zohoService.ts` `createLead()` lines 151–165

Both files independently prepend `"Service Interested In: ${service}"` and the consultation details block to the description. When a user submits the form, the final Zoho lead description will contain this content **twice**.

**Fix (apply during Phase 8 — contact form simplification):**
Remove the description-building logic from `submit-to-zoho.ts` entirely. Let `zohoService.createLead()` own the description construction. The handler should pass raw field values; the service constructs the final payload.

```typescript
// In submit-to-zoho.ts — REMOVE this block (lines 139–159):
let fullDescription = description || '';
if (service) {
  fullDescription = `Service Interested In: ${service}\n\n${fullDescription}`;
}
// ... rest of description building

// KEEP in zohoService.ts createLead() — it already handles this correctly
```

#### 🐛 Bug 2: Token cache is non-functional in production

**Location:** `zohoService.ts` — class-level `this.accessToken` and `this.tokenExpiry`

Vercel serverless functions are **stateless and ephemeral**. Each function invocation creates a new `ZohoService` instance with `this.accessToken = null`. The in-memory token cache (`this.accessToken`, `this.tokenExpiry`) only works if the same container is reused (warm invocation) — which Vercel does sometimes but cannot be relied upon.

**Impact:** Every contact form submission in production triggers a fresh Zoho token refresh call, adding ~200–400ms of latency. Not broken, but inefficient.

**Fix options (in priority order):**
1. **Accept it for now** — at current submission volume, this is acceptable. Each form submission is a one-off user action, not a bulk operation. The extra 300ms is negligible relative to form submission latency.
2. **Use Vercel KV (Redis)** to cache the token cross-invocation — overkill for current volume.
3. **Mark as [⏸ V2]** — implement token caching via Vercel KV when submission volume justifies it.

**Recommendation:** Accept and document. Do not add complexity for this scale.

#### ⚠️ Structural Issue: `zohoService.ts` lives in `src/services/`

`src/services/zohoService.ts` is in the client-side source directory. It is imported only from `api/submit-to-zoho.ts` (serverless function), not from any page component — so it does NOT get bundled into the browser. However, its location implies it could be imported client-side, which would be dangerous.

**Fix:** Move `zohoService.ts` to `api/lib/zohoService.ts` to make the server-side-only intent explicit. Update the import in `submit-to-zoho.ts`.

```
api/
├── submit-to-zoho.ts
└── lib/
    └── zohoService.ts    ← move here from src/services/
```

This is a low-risk refactor that clarifies the architecture for any future developer.

---

### 3.2 Supabase — Is the Integration Correctly Architected?

**Overall verdict: Correct pattern. One verification required before launch.**

- Client-side writes using the anon key is the **standard Supabase pattern** — not a security flaw, as long as RLS is correctly configured
- The `contactService.ts` handles the direct browser → Supabase write correctly
- `snake_case` field names in `ContactData` interface match PostgreSQL convention for the Supabase table

#### ⚠️ Required: Verify RLS Policies in Supabase Dashboard

Before the revamp ships, verify these RLS policies exist on the `contacts` table:

```sql
-- Allow any user to INSERT (contact form submission)
CREATE POLICY "allow_insert_for_anon"
ON contacts FOR INSERT
TO anon
WITH CHECK (true);

-- Block all SELECT for anon (no one should read contact data from browser)
CREATE POLICY "deny_select_for_anon"  
ON contacts FOR SELECT
TO anon
USING (false);
```

**Test:** Open browser console on vyaptix.com, run:
```javascript
const { data } = await supabase.from('contacts').select('*');
console.log(data); // Must return [] or error, NOT actual contact records
```

#### ⚠️ Schema Impact of Contact Form Simplification (Phase 8)

The simplified 6-field form sends a much smaller payload. `contactService.ts` currently accepts 30+ fields in `ContactData`. The Supabase schema must accept the smaller payload without violating NOT NULL constraints.

**Verify:** All fields in the Supabase `contacts` table except the 4 required fields (first_name, last_name, email, company) are nullable. If any of the currently-always-sent fields have NOT NULL constraints in the DB, the simplified form will cause insert failures.

**Action before Phase 8:** Check Supabase table schema — confirm all non-core fields are nullable.

---

### 3.3 PostHog — Is the Proposed Integration Correctly Architected?

**Verdict: YES — but one critical architectural gap in the plan.**

The REVAMP-MASTER-PLAN.md uses `import.meta.env.VITE_POSTHOG_KEY` for the PostHog key:

```typescript
posthog.init(import.meta.env.VITE_POSTHOG_KEY, { ... })
```

**This is correct and intentional** — unlike Zoho credentials, the PostHog project API key is designed to be public (client-side). It identifies your PostHog project but cannot be used to read your analytics data. Using `VITE_` prefix here is appropriate.

#### ⚠️ Gap: Analytics must respect cookie consent

The plan installs PostHog unconditionally in `App.tsx` via `useEffect`. This fires before the user has accepted the cookie consent banner. This violates GDPR — you cannot fire analytics tracking before consent.

**Fix (add to analytics.ts):**

```typescript
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  const consent = localStorage.getItem('cookie-consent');
  
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false,
    persistence: 'localStorage',
    // Key: only load if consent given, otherwise bootstrap in memory-only mode
    loaded: (ph) => {
      if (consent !== 'accepted') {
        ph.opt_out_capturing(); // PostHog built-in opt-out
      }
    }
  });
}

// Call this when user clicks "Accept" in CookieBanner
export function enableAnalytics() {
  posthog.opt_in_capturing();
  trackPageView(window.location.pathname);
}

// Call this when user clicks "Decline"
export function disableAnalytics() {
  posthog.opt_out_capturing();
}
```

In `CookieBanner.tsx`:
```typescript
import { enableAnalytics, disableAnalytics } from '../../lib/analytics';

const accept = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  enableAnalytics();  // ← ADD THIS
  setVisible(false);
};

const decline = () => {
  localStorage.setItem('cookie-consent', 'declined');
  disableAnalytics(); // ← ADD THIS
  setVisible(false);
};
```

This is a required architectural change that is missing from the plan.

---

### 3.4 react-helmet-async — Is the Proposed Integration Correctly Architected?

**Verdict: YES — plan is correct. One addition recommended.**

The plan correctly:
- Wraps `<App>` in `<HelmetProvider>` in `main.tsx`
- Creates a reusable `SEO` component with title, description, OG tags, Twitter cards
- Sets `noIndex={true}` on ThankYou, PrivacyPolicy pages

**One addition:** Add canonical URL support to the `SEO` component. Without canonical tags, Google may index multiple URL variants (with/without trailing slash, query params) as separate pages.

```tsx
// Add to SEOProps:
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;  // ← ADD
}

// Add to Helmet output:
const siteUrl = 'https://vyaptix.com';
const canonicalUrl = canonical || `${siteUrl}${window.location.pathname}`;

<link rel="canonical" href={canonicalUrl} />
```

---

## 4. Security Fix Plan — Technical Analysis

### Is the Zoho credentials fix technically sound?

**Verdict: 90% correct. One amendment needed.**

#### What the plan says to do:
1. Remove `VITE_` prefix from Zoho env vars in `.env`
2. In `api/submit-to-zoho.ts`, read via `process.env.ZOHO_CLIENT_ID`
3. Remove all `import.meta.env.VITE_ZOHO_*` references
4. Rotate the Zoho refresh token

#### What the code actually does (from live inspection):

In `zohoService.ts` (line 356–358):
```typescript
const clientId = process.env.ZOHO_CLIENT_ID || process.env.VITE_ZOHO_CLIENT_ID;
const clientSecret = process.env.ZOHO_CLIENT_SECRET || process.env.VITE_ZOHO_CLIENT_SECRET;
const refreshToken = process.env.ZOHO_REFRESH_TOKEN || process.env.VITE_ZOHO_REFRESH_TOKEN;
```

**The code already prefers `ZOHO_*` over `VITE_ZOHO_*`.** This means the fix is simpler than the plan describes:

1. In Vercel dashboard: add `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` (without VITE prefix)
2. In Vercel dashboard: delete `VITE_ZOHO_CLIENT_ID`, `VITE_ZOHO_CLIENT_SECRET`, `VITE_ZOHO_REFRESH_TOKEN`
3. In `.env` file: remove all `VITE_ZOHO_*` lines, add `ZOHO_*` lines (for local dev only — never commit real values)
4. No code changes needed in `zohoService.ts` — the fallback is already correct
5. Rotate the Zoho refresh token

**The amendment:** Do NOT remove the `process.env.VITE_ZOHO_CLIENT_ID` fallback from `zohoService.ts` during the fix. Remove it later once you've confirmed the new variables work. Rollback is easier this way.

#### CORS Fix — Critical Gap in the Plan

**The plan mentions CORS as a medium-severity issue but does NOT include a fix in the implementation spec.**

Current code in `submit-to-zoho.ts`:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');  // ← WIDE OPEN
```

This allows any website on the internet to POST to your Zoho submission endpoint. A competitor or attacker could spam your CRM with fake leads from their website.

**Fix — add to `submit-to-zoho.ts`:**

```typescript
const ALLOWED_ORIGINS = [
  'https://vyaptix.com',
  'https://www.vyaptix.com',
  'http://localhost:5173',  // local dev
  'http://localhost:3000',  // local API dev
];

const allowCors = (fn: ...) => async (req: VercelRequest, res: VercelResponse) => {
  const origin = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  res.setHeader('Access-Control-Allow-Origin', allowed);  // ← specific origin, not *
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // ... rest of headers
};
```

**This must be part of Phase 7, not deferred.**

#### Rate Limiting — Plan Mentions It, Doesn't Spec It

The security review identifies rate limiting as HIGH severity. The master plan mentions it but doesn't include a code spec.

**Recommended implementation (no external dependencies):**

```typescript
// Lightweight in-memory rate limiter (sufficient for Vercel warm instances)
// Note: this resets on cold starts — for true rate limiting use Vercel KV (Pro plan)
const ipRateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;       // submissions
const RATE_WINDOW = 3600000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip);
  
  if (!record || now > record.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true; // allowed
  }
  
  if (record.count >= RATE_LIMIT) return false; // blocked
  
  record.count++;
  return true; // allowed
}

// In handler:
const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || 'unknown';
if (!checkRateLimit(ip)) {
  return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
}
```

**Caveat:** This in-memory approach resets on cold starts. For production-grade rate limiting, use Vercel KV (available on Pro plan) or Upstash Redis. Add this as a follow-up task after launch.

---

## 5. Architectural Risks and Anti-Patterns Found

### Risk 1: `vercel.json` Has No Security Headers (HIGH)

Current `vercel.json`:
```json
{ "rewrites": [{ "source": "/api/:path*", "destination": "/api/:path*" }] }
```

There are no security headers. The plan correctly includes adding them in Phase 7.3. **This is the easiest security win in the entire revamp — 30 minutes of work, zero risk of regression.**

Do this first, before any other code change.

### Risk 2: No 404 Catch-All Route in `App.tsx` (MEDIUM)

Current `App.tsx` has no `<Route path="*" />`. When a user navigates to an invalid URL:
- React Router renders nothing inside `<Layout>`
- The user sees a blank page with the header and footer
- No error indication, no navigation help

This is worse than a proper 404 page. Every invalid URL (mistyped, old links, bot probing) hits a blank page.

**Fix (Phase 2.4):**
```tsx
// In App.tsx, as the LAST route inside <Routes>:
import { NotFound } from './pages/NotFound';
<Route path="*" element={<NotFound />} />
```

### Risk 3: Blog Content Architecture Won't Scale (LOW — flag for V2)

Blog content is hardcoded in `src/data/blogs.ts` as a TypeScript file. Every new blog post requires:
1. A code change
2. A deployment
3. A developer

This is acceptable for 5–10 posts. At 20+ posts, VyaptIX will need a headless CMS (Contentful, Sanity, Notion as CMS via API). Flag this as [⏸ V2] — do not address during this revamp.

### Risk 4: Prisma Is Configured but Unused (LOW)

`prisma/schema.prisma` exists with a `Contact` model, but `contactService.ts` uses the Supabase JS client directly — completely bypassing Prisma. Prisma is an unused dependency adding to bundle overhead.

**Options:**
1. Remove Prisma entirely (simplest — the Supabase client is sufficient)
2. Migrate `contactService.ts` to use Prisma (more work, better type safety)

**Recommendation:** Remove Prisma during Phase 8 (contact form simplification). The Supabase client is already type-safe via the `ContactData` interface. Removing Prisma reduces dependency surface and eliminates confusion.

```bash
npm uninstall prisma @prisma/client
rm -rf prisma/
```

### Risk 5: `node-fetch` Should Be Replaced with Native fetch (LOW)

`zohoService.ts` imports `node-fetch`:
```typescript
import fetch from 'node-fetch';
```

Node.js 18+ (which Vercel uses) has native `fetch`. The `node-fetch` package adds ~50KB to the serverless function bundle and introduces a subtle difference: `node-fetch` v2 uses CommonJS, which can cause import issues with the ESM-based Vite build.

**Fix (minor, safe):**
```typescript
// Remove: import fetch from 'node-fetch';
// native fetch is available globally in Node 18+
```

Do this when moving `zohoService.ts` to `api/lib/`.

### Risk 6: File Upload MIME Validation Is Missing (MEDIUM)

`api/submit-to-zoho.ts` accepts file uploads and passes them to Zoho with no content-type validation. A malicious actor can upload a renamed `.exe` as `resume.pdf`.

The security review correctly identifies this. The plan does not include a code fix.

**Fix (add to `submit-to-zoho.ts` before Phase 8 ships):**

```typescript
import { fileTypeFromBuffer } from 'file-type'; // npm install file-type

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

// In attachment processing:
for (const attachment of attachments) {
  const buffer = attachment.buffer || fs.readFileSync(attachment.filepath);
  const fileType = await fileTypeFromBuffer(buffer);
  
  if (!fileType || !ALLOWED_MIME_TYPES.includes(fileType.mime)) {
    return res.status(400).json({ 
      error: `File type not allowed: ${attachment.originalFilename}` 
    });
  }
}
```

---

## 6. Recommended File and Component Structure for New Additions

### Complete target file structure for the revamp

```
src/
├── App.tsx                        ← ADD: NotFound route, RouteTracker, HelmetProvider
├── main.tsx                       ← ADD: HelmetProvider wrapper
│
├── pages/
│   ├── Home.tsx                   ← REVAMP (Phase 3)
│   ├── Solutions.tsx              ← UPDATE (Phase 4)
│   ├── AIReviewGeneration.tsx     ← ADD SEO component
│   ├── AgentMitra.tsx             ← CREATE (Phase 2.1 — blocked)
│   ├── About.tsx                  ← ADD SEO, later enhance (Phase 9)
│   ├── Contact.tsx                ← REVAMP to 6-field form (Phase 8)
│   ├── ThankYou.tsx               ← ADD SEO noIndex
│   ├── Blog.tsx                   ← ADD SEO
│   ├── BlogPost.tsx               ← ADD dynamic SEO per post
│   ├── PrivacyPolicy.tsx          ← CREATE (Phase 2.2 — blocked)
│   ├── TermsOfService.tsx         ← CREATE (Phase 2.3 — blocked)
│   └── NotFound.tsx               ← CREATE (Phase 2.4 — unblocked)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx             ← UPDATE navItems (Phase 1.2)
│   │   ├── Footer.tsx             ← UPDATE links (Phase 1.3)
│   │   ├── Layout.tsx             ← ADD CookieBanner
│   │   └── Section.tsx            ← no change
│   │
│   └── ui/
│       ├── Button.tsx             ← no change
│       ├── Card.tsx               ← no change
│       ├── Accordion.tsx          ← no change
│       ├── Badge.tsx              ← no change
│       ├── Breadcrumb.tsx         ← no change
│       ├── ScrollToTop.tsx        ← no change
│       └── CookieBanner.tsx       ← CREATE (Phase 7.2)
│
├── components/
│   └── SEO.tsx                    ← CREATE (Phase 6.2) — top-level component
│
├── lib/
│   └── analytics.ts               ← CREATE (Phase 5) — PostHog wrapper
│                                     with consent gating
│
├── services/
│   └── contactService.ts          ← UPDATE for 6-field payload (Phase 8)
│                                     REMOVE Prisma references
│
└── hooks/                         ← CREATE directory (future use)

api/
├── submit-to-zoho.ts              ← UPDATE: CORS fix, rate limit, MIME validation
└── lib/
    └── zohoService.ts             ← MOVE from src/services/ here

public/
├── sitemap.xml                    ← CREATE (Phase 6.4)
├── robots.txt                     ← CREATE (Phase 6.5)
└── og-default.jpg                 ← CREATE (Phase 6.7 — needs design)
```

### Component creation rules for new pages

Every new page file must follow this structure:

```tsx
// pages/NewPage.tsx
import { SEO } from '../components/SEO';

export function NewPage() {
  return (
    <>
      <SEO
        title="Page Title — VyaptIX"
        description="150-160 char description for search results."
      />
      {/* page content */}
    </>
  );
}
```

No page should be created without an `<SEO>` component.

---

## 7. Missing Technical Decisions

These decisions are NOT documented anywhere in the plan. Each must be made before the affected phase begins.

### Decision 1: How will cookie consent gate PostHog? (Required before Phase 5)

**The plan does not address this.** PostHog must not fire before consent is given. The fix is documented in Section 3.3 of this review. Decision: use PostHog's built-in `opt_out_capturing()` / `opt_in_capturing()` API. No third-party consent library needed.

**Status:** Resolved in this document. Implement as specified in Section 3.3.

---

### Decision 2: What happens to contact form data in Supabase with the simplified 6-field form? (Required before Phase 8)

**Options:**

| Option | Description | Recommendation |
|---|---|---|
| A | Keep existing `contacts` table schema unchanged — just send NULL for unused fields | ✅ Simplest. No DB migration needed. All columns already nullable. |
| B | Create a new `contacts_simple` table for Stage 1 submissions | ❌ Unnecessary complexity. Two tables for the same entity. |
| C | Migrate existing schema to remove unused columns | ❌ Risky. May break Zoho field mapping. |

**Recommendation:** Option A. The Supabase table already has all columns nullable except the core ones. Send only the 6 fields; all others default to NULL. No schema migration required.

**Action:** Verify in Supabase dashboard that `first_name`, `last_name`, `email`, `company` are NOT NULL, and all other columns ARE nullable.

---

### Decision 3: What is the Zoho CRM field mapping for the simplified 6-field form? (Required before Phase 8)

The current form sends 25+ fields to Zoho. The simplified form sends 6. The Zoho API requires certain fields. The mapping must be documented before Phase 8 code is written.

**Proposed 6-field → Zoho mapping:**

| Form Field | Zoho Field | Required in Zoho? |
|---|---|---|
| firstName | First_Name | Yes |
| lastName | Last_Name | Yes (Zoho requires Last_Name) |
| email | Email | Yes |
| company | Company | No (send as empty string if not required) |
| productInterest | Description (prefix line) | No |
| message | Description (body) | No |

**Additional fields to always send (not from form, set programmatically):**
- `Lead_Source`: `"Website"` (hardcoded)
- `Lead_Status`: `"New"` (hardcoded)

**Action:** Verify with Zoho CRM dashboard that Last_Name is the only required field in the Leads module. If Company is also required, it must stay in the Stage 1 form (it already is).

---

### Decision 4: Should the simplified contact form still submit to Supabase? (Required before Phase 8)

**Current behavior:** Browser writes to Supabase, then calls `/api/submit-to-zoho`. Both happen in parallel from the client.

**Options:**

| Option | Pros | Cons |
|---|---|---|
| A | Keep both — Supabase + Zoho | Backup record in Supabase; Zoho is not your only data store | Supabase anon key exposed (accepted risk with RLS) |
| B | Drop Supabase, use Zoho only | Simpler code | Single point of failure; no data backup if Zoho is down |
| C | Move Supabase write to serverless function | Credentials never in browser | Requires refactor of contactService.ts; more latency |

**Recommendation:** Keep Option A for now. The Supabase anon key + RLS pattern is the accepted Supabase design. Simplifying to Zoho-only creates a single point of failure with no fallback.

---

### Decision 5: Will the Stage 2 / Enterprise form be on the same page or a separate page? (Required before Phase 8)

**The plan says both:** it mentions "shown after Stage 1 submit, or as a separate booking page."

**Options:**

| Option | Implementation | UX Impact |
|---|---|---|
| A | Expandable section on same Contact page (opt-in "Tell us more") | Single page, lower friction for enterprise buyers | Slightly more complex state management |
| B | Redirect to `/contact/enterprise` after Stage 1 submit | Clear separation, easy to link directly | Extra page load, user must decide mid-flow |
| C | Skip Stage 2 entirely — route to Calendly after Stage 1 | Simplest implementation | No qualification data before call |

**Recommendation:** Option C for MVP. After Stage 1 submit, show inline success message + Calendly link. The enterprise qualification conversation happens on the call, not the form. This eliminates Stage 2 entirely and reduces implementation to 4 hours. Add Stage 2 qualification form in V2 if sales team requests it.

---

### Decision 6: Will `zohoService.ts` be moved to `api/lib/`? (Required before Phase 7.1)

This is a refactoring decision. The security fix can be implemented without moving the file, but the move should happen at the same time to clarify architecture.

**Recommendation:** Yes, move it during Phase 7.1. The risk is low (it's a file move + import path update in one file). Document it in the commit message.

---

## 8. Pre-Implementation Technical Checklist

Complete these before writing the first line of revamp code:

### Before Phase 7.1 (Security fix)
- [ ] Rotate the Zoho refresh token in Zoho Developer Console
- [ ] Add `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` to Vercel environment variables (no VITE_ prefix)
- [ ] Verify contact form still works end-to-end after rotating token
- [ ] Delete `VITE_ZOHO_*` from Vercel environment variables

### Before Phase 1 (Cleanup)
- [ ] Confirm you are on branch `revamp/website-v2` before any code edit
- [ ] Verify `npm run build` succeeds on the current branch (baseline)

### Before Phase 5 (Analytics)
- [ ] Create PostHog account at posthog.com
- [ ] Create project, copy Project API Key
- [ ] Add `VITE_POSTHOG_KEY` to `.env` and Vercel environment variables
- [ ] Confirm consent-gating pattern (Section 3.3 of this document) will be implemented

### Before Phase 8 (Contact form)
- [ ] Verify Supabase `contacts` table — all columns except first_name, last_name, email are nullable
- [ ] Confirm Zoho CRM field mapping for 6-field payload (Section 7, Decision 3)
- [ ] Confirm Stage 2 approach (Recommendation: Option C — skip to Calendly)
- [ ] Obtain Calendly 30-min demo booking URL from Ajeet

---

## 9. Summary Verdict

| Dimension | Score | Finding |
|---|---|---|
| Stack appropriateness | 9/10 | Well-chosen. No changes needed. Remove Prisma. |
| Integration architecture | 7/10 | Zoho has 2 bugs + 1 structural issue. Supabase is correct. PostHog needs consent gating. |
| Security fix plan | 8/10 | Zoho fix is nearly correct — code is already half-prepared. CORS fix missing from implementation spec. Rate limit spec missing. |
| Anti-patterns found | 6 found | Description duplication, token cache illusion, wide-open CORS, no catch-all route, Prisma unused, no file validation. |
| File structure | 9/10 | Clean and maintainable. One improvement: move zohoService.ts to api/lib/. |
| Missing decisions | 6 found | All documented and resolved in this review. |

**Overall:** The architecture is solid for a marketing website at this scale. The revamp plan is technically executable. Fix the 6 bugs/anti-patterns and resolve the 6 missing decisions before starting implementation. Wave 1 (security + cleanup + SEO) can begin immediately after the pre-implementation checklist is complete.
