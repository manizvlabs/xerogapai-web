# PostHog Analytics Guide — VyaptIX Website

**Project:** https://eu.posthog.com/project/165289
**Dashboard:** https://eu.posthog.com/project/165289/dashboard/640133
**PostHog Region:** EU (eu.posthog.com)

---

## ⚠️ ACTION REQUIRED — Analytics Is Currently Broken

**Status:** Analytics is not tracking. The environment variable `NEXT_PUBLIC_POSTHOG_KEY` contains a **Personal API Key** (`phx_…`), not a **Project API Key** (`phc_…`). PostHog's JS SDK requires a project key. Using a personal key returns `"API key is not valid: personal_api_key"` and all tracking silently fails.

**Confirmed broken with live test:**
```
POST https://eu.i.posthog.com/capture/
→ "API key is not valid: personal_api_key"
```

### Fix — 3 Steps for the CTO

**Step 1 — Get the correct key from PostHog**

1. Log in at https://eu.posthog.com
2. Go to your project (Project ID: 165289)
3. Navigate to: **Settings → Project → Project API Key**
4. The key starts with `phc_` — copy it in full

**Step 2 — Update Vercel environment variable**

1. Go to https://vercel.com → select the `vyaptix-website` project
2. Navigate to: **Settings → Environment Variables**
3. Find `NEXT_PUBLIC_POSTHOG_KEY` → click Edit
4. Replace the current value (`phx_…`) with the `phc_…` key from Step 1
5. Apply to: Production + Preview + Development
6. Click Save
7. **Redeploy the project** (a new deploy is required for env var changes to take effect)

**Step 3 — Verify it works**

1. Open the deployed site in an **incognito window**
2. Click **Accept All** on the cookie banner
3. Navigate 2–3 pages
4. Go to **PostHog → Activity → Live Events**
5. You should see `$pageview` events appear within seconds

**Local development fix** (update `.env` file):
```
NEXT_PUBLIC_POSTHOG_KEY=phc_REPLACE_WITH_YOUR_ACTUAL_KEY
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

---

---

## What Is Tracked

Analytics only fires **after a visitor clicks "Accept All"** on the cookie banner. Three event types are captured:

| Event Name | Triggered By | Properties |
|---|---|---|
| `$pageview` | Every page navigation | `$current_url` (path) |
| `cta_clicked` | Every CTA button click | `label`, `destination`, `page`, `section` |
| `contact_form_submitted` | Contact form success | `source: "contact_page"` |

### `cta_clicked` — Full Label Reference

| Label | Page | Section | Goes To |
|---|---|---|---|
| Book a Discovery Call | `/` | (hero) | `/contact` |
| See Our Products | `/` | (hero) | `/solutions` |
| See How It Works — AI Review Generator | `/` | products | `/solutions/ai-review-generation` |
| Join Early Access — AgentMitra | `/` | products | `/agent-mitra` |
| Book a Discovery Call | `/` | final_cta | `/contact` |
| See Our Products | `/` | final_cta | `/solutions` |
| Learn More — AI Review Generator | `/solutions` | — | `/solutions/ai-review-generation` |
| Try Platform Free | `/solutions` | — | `https://reviews.vyaptix.ai` |
| Learn More — AgentMitra | `/solutions` | — | `/agent-mitra` |
| Request Early Access — AgentMitra | `/solutions` | — | `/contact` |
| Try Free — AI Review Generator | `/solutions` | product_picker | `https://reviews.vyaptix.ai` |
| Request Early Access — AgentMitra | `/solutions` | product_picker | `/contact` |
| Book a 30-minute call | `/solutions` | product_picker | `/contact` |
| Try AI Review Generator Free | `/solutions` | final_cta | `https://reviews.vyaptix.ai` |
| Book a Demo | `/solutions` | final_cta | `/contact` |
| Try Platform Free | `/solutions/ai-review-generation` | hero | `https://reviews.vyaptix.ai` |
| Schedule Demo | `/solutions/ai-review-generation` | hero | `/contact` |
| Go to Platform | `/solutions/ai-review-generation` | platform_access | `https://reviews.vyaptix.ai` |
| Talk to Sales | `/solutions/ai-review-generation` | platform_access | `/contact` |
| Get Started Free | `/solutions/ai-review-generation` | final_cta | `https://reviews.vyaptix.ai` |
| Schedule Demo | `/solutions/ai-review-generation` | final_cta | `/contact` |
| Book a Demo | `/agent-mitra` | hero | `/contact` |
| Request Early Access | `/agent-mitra` | hero | `/contact` |
| Book a Demo | `/agent-mitra` | final_cta | `/contact` |
| Request Early Access | `/agent-mitra` | final_cta | `/contact` |

---

## How to View Events

### Live Event Stream

**Path:** Left sidebar → Activity → Live Events

- Streams every event in real time as it fires
- Filter by event name (`cta_clicked`, `contact_form_submitted`) using the search bar
- Click any row to expand full properties

---

### Page Views — Which Pages Get Traffic

**Path:** Product Analytics → New Insight → Trends

1. Add series: event = `$pageview`
2. Break down by: `$current_url`
3. Date range: Last 30 days
4. Save as: **"Page Views by URL"**

---

### CTA Performance — Which Buttons Are Clicked

**Path:** Product Analytics → New Insight → Trends

1. Add series: event = `cta_clicked`
2. Break down by: `label`
3. Optionally add a second breakdown by `page`
4. Save as: **"CTA Performance by Label"**

**Priority labels to watch:**
- `Try Platform Free` / `Get Started Free` → bottom-funnel intent (going to reviews.vyaptix.ai)
- `Schedule Demo` / `Book a Demo` / `Talk to Sales` → sales intent (going to /contact)
- `Request Early Access` → AgentMitra demand signal

---

### Contact Form Conversions

**Path:** Product Analytics → New Insight → Trends

1. Add series: event = `contact_form_submitted`
2. No breakdown needed
3. Save as: **"Contact Form Submissions"**

This is the **primary conversion metric** — every submission creates a lead in Zoho CRM.

---

### Conversion Funnel

**Path:** Product Analytics → New Insight → Funnels

Build this funnel to measure drop-off from product page to lead:

| Step | Event | Filter |
|---|---|---|
| 1 | `$pageview` | `$current_url` = `/solutions/ai-review-generation` |
| 2 | `cta_clicked` | `destination` = `/contact` |
| 3 | `contact_form_submitted` | — |

Save as: **"AI Review → Contact Funnel"**

---

### Individual User Journeys

**Path:** People & Groups → Persons

1. Click any person
2. **Activity tab** — every event in sequence with all properties
3. **Recordings tab** — watch their session (requires Session Replay to be enabled in PostHog project settings)

---

## Dashboard Setup (Project 165289 / Dashboard 640133)

Recommended panels to add:

1. **Page Views by URL** — Trend, `$pageview` broken down by `$current_url`
2. **CTA Clicks by Label** — Trend, `cta_clicked` broken down by `label`
3. **Contact Form Submissions** — Trend, `contact_form_submitted` (total count)
4. **AI Review → Contact Funnel** — Funnel, 3 steps above
5. **Daily Active Visitors** — Trend, `$pageview`, unique users, no breakdown

To add a panel: open the dashboard → **+ Add insight** → pick a saved insight or create new.

---

## Verifying Tracking Works

1. Open the site in a fresh **incognito window**
2. Click **Accept All** on the cookie banner
3. Navigate a few pages and click any CTA
4. Go to **Activity → Live Events** in PostHog — events should appear within seconds

If no events appear, check:
- `NEXT_PUBLIC_POSTHOG_KEY` is set in the Vercel environment variables
- `NEXT_PUBLIC_POSTHOG_HOST` is set to `https://eu.i.posthog.com`
- The PostHogProvider component is mounted in the root layout

---

## User Identity Tracking

PostHog links anonymous visitor sessions to real identities via `posthog.identify()`. Three mechanisms trigger identification:

| Mechanism | When | Data captured |
|---|---|---|
| **Contact form submit** | User submits `/contact` form | `email`, `name`, `company` |
| **Stored identity** | Return visit after a past form submission | Same as above, from `localStorage` key `vyaptix_user` |
| **URL params** | User clicks a personalised link | `?ph_email=user@co.com&ph_name=John` |

Once identified, that person's **full session history** (including all anonymous pageviews before they submitted the form) gets merged under one profile in PostHog → **People & Groups → Persons**.

### How to view identified users

**Path:** People & Groups → Persons → search by email

Each identified person shows:
- All pages visited (before and after identification)
- Every event they fired
- Session recordings (if replay is enabled)

### Adding identity to email campaigns

Append `?ph_email=EMAIL&ph_name=NAME` to any link in your email campaigns. When that person lands on the site and accepts cookies, they are immediately identified — no form fill required.

Example: `https://vyaptix.com/solutions/ai-review-generation?ph_email=client@business.com&ph_name=Ramesh`

---

## Events Not Yet Tracked (Recommended Additions)

| Event | Trigger | Priority |
|---|---|---|
| `blog_article_read` | Scroll past 80% of a blog post | High |
| `nav_link_clicked` | Any header nav link click | Medium |
| `external_link_clicked` | Click to reviews.vyaptix.ai from non-CTA links | Medium |
| `agent_mitra_early_access_submitted` | AgentMitra form submission (once built) | High |

---

## Key Files

| File | Purpose |
|---|---|
| [src/lib/analytics.ts](../../src/lib/analytics.ts) | Core `initAnalytics`, `trackPageView`, `trackEvent` functions |
| [src/components/PostHogProvider.tsx](../../src/components/PostHogProvider.tsx) | Mounts in root layout, handles consent check and page view tracking |
| [src/components/ui/CookieBanner.tsx](../../src/components/ui/CookieBanner.tsx) | Cookie consent gate — analytics only fires after "Accept All" |
