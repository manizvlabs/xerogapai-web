# SEO Implementation Guide — VyaptIX Website

**Who this is for:** Ajeet — so you can understand, update, and maintain every SEO element without asking for help.

**Covers:** react-helmet-async, the SEO component, page titles & descriptions, Open Graph, Twitter Cards, JSON-LD, sitemap.xml, robots.txt.

---

## The Big Picture: Why SEO Matters Here

Before the revamp, the VyaptIX website had **zero SEO** — no per-page titles, no meta descriptions, no structured data, no sitemap. Google couldn't understand what each page was about, couldn't build rich search results, and had no authoritative index of the site.

This implementation adds a baseline that covers every page in one consistent pattern. It won't get you to #1 on Google overnight — that takes content + backlinks — but it ensures Google can **find, understand, and display** your pages correctly.

---

## Part 1 — react-helmet-async

### What it is

A React library that lets you set HTML `<head>` content (title, meta tags, scripts) from inside any React component, no matter how deep in the component tree.

Without it, every page would show the same generic `<title>` from `index.html`, and you'd have no way to add page-specific meta tags from inside React.

### Why "async"?

The `async` version is safe for server-side rendering (SSR) and concurrent React features. Even though the site is currently client-side only (Vite), using the async version future-proofs the setup.

### Where it lives in the code

**Installation:** `package.json` → `react-helmet-async` in `dependencies`.

**Provider (root wrap):** [`src/main.tsx`](../../src/main.tsx)
```tsx
import { HelmetProvider } from 'react-helmet-async';

root.render(
  <StrictMode>
    <HelmetProvider>   ← wraps the whole app
      <App />
    </HelmetProvider>
  </StrictMode>
);
```

**Why at root level?** `HelmetProvider` maintains a single shared context for all `<Helmet>` instances across every page. It must wrap the entire app exactly once.

### How to update

You never touch `HelmetProvider` again. It's set-and-forget.

---

## Part 2 — The SEO Component

**File:** [`src/components/SEO.tsx`](../../src/components/SEO.tsx)

### What it is

A thin wrapper around `<Helmet>` that turns per-page SEO into a single clean component call instead of a block of raw meta tags scattered across every page.

### What it outputs

One `<SEO>` call in your page writes **all of the following** into the `<head>`:

| Tag | Purpose |
|-----|---------|
| `<title>` | Tab title + Google search result headline |
| `<meta name="description">` | Google search result snippet (150–160 chars ideal) |
| `<meta name="robots">` | Tells Google whether to index the page |
| `<link rel="canonical">` | Prevents duplicate content issues |
| `<meta property="og:*">` | Controls how the page looks when shared on LinkedIn/WhatsApp/Facebook |
| `<meta name="twitter:*">` | Controls how the page looks when shared on Twitter/X |
| `<script type="application/ld+json">` | Structured data for rich search results |

### Props reference

```tsx
<SEO
  title="string"            // REQUIRED — page title (VyaptIX appended automatically if missing)
  description="string"      // REQUIRED — 150–160 characters, what Google shows in search
  image="string"            // optional — full URL to OG image (defaults to og-default.jpg)
  noIndex={boolean}         // optional — true = tell Google NOT to index this page
  canonical="string"        // optional — path like "/contact" (https://vyaptix.com prepended)
  jsonLd={object}           // optional — structured data object (see Part 5)
/>
```

### Title auto-formatting

The component automatically appends " | VyaptIX" if "VyaptIX" isn't already in the title:

```
"Book a Demo"  →  "Book a Demo | VyaptIX"
"VyaptIX — AI Automation for Business Growth"  →  unchanged (already has VyaptIX)
```

### Where it's used

Every page imports and uses it:

```tsx
import { SEO } from '../components/SEO';

export function MyPage() {
  return (
    <>
      <SEO title="..." description="..." />
      {/* rest of page */}
    </>
  );
}
```

---

## Part 3 — Per-Page SEO Settings

### Where each page's SEO is defined

The SEO tag lives at the top of each page's return statement. Find it by opening the page file and looking for `<SEO` right after the opening `<>`.

| Page | File | Title | noIndex |
|------|------|-------|---------|
| Home | [`src/pages/Home.tsx`](../../src/pages/Home.tsx) | VyaptIX — AI Automation for Business Growth | — |
| AI Review Generator | [`src/pages/AIReviewGeneration.tsx`](../../src/pages/AIReviewGeneration.tsx) | AI Review Generator — Collect Google Reviews in 20 Seconds | — |
| AgentMitra | [`src/pages/AgentMitra.tsx`](../../src/pages/AgentMitra.tsx) | AgentMitra — AI Workspace for Business Teams | — |
| Solutions | [`src/pages/Solutions.tsx`](../../src/pages/Solutions.tsx) | Our Products | — |
| About | [`src/pages/About.tsx`](../../src/pages/About.tsx) | About VyaptIX — Building Practical AI for Business | — |
| Blog | [`src/pages/Blog.tsx`](../../src/pages/Blog.tsx) | Blog — AI Automation Insights | — |
| Blog Post | [`src/pages/BlogPost.tsx`](../../src/pages/BlogPost.tsx) | Dynamic — uses `post.title` | — |
| Contact | [`src/pages/Contact.tsx`](../../src/pages/Contact.tsx) | Book a Demo | — |
| Thank You | [`src/pages/ThankYou.tsx`](../../src/pages/ThankYou.tsx) | Thank You | ✅ noIndex |
| Privacy Policy | [`src/pages/PrivacyPolicy.tsx`](../../src/pages/PrivacyPolicy.tsx) | Privacy Policy | ✅ noIndex |
| Terms of Service | [`src/pages/TermsOfService.tsx`](../../src/pages/TermsOfService.tsx) | Terms of Service | ✅ noIndex |
| 404 Not Found | [`src/pages/NotFound.tsx`](../../src/pages/NotFound.tsx) | Page Not Found | ✅ noIndex |

### Why some pages have noIndex

Pages marked `noIndex` tell Google: "Do not index this page, do not show it in search results."

- **Thank You** — Confirmation page after form submit. Has no value in search results.
- **Privacy Policy / Terms** — Legal pages. Indexing them wastes crawl budget and dilutes your content relevance.
- **404** — Obvious.

### How to update a page's title or description

1. Open the page file (e.g., [`src/pages/Contact.tsx`](../../src/pages/Contact.tsx))
2. Find `<SEO` near the top of the return
3. Edit the `title` or `description` prop directly
4. Save — the change is live on next deploy

**Example:**
```tsx
// Before:
<SEO
  title="Book a Demo"
  description="Ready to automate your business with AI? Book a 30-minute demo with the VyaptIX team."
/>

// After (you changed the description):
<SEO
  title="Book a Demo"
  description="Get a personalised AI demo for your business. 30 minutes. No pitch decks."
/>
```

### How to add SEO to a new page

1. At the top of the new page file, add: `import { SEO } from '../components/SEO';`
2. As the first element inside the return fragment, add: `<SEO title="..." description="..." canonical="/your-path" />`
3. Add the page's URL to [`public/sitemap.xml`](../../public/sitemap.xml)

---

## Part 4 — Open Graph & Twitter Cards

### What they are

When someone pastes your URL into LinkedIn, WhatsApp, Slack, or Twitter/X, those platforms fetch your page and read the OG/Twitter meta tags to build a preview card with title, description, and image.

Without these tags: the preview looks broken or generic.  
With these tags: you control exactly what the preview shows.

### Where the tags come from

The SEO component writes them automatically from your `title`, `description`, and `image` props:

```html
<!-- Generated by <SEO title="..." description="..." /> -->
<meta property="og:title" content="Book a Demo | VyaptIX" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://vyaptix.com/og-default.jpg" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="VyaptIX" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@Vyaptix_ai" />
<meta name="twitter:title" content="Book a Demo | VyaptIX" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://vyaptix.com/og-default.jpg" />
```

### The OG image

Currently defaults to `https://vyaptix.com/og-default.jpg`.

**This file does not exist yet.** Until you create it, shared links will show a broken image.

**What to create:** A 1200×630px branded image (PNG or JPG) — typically has the VyaptIX logo, a headline, and a dark/gradient background. Save it as `public/og-default.jpg` and deploy.

**To use a page-specific image** (e.g., for a blog post):
```tsx
<SEO
  title={post.title}
  description={post.excerpt}
  image={`https://vyaptix.com/blog/${post.slug}/og.jpg`}
/>
```

### How to test OG tags

- **LinkedIn:** https://www.linkedin.com/post-inspector/
- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter/X:** https://cards-dev.twitter.com/validator
- **General:** https://metatags.io/ — paste your URL and see previews for all platforms

---

## Part 5 — JSON-LD Structured Data

### What it is

JSON-LD (JavaScript Object Notation for Linked Data) is a block of JSON embedded in your page's `<head>` that tells Google exactly what your content represents — not just text on a screen, but structured facts: "this is an Organization called VyaptIX with this logo and these social profiles."

Google uses structured data to generate **rich results** in search: star ratings, breadcrumbs, FAQ dropdowns, site links, logo in knowledge panel, etc.

### Where it lives

Only the homepage has JSON-LD currently. It's defined in [`src/pages/Home.tsx`](../../src/pages/Home.tsx) as `homeJsonLd` and passed via the SEO component:

```tsx
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VyaptIX',
  url: 'https://vyaptix.com',
  logo: 'https://vyaptix.com/vyaptix-logo.webp',
  description: 'AI automation startup building practical AI tools for business owners.',
  sameAs: [
    'https://www.linkedin.com/company/vyaptix-ai',
    'https://x.com/Vyaptix_ai',
    'https://www.instagram.com/vyaptixai/',
  ],
};

// In the return:
<SEO ... jsonLd={homeJsonLd} />
```

### What this unlocks

The `Organization` schema tells Google:
- VyaptIX is a real organization at vyaptix.com
- The logo to show in the knowledge panel
- The official social profiles (helps Google attribute brand mentions)

### How to update it

Open [`src/pages/Home.tsx`](../../src/pages/Home.tsx), find `const homeJsonLd`, and edit the object directly.

**Common update:** If you get a proper `.svg` logo file:
```tsx
logo: 'https://vyaptix.com/vyaptix-logo.svg',  // change from .webp to .svg
```

### Adding JSON-LD to other pages

**Blog post (Article schema):**
```tsx
// In BlogPost.tsx
const postJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  url: `https://vyaptix.com/blog/${post.slug}`,
  publisher: {
    '@type': 'Organization',
    name: 'VyaptIX',
    logo: 'https://vyaptix.com/vyaptix-logo.webp',
  },
};

<SEO ... jsonLd={postJsonLd} />
```

**AI Review Generator (SoftwareApplication schema):**
```tsx
const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Review Generator',
  applicationCategory: 'BusinessApplication',
  description: 'AI-powered tool to collect authentic Google reviews in under 20 seconds.',
  url: 'https://reviews.vyaptix.ai',
  offers: { '@type': 'Offer', price: '0', priceCurrency': 'USD' },
};
```

### How to test JSON-LD

Use Google's Rich Results Test: https://search.google.com/test/rich-results  
Paste your URL (after deploy) or paste the JSON-LD code directly. Google will tell you if it's valid and what rich results it qualifies for.

---

## Part 6 — sitemap.xml

**File:** [`public/sitemap.xml`](../../public/sitemap.xml)

### What it is

A plain XML file that lists every public URL on your website. You submit it to Google Search Console so Google knows exactly what pages exist and how often they change.

Without a sitemap, Google discovers your pages by crawling links. With a sitemap, you tell Google directly — faster indexing, no pages missed.

### Current contents

The sitemap includes:
- `/` — Home (weekly, priority 1.0)
- `/solutions` — Solutions hub (monthly, 0.8)
- `/solutions/ai-review-generation` — Product page (monthly, 0.9)
- `/agent-mitra` — Product page (monthly, 0.8)
- `/about` — About (monthly, 0.6)
- `/contact` — Contact (monthly, 0.7)
- `/blog` — Blog index (weekly, 0.7)
- 3 blog post URLs (monthly, 0.6)

**Not included** (intentionally): `/thank-you`, `/privacy-policy`, `/terms-of-service`, `/404`

### How to update it

**When you publish a new blog post**, add a new `<url>` block:
```xml
<url>
  <loc>https://vyaptix.com/blog/your-new-post-slug</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

**When a page's importance changes** (e.g., AgentMitra goes live as a major product), bump its `<priority>` from `0.8` to `0.9`.

### Priority values explained

| Priority | Meaning |
|----------|---------|
| 1.0 | Homepage — most important |
| 0.9 | Primary product page |
| 0.8 | Secondary product/hub pages |
| 0.7 | Blog index, Contact |
| 0.6 | Individual blog posts, About |
| 0.5 and below | Low-value pages (don't list these) |

### Where robots.txt references it

The last line of `robots.txt` points to the sitemap:
```
Sitemap: https://vyaptix.com/sitemap.xml
```
This means any crawler that reads `robots.txt` automatically knows where the sitemap is.

### Submitting to Google Search Console

1. Go to https://search.google.com/search-console
2. Add `vyaptix.com` as a property (if not already)
3. Go to **Sitemaps** in the left nav
4. Enter `sitemap.xml` and click Submit
5. Done — Google will crawl it within hours to days

---

## Part 7 — robots.txt

**File:** [`public/robots.txt`](../../public/robots.txt)

### What it is

A plain text file at the root of your website that tells search engine crawlers which pages they're allowed or not allowed to index. Crawlers check this file before crawling anything else.

### Current contents

```
User-agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://vyaptix.com/sitemap.xml
```

### What each line means

| Line | Meaning |
|------|---------|
| `User-agent: *` | These rules apply to ALL crawlers (Googlebot, Bingbot, etc.) |
| `Allow: /` | Crawlers may index all pages by default |
| `Disallow: /thank-you` | Crawlers must NOT index `/thank-you` |
| `Sitemap: ...` | Here's where to find the sitemap |

### robots.txt vs noIndex — which wins?

**robots.txt** `Disallow` prevents Google from even **visiting** the page.  
**noIndex meta tag** lets Google visit but tells it not to **show** the page in results.

For most pages, `noIndex` on the SEO component is enough. `robots.txt` is for pages where you don't even want Google fetching the content (saves crawl budget, protects private pages).

The current setup: `Disallow /thank-you` in robots.txt AND `noIndex` on the ThankYou SEO component. This is belt-and-suspenders — either alone would work.

### How to update it

**To block a new page from crawlers:**
```
Disallow: /internal-page
```

**To block an entire directory:**
```
Disallow: /admin/
```

**To allow a page that was blocked:**
Simply remove or comment out the `Disallow` line.

---

## Quick Checklist: Before Every New Page Goes Live

- [ ] `<SEO title="..." description="..." canonical="/path" />` added at top of return
- [ ] Description is 140–160 characters (test at https://metatags.io)
- [ ] Page is added to `public/sitemap.xml`
- [ ] If the page should NOT be indexed: `noIndex` prop added AND (optionally) `Disallow` in robots.txt
- [ ] After deploy: test with https://search.google.com/test/rich-results

---

## Pending Action: OG Default Image

**Status:** BLOCKED — needs design.

**What to create:** `public/og-default.jpg` — 1200×630px, VyaptIX branding.

Until this exists, every page share on social media will show a broken/missing image. This is the single highest-impact outstanding SEO/social task.
