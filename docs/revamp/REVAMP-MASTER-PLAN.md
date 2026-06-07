# VyaptIX Website Revamp — Master Implementation Plan

**Version:** 1.0  
**Date:** 2026-04-21  
**Author:** VyaptIX Product & Strategy Team  
**Target Branch:** `revamp/website-v2` (branch off `develop`)  
**Current Rating:** 5.2/10 → **Target: 8.5/10**

---

## HOW TO USE THIS DOCUMENT

This document is the **single source of truth** for the website revamp. It is structured to be provided as a direct input to Claude Code for full implementation. Each section specifies:
- **WHAT** needs to change (exact files, components, copy)
- **WHY** (business rationale)
- **HOW** (implementation spec)

Complete all sections in the order listed. Each section has a `STATUS` field to track progress.

---

## SCOPE DECISIONS (LOCKED)

| Decision | Detail |
|---|---|
| Products on website | **2 only:** AI Review Generator + AgentMitra |
| Orphaned pages | Remove routes; keep files in repo for now (don't delete) |
| Primary ICP | Founders and marketers at SMB and growth-stage companies (10–500 employees) |
| Secondary ICP | Technologists evaluating AI platforms |
| Brand positioning | Practical AI automation — removes real business friction, shows results fast |
| Analytics tool | PostHog (open-source, privacy-friendly, self-hostable option) |
| SEO meta tool | `react-helmet-async` |

---

## PHASE 1 — CLEANUP (No new features, just fix what's broken)

### 1.1 — Remove Orphaned Routes

**File:** `src/App.tsx`  
**STATUS:** TODO

Remove these 6 imports and `<Route>` entries:
```tsx
// REMOVE these imports:
import { WhatsAppCX } from './pages/WhatsAppCX';
import { VyaptixAI } from './pages/VyaptixAI';
import { EnterpriseCopilots } from './pages/EnterpriseCopilots';
import { SalesAutomation } from './pages/SalesAutomation';
import { ContactCenterAI } from './pages/ContactCenterAI';
import { DPDPCompliance } from './pages/DPDPCompliance';

// REMOVE these Routes:
<Route path="/whatsapp-cx" element={<WhatsAppCX />} />
<Route path="/vyaptix-ai" element={<VyaptixAI />} />
<Route path="/enterprise-copilots" element={<EnterpriseCopilots />} />
<Route path="/sales-automation" element={<SalesAutomation />} />
<Route path="/contact-center-ai" element={<ContactCenterAI />} />
<Route path="/dpdp-compliance" element={<DPDPCompliance />} />

// ADD this new Route:
<Route path="/agent-mitra" element={<AgentMitra />} />

// ADD this import:
import { AgentMitra } from './pages/AgentMitra';
```

Do NOT delete the page files — just remove routes so they are unreachable.

---

### 1.2 — Fix Header Navigation

**File:** `src/components/layout/Header.tsx`  
**STATUS:** TODO

Replace the `navItems` array (lines 66–79) with:

```tsx
const navItems: NavItem[] = [
  {
    label: 'Products',
    href: '/solutions',
    children: [
      {
        label: 'AI Review Generator',
        href: '/solutions/ai-review-generation',
        icon: <Star className="w-5 h-5" />,
        description: 'Collect Google reviews in under 20 seconds'
      },
      {
        label: 'AgentMitra',
        href: '/agent-mitra',
        icon: <SolutionIconUsers className="w-5 h-5" />,
        description: 'AI agents for business automation'
      },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

Also update the `NavChild` interface to add an optional `description` field:
```tsx
interface NavChild {
  label: string;
  href: string;
  icon?: ReactNode;
  description?: string;
}
```

And update the dropdown rendering to show description under each nav child label:
```tsx
<Link key={child.label} to={child.href} className="group flex items-center gap-3 px-4 py-3 hover:bg-background transition-colors">
  {child.icon && <span className="text-text-tertiary group-hover:text-primary-500 transition-colors">{child.icon}</span>}
  <span>
    <span className="block font-medium text-text group-hover:text-primary-500">{child.label}</span>
    {child.description && <span className="block text-xs text-text-secondary">{child.description}</span>}
  </span>
</Link>
```

Also add a "Book a Demo" button to the header right side (replace the empty `<div>` at line 161):
```tsx
<div className="hidden lg:flex items-center gap-3">
  <Link
    to="/contact"
    className="px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:shadow-medium transition-all"
  >
    Book a Demo
  </Link>
</div>
```

---

### 1.3 — Fix Footer

**File:** `src/components/layout/Footer.tsx`  
**STATUS:** TODO

1. Update `footerLinks.solutions` to include both products:
```tsx
solutions: [
  { label: 'AI Review Generator', href: '/solutions/ai-review-generation' },
  { label: 'AgentMitra', href: '/agent-mitra' },
],
```

2. Update Privacy Policy and Terms links from `#` to real routes:
```tsx
<Link to="/privacy-policy" className="hover:text-secondary-400 transition-colors">Privacy Policy</Link>
<Link to="/terms-of-service" className="hover:text-secondary-400 transition-colors">Terms of Service</Link>
```

3. Fix Facebook URL — replace `https://facebook.com` with actual VyaptIX Facebook page URL (get from team).

4. Add "Resources" column between Company and Solutions:
```tsx
resources: [
  { label: 'Blog', href: '/blog' },
  { label: 'Documentation', href: '/docs' },  // placeholder for future
  { label: 'Support', href: '/contact' },
],
```

---

### 1.4 — Fix Logo Performance

**File:** `public/final_logo_-_light.png`  
**STATUS:** TODO

Current file is 759KB. Replace with:
- Option A: SVG version of the logo (preferred — request from design team)
- Option B: WebP version at 2x density (480px wide) — target < 15KB

Update all references in `Header.tsx` and `Footer.tsx`:
```tsx
// Replace:
src="/final_logo_-_light.png"
// With (if SVG):
src="/vyaptix-logo.svg"
// Or (if WebP):
src="/vyaptix-logo.webp"
```

---

## PHASE 2 — NEW PAGES

### 2.1 — Create AgentMitra Product Page

**File to create:** `src/pages/AgentMitra.tsx`  
**Route:** `/agent-mitra`  
**STATUS:** TODO — REQUIRES PRODUCT TEAM INPUT (see `product-docs/agent-mitra.md`)

**BLOCKER:** Product details for AgentMitra must be confirmed before this page can be built. Once confirmed, the page should follow this exact structure:

```tsx
export function AgentMitra() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero-ai-bg text-white py-20 md:py-28">
        {/* Headline: [7 words max — core benefit] */}
        {/* Sub-headline: [2 sentences — ICP + pain + outcome] */}
        {/* CTA Row: "Book a Demo" (primary) + "Watch Overview" (secondary) */}
        {/* Hero visual: product screenshot or animated illustration */}
      </section>

      {/* 2. SOCIAL PROOF BAR — key metrics */}
      <section className="py-8 bg-white border-b border-border-light">
        {/* 3–4 metric cards: e.g. "500+ automations", "X hours saved", etc. */}
      </section>

      {/* 3. PROBLEM STATEMENT */}
      <section className="py-20 bg-background">
        {/* "Sound familiar?" — 3 pain point cards with relatable copy */}
      </section>

      {/* 4. HOW IT WORKS — 4-step flow */}
      <section className="py-20 bg-white">
        {/* Step 1, 2, 3, 4 with icons */}
      </section>

      {/* 5. KEY FEATURES — 6 feature cards */}
      <section className="py-20 bg-background">
        {/* Feature grid with icon + title + 1-line description */}
      </section>

      {/* 6. USE CASES */}
      <section className="py-20 bg-white">
        {/* 3 specific use case scenarios with outcome */}
      </section>

      {/* 7. INTEGRATIONS */}
      <section className="py-16 bg-background">
        {/* Tool logo grid (reuse pattern from homepage AI stack section) */}
      </section>

      {/* 8. TESTIMONIALS (if available) */}
      {/* 9. FAQ — Accordion component */}
      {/* 10. FINAL CTA — Book a Demo */}
    </>
  );
}
```

---

### 2.2 — Create Privacy Policy Page

**File to create:** `src/pages/PrivacyPolicy.tsx`  
**Route:** `/privacy-policy`  
**STATUS:** TODO

Add to `App.tsx`:
```tsx
import { PrivacyPolicy } from './pages/PrivacyPolicy';
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
```

Content must be drafted by the legal/founder team and cover:
- What data is collected (name, email, IP, device info)
- How it is used (CRM, analytics, marketing)
- Third-party processors (Supabase, Zoho CRM, PostHog)
- Cookie usage
- Data retention period
- User rights (access, deletion, correction)
- Contact for privacy requests: `privacy@vyaptix.com` (or equivalent)
- Effective date and governing law jurisdiction

Page structure:
```tsx
export function PrivacyPolicy() {
  return (
    <div className="container-main py-20 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="text-3xl font-bold mt-6 mb-2">Privacy Policy</h1>
      <p className="text-text-secondary mb-8">Last updated: [DATE]</p>
      {/* Long-form legal content as semantic HTML */}
    </div>
  );
}
```

---

### 2.3 — Create Terms of Service Page

**File to create:** `src/pages/TermsOfService.tsx`  
**Route:** `/terms-of-service`  
**STATUS:** TODO

Same pattern as PrivacyPolicy.tsx. Add route to `App.tsx`. Content must be legally reviewed.

---

## PHASE 3 — HOMEPAGE REVAMP

**File:** `src/pages/Home.tsx`  
**STATUS:** TODO

This is the highest-impact change. Revamp in this order:

### 3.1 — New Hero Section

Replace the current hero with:

```tsx
<section className="hero-ai-bg text-white py-24 md:py-32 relative overflow-hidden">
  {/* Background blobs — keep existing */}
  <div className="container-main relative text-center max-w-4xl mx-auto">
    
    {/* Trust badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-8">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      Trusted by 500+ businesses across 12 industries
    </div>
    
    {/* Headline — replace "Supercharge Your Business..." */}
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
      Your customers have opinions.<br />
      <span className="gradient-text">Turn them into growth.</span>
    </h1>
    
    {/* Sub-headline */}
    <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
      AI-powered tools that turn every customer interaction into a Google review,
      a qualified lead, or a closed deal — without adding headcount.
    </p>
    
    {/* CTA row */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <Link to="/contact" className="...primary button...">
        Book a Free Demo
      </Link>
      <button onClick={openVideoModal} className="...secondary button... flex items-center gap-2">
        <Play className="w-5 h-5" /> Watch 2-min Overview
      </button>
    </div>
    
    {/* Social proof numbers row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
      {[
        { value: '10,000+', label: 'Reviews collected' },
        { value: '< 20s', label: 'Customer time' },
        { value: '500+', label: 'Businesses served' },
        { value: '4.8★', label: 'Avg customer rating' },
      ].map(metric => (
        <div key={metric.label} className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
          <div className="text-sm text-white/60">{metric.label}</div>
        </div>
      ))}
    </div>
    
  </div>
</section>
```

**NOTE:** Replace all metric values with verified real numbers from the team before launch. Do not publish made-up statistics.

---

### 3.2 — Social Proof / Customer Logos Section

Add immediately after hero:

```tsx
<section className="py-12 bg-white border-b border-border-light">
  <div className="container-main text-center">
    <p className="text-sm text-text-tertiary mb-8 uppercase tracking-wider">
      Trusted by businesses across industries
    </p>
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:opacity-80 transition-opacity">
      {/* Customer logos — 5–8 recognizable business logos */}
      {/* If no named customers yet: show industry icons with names */}
    </div>
  </div>
</section>
```

---

### 3.3 — Products Section (Replace "AI Stack" as primary section)

```tsx
<section className="py-20 md:py-28 bg-background">
  <div className="container-main">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
        Two products. One goal: <span className="gradient-text">make AI work for your business.</span>
      </h2>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Card 1: AI Review Generator */}
      {/* Product Card 2: AgentMitra */}
    </div>
  </div>
</section>
```

Each product card:
```tsx
<div className="bg-white rounded-2xl border border-border-light p-8 hover:shadow-large transition-all">
  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <span className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full">Available Now</span>
  <h3 className="text-2xl font-bold text-text mt-3 mb-3">[Product Name]</h3>
  <p className="text-text-secondary mb-6">[2-sentence value prop]</p>
  <ul className="space-y-2 mb-8">
    {/* 3 bullet points with check icons */}
  </ul>
  <div className="flex gap-3">
    <Link to="[product-page]" className="...primary button...">Learn More</Link>
    <Link to="/contact" className="...outline button...">Book Demo</Link>
  </div>
</div>
```

---

### 3.4 — How It Works Section (Keep, but refocus on journey)

Keep the 4-step flow for AI Review Generator. Add a toggle or tabs to show AgentMitra flow as well.

---

### 3.5 — Testimonials Section (New)

```tsx
<section className="py-20 bg-white">
  <div className="container-main">
    <h2 className="text-3xl font-bold text-center mb-12">What our customers say</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <div className="bg-background rounded-xl p-6 border border-border-light">
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-warning-500 fill-current" />)}
          </div>
          <p className="text-text-secondary mb-6 italic">"{t.quote}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {t.initials}
            </div>
            <div>
              <div className="font-semibold text-text text-sm">{t.name}</div>
              <div className="text-text-tertiary text-xs">{t.role}, {t.company}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

Define testimonial data:
```typescript
const testimonials = [
  {
    quote: '[Real customer quote — get from team]',
    name: '[Full Name]',
    role: '[Title]',
    company: '[Company]',
    initials: 'AB',
  },
  // ... 2 more
];
```

**REQUIREMENT:** Use only real customer quotes with explicit permission. Do not fabricate testimonials.

---

### 3.6 — Move AI Stack Section Down

Move the current "AI Stack" (integration logos) section to lower on the page — after testimonials, positioned as "Works with your existing tools":

```tsx
<section className="py-16 bg-background">
  <div className="container-main text-center">
    <p className="text-text-secondary mb-8">Works with 18+ tools your team already uses</p>
    {/* Existing tool logo grid — unchanged */}
  </div>
</section>
```

---

### 3.7 — Final CTA Section (Enhanced)

Replace or enhance the existing bottom CTA section:

```tsx
<section className="py-24 gradient-hero text-white">
  <div className="container-main text-center max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Ready to see AI work for your business?
    </h2>
    <p className="text-white/70 mb-10">
      Book a 30-minute demo. We'll show you exactly how VyaptIX can automate your specific workflow — no generic presentations.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/contact" className="...primary button (light)...">Book Your Demo →</Link>
      <a href="https://reviews.vyaptix.ai" target="_blank" className="...outline button...">
        Try AI Review Generator Free
      </a>
    </div>
    <p className="text-white/40 text-sm mt-6">No credit card required. Setup in under 5 minutes.</p>
  </div>
</section>
```

---

## PHASE 4 — SOLUTIONS PAGE REVAMP

**File:** `src/pages/Solutions.tsx`  
**STATUS:** TODO

The current Solutions.tsx is effectively just an AI Review Generation page. Revamp to:

1. Hero: "Our Products" heading, 2-sentence overview
2. Side-by-side or stacked sections for each product (use the same 2-column layout already on the page, but add AgentMitra as a second product section)
3. Comparison table: Which product is right for you?

```tsx
// Add AgentMitra section (mirror of existing AI Review Generation section)
<section className="py-20 md:py-28 bg-background">
  <div className="container-main">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Product visual LEFT */}
      {/* Product copy RIGHT (reverse of AI Review Gen layout) */}
    </div>
  </div>
</section>
```

---

## PHASE 5 — ANALYTICS SETUP

**STATUS:** TODO

Install PostHog for product analytics and session recording:

```bash
npm install posthog-js
```

Create `src/lib/analytics.ts`:
```typescript
import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false, // we'll do this manually on route change
    persistence: 'localStorage',
  });
}

export function trackPageView(path: string) {
  posthog.capture('$pageview', { $current_url: path });
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}
```

In `src/App.tsx`, initialize analytics and track route changes:
```tsx
import { initAnalytics, trackPageView } from './lib/analytics';
import { useEffect } from 'react';

// Inside App component, before return:
useEffect(() => { initAnalytics(); }, []);

// Use a route-change effect:
// (wrap in a child component that uses useLocation)
```

Create `src/components/RouteTracker.tsx`:
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}
```

Add `<RouteTracker />` inside `<BrowserRouter>` in `App.tsx`.

Add to `.env`:
```
VITE_POSTHOG_KEY=your_posthog_project_key
VITE_POSTHOG_HOST=https://app.posthog.com
```

**Key events to track:**
- `cta_clicked` — every CTA button, with `{ label, destination, page }` properties
- `contact_form_submitted` — on successful submission
- `contact_form_error` — on API error
- `video_play` — when demo video is opened
- `product_page_viewed` — on product page load with product name

---

## PHASE 6 — SEO IMPLEMENTATION

**STATUS:** TODO

### 6.1 Install react-helmet-async

```bash
npm install react-helmet-async
```

Wrap `<App>` in `src/main.tsx`:
```tsx
import { HelmetProvider } from 'react-helmet-async';

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

### 6.2 Create SEO Component

Create `src/components/SEO.tsx`:
```tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

export function SEO({ title, description, image, noIndex = false }: SEOProps) {
  const fullTitle = title.includes('VyaptIX') ? title : `${title} — VyaptIX`;
  const ogImage = image || 'https://vyaptix.com/og-default.jpg';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
```

### 6.3 Add SEO Component to All Pages

Add to each page component:
```tsx
// Home.tsx
<SEO
  title="VyaptIX — AI Automation for Business Growth"
  description="Deploy AI agents that automate customer engagement, collect Google reviews, and drive growth. Trusted by 500+ businesses globally."
/>

// AIReviewGeneration.tsx
<SEO
  title="AI Review Generator — Collect Google Reviews in 20 Seconds"
  description="Turn customer feedback into authentic Google reviews instantly. AI-powered, QR code enabled. Try free today."
/>

// AgentMitra.tsx
<SEO
  title="AgentMitra — AI Agent for Business Automation"
  description="[Add once product is defined]"
/>

// About.tsx
<SEO
  title="About VyaptIX"
  description="Learn about VyaptIX's mission to make AI automation accessible for every business. Meet the team behind our products."
/>

// Blog.tsx
<SEO
  title="Blog — AI Automation Insights"
  description="Expert insights on AI automation, customer engagement, and business growth from the VyaptIX team."
/>

// Contact.tsx
<SEO
  title="Contact VyaptIX — Book a Demo"
  description="Ready to automate your business with AI? Book a 30-minute demo with the VyaptIX team."
/>

// ThankYou.tsx — noindex
<SEO
  title="Thank You — VyaptIX"
  description="We'll be in touch soon."
  noIndex={true}
/>

// PrivacyPolicy.tsx — noindex
<SEO
  title="Privacy Policy — VyaptIX"
  description="VyaptIX privacy policy."
  noIndex={true}
/>
```

### 6.4 Create sitemap.xml

Create `public/sitemap.xml` (see `content-docs/seo-strategy.md` for full content).

### 6.5 Create robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /thank-you
Sitemap: https://vyaptix.com/sitemap.xml
```

### 6.6 Add JSON-LD to Homepage

In `Home.tsx`, add inside the `<SEO>` component or directly in `<Helmet>`:
```tsx
<Helmet>
  {/* ...existing SEO tags... */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VyaptIX",
      "url": "https://vyaptix.com",
      "logo": "https://vyaptix.com/vyaptix-logo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/vyaptix-ai",
        "https://x.com/Vyaptix_ai",
        "https://www.instagram.com/vyaptixai/"
      ]
    })}
  </script>
</Helmet>
```

---

## PHASE 7 — SECURITY FIXES

**STATUS:** TODO

Implement in this order (see `qa-docs/security-review.md` for full details):

### 7.1 — Move Zoho Credentials Server-Side

In `api/submit-to-zoho.ts`, replace:
```typescript
// Before:
const clientId = process.env.VITE_ZOHO_CLIENT_ID;
// After:
const clientId = process.env.ZOHO_CLIENT_ID;
```

Update all Zoho env var references in the API function from `VITE_ZOHO_*` to `ZOHO_*`.

Remove `VITE_ZOHO_*` from `.env` and add `ZOHO_*` (no VITE prefix).

Update Vercel environment variables in dashboard accordingly.

**Also:** Rotate the Zoho refresh token immediately via Zoho Developer Console → treat current token as compromised.

### 7.2 — Add Cookie Consent Banner

Create `src/components/ui/CookieBanner.tsx`:
```tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-text text-white p-4 shadow-large">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/80">
          We use cookies to improve your experience and analyze site usage.{' '}
          <Link to="/privacy-policy" className="underline hover:text-white">Learn more</Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline} className="px-4 py-2 text-sm border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
            Decline
          </button>
          <button onClick={accept} className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
```

Add `<CookieBanner />` to `src/components/layout/Layout.tsx` just before closing tags.

### 7.3 — Add Security Headers

Update `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

---

## PHASE 8 — CONTACT FORM SIMPLIFICATION

**File:** `src/pages/Contact.tsx`  
**STATUS:** TODO

The current form has 30+ fields. For most visitors, this is a conversion killer. Implement a two-stage form:

**Stage 1 (visible on load):** 6 fields
- First Name (required)
- Last Name (required)
- Work Email (required)
- Company (required)
- Product Interested In (dropdown: AI Review Generator / AgentMitra / Not sure yet)
- Message (textarea, optional)
- Submit button: "Get in Touch"

**Stage 2 (shown after Stage 1 submit, or as a separate booking page):** Additional qualification fields
- Or redirect to Calendly booking link for demo scheduling

The full 30+ field form can remain accessible but should be labelled "Enterprise Inquiry" and not be the default path.

Alternatively, for users who select a product, route them:
- AI Review Generator → link to `https://reviews.vyaptix.ai` with a "Try it free" message
- AgentMitra → Calendly booking embed

---

## PHASE 9 — ABOUT PAGE ENHANCEMENT

**File:** `src/pages/About.tsx`  
**STATUS:** TODO (lower priority — do after Phases 1–7)

Add sections:
1. **Company Story** — founding narrative (2–3 paragraphs, personal and specific)
2. **The Team** — name, photo, title, LinkedIn link for each founder/key team member
3. **Current Mission** — what you're solving and for whom
4. **Milestones / Traction** — key moments (first customer, X reviews collected, etc.)

---

## IMPLEMENTATION PRIORITY ORDER

| Order | Phase | Priority | Effort | Blocked? | Impact | Status |
|---|---|---|---|---|---|---|
| — | **Next.js migration + Blog system** | P0 | **Done** | — | Full SSG, SSR-SEO, Sanity Studio | ✅ Done |
| 1 | 7.1 Zoho credentials security | P0 | 2 hours | No | Closes critical security hole — do this before anything else | ✅ Done |
| 2 | 1.1 Remove orphaned routes | P0 | 30 min | No | Removes broken 404s | ✅ Done |
| 3 | 1.2 Fix header nav | P0 | 1 hour | No | Critical UX fix | ✅ Done |
| 4 | 1.3 Fix footer | P0 | 30 min | No | Fixes broken links | ✅ Done |
| 5 | 7.2 Cookie banner | P0 | 1 hour | No | Legal/GDPR compliance | ✅ Done — fixed bottom banner, localStorage consent, exports getCookieConsent() for PostHog |
| 6 | 7.3 Security headers (vercel.json) | P0 | 30 min | No | Closes remaining security gaps | ✅ Done — X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy |
| 7 | 5 Analytics setup | P1 | 2 hours | Yes — needs PostHog key | Enables measurement from day 1 | ❌ Blocked — needs PostHog key |
| 8 | 6.1–6.6 SEO basics (Metadata API, sitemap, robots, JSON-LD) | P1 | 3 hours | No | Unlocks Google indexing | ✅ Done |
| 9 | 2.4 404 Not Found page | P1 | 30 min | No | Basic UX — currently crashes on bad URLs | ✅ Done |
| 10 | 1.4 Logo optimization | P1 | 1 hour | Yes — needs SVG from design | Core Web Vitals | ✅ Done — WebP at /vyaptix-logo.webp |
| 11 | 8 Contact form simplification | P1 | 4 hours | No | Conversion rate fix | ❌ Pending |
| 12 | 3 Homepage revamp | P2 | 1–2 days | Partial — needs metrics & testimonials | Highest conversion impact | ✅ Done — repositioned as company capability page |
| 13 | 4 Solutions page | P2 | 4 hours | Partial — needs AgentMitra defined | Two-product clarity | ✅ Done — side-by-side layout, comparison section |
| 14 | 2.1 AgentMitra page | P2 | 1 day | Yes — needs product definition | Completes the product lineup | ✅ Done — page live, real content still needed |
| 15 | 2.2 Privacy Policy | P2 | 2 hours | Yes — needs legal text | Legal compliance | ✅ Done — page live, legal text still needed |
| 16 | 2.3 Terms of Service | P2 | 2 hours | Yes — needs legal text | Legal compliance | ✅ Done — page live, legal text still needed |
| 17 | 9 About page | P3 | 1 day | Yes — needs team content | Trust building | ✅ Done — team, origin story, milestones, values, CTA |
| 18 | 10 Design system overhaul | P3 | 3–5 days | No | Complete visual refresh | ❌ Pending |

---

## LOCAL DEVELOPMENT SEQUENCE (Easy → Complex)

> This is the working order for local revamp development. Start from Step 1 and implement one step at a time. Security and design are intentionally last.

| Step | Phase | Task | Effort | Blocked? | Status |
|---|---|---|---|---|---|
| — | **Next.js migration** | Migrate full website from Vite/React SPA to Next.js 14 App Router | Done | No | ✅ Done |
| — | **Blog system** | Sanity Studio with SSG, SEO, and migrated posts | Done | No | ✅ Done |
| 1 | 1.1 | Remove orphaned routes from `App.tsx` | 30 min | No | ✅ Done |
| 2 | 1.2 | Fix header nav (remove Setu, fix AgentMitra link, add Book Demo btn) | 1 hour | No | ✅ Done |
| 3 | 1.3 | Fix footer (links, add AgentMitra, fix Privacy/Terms) | 30 min | No | ✅ Done |
| 4 | 2.4 | Create 404 Not Found page | 30 min | No | ✅ Done |
| 5 | 6.1–6.6 | SEO basics (Next.js Metadata API, native sitemap/robots routes, JSON-LD on all pages) | 3 hours | No | ✅ Done |
| 6 | 1.4 | Logo optimization (759KB PNG → WebP) | 1 hour | No | ✅ Done — WebP at /vyaptix-logo.webp |
| 7 | 2.2 | Privacy Policy page | 2 hours | Yes — needs legal text from team | ✅ Done — page live, legal text still needed |
| 8 | 2.3 | Terms of Service page | 2 hours | Yes — needs legal text from team | ✅ Done — page live, legal text still needed |
| 9 | 7.1 | Zoho credentials moved server-side (no VITE_ prefix) | 1 hour | No | ✅ Done |
| 10 | 2.1 | AgentMitra product page | 1 day | Yes — needs product definition | ✅ Done — page live, real product content still needed |
| 11 | 5 | Analytics setup (PostHog) | 2 hours | Yes — needs PostHog key | ❌ Blocked — needs PostHog key from Ajeet |
| 12 | 8 | Contact form simplification (6-field Stage 1 form) | 4 hours | No | ❌ Pending |
| 13 | 7.2 | Cookie consent banner | 1 hour | No | ✅ Done — fixed bottom banner, localStorage consent, getCookieConsent() exported |
| 14 | 7.3 | Security headers in vercel.json | 30 min | No | ✅ Done — X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy |
| 15 | 3 | Homepage revamp (hero, products section, testimonials, CTA) | 1–2 days | Yes — needs real metrics & testimonials from team | ✅ Done — repositioned as company capability page |
| 16 | 4 | Solutions page revamp (add AgentMitra section) | 4 hours | Yes — needs AgentMitra product definition | ✅ Done — side-by-side layout, comparison section |
| 17 | 9 | About page enhancement (team, story, milestones) | 1 day | Yes — needs team content & photos | ✅ Done — origin story, team, milestones, values, CTA |
| 18 | 10 | Complete design system overhaul (superdesign.dev + 21st.dev) | 3–5 days | No | ❌ Pending |

---

## CONTENT DEPENDENCIES (Needs from Team Before Build)

| Content Item | Needed For | Owner |
|---|---|---|
| Verified customer metrics (reviews collected, businesses served) | Homepage hero stats | Founders |
| 3 customer testimonials (name, quote, company, photo permission) | Homepage + product pages | Sales/CS team |
| AgentMitra product definition (see agent-mitra.md for questions) | AgentMitra page | Product team |
| Team photos and bios | About page | All team members |
| Real Facebook page URL | Footer | Marketing |
| Privacy Policy legal text | Privacy Policy page | Legal / Founders |
| Terms of Service legal text | Terms page | Legal / Founders |
| OG image (1200x630px branded image) | All page meta | Design team |
| Logo in SVG format | Logo optimization | Design team |
| PostHog project key | Analytics setup | Engineering |
| Calendly booking link (for demo CTA) | CTA buttons | Sales team |

---

---

## PHASE 10 — DESIGN SYSTEM OVERHAUL (Complete Visual Refresh)

**STATUS:** TODO (do after all functional phases are complete and stable)  
**Estimated Effort:** 3–5 days  
**Reference Tools:**
- **Design system:** https://app.superdesign.dev/ — use to generate/define the full VyaptIX design language (colors, typography, spacing, shadows, border radius, motion)
- **Component library:** https://21st.dev/home — use to source and adapt production-ready React components that match the new design system

---

### 10.1 — Define the Design System (Superdesign.dev)

Use superdesign.dev to establish the VyaptIX design system. Export the following tokens and update `tailwind.config.js`:

- **Color palette** — primary, secondary, accent, neutral, success, warning, error scales
- **Typography scale** — font sizes, weights, line heights, letter spacing
- **Spacing scale** — consistent spacing units
- **Shadow system** — none, sm, md, lg, xl levels
- **Border radius** — none, sm, md, lg, full
- **Motion/transition** — duration and easing presets

Update `tailwind.config.js` with all new tokens as custom values under `extend`. This ensures all existing utility classes are preserved while new tokens layer on top.

---

### 10.2 — Audit Existing Components Against New System

Before replacing anything, audit every existing component for:
- Which design tokens they currently use (hardcoded vs. token-based)
- Which can be reskinned by just changing token values in `tailwind.config.js`
- Which need structural replacement

Components to audit:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Layout.tsx`
- `src/components/ui/` — all files
- `src/pages/Home.tsx`
- `src/pages/Solutions.tsx`
- `src/pages/AIReviewGeneration.tsx`

---

### 10.3 — Replace Components Using 21st.dev

Use 21st.dev to source replacements for these components (adapt to VyaptIX design tokens, do not use as-is):

| Component | What to source | Notes |
|---|---|---|
| Hero section | Full-width hero with gradient, headline, CTA row | Pick one that supports background blobs/motion |
| Navigation | Mega-menu style header with dropdown | Must support mobile hamburger |
| Product cards | Feature card with icon, title, bullets, dual CTA | Needs hover elevation effect |
| Testimonial cards | Quote card with avatar, star rating | Grid of 3 |
| How it works | Numbered step flow with connecting line | Horizontal on desktop, vertical on mobile |
| CTA section | Full-width gradient banner with dual buttons | Bottom of homepage |
| Stats bar | 4-column metric strip | Used in hero and product pages |
| Blog cards | Title + excerpt + date + tag + read link | 3-column grid |
| Contact form | Clean 2-stage form | Stage 1: 6 fields. Stage 2: optional |
| Cookie banner | Fixed bottom bar with accept/decline | Already defined in Phase 7.2 |
| 404 page | Illustrated not-found with home CTA | Fun, on-brand |

For each: copy the component, adapt class names to VyaptIX design tokens, replace placeholder content with real content.

---

### 10.4 — Implement Across All Pages

Apply the new design system and components to every page in this order:

1. Layout shell (Header + Footer) — affects all pages instantly
2. `Home.tsx` — highest traffic, highest impact
3. `AIReviewGeneration.tsx` — live product page
4. `AgentMitra.tsx` — new product page
5. `Solutions.tsx`
6. `Blog.tsx` + blog post pages
7. `Contact.tsx`
8. `About.tsx`
9. `PrivacyPolicy.tsx` + `TermsOfService.tsx`

---

### 10.5 — Visual QA Checklist

Before marking Phase 10 complete, verify across Chrome, Firefox, and Safari (desktop + mobile):

- [ ] Design tokens are consistent across all pages — no hardcoded colors or sizes
- [ ] Typography scale is applied — no raw `text-lg` without token mapping
- [ ] Hover states work on all interactive elements
- [ ] Focus states are visible for keyboard navigation (accessibility)
- [ ] Dark mode is either fully supported or fully disabled — no partial states
- [ ] All animations are subtle (< 300ms) and respect `prefers-reduced-motion`
- [ ] Mobile layout is verified at 375px, 390px, 430px widths
- [ ] No layout shift on page load (no CLS issues)
- [ ] Logo, icons, and illustrations are crisp on retina displays

---

## DEFINITION OF DONE

The revamp is complete when:

- [ ] All 14 items in the QA checklist (`qa-docs/qa-checklist.md`) pass
- [ ] Lighthouse score: Performance > 80, Accessibility > 90, SEO > 80
- [ ] Zero broken internal links (verify with a link checker)
- [ ] `/sitemap.xml` lists all pages and is submitted to Google Search Console
- [ ] Analytics events fire correctly for CTAs and form submissions
- [ ] Cookie banner appears on first visit
- [ ] No Zoho credentials visible in browser DevTools
- [ ] AgentMitra page is live with real product content
- [ ] Privacy Policy and Terms pages are live with real legal content
- [ ] All testimonials on the site are real and permissioned
- [ ] Logo is < 20KB
