# SEO Implementation Guide — VyaptIX Website

**Last updated:** 2026-05-27  
**Architecture:** Next.js 14+ App Router — native metadata API  
**Who this is for:** Ajeet — so you can understand, maintain, and extend every SEO element without help.

> **Note:** The previous version of this guide documented `react-helmet-async` and the `src/components/SEO.tsx` component. That architecture was part of the old Vite/React Router setup. Both are gone. This guide documents what is actually live.

---

## The Big Picture

Before the revamp, the website had zero SEO — no per-page titles, no meta descriptions, no structured data, no sitemap. Google couldn't understand the content, couldn't display rich results, and had no reliable index.

The current implementation uses **Next.js native metadata exports** — no third-party library, no runtime overhead, no SEO component. Everything is declared directly in each page file as a standard JavaScript export. Next.js renders it into `<head>` at build time (static) or request time (dynamic).

**Current SEO quality: 7.5/10** — solid foundation with a few gaps noted at the end of this guide.

---

## Part 1 — How Metadata Works in Next.js 14+

### The pattern

Every `app/**/page.tsx` file can export a `metadata` object. Next.js reads it and injects the correct `<head>` tags automatically — no imports, no components, no providers.

**Static metadata (most pages):**
```tsx
// app/(main)/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact VyaptIX — Get in Touch or Book a Demo',
  description: 'Ready to automate your business with AI? ...',
  alternates: { canonical: 'https://vyaptix.com/contact' },
  openGraph: { ... },
};
```

**Dynamic metadata (blog posts):**
```tsx
// app/(main)/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://vyaptix.com/blog/${post.slug}` },
    openGraph: { type: 'article', ... },
  };
}
```

### Root layout metadata (`app/layout.tsx`)

This is the default — every page inherits these values unless it overrides them:

| Field | Value |
|-------|-------|
| `metadataBase` | `https://vyaptix.com` |
| `title.default` | `VyaptIX — AI Automation Tools for Business` |
| `title.template` | `%s \| VyaptIX` |
| `openGraph.siteName` | `VyaptIX` |
| `openGraph.images` | `/vyaptix-logo.png` (400px) |
| `twitter.card` | `summary_large_image` |
| `twitter.site` | `@Vyaptix_ai` |

---

## Part 2 — Per-Page Metadata: Complete Inventory

### Homepage (`/`)
**File:** `app/(main)/page.tsx`

| Field | Value |
|-------|-------|
| Title | `VyaptIX — AI Automation Tools for Business \| Live in 3–7 Days` |
| Canonical | `https://vyaptix.com` |
| OG type | `website` |
| JSON-LD | `Organization` + `WebSite` (see Part 3) |

---

### About (`/about`)
**File:** `app/(main)/about/page.tsx`

| Field | Value |
|-------|-------|
| Title | `About VyaptIX — AI Automation Built for Real Businesses` |
| Description | `Meet the team behind VyaptIX — an AI automation startup building practical tools for business owners to grow faster without adding headcount.` |
| Canonical | `https://vyaptix.com/about` |
| OG type | `website` |
| JSON-LD | None |

---

### Contact (`/contact`)
**File:** `app/(main)/contact/page.tsx`

| Field | Value |
|-------|-------|
| Title | `Contact VyaptIX — Get in Touch or Book a Demo` |
| Description | `Ready to automate your business with AI? Get in touch with the VyaptIX team — no generic presentations, just real answers about what works for your business.` |
| Canonical | `https://vyaptix.com/contact` |
| OG type | `website` |
| JSON-LD | None |

---

### Pricing (`/pricing`)
**File:** `app/(main)/pricing/page.tsx`

| Field | Value |
|-------|-------|
| Canonical | `https://vyaptix.com/pricing` |
| OG | Inherits from root layout |
| JSON-LD | None |

---

### Solutions Hub (`/solutions`)
**File:** `app/(main)/solutions/page.tsx`

| Field | Value |
|-------|-------|
| Canonical | `https://vyaptix.com/solutions` |
| OG type | `website` |
| JSON-LD | None |

---

### Setu (`/solutions/setu`)
**File:** `app/(main)/solutions/setu/page.tsx`

| Field | Value |
|-------|-------|
| Title | `Setu — WhatsApp Marketing & Automation Platform \| VyaptIX` |
| Description | `Send campaigns to thousands, automate replies 24/7, manage your team inbox, and close more leads — all on WhatsApp. 98% open rate. Starts at ₹999/month.` |
| Canonical | `https://vyaptix.com/solutions/setu` |
| OG | Inherits from root layout |
| JSON-LD | `SoftwareApplication` + `FAQPage` (see Part 3) |

---

### AI Review Generator (`/solutions/ai-review-generation`)
**File:** `app/(main)/solutions/ai-review-generation/page.tsx`

| Field | Value |
|-------|-------|
| Title | `AI Review Generator — Collect Google Reviews in Under 20 Seconds` |
| Description | `VyaptIX AI Review Generator lets customers scan a QR code and post a real Google review in under 20 seconds. Zero friction, authentic reviews.` |
| Canonical | `https://vyaptix.com/solutions/ai-review-generation` |
| OG | Inherits from root layout |
| JSON-LD | `SoftwareApplication` + `FAQPage` (see Part 3) |

---

### BankLens (`/solutions/banklens`)
**File:** `app/(main)/solutions/banklens/page.tsx`

| Field | Value |
|-------|-------|
| Title | `BankLens — AI Bank Statement Analysis & Credit Decisioning for NBFCs` |
| Description | `220+ financial signals, 14-signal fraud detection, and a structured APPROVE/REVIEW/REJECT decision in under 5 minutes. Built for NBFCs, DSAs, and fintech lenders. From ₹12/report.` |
| Canonical | `https://vyaptix.com/solutions/banklens` |
| OG | Inherits from root layout |
| JSON-LD | `SoftwareApplication` + `FAQPage` (see Part 3) |

---


| Field | Value |
|-------|-------|
| OG | Inherits from root layout |
| JSON-LD | `SoftwareApplication` + `FAQPage` (see Part 3) |

---

### Blog Index (`/blog`)
**File:** `app/(main)/blog/page.tsx`

| Field | Value |
|-------|-------|
| Title | `Blog — AI Automation Insights \| VyaptIX` |
| Description | `AI automation insights, product updates, and business growth strategies from the VyaptIX team.` |
| Canonical | `https://vyaptix.com/blog` |
| OG type | `website` |
| JSON-LD | None |

---

### Blog Posts (`/blog/[slug]`)
**File:** `app/(main)/blog/[slug]/page.tsx`

| Field | Value |
|-------|-------|
| Title | `post.title` (dynamic) |
| Description | `post.excerpt` (dynamic) |
| Canonical | `https://vyaptix.com/blog/{slug}` (dynamic) |
| OG type | `article` |
| OG extra | `publishedTime`, `authors`, `images` (all dynamic) |
| Twitter | `summary_large_image`, dynamic title/description/image |
| JSON-LD | `BlogPosting` schema (see Part 3) |

---

### Legal / Utility Pages

| Page | noIndex | Notes |
|------|---------|-------|
| `/privacy-policy` | Yes | Not shown in search results |
| `/terms-of-service` | Yes | Not shown in search results |
| `/thank-you` | Yes | Post-form confirmation |
| `/demo` | Yes (de-facto) | Not in sitemap |
| `/admin` | Disallowed in robots.txt | CMS login |

---

## Part 3 — JSON-LD Structured Data

JSON-LD tells Google what your content *is*, not just what it says. It enables rich results — star ratings in SERP, FAQ dropdowns, software panels, article schema, and organization knowledge cards.

All JSON-LD is injected as `<script type="application/ld+json">` directly inside each view's JSX.

### Schemas implemented

#### Homepage — `Organization` schema
**File:** `src/views/Home.tsx`

Tells Google that VyaptIX is a real organization. Enables the brand knowledge panel.

```json
{
  "@type": "Organization",
  "name": "VyaptIX",
  "url": "https://vyaptix.com",
  "logo": "https://vyaptix.com/vyaptix-logo.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "6"
  }
}
```

#### Homepage — `WebSite` schema
**File:** `src/views/Home.tsx`

Enables the sitelinks search box in Google results.

```json
{
  "@type": "WebSite",
  "name": "VyaptIX",
  "url": "https://vyaptix.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vyaptix.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### Product pages — `SoftwareApplication` + `FAQPage`

| Product | applicationCategory | Price | Currency | Availability |
|---------|-------------------|-------|----------|-------------|
| AI Review Generator | `BusinessApplication` | `0` | USD | Available |
| Setu | `BusinessApplication` | `999` | INR | Available |
| BankLens | `FinancialApplication` | `12` | INR | Available |

Each product page also includes a `FAQPage` schema linking the FAQ section, which can produce FAQ dropdown rich results in Google.

#### Blog posts — `BlogPosting`
**File:** `app/(main)/blog/[slug]/page.tsx`

Dynamic schema generated per post:

```json
{
  "@type": "BlogPosting",
  "headline": "post.title",
  "description": "post.excerpt",
  "image": "https://vyaptix.com{post.image}",
  "datePublished": "post.date",
  "dateModified": "post.date",
  "author": {
    "@type": "Person",
    "name": "post.author.name",
    "jobTitle": "post.author.role"
  },
  "publisher": {
    "@type": "Organization",
    "name": "VyaptIX",
    "logo": "https://vyaptix.com/vyaptix-logo.png"
  }
}
```

### How to test JSON-LD

Google Rich Results Test: https://search.google.com/test/rich-results  
Paste a URL (after deploy) or paste JSON-LD code directly. Google will validate it and show which rich result types it qualifies for.

---

## Part 4 — Target Keywords by Page

These are the primary keyword phrases embedded in titles and descriptions across the site.

### Brand / Homepage keywords
- `AI automation tools for business`
- `AI tools for business operations`
- `live in 3–7 days`
- `VyaptIX`

### AI Review Generator keywords
- `AI review generator`
- `collect Google reviews`
- `Google reviews in 20 seconds`
- `QR code review collection`
- `authentic Google reviews`
- `zero friction reviews`
- `Google compliant reviews`
- `review automation`

### Setu keywords
- `WhatsApp marketing platform`
- `WhatsApp automation`
- `WhatsApp broadcast campaigns`
- `24/7 WhatsApp AI chatbot`
- `WhatsApp team inbox`
- `98% open rate WhatsApp`
- `Meta Tech Provider`
- `WhatsApp CRM`

### BankLens keywords
- `AI bank statement analysis`
- `credit decisioning for NBFCs`
- `bank statement analysis NBFCs`
- `220+ financial signals`
- `fraud detection bank statements`
- `NBFC credit scoring`
- `DSA fintech lenders`
- `DPDP 2023 RBI compliant`
- `₹12 per report`
- `40 banks supported`


### Blog keywords
- `AI automation insights`
- `business automation blog`
- `AI tools for business growth`

---

## Part 5 — Technical SEO

### Sitemap

**File:** `app/sitemap.ts`  
**Generated at:** `https://vyaptix.com/sitemap.xml`

The sitemap is dynamically generated by Next.js at build time — no manual XML to maintain. Blog posts are included automatically as you publish them.

**Static routes in the sitemap:**

| Route | Priority | Change Frequency |
|-------|----------|-----------------|
| `/` | 1.0 | weekly |
| `/solutions` | 0.9 | weekly |
| `/solutions/ai-review-generation` | 0.9 | weekly |
| `/solutions/setu` | 0.9 | weekly |
| `/solutions/banklens` | 0.9 | weekly |
| `/blog` | 0.8 | daily |
| `/about` | 0.7 | monthly |
| `/pricing` | 0.7 | weekly |
| `/contact` | 0.6 | monthly |
| `/privacy-policy` | 0.3 | yearly |
| `/terms-of-service` | 0.3 | yearly |

**Blog posts:** All published posts are added dynamically with priority `0.7`, `monthly` change frequency.

**Excluded from sitemap:** `/admin`, `/api/*`, `/thank-you`, `/demo`

**To add a new static route to the sitemap:**  
Open `app/sitemap.ts` and add an entry to the `staticRoutes` array.

---

### robots.txt

**File:** `public/robots.txt`  
Served at: `https://vyaptix.com/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Host: https://vyaptix.com

Sitemap: https://vyaptix.com/sitemap.xml
```

The `/admin` block protects the Decap CMS interface. The `/api` block prevents crawlers from hitting API routes.

---

### Open Graph image

**Current status:** The OG image is set to `/vyaptix-logo.png` (400×400px, square). This works but is suboptimal — social platforms prefer 1200×630px landscape images.

**What to create:** `public/og-default.jpg` — 1200×630px, VyaptIX branding, dark background.  
Once created, update `app/layout.tsx` → `openGraph.images` to point to it.

**Impact:** Every page shared on LinkedIn, WhatsApp, Twitter shows the OG image as a preview card. A proper landscape image significantly improves click-through on shared links.

---

## Part 6 — What Is and Isn't Indexed

| Page | Indexed | How controlled |
|------|---------|---------------|
| `/` | ✅ Yes | Default (allow) |
| `/about` | ✅ Yes | Default |
| `/contact` | ✅ Yes | Default |
| `/pricing` | ✅ Yes | Default |
| `/solutions` | ✅ Yes | Default |
| `/solutions/setu` | ✅ Yes | Default |
| `/solutions/ai-review-generation` | ✅ Yes | Default |
| `/solutions/banklens` | ✅ Yes | Default |
| `/blog` | ✅ Yes | Default |
| `/blog/[slug]` | ✅ Yes | Default |
| `/privacy-policy` | ❌ No | `robots: noindex` in metadata |
| `/terms-of-service` | ❌ No | `robots: noindex` in metadata |
| `/thank-you` | ❌ No | Not in sitemap + no index |
| `/admin` | ❌ No | `Disallow` in robots.txt |
| `/api/*` | ❌ No | `Disallow` in robots.txt |

---

## Part 7 — Overall SEO Assessment

**Score: 7.5 / 10**

### What's solid ✅

- Every public page has a unique, keyword-rich title and description
- Canonical URLs on all pages — no duplicate content risk
- Dynamic sitemap keeps itself current as blog grows
- JSON-LD structured data on all product pages and blog posts
- `Organization` + rating schema on homepage (enables knowledge panel)
- `BlogPosting` schema with author + images on every blog post
- `FAQPage` schema on product pages (enables FAQ dropdown in SERP)
- `robots.txt` correctly protects admin and API routes
- Next.js native metadata = no runtime JS overhead for SEO
- Twitter card configured globally with `@Vyaptix_ai` handle

### Gaps to fix 🔧

| Gap | Impact | Effort |
|-----|--------|--------|
| **No dedicated OG image** (`og-default.jpg`) | Medium — shared links show square logo instead of wide card | Low — design + add 1 file |
| **No JSON-LD on About / Contact / Solutions hub** | Low — these pages don't need rich results | Optional |
| **Pricing page missing OpenGraph** | Low | Low |
| **No BreadcrumbList JSON-LD** on product/blog pages | Low — breadcrumb UI exists but no structured data | Medium |

---

## Part 8 — How to Add SEO to a New Page

1. Open the new page file at `app/(main)/your-page/page.tsx`
2. Import the `Metadata` type: `import type { Metadata } from 'next';`
3. Add the export above the component:

```tsx
export const metadata: Metadata = {
  title: 'Your Page Title — Be Specific and Keyword-Rich',
  description: 'Describe this page in 140–160 characters. What will someone find here?',
  alternates: {
    canonical: 'https://vyaptix.com/your-page',
  },
  openGraph: {
    title: 'Your Page Title',
    description: 'Same or slightly different description for social sharing.',
    url: 'https://vyaptix.com/your-page',
    type: 'website',
  },
};
```

4. If the page should NOT be indexed:
```tsx
robots: { index: false, follow: false },
```

5. Add the route to `app/sitemap.ts` static routes array.

6. After deploy, test at: https://search.google.com/test/rich-results

---

## Part 9 — Submitting to Google Search Console

1. Go to https://search.google.com/search-console
2. Add `vyaptix.com` as a property (if not already done)
3. Go to **Sitemaps** in the left nav → enter `sitemap.xml` → Submit
4. Use **URL Inspection** to manually request indexing of important new pages immediately after deploy

---

## Quick Checklist: Before Any New Page Goes Live

- [ ] `export const metadata` with `title`, `description`, `alternates.canonical`
- [ ] Title is 50–70 characters, includes primary keyword
- [ ] Description is 140–160 characters, compelling and accurate
- [ ] `openGraph` block added (title, description, url, type)
- [ ] If should NOT be indexed: `robots: { index: false }` added
- [ ] Route added to `app/sitemap.ts` (if public page)
- [ ] JSON-LD added for product/article pages
- [ ] Test at https://metatags.io after deploy
