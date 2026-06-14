# VyaptIX SEO Implementation Guide

**Last updated:** 2026-06-06
**Project:** VyaptIX website
**Framework:** Next.js App Router
**Purpose:** This file is the implementation brief for any AI coding agent asked to strengthen VyaptIX SEO.

---

## 1. Read This First

The current website has a decent technical SEO foundation, but it is not yet strong enough to rank consistently for broad commercial keywords such as:

- AI automation
- AI automation agency
- WhatsApp marketing platform
- WhatsApp Business API platform
- Google review software
- Google review generator
- bank statement analysis software
- credit decisioning software
- NBFC credit decisioning software

The goal is to turn the website from a basic company/product website into a topical authority website. Google should be able to understand that VyaptIX has deep expertise across AI automation, review automation, WhatsApp automation, service operations, and credit decisioning.

This guide is written so a coding agent can implement the plan without asking Ajeet for repeated clarification. If a section says "implement", do the work directly.

Important guardrail:

Do not create pages only to target keywords. Every new SEO page must be a genuinely useful public page for a real buyer. Google treats mass-produced, low-value, search-engine-first pages as spam risk. Build fewer, stronger pages first.

---

## 2. Current SEO Assessment

### Current score

Approximate score: **6.5 / 10**

Breakdown:

- Technical SEO: 7.5 / 10
- On-page SEO: 6.5 / 10
- Content SEO: 5.5 / 10
- Competitive ranking strength: 4.5 / 10

### Why the score is not higher

The site has page metadata, canonical URLs, sitemap support, robots.txt, structured data on several pages, and crawlable Next.js routes. That is good.

But broad rankings require more than technical tags. Broad rankings need:

- dedicated keyword landing pages
- topic clusters
- useful long-form content
- internal linking
- original proof
- external backlinks
- clean structured data
- Search Console feedback loops

Right now, the site is better prepared for branded searches like "VyaptIX" than broad searches like "AI automation" or "WhatsApp marketing platform".

---

## 3. SEO Strategy Principles

### Principle 1: Google ranks pages, not only websites

Why this matters:

A homepage saying "we do AI automation" is not enough to rank for every related keyword. Google needs specific pages that clearly answer specific search intents.

What to do:

Create focused landing pages such as:

- `/ai-automation`
- `/ai-automation-agency`
- `/google-review-software`
- `/whatsapp-marketing-platform`
- `/bank-statement-analysis-software`
- `/credit-decisioning-software`

Each page should target a clear search intent and link to the relevant product page.

### Principle 2: Build topical authority

Why this matters:

Google needs repeated evidence that VyaptIX is knowledgeable in a topic. One product page about WhatsApp automation is weaker than a complete cluster containing a landing page, guides, comparisons, FAQs, and case studies.

What to do:

For every commercial landing page, create supporting blog posts and internal links. Example:

- Main page: `/whatsapp-marketing-platform`
- Supporting posts:
  - `/blog/whatsapp-business-api-vs-whatsapp-business-app`
  - `/blog/whatsapp-broadcast-campaign-guide`
  - `/blog/whatsapp-chatbot-for-lead-generation`
  - `/blog/shared-whatsapp-inbox-for-sales-teams`

### Principle 3: Content must be useful, not just keyword-heavy

Why this matters:

Google's guidance emphasizes helpful, reliable, people-first content. Thin pages made only to target keywords may be indexed but will struggle to rank.

What to do:

Every SEO page must include real explanations, examples, screenshots, use cases, comparisons, FAQs, pricing context, and strong calls to action.

### Principle 4: Commercial pages and blog pages have different jobs

Why this matters:

Commercial landing pages convert buyers. Blog posts educate and attract long-tail traffic. They should support each other.

What to do:

- Landing pages should focus on buying intent.
- Blog posts should answer specific questions.
- Blog posts should link back to landing pages using descriptive anchor text.

Example:

Use this anchor:

`WhatsApp marketing platform for business teams`

Do not use this generic anchor:

`click here`

### Principle 5: Avoid doorway pages and scaled-content abuse

Why this matters:

Google's spam policies call out scaled content abuse: creating many pages mainly to manipulate rankings rather than help users. The landing pages in this guide are valid only if each page has unique value, a distinct search intent, specific examples, useful comparisons, and a clear reason to exist.

What to do:

- Build category pages only when the search intent is distinct.
- Do not duplicate the same page with the keyword swapped.
- Do not mass-generate dozens of similar city/industry pages.
- Do not publish AI-generated filler.
- If a page cannot include real product context, original examples, screenshots, workflows, or expert insight, do not publish it yet.
- Each page should be reviewed as a real user experience, not just as an SEO asset.

---

## 4. Phase 1: Technical SEO Cleanup

Implement this phase before creating new SEO pages.

### 4.1 Clean up sitemap implementation

Current implementation:

- `app/sitemap.ts` is the single sitemap source.
- The `next-sitemap` postbuild generator and configuration were removed.
- Generated `public/sitemap.xml` and `public/sitemap-0.xml` files were removed.
- `/sitemap.xml` is served by the native Next.js metadata route and can be
  refreshed by the Sanity webhook.

Why this matters:

The sitemap should tell Google which pages matter. It should not include files, noindex pages, or the sitemap itself. A messy sitemap wastes crawl budget and sends mixed quality signals.

Maintenance rule:

Keep `app/sitemap.ts` as the single source of truth. Do not reintroduce generated
sitemap files under `public/` or a separate sitemap build tool.

Routes that should be included:

- `/`
- `/solutions`
- `/solutions/ai-review-generation`
- `/solutions/setu`
- `/solutions/banklens`
- `/about`
- `/blog`
- `/pricing`
- `/contact`
- all published blog posts
- all new SEO landing pages created from this guide

Routes that should not be included:

- `/demo` if it remains `noindex`
- `/thank-you`
- `/admin`
- `/api/*`
- `/icon.png`
- `/sitemap.xml`
- any image or static asset URL

Legal page indexing decision:

- Keep `/privacy-policy` and `/terms-of-service` indexable by default. These pages are low commercial value, but they help trust and can appear for brand/legal searches.
- They do not need prominent internal links beyond the footer.
- They may be omitted from the sitemap or included with low priority; either is acceptable.
- If Ajeet explicitly decides to noindex legal pages, add page metadata such as `robots: { index: false, follow: true }`.
- Do not block noindexed pages in `robots.txt`. Google must be able to crawl a page to see its `noindex` directive.

Implementation file:

- `app/sitemap.ts`
- `package.json`
- remove stale files from `public/`

Verification:

- Run `npm run typecheck`
- Build or inspect `/sitemap.xml` locally/deployed
- Confirm sitemap contains only clean public page URLs

### 4.2 Dynamic robots route

Current implementation:

The project uses `app/robots.ts`. No generated or manually maintained
`public/robots.txt` file is required.

Why this matters:

Using `app/robots.ts` keeps robots configuration in source code with the rest of the SEO system. It also avoids stale static files.

The route allows public crawling, disallows `/api/`, `/studio/`, and
`/thank-you`, and points crawlers to `https://vyaptix.com/sitemap.xml`.

Current implementation:

```ts
import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/', '/thank-you'],
    },
    sitemap: 'https://vyaptix.com/sitemap.xml',
    host: 'https://vyaptix.com',
  }
}
```

Verification:

- Visit `/robots.txt` after deployment
- Confirm it references the correct sitemap

### 4.3 Fix encoding and mojibake

Current issue:

Several source files contain corrupted characters such as:

- `â€”`
- `â€“`
- `â‚¹`
- `3Ã—`

Why this matters:

These can appear in page titles, meta descriptions, snippets, blog content, and AI-readable files. If Google displays them, the search result looks broken and untrustworthy.

What to implement:

1. Search the repo for corrupted characters.
2. Replace them with proper ASCII or valid UTF-8.
3. Prefer ASCII in source unless the symbol is important.

Recommended replacements:

- Replace corrupted em dash with `-`
- Replace corrupted en dash with `-`
- Replace corrupted rupee symbol with `INR`
- Replace corrupted multiplication sign with `x`

Command to audit:

```powershell
rg -n "â|Ã|Â|ð|€™|€œ|€" app src content docs public
```

Files likely affected:

- `app/layout.tsx`
- route metadata files under `app/(main)/**/page.tsx`
- `src/views/**`
- Sanity blog documents and schema fields
- `public/llms.txt`
- docs files

Verification:

- Re-run the search command
- Confirm no corrupted characters remain in page metadata or visible copy
- Run `npm run typecheck`
- Run `npm run lint`

### 4.4 Strengthen metadata on all public pages

Current issue:

Some pages have title, description, and canonical, but do not have full Open Graph and Twitter metadata.

Why this matters:

Metadata helps Google understand the page and improves how links appear on LinkedIn, WhatsApp, X, Slack, and other platforms. Better previews increase click-through.

What to implement:

Every indexable page should have:

- `title`
- `description`
- `alternates.canonical`
- `openGraph.title`
- `openGraph.description`
- `openGraph.url`
- `openGraph.type`
- `openGraph.images`
- `twitter.card`
- `twitter.title`
- `twitter.description`
- `twitter.images`

Implementation files:

- `app/(main)/page.tsx`
- `app/(main)/about/page.tsx`
- `app/(main)/contact/page.tsx`
- `app/(main)/pricing/page.tsx`
- `app/(main)/solutions/page.tsx`
- `app/(main)/solutions/ai-review-generation/page.tsx`
- `app/(main)/solutions/setu/page.tsx`
- `app/(main)/solutions/banklens/page.tsx`
- `app/(main)/blog/page.tsx`
- `app/(main)/blog/[slug]/page.tsx`

Do not add indexable metadata to utility pages that should stay hidden:

- `/demo`
- `/thank-you`
- `/admin`

### 4.5 Add proper Open Graph images

Current issue:

The root layout uses `/vyaptix-logo.png`, a square logo image. Social platforms prefer 1200 x 630 images.

Why this matters:

When links are shared on WhatsApp, LinkedIn, X, or Slack, the preview image strongly affects clicks. Square logos look weak and generic.

What to implement:

Create branded 1200 x 630 images:

- `public/og/og-default.jpg`
- `public/og/og-ai-review-generator.jpg`
- `public/og/og-setu.jpg`
- `public/og/og-banklens.jpg`
- `public/og/og-ai-automation.jpg`
- `public/og/og-whatsapp-marketing-platform.jpg`
- `public/og/og-google-review-software.jpg`
- `public/og/og-credit-decisioning-software.jpg`

Design direction:

- Dark VyaptIX brand background
- Clear product/category name
- Short benefit line
- VyaptIX logo
- No clutter
- 1200 x 630

Then reference them in page metadata.

### 4.6 Add BreadcrumbList structured data

Current issue:

The site has visual breadcrumbs, but no `BreadcrumbList` JSON-LD.

Why this matters:

Breadcrumb structured data helps Google understand page hierarchy and can improve how URLs appear in search results.

What to implement:

Create a reusable helper, for example:

- `src/lib/seo.ts`

Add helper:

```ts
export function createBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

Add JSON-LD scripts to:

- product pages
- blog index
- blog posts
- pricing
- about
- contact
- new SEO landing pages

### 4.7 Add and validate schema per page type

Why this matters:

Structured data helps Google and AI search systems understand what a page represents. It can also make pages eligible for rich results.

What to implement:

Homepage:

- `Organization`
- `WebSite`

Important schema safety rules:

- Keep `WebSite` schema, but do not include `SearchAction` unless the site has a real working website search experience that supports the exact target URL in the schema. The current website does not have a true site search page, and Google's sitelinks search box feature is no longer available in Search results, so adding fake or unused search markup is unnecessary.
- Keep `Organization` schema for brand identity, logo, sameAs profiles, and contact information.
- Do not include `aggregateRating` on `Organization` unless the ratings are real, visible on the page, independently verifiable, and eligible under Google's review snippet rules. If ratings are product-specific, attach eligible rating markup only to the relevant product/software schema after confirming the source and visibility of those reviews.
- Do not add schema only because it looks good. Schema must match visible page content and Google's supported structured data types.

Product pages:

- `SoftwareApplication`
- `FAQPage`
- `BreadcrumbList`

Commercial landing pages:

- `WebPage`
- `Service` or `SoftwareApplication`, depending on page
- `FAQPage`
- `BreadcrumbList`

Blog posts:

- `BlogPosting`
- `BreadcrumbList`

Pricing page:

- `WebPage`
- `OfferCatalog` if pricing is stable
- `BreadcrumbList`

Verification:

- Test deployed URLs in Google Rich Results Test
- Test JSON-LD with Schema Markup Validator

---

## 5. Phase 2: Build Commercial SEO Landing Pages

These pages are required to rank for broad commercial searches. Product pages alone are not enough.

### Page template all commercial pages must follow

Every landing page should include:

1. Metadata targeting primary keyword
2. H1 with primary keyword or close variant
3. Short hero explaining the category and outcome
4. Problem section
5. Solution/workflow section
6. Use cases
7. Screenshots or product visuals
8. Comparison table
9. Who it is for
10. Why VyaptIX
11. FAQ section
12. Strong CTA
13. Internal links to product pages and supporting blog posts
14. JSON-LD schema
15. Sitemap entry

Do not create thin pages. Each page must be useful enough for a buyer to understand the problem, compare options, and decide what to do next.

Quality gate before creating any landing page:

- Is the search intent meaningfully different from an existing page?
- Can the page include original VyaptIX context, product workflows, screenshots, examples, comparisons, or implementation details?
- Would a buyer who lands directly on this page understand the category and the relevant VyaptIX solution without needing to visit another page first?
- Can this page be linked naturally from navigation, footer, product pages, blog posts, or related landing pages?
- If the answer is no, do not publish the page yet. Strengthen an existing page instead.

### 5.1 Create `/ai-automation`

Target keywords:

- AI automation
- AI automation for business
- business AI automation
- AI workflow automation

Why this page is needed:

The homepage is broad company positioning. Google needs a dedicated category page explaining what AI automation means, what workflows VyaptIX automates, and why VyaptIX is credible.

What to build:

- Route: `app/(main)/ai-automation/page.tsx`
- View: `src/views/AIAutomation.tsx`
- Metadata title: `AI Automation for Business - Practical Tools That Go Live Fast`
- H1: `AI Automation for Business`
- CTA: `/contact` or `/demo`

Required sections:

- What is AI automation?
- What business workflows can be automated?
- Where AI automation fails
- VyaptIX implementation approach
- Use cases by department
- Products that support this category
- Implementation timeline
- FAQs

Internal links:

- `/solutions/ai-review-generation`
- `/solutions/setu`
- `/solutions/banklens`
- `/ai-automation-agency`
- relevant blog posts

### 5.2 Create `/ai-automation-agency`

Target keywords:

- AI automation agency
- AI automation company
- AI automation consultant
- custom AI automation

Why this page is needed:

Some users are not looking for a product. They are looking for someone to build automation for them. This page captures service-provider intent.

What to build:

- Route: `app/(main)/ai-automation-agency/page.tsx`
- View: `src/views/AIAutomationAgency.tsx`
- H1: `AI Automation Agency for Businesses That Need Results Fast`

Required sections:

- What VyaptIX builds
- Who this is for
- Typical automation projects
- Process: diagnose, design, build, deploy
- Timeline: 3-7 days for first automation where realistic
- Pricing model: fixed-fee/custom
- Why vendor-neutral matters
- FAQs
- CTA to book a discovery call

### 5.3 Create `/google-review-software`

Target keywords:

- Google review software
- Google review generator
- Google review automation
- Google review QR code
- AI Google review generator

Why this page is needed:

The AI Review Generator product page is branded. This page should target people searching the category before they know VyaptIX.

What to build:

- Route: `app/(main)/google-review-software/page.tsx`
- View: `src/views/GoogleReviewSoftware.tsx`
- H1: `Google Review Software That Helps Customers Post in Under 20 Seconds`

Required sections:

- Why businesses struggle to collect reviews
- How QR-based review collection works
- How AI helps customers write authentic reviews
- Google-compliance positioning
- Best industries: restaurants, salons, clinics, retail, real estate
- Comparison: manual review requests vs VyaptIX
- Link to AI Review Generator product page
- FAQs
- CTA to `https://reviews.vyaptix.ai`

### 5.4 Create `/google-review-generator-for-restaurants`

Target keywords:

- Google review software for restaurants
- restaurant review QR code
- get more Google reviews restaurant

Why this page is needed:

Industry pages rank for more specific long-tail searches and convert well because the visitor sees their business type reflected directly.

What to build:

- Route: `app/(main)/google-review-generator-for-restaurants/page.tsx`
- View: `src/views/GoogleReviewGeneratorRestaurants.tsx`

Required sections:

- Restaurant review problem
- QR placement examples: table, bill folder, counter, takeaway bag
- Staff workflow
- Customer journey
- Example review prompts
- CTA to AI Review Generator

### 5.5 Create `/whatsapp-marketing-platform`

Target keywords:

- WhatsApp marketing platform
- WhatsApp marketing software
- WhatsApp automation platform
- WhatsApp Business API platform

Why this page is needed:

Setu is the product page. This page should target users searching for the broader software category.

What to build:

- Route: `app/(main)/whatsapp-marketing-platform/page.tsx`
- View: `src/views/WhatsAppMarketingPlatform.tsx`
- H1: `WhatsApp Marketing Platform for Campaigns, Chatbots, and Team Inbox`

Required sections:

- Why WhatsApp has become a revenue channel
- Broadcast campaigns
- AI chatbot
- Shared team inbox
- Lead pipeline
- Compliance and opt-outs
- Meta Tech Provider positioning
- Comparison: WhatsApp Business App vs Setu
- FAQs
- CTA to `https://setu.vyaptix.ai`

### 5.6 Create `/whatsapp-team-inbox`

Target keywords:

- WhatsApp team inbox
- shared WhatsApp inbox
- WhatsApp inbox for teams
- WhatsApp CRM

Why this page is needed:

"WhatsApp team inbox" is a high-intent feature search. It deserves its own page because users searching this already understand their problem.

What to build:

- Route: `app/(main)/whatsapp-team-inbox/page.tsx`
- View: `src/views/WhatsAppTeamInbox.tsx`

Required sections:

- Problem: personal WhatsApp numbers and missed replies
- Shared inbox workflow
- Assignment and ownership
- Team roles
- Reporting and visibility
- Link to Setu

### 5.7 Create `/whatsapp-chatbot`

Target keywords:

- WhatsApp chatbot
- WhatsApp AI chatbot
- WhatsApp chatbot for business
- WhatsApp lead generation chatbot

Why this page is needed:

Chatbot searches are common and high-intent. This page can rank independently and feed Setu.

What to build:

- Route: `app/(main)/whatsapp-chatbot/page.tsx`
- View: `src/views/WhatsAppChatbot.tsx`

Required sections:

- Use cases
- Lead qualification
- FAQs answered automatically
- Human handoff
- Campaign follow-up
- CTA to Setu

### 5.8 Create `/bank-statement-analysis-software`

Target keywords:

- bank statement analysis software
- bank statement analyzer
- automated bank statement analysis
- bank statement analysis for lenders

Why this page is needed:

This is the broader category page for BankLens and should target lenders before they know the product name.

What to build:

- Route: `app/(main)/bank-statement-analysis-software/page.tsx`
- View: `src/views/BankStatementAnalysisSoftware.tsx`
- H1: `Bank Statement Analysis Software for Faster Lending Decisions`

Required sections:

- Why manual bank statement review is slow
- Inputs: PDF, scanned statements, images, Account Aggregator JSON
- Outputs: financial signals, risk indicators, fraud flags, CAM report
- Who uses it: NBFCs, DSAs, fintech lenders
- Comparison: manual analysis vs BankLens
- Compliance notes
- CTA to BankLens

### 5.9 Create `/credit-decisioning-software`

Target keywords:

- credit decisioning software
- AI credit decisioning
- loan underwriting automation
- credit risk scoring software

Why this page is needed:

Credit decisioning is a bigger category than bank statement analysis. This page should position BankLens as part of an automated credit decisioning workflow.

What to build:

- Route: `app/(main)/credit-decisioning-software/page.tsx`
- View: `src/views/CreditDecisioningSoftware.tsx`

Required sections:

- What credit decisioning software does
- Data inputs
- Risk scoring
- Fraud detection
- Human review checkpoints
- Audit trail
- CAM report
- CTA to BankLens

### 5.10 Create `/nbfc-credit-decisioning-software`

Target keywords:

- NBFC credit decisioning software
- bank statement analysis for NBFC
- NBFC loan underwriting automation
- CAM report automation

Why this page is needed:

This is a narrow, high-commercial-intent page for BankLens's strongest buyer segment.

What to build:

- Route: `app/(main)/nbfc-credit-decisioning-software/page.tsx`
- View: `src/views/NBFCCreditDecisioningSoftware.tsx`

Required sections:

- NBFC credit ops problem
- Bank statement ingestion
- Risk scoring
- Fraud detection
- CAM reports
- RBI and DPDP context
- Cost/time reduction examples
- CTA to BankLens

---

## 6. Phase 3: Build Topic Clusters

Topic clusters are groups of blog posts that support a commercial page. Each post should internally link back to the main page.

Quality rule:

Do not publish a large batch of mechanical blog posts just to increase page count. Start with the best 3-4 posts per cluster, make each one useful and specific, then use Search Console data to decide what to expand next. Every post must add something beyond generic summaries, such as examples, buyer checklists, implementation steps, mistakes to avoid, or product-context explanations.

### 6.1 AI automation cluster

Main page:

- `/ai-automation`

Create these blog posts:

- `/blog/what-is-ai-automation`
- `/blog/ai-automation-examples-for-small-business`
- `/blog/ai-automation-vs-rpa`
- `/blog/how-to-automate-business-workflows-with-ai`
- `/blog/ai-automation-for-sales-teams`
- `/blog/ai-automation-for-customer-support`
- `/blog/how-to-choose-an-ai-automation-agency`
- `/blog/ai-automation-implementation-checklist`

Why this cluster is needed:

"AI automation" is broad and competitive. A single landing page will not be enough. This cluster teaches Google that VyaptIX covers the topic deeply.

### 6.2 Google review software cluster

Main page:

- `/google-review-software`

Create these blog posts:

- `/blog/how-to-get-more-google-reviews`
- `/blog/google-review-qr-code-generator`
- `/blog/google-review-software-for-restaurants`
- `/blog/google-review-software-for-clinics`
- `/blog/google-review-automation-guide`
- `/blog/why-customers-dont-leave-reviews`
- `/blog/google-review-policy-compliant-automation`

Why this cluster is needed:

The target buyer often searches practical problems first, not product names. These posts capture that demand and route it to the AI Review Generator.

### 6.3 WhatsApp marketing cluster

Main page:

- `/whatsapp-marketing-platform`

Create these blog posts:

- `/blog/whatsapp-marketing-for-small-business`
- `/blog/whatsapp-business-api-vs-whatsapp-business-app`
- `/blog/whatsapp-broadcast-campaign-guide`
- `/blog/whatsapp-chatbot-for-lead-generation`
- `/blog/shared-whatsapp-inbox-for-sales-teams`
- `/blog/whatsapp-crm-for-business`
- `/blog/whatsapp-marketing-compliance-india`

Why this cluster is needed:

WhatsApp marketing searches split into campaigns, API, chatbot, CRM, and inbox intent. Each intent needs a page or post.

### 6.4 Credit decisioning cluster

Main pages:

- `/bank-statement-analysis-software`
- `/credit-decisioning-software`
- `/nbfc-credit-decisioning-software`

Create these blog posts:

- `/blog/how-nbfcs-analyze-bank-statements`
- `/blog/bank-statement-analysis-for-loan-underwriting`
- `/blog/cam-report-automation`
- `/blog/credit-risk-scoring-from-bank-statements`
- `/blog/fraud-detection-in-bank-statements`
- `/blog/loan-underwriting-automation-for-nbfcs`
- `/blog/rbi-dpdp-compliance-for-digital-lending`

Why this cluster is needed:

BankLens has the strongest non-branded ranking potential because it targets a specific problem and buyer. This cluster should be prioritized.

---

## 7. Phase 4: Upgrade Existing Product Pages

Do not replace the current product pages. Improve them.

### 7.1 AI Review Generator page

File:

- `src/views/AIReviewGeneration.tsx`
- `app/(main)/solutions/ai-review-generation/page.tsx`

Why this needs improvement:

The page targets "AI Review Generator" and "Google reviews in under 20 seconds", but should also support broader terms like "Google review software" and "Google review automation".

What to add:

- Section: `Google Review Software Built for High-Volume Local Businesses`
- Section: `How QR-Based Review Collection Works`
- Section: `Google-Compliant Review Collection, Not Fake Reviews`
- Section: `Best For Restaurants, Clinics, Salons, Retail, and Real Estate`
- Internal links to `/google-review-software`
- Internal links to restaurant/clinic industry pages when created

### 7.2 Setu page

Files:

- `src/views/Setu.tsx`
- `app/(main)/solutions/setu/page.tsx`

Why this needs improvement:

The page is strong product copy, but it should better support "WhatsApp marketing platform", "WhatsApp team inbox", and "WhatsApp chatbot" searches.

What to add:

- Section: `WhatsApp Marketing Platform vs WhatsApp Business App`
- Section: `Shared WhatsApp Team Inbox`
- Section: `WhatsApp AI Chatbot for Lead Qualification`
- Internal links to `/whatsapp-marketing-platform`, `/whatsapp-team-inbox`, and `/whatsapp-chatbot`

### 7.3 BankLens page

Files:

- `src/views/BankLens.tsx`
- `app/(main)/solutions/banklens/page.tsx`

Why this needs improvement:

BankLens is the strongest SEO opportunity because it is specific, commercial, and industry-focused. The page should become a deep authority page.

What to add:

- Section: `Bank Statement Analysis Software for NBFCs`
- Section: `Credit Decisioning Workflow`
- Section: `CAM Report Automation`
- Section: `Fraud Signals Detected From Bank Statements`
- Internal links to `/bank-statement-analysis-software`, `/credit-decisioning-software`, and `/nbfc-credit-decisioning-software`

## 8. Phase 5: Add Proof And Trust

### 8.1 Add case studies

Why this matters:

Competitive commercial SEO depends on trust. Case studies provide evidence that the products work.

Create pages:

- `/case-studies/google-review-growth-local-business`
- `/case-studies/whatsapp-follow-up-automation`
- `/case-studies/nbfc-bank-statement-analysis-cost-reduction`

Each case study should include:

- customer context
- problem
- solution
- implementation time
- measurable outcome
- quote/testimonial if available
- product CTA

If real customer names are not approved, use anonymized but truthful case studies.

### 8.2 Add testimonials

Why this matters:

Testimonials improve both conversion and perceived trust. They also support E-E-A-T signals.

What to add:

- customer name
- company
- industry
- role
- quote
- product used
- permission status

Where to add:

- homepage
- product pages
- relevant landing pages

### 8.3 Add customer logos

Why this matters:

Logos quickly communicate adoption and legitimacy.

What to add:

- customer logo strip on homepage
- product-specific logos where available

If logo permission is not available, do not fabricate logos.

### 8.4 Add founder/author credibility

Why this matters:

Google's helpful content guidance emphasizes expertise and trust. Blog posts should make it clear who wrote or reviewed them.

What to implement:

- create author profile pages if blog content grows
- link author names to author pages
- include LinkedIn links
- include role and expertise

Possible route:

- `/authors/ajeet-singh`

---

## 9. Phase 6: Build Comparison Pages

Comparison pages capture users who are closer to a purchase decision.

Create these pages:

- `/google-review-software-vs-manual-review-requests`
- `/whatsapp-business-app-vs-whatsapp-business-api`
- `/whatsapp-marketing-platform-vs-crm`
- `/banklens-vs-manual-bank-statement-analysis`
- `/ai-automation-agency-vs-saas-tools`

Why this matters:

People searching comparisons already understand the problem. These pages are easier to rank than broad keywords and often convert better.

Each comparison page should include:

- balanced explanation
- comparison table
- when to choose each option
- limitations
- CTA to relevant product
- FAQ
- schema

---

## 10. Phase 7: Industry Pages

Create high-quality industry pages. Do not mass-generate thin pages.

Recommended pages:

- `/industries/restaurants`
- `/industries/clinics`
- `/industries/real-estate`
- `/industries/legal-firms`
- `/industries/retail`
- `/industries/nbfc`

Why this matters:

Industry pages rank for specific searches and make the website feel more relevant to each buyer.

Each industry page should include:

- industry-specific problem
- relevant VyaptIX products
- sample workflows
- screenshots or mockups
- use cases
- outcomes
- FAQ
- CTA

Example for restaurants:

- AI Review Generator for Google reviews
- Setu for WhatsApp campaigns
- repeat customer campaigns
- QR review workflow

Example for NBFC:

- BankLens for statement analysis
- credit risk scoring
- fraud detection
- CAM report automation
- RBI and DPDP context

---

## 11. Internal Linking Rules

### Why internal links matter

Internal links tell Google which pages are important and how topics relate to each other. They also guide users from educational content to conversion pages.

### Rules to implement

1. Every new blog post must link to at least one commercial landing page.
2. Every commercial landing page must link to its relevant product page.
3. Every product page must link to related category pages.
4. Footer should include important SEO category links once those pages exist.
5. Use descriptive anchor text.

Good anchor examples:

- `Google review software for local businesses`
- `WhatsApp marketing platform`
- `bank statement analysis software`
- `AI automation agency`

Bad anchor examples:

- `click here`
- `learn more`
- `this page`

Footer links to add once pages exist:

- AI Automation
- AI Automation Agency
- Google Review Software
- WhatsApp Marketing Platform
- Bank Statement Analysis
- Credit Decisioning Software

Implementation file:

- `src/components/layout/Footer.tsx`
- relevant page/view files

---

## 12. URL Structure Rules

### Why this matters

Clean URLs help users and search engines understand page topics.

### Rules

Use short, descriptive, lowercase URLs.

Good:

- `/google-review-software`
- `/whatsapp-marketing-platform`
- `/bank-statement-analysis-software`

Avoid:

- `/best-ai-powered-google-review-automation-software-tool`
- `/solutions/google-review-software-for-businesses-in-2026`
- `/page?id=123`

### Canonical rules

Every indexable page must have:

```ts
alternates: {
  canonical: 'https://vyaptix.com/page-slug',
}
```

---

## 13. Blog Creation Rules

### How Sanity fits into the VyaptIX website

The VyaptIX blog uses Sanity as its content management system (CMS).

Sanity provides the content platform, database, authentication, editing
interface, media storage, and publishing system. The VyaptIX codebase defines
which fields editors see and embeds the Sanity Studio interface inside the
website at `/studio`.

The Studio was not developed from scratch by VyaptIX. It is the official Sanity
Studio application, configured and mounted inside this Next.js website.

The system has four distinct parts:

1. **Sanity Project:** The cloud account-level container in Sanity.
   - Project name: `VyaptIX Blog`
   - Project ID: `a3ejtqyf`
   - Manage URL: `https://www.sanity.io/manage/project/a3ejtqyf`
2. **Sanity Dataset:** The cloud content database inside the project.
   - Current dataset: `production`
   - Authors, categories, posts, and uploaded images are stored here.
3. **Sanity Studio:** The editing interface used by the content team.
   - Local URL: `http://localhost:3000/studio`
   - Production URL after deployment: `https://vyaptix.com/studio`
   - The Studio is connected to project `a3ejtqyf` and dataset `production`.
4. **VyaptIX website:** The public Next.js application.
   - It queries published content from the `production` dataset.
   - It renders that content at `/blog` and `/blog/[slug]`.

Important clarification:

The word `Default` previously shown in Studio referred only to the automatically
generated local Studio workspace name. It did not mean a separate Sanity
project. The Studio was already connected to the existing `VyaptIX Blog`
project. The workspace is now explicitly named `VyaptIX Blog` in
`sanity.config.ts`.

### Where the configuration and content live

Cloud content lives in Sanity:

- Project: `VyaptIX Blog`
- Project ID: `a3ejtqyf`
- Dataset: `production`

Studio configuration lives in this codebase:

- `sanity.config.ts`: connects Studio to the project and dataset
- `sanity/schemaTypes/`: defines Blog Post, Author, and Category editing forms
- `sanity/structure.ts`: defines the Studio content navigation
- `app/studio/[[...tool]]/page.tsx`: mounts official Sanity Studio at `/studio`
- `sanity/lib/client.ts`: creates the website's Sanity API client

Public blog integration lives in:

- `src/lib/blog.ts`: fetches and maps published Sanity posts
- `app/(main)/blog/page.tsx`: renders the blog listing
- `app/(main)/blog/[slug]/page.tsx`: renders individual posts and metadata
- `app/api/revalidate/sanity/route.ts`: receives signed Sanity webhook requests

Sanity is the only blog content source used by the website.

Migration completed on June 6, 2026:

- The 7 existing website blogs were imported and reviewed.
- Their cover images and body images were uploaded to Sanity.
- The 3 active categories and existing authors are stored in Sanity.
- The former TypeScript, Markdown, Decap CMS, GitHub OAuth, local image, and
  migration-script systems were removed after review.

Create, edit, publish, and unpublish all blog content in Sanity Studio.

### What is shared between Sanity Manage and embedded Studio

Sanity Manage and the embedded Studio are two interfaces for the same project.

Use **Sanity Manage** for administration:

- invite or remove team members
- manage roles and permissions
- inspect datasets
- configure CORS origins
- configure API tokens
- configure webhooks
- review project usage and billing

Use **Studio at `/studio`** for content operations:

- create authors
- create categories
- draft blog posts
- upload blog images
- edit SEO descriptions
- publish or unpublish content

Content created in `/studio` is stored directly in the `production` dataset of
the `VyaptIX Blog` Sanity project. It is not stored only on the local computer.
Authorized team members see the same content when they log in.

### Environment variables

The website and embedded Studio connect to Sanity using:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=a3ejtqyf
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-06
SANITY_WEBHOOK_SECRET=<private-generated-secret>
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID` selects the existing Sanity project.
- `NEXT_PUBLIC_SANITY_DATASET` selects the content database inside that project.
- `NEXT_PUBLIC_SANITY_API_VERSION` pins Sanity API behavior to a date.
- `SANITY_WEBHOOK_SECRET` verifies that revalidation requests genuinely came
  from Sanity. It must remain private and must not use the `NEXT_PUBLIC_` prefix.

These variables must exist locally in `.env.local` and in the Vercel project
environment. Environment variables are not normally displayed as settings in
Sanity Studio.

### Team publishing workflow

1. Open the Studio.
   - Local development: `http://localhost:3000/studio`
   - Production after deployment: `https://vyaptix.com/studio`
2. Log in using an account invited to the `VyaptIX Blog` Sanity project.
3. Create or select an Author.
4. Create or select a Category.
5. Create a Blog Post.
6. Complete every required field.
7. Generate and review the slug before publishing.
8. Switch `Published` on.
9. Click Sanity's Publish action.
10. Review the public post at `https://vyaptix.com/blog/[slug]`.

Recommended categories currently supported by the website filters:

- `Products`
- `Trending in AI`
- `Business`

### Required fields for every Sanity post

Each post must have:

- `title`
- `slug`
- `excerpt`
- `published`
- `publishedAt`
- `readTime`
- `category`
- `author`
- `coverImage`
- cover image alt text
- `body`

The optional `seoDescription` field should normally be completed. If it is
empty, the website uses the excerpt as the meta description.

### Draft, publish, and website visibility

Sanity's Publish action and the custom `Published` switch serve different
purposes:

- Sanity's Publish action moves the current draft into the published document.
- The `Published` switch controls whether the VyaptIX website includes that
  published document in blog queries.

For a post to appear publicly, both actions are required:

1. Set `Published` to on.
2. Publish the document in Sanity.

Turning the switch off and publishing the change removes the post from public
blog queries while preserving it in Sanity.

### Webhook behavior

The website contains a webhook endpoint:

```text
https://vyaptix.com/api/revalidate/sanity
```

The endpoint exists in website code, while the actual webhook subscription must
be registered in Sanity Manage. These are separate pieces.

When the Sanity webhook is configured, publishing, updating, or deleting a Blog
Post, Author, or Category sends a signed request to the endpoint. The website
verifies the request using `SANITY_WEBHOOK_SECRET`, then refreshes `/blog`, all
blog post pages, and `/sitemap.xml`. Refreshing all detail pages also handles
slug changes and updates to referenced Author or Category records.

Without the registered webhook, content remains safely stored in Sanity, but a
deployed statically generated page may not refresh immediately.

### Access and permissions

Logging into Sanity does not automatically grant access to every project. Team
members must be invited specifically to the `VyaptIX Blog` project.

Administrators should:

1. Open Sanity Manage.
2. Select the `VyaptIX Blog` project.
3. Invite the team member's email address.
4. Assign the minimum role needed for their work.

Do not share API tokens, webhook secrets, or personal login sessions with
content editors.

### SEO rules for posts

1. Title should target a real query.
2. Excerpt should explain the value clearly.
3. SEO description should be specific and remain within 160 characters.
4. First section should answer the search intent quickly.
5. Use H2/H3 sections.
6. Add original examples from VyaptIX products where relevant.
7. Link to relevant landing and product pages.
8. Add descriptive alt text to every image.
9. Avoid generic AI-sounding filler.
10. Review the public page after publishing.

### Content quality rules

Do not publish posts that only summarize generic information. Every post should
include:

- a clear opinion
- practical examples
- specific business scenarios
- VyaptIX experience
- action steps

### Troubleshooting

If `/studio` does not load:

1. Confirm the website is running with `npm run dev`.
2. Confirm `.env.local` contains the correct project ID and dataset.
3. Confirm the logged-in account belongs to the `VyaptIX Blog` project.
4. Confirm the current website origin is listed in Sanity Manage under CORS
   origins with credentials allowed.
5. Ignore unrelated `chrome-extension://` console errors or test with browser
   extensions disabled.

If a published post does not appear:

1. Confirm the custom `Published` switch is on.
2. Confirm the document was published in Sanity, not left as a draft.
3. Confirm all required fields are complete.
4. Confirm the category title matches a supported website category.
5. Confirm the production webhook is configured if testing the deployed site.

---

## 14. Backlinks And Authority Plan

This part cannot be fully completed by a coding agent, but the website must be prepared for it.

### Why backlinks matter

For broad keywords, many competing websites have stronger domain authority. High-quality backlinks and brand mentions help Google trust VyaptIX.

### What Ajeet/team should do outside code

1. Create Google Search Console property.
2. Submit sitemap.
3. Publish founder LinkedIn posts linking to new pages.
4. List products on relevant directories:
   - Product Hunt
   - SaaSworthy
   - AlternativeTo
   - G2 or Capterra when ready
   - startup directories
5. Ask customers or partners for mentions.
6. Publish guest posts on relevant blogs.
7. Build case studies and share them publicly.

### What coding agent should prepare

- create clean landing pages worth linking to
- create case study pages
- add share-friendly metadata
- add author pages
- add strong OG images

---

## 15. Measurement Setup

### Google Search Console

Why this matters:

Search Console tells you what Google sees: indexed pages, search queries, impressions, CTR, and ranking positions.

Action:

1. Add `https://vyaptix.com` to Google Search Console.
2. Submit `https://vyaptix.com/sitemap.xml`.
3. Use URL Inspection for important new pages.
4. Track queries weekly.

### Microsoft Clarity

Why this matters:

Clarity does not directly improve rankings, but it shows how users behave after arriving from search.

Track:

- scroll depth
- rage clicks
- dead clicks
- CTA clicks
- form friction

### Conversion tracking

Track:

- contact form submissions
- demo bookings
- external product clicks
- WhatsApp clicks
- pricing page clicks

Implementation note:

If analytics events are not implemented, add a small analytics helper later and call it from CTAs.

---

## 16. Keyword Priority Map

### Highest priority

Build pages for these first:

- Google review software
- Google review generator
- Google review QR code
- WhatsApp marketing platform
- WhatsApp Business API platform
- WhatsApp team inbox
- bank statement analysis software
- credit decisioning software
- AI automation for business
- AI automation agency

### Medium priority

- AI automation tools
- AI automation platform
- WhatsApp chatbot
- WhatsApp CRM
- loan underwriting automation
- credit risk scoring software
- CAM report automation

### Long-term broad targets

- AI automation
- WhatsApp marketing
- Google reviews
- credit decisioning
- business automation

Why this order matters:

Broad keywords are harder. Start with commercial mid-tail and long-tail keywords, build authority, then compete for broader terms.

---

## 17. 90-Day Implementation Plan

### Days 1-15: Technical cleanup

Implement:

- clean sitemap
- dynamic robots
- encoding cleanup
- metadata upgrade
- OG images
- BreadcrumbList schema
- schema validation

Goal:

Make the site technically clean before creating new SEO assets.

### Days 16-45: Commercial landing pages

Build first:

- `/google-review-software`
- `/whatsapp-marketing-platform`
- `/bank-statement-analysis-software`
- `/credit-decisioning-software`
- `/ai-automation`
- `/ai-automation-agency`

Goal:

Create strong pages for the most important commercial search categories.

### Days 46-75: Topic clusters

Publish 12-16 supporting posts only if quality is high enough:

- 4 around Google reviews
- 4 around WhatsApp marketing
- 4 around credit decisioning
- 4 around AI automation

Goal:

Build topical authority around each commercial page.

Important:

If the team cannot produce strong, specific content for all 12-16 posts in this period, publish fewer posts. Four excellent posts are better than sixteen thin posts.

### Days 76-90: Trust and authority

Implement:

- case study pages
- testimonials
- customer/logo sections if approved
- comparison pages
- footer SEO links
- Search Console review and improvements

Goal:

Improve trust, conversion, and ranking strength.

---

## 18. Implementation Checklist For Coding Agents

When asked to implement this SEO guide, do the following in order:

1. Read `CLAUDE.md`.
2. Read this file completely.
3. Check current branch and git status.
4. Fix sitemap and robots setup.
5. Fix corrupted encoding in metadata and public-facing content.
6. Upgrade metadata on all indexable pages.
7. Add default and page-specific OG images.
8. Add breadcrumb JSON-LD helper.
9. Add schema to page types that need it.
10. Build the six highest-priority commercial landing pages.
11. Add those pages to sitemap and navigation/internal links where appropriate.
12. Add footer SEO links after pages exist.
13. Add topic-cluster blog posts.
14. Add comparison pages.
15. Add case study pages.
16. Run:
    - `npm run typecheck`
    - `npm run lint`
    - `npm run build`
17. Report:
    - files changed
    - new routes created
    - tests/checks run
    - anything that still requires Ajeet input

Do not ask Ajeet to choose every page title or slug. Use the plan in this guide unless there is a real blocker.

---

## 19. Required Page Metadata Template

Use this template for every new indexable page:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Primary Keyword - Clear Business Outcome',
  description:
    'Plain-language description in about 140-160 characters. Include the keyword, audience, and outcome.',
  alternates: {
    canonical: 'https://vyaptix.com/page-slug',
  },
  openGraph: {
    title: 'Primary Keyword - Clear Business Outcome',
    description:
      'Social-friendly description that explains why someone should click.',
    url: 'https://vyaptix.com/page-slug',
    type: 'website',
    images: [
      {
        url: '/og/page-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Primary Keyword - Clear Business Outcome',
    description:
      'Social-friendly description that explains why someone should click.',
    images: ['/og/page-og-image.jpg'],
  },
};
```

---

## 20. Definition Of Done

The SEO implementation is complete when:

- There is only one sitemap system.
- `/sitemap.xml` contains only indexable public pages.
- `/robots.txt` is generated from `app/robots.ts`.
- No corrupted characters appear in titles/descriptions/public content.
- Every indexable page has complete metadata.
- Every major page has an OG image.
- Product pages and landing pages have schema.
- Breadcrumb JSON-LD exists on relevant pages.
- At least six commercial landing pages are live.
- Topic clusters are started.
- Internal links connect blogs, landing pages, and product pages.
- Google Search Console has the sitemap submitted.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

---

## 21. Expected Ranking Timeline

These are realistic expectations, not guarantees.

Branded keywords:

- 2-4 weeks after indexing

Long-tail product keywords:

- 1-3 months

Medium-difficulty commercial keywords:

- 3-6 months

Broad competitive keywords:

- 6-12+ months

Broad keywords require content, technical quality, proof, and backlinks. Do not expect immediate ranking for "AI automation" or "WhatsApp marketing platform" from metadata alone.

---

## 22. Official Google SEO Sources

Use these official Google sources when validating or updating this guide. Do not replace these with SEO blog posts, agency articles, or unofficial checklists unless they are being used only as secondary context.

### General SEO foundation

Google SEO Starter Guide:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

Use this for:

- page titles
- snippets and descriptions
- crawlable site structure
- internal links
- image and content basics
- general SEO best practices

### Helpful, people-first content

Google guidance on helpful, reliable, people-first content:

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Use this for:

- avoiding generic search-engine-first content
- validating topic-cluster and blog quality
- checking whether a page is useful to a real buyer
- avoiding arbitrary word-count or freshness tactics
- strengthening expertise, experience, authority, and trust signals

### Spam, doorway pages, and scaled content

Google spam policies for web search:

- https://developers.google.com/search/docs/essentials/spam-policies

Use this for:

- avoiding doorway pages
- avoiding mass-generated thin pages
- avoiding keyword stuffing
- avoiding hidden text or link manipulation
- checking whether SEO landing pages are genuinely useful or only made to capture search traffic

### Structured data and review/rating schema

Google review snippet structured data documentation:

- https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Use this for:

- deciding whether `Review` or `AggregateRating` markup is allowed
- checking whether ratings are visible, real, and eligible
- avoiding unsafe organization-level rating markup
- validating software/product review markup

Google structured data documentation hub:

- https://developers.google.com/search/docs/appearance/structured-data

Use this for:

- choosing supported schema types
- checking required and recommended properties
- validating whether schema matches visible page content
- finding current guidance for `Organization`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, and other schema types

### Sitelinks search box and `SearchAction`

Google Search documentation update about removal of the sitelinks search box feature:

- https://developers.google.com/search/updates#bye-sitelinkbox

Use this for:

- understanding why the guide does not recommend fake or unused `SearchAction` markup
- confirming that sitelinks search box is no longer available in Google Search results

Important implementation rule:

- Keep `WebSite` schema if useful.
- Do not add `SearchAction` unless the website has a real working site search experience.

### Sitemaps

Google guide to building and submitting sitemaps:

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Use this for:

- deciding which URLs belong in `/sitemap.xml`
- submitting the sitemap in Google Search Console
- avoiding non-page URLs, utility URLs, and noindex URLs in the sitemap

### `noindex` and robots behavior

Google documentation on blocking indexing with `noindex`:

- https://developers.google.com/search/docs/crawling-indexing/block-indexing

Use this for:

- implementing `noindex`
- understanding why noindexed pages must not be blocked by `robots.txt`
- deciding how to handle utility pages such as `/demo`, `/thank-you`, and private routes

Google robots.txt documentation:

- https://developers.google.com/search/docs/crawling-indexing/robots/intro

Use this for:

- understanding what `robots.txt` can and cannot do
- blocking crawler access to private or utility paths
- avoiding the mistake of using `robots.txt` as a noindex mechanism

### Search Console and measurement

Google Search Console overview:

- https://developers.google.com/search/docs/monitor-debug/search-console-start

Use this for:

- submitting the sitemap
- inspecting URLs
- checking indexing status
- monitoring impressions, clicks, CTR, and average position
- finding real queries to improve page titles, content, and internal links

### Source review rule for future agents

Before making major SEO changes, check the relevant Google documentation above first. If Google documentation conflicts with this guide, update this guide and follow Google's current documentation.
