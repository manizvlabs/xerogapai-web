# SEO Implementation Spec

See `REVAMP-MASTER-PLAN.md` Phase 6 for full code.

## Step-by-Step Implementation

### Step 1: Install react-helmet-async
```bash
npm install react-helmet-async
```

### Step 2: Wrap app in HelmetProvider (src/main.tsx)

### Step 3: Create src/components/SEO.tsx (see master plan)

### Step 4: Add SEO component to all pages (see master plan for per-page copy)

### Step 5: Create public/sitemap.xml

### Step 6: Create public/robots.txt

### Step 7: Add JSON-LD to Homepage

### Step 8: Create OG default image
- Size: 1200 × 630px
- Content: VyaptIX logo + tagline on brand gradient background
- Filename: `public/og-default.jpg`
- Request from design team

### Step 9: Submit to Google Search Console
After deploying: add `vyaptix.com` property to Google Search Console, submit sitemap URL.

## Per-Page Title & Description Reference

| Page | Title (< 60 chars) | Description (120–160 chars) |
|---|---|---|
| `/` | VyaptIX — AI Automation for Business Growth | Deploy AI agents that automate customer engagement, collect Google reviews, and drive growth. Trusted by 500+ businesses. |
| `/solutions/ai-review-generation` | AI Review Generator — Google Reviews in 20s | Turn customer feedback into authentic Google reviews instantly. AI-powered, QR code enabled. Try free today. |
| `/about` | About VyaptIX — Mission & Team | VyaptIX builds practical AI tools that remove friction from customer engagement. Learn about our mission and team. |
| `/blog` | Blog — AI Automation Insights — VyaptIX | Expert insights on AI automation, Google reviews, and business growth from the VyaptIX team. |
| `/contact` | Contact VyaptIX — Book a Demo | Ready to automate your business? Book a 30-minute demo with the VyaptIX team. No generic presentations. |

## Blog Post SEO Template

Each blog post should dynamically use its own metadata in the SEO component:

```tsx
// In BlogPost.tsx
<SEO
  title={post.title}
  description={post.excerpt}
  image={`https://vyaptix.com${post.image}`}
/>
```

Also add Article JSON-LD for blog posts:
```tsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "VyaptIX" }
  })}
</script>
```
