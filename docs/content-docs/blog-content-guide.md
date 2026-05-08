# Blog Content Guide

## Current Blog Architecture

Blog content is managed entirely in `src/data/blogs.ts` — a TypeScript array of blog post objects. There is no CMS.

**Categories available:** Products | Trending in AI | Business  
**Published posts:** 3 (as of April 2026)

---

## Content Block Types

Blog posts support rich content blocks. Each content item in the `content` array can be:

```typescript
// Plain paragraph
'This is a paragraph of text.'

// Image
{ type: 'image', src: '/blog/image.jpg', caption: 'Optional caption' }

// Callout (highlighted box)
{ type: 'callout', text: 'Key insight or important note' }

// Numbered steps
{ type: 'steps', items: ['Step 1 description', 'Step 2 description'] }

// Highlight list (bulleted feature/benefit list)
{ type: 'highlights', items: ['Benefit one', 'Benefit two'] }

// Table
{
  type: 'table',
  headers: ['Column 1', 'Column 2', 'Column 3'],
  rows: [
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
  ]
}
```

---

## Post Metadata Fields

```typescript
{
  slug: string,          // URL slug: /blog/[slug]
  title: string,         // Post title (also used as page title)
  excerpt: string,       // Short description (used in listing + meta description)
  image: string,         // Path to featured image in /public/blog/
  category: string,      // 'Products' | 'Trending in AI' | 'Business'
  date: string,          // 'YYYY-MM-DD' format
  readTime: string,      // e.g. '5 min read'
  author: string,        // Author display name
  published: boolean,    // false = draft (hidden from listing)
  content: ContentBlock[] // Array of content items (see above)
}
```

---

## Blog Strategy

### Content Pillars

**Pillar 1 — Product (How-To & Use Cases)**
- How-to guides for AI Review Generator and AgentMitra
- Customer success stories / case studies
- Feature spotlights

**Pillar 2 — Trending in AI**
- Commentary on AI news relevant to business owners
- Comparisons of AI tools (without disparaging competitors)
- Predictions and frameworks for AI adoption

**Pillar 3 — Business Growth**
- Local SEO and Google reviews as growth levers
- Customer experience and retention strategies
- Automation ROI calculators and frameworks

### Recommended Cadence

| Week | Topic | Category | Target Keyword |
|---|---|---|---|
| 1 | Case study: [Customer name] grew from X to Y reviews | Products | [customer type] review collection |
| 2 | How to respond to negative Google reviews with AI | Trending in AI | respond to negative reviews |
| 3 | 5 automation mistakes killing your business growth | Business | business automation mistakes |
| 4 | AgentMitra vs. [alternative]: honest comparison | Products | [alternative] alternative |

---

## SEO Checklist for Each Post

- [ ] Primary keyword in title (first 60 characters)
- [ ] Primary keyword in first paragraph
- [ ] Primary keyword in at least one H2 subheading
- [ ] Meta description (use `excerpt` field) is 120–160 characters
- [ ] Featured image is < 200KB, has descriptive filename
- [ ] At least 800 words (aim for 1200–1800 for SEO-targeted posts)
- [ ] At least 2 internal links to other site pages
- [ ] At least 1 CTA linking to contact or product page

---

## Scaling the Blog

Currently, adding a post requires editing a TypeScript file and redeploying. This blocks non-technical team members from publishing.

**Short-term fix (< 1 sprint):** Move blog data to JSON files that don't require TypeScript compilation to update.

**Medium-term (recommended):** Migrate to a headless CMS:
- **Sanity.io** — Most flexible, good free tier, real-time preview
- **Contentful** — Enterprise-grade, good tooling
- **Notion as CMS** — VyaptIX already uses Notion (per VyaptixAI product description); use Notion API to fetch posts

**Implementation path for Notion as CMS:**
1. Create a Notion database with post schema matching current fields
2. Install `@notionhq/client`
3. Fetch posts server-side in a Vercel API function
4. Cache results (blog posts don't change frequently)
5. Remove `src/data/blogs.ts` once migrated
