# SEO Strategy

## Current State

| SEO Element | Status |
|---|---|
| Title tags | ✅ Set (only in index.html — same for all pages) |
| Meta descriptions | ✅ Set (only in index.html — same for all pages) |
| OG tags | ✅ Partial (title, description, type — no image) |
| Twitter Card | ✅ Partial (no image) |
| Sitemap | ❌ Missing |
| robots.txt | ❌ Missing |
| JSON-LD structured data | ❌ Missing |
| Per-page meta (dynamic) | ❌ Missing — all pages share same title/description |
| Canonical tags | ❌ Missing |
| Heading hierarchy | ⚠️ Inconsistent across pages |
| Image alt tags | ⚠️ Partial |
| Page speed | ⚠️ At risk (759KB logo) |

---

## Priority 1: Per-Page Meta Tags

Currently all pages share the same `<title>` and `<meta description>` defined once in `index.html`. This is the most critical SEO gap — Google cannot differentiate pages.

**Implementation approach:** Use a `useEffect` + `document.title` pattern or install `react-helmet-async`.

```bash
npm install react-helmet-async
```

Per-page meta targets:

| Page | Title | Description |
|---|---|---|
| `/` | VyaptIX — AI Automation for Business Growth | Deploy AI agents that automate customer engagement, collect Google reviews, and drive growth. Trusted by businesses globally. |
| `/solutions/ai-review-generation` | AI Review Generator — Collect Google Reviews in 20 Seconds | Turn customer feedback into authentic Google reviews instantly. AI-powered, QR code enabled. Try it free. |
| `/about` | About VyaptIX — Our Mission, Vision & Team | Learn about VyaptIX's mission to make AI automation accessible for every business. Meet the team. |
| `/blog` | Blog — AI Automation Insights — VyaptIX | Expert insights on AI automation, customer engagement, and business growth. |
| `/contact` | Contact VyaptIX — Book a Demo or Get in Touch | Ready to automate your business with AI? Contact our team to book a demo or ask a question. |

---

## Priority 2: Sitemap

Create `public/sitemap.xml` listing all public routes:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://vyaptix.com/</loc><priority>1.0</priority></url>
  <url><loc>https://vyaptix.com/solutions</loc><priority>0.9</priority></url>
  <url><loc>https://vyaptix.com/solutions/ai-review-generation</loc><priority>0.9</priority></url>
  <url><loc>https://vyaptix.com/about</loc><priority>0.7</priority></url>
  <url><loc>https://vyaptix.com/blog</loc><priority>0.8</priority></url>
  <url><loc>https://vyaptix.com/blog/collect-real-customer-reviews</loc><priority>0.7</priority></url>
  <url><loc>https://vyaptix.com/contact</loc><priority>0.7</priority></url>
</urlset>
```

---

## Priority 3: robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /thank-you
Sitemap: https://vyaptix.com/sitemap.xml
```

---

## Priority 4: JSON-LD Structured Data

Add to homepage `<head>`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "VyaptIX",
      "url": "https://vyaptix.com",
      "logo": "https://vyaptix.com/final_logo_-_light.png",
      "sameAs": [
        "https://www.linkedin.com/company/vyaptix-ai",
        "https://x.com/Vyaptix_ai",
        "https://www.instagram.com/vyaptixai/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://vyaptix.com/contact"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "AI Review Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://reviews.vyaptix.ai",
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
    }
  ]
}
```

Add `Article` structured data to blog posts.

---

## Priority 5: Target Keywords

### AI Review Generator
- Primary: "AI review generator", "collect Google reviews automatically", "AI review collection tool"
- Secondary: "Google review generator", "automated review collection", "get more Google reviews"
- Long-tail: "how to get more Google reviews for restaurant", "review collection software for small business"

- Primary: "AI business automation", "AI agent for business", "enterprise AI assistant"
- Secondary: "workflow automation AI", "AI copilot for business"

### Company / Brand
- "VyaptIX", "VyaptIX AI automation", "AI automation startup India"

---

## Blog SEO Targets

Each blog post should target one primary keyword. Current posts and gaps:

| Post | Primary Keyword | Status |
|---|---|---|
| "Collect Real Customer Reviews in ~20 Seconds" | "collect Google reviews fast" | Published — optimize title tag |
| "More Referrals. Less Follow-Ups. How Setu Turns..." | (WhatsApp product — to be updated/replaced) | May need revision given product changes |
| "Why Most Businesses Fail at Automation" | "business automation mistakes" | Published — good topic |

**Blog cadence target:** 4 posts/month minimum to build domain authority

---

## Backlink Strategy (Off-Page SEO)

Immediate opportunities:
1. **Product Hunt launch** — submit AI Review Generator for upvotes
2. **G2 / Capterra** — list product with backlink to website
3. **IndieHackers / Hacker News** — share product story
4. **Guest posts** — contribute to marketing and automation blogs
5. **Press mentions** — submit to startup press (YourStory, Inc42 for India; TechCrunch, Product Hunt for global)
