# Blog System Architecture — VyaptIX Website

**Prepared by:** VyaptIX Solution Architect Agent  
**Date:** 2026-04-21  
**Tech Stack:** Next.js 14 App Router + Decap CMS + Vercel

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   WRITER FLOW                        │
│                                                       │
│  Browser → vyaptix.com/admin                         │
│            ↓ (GitHub OAuth via /api/auth + /api/callback)
│  Decap CMS Admin UI (loaded from /public/admin/)     │
│            ↓ (on publish)                             │
│  GitHub API → commit .md to manizvlabs/vyaptix-website│
│            ↓ (webhook)                                │
│  Vercel Build → npm run build → Next.js SSG          │
│            ↓ (~2 min)                                 │
│  New post live at vyaptix.com/blog/{slug}             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   READER FLOW                         │
│                                                       │
│  Browser → vyaptix.com/blog                          │
│            ↓ (SSG page — pre-rendered HTML)           │
│  Next.js serves static HTML with all SEO tags         │
│            ↓                                          │
│  Browser → vyaptix.com/blog/{slug}                   │
│            ↓ (SSG page — pre-rendered per post)       │
│  Next.js serves full post HTML + JSON-LD              │
└─────────────────────────────────────────────────────┘
```

---

## 2. Technology Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 App Router | SSG required for blog SEO; App Router is the current standard |
| CMS | Decap CMS | Free, self-hosted, Git-based, built-in Markdown editor |
| Content storage | Markdown files in `/content/blog/` | No database needed; version controlled; free |
| Auth | GitHub OAuth via custom API routes | No Netlify required; works on Vercel; restricts to repo members |
| Markdown parser | `gray-matter` (frontmatter) + `react-markdown` + `remark-gfm` | Industry standard, lightweight, works in Next.js server components |
| Sitemap | `next-sitemap` | Auto-generates sitemap.xml from all routes + dynamic blog posts |
| Hosting | Vercel (existing) | Native Next.js support, auto-deploy on GitHub push |
| Images | `/public/blog/` (committed to repo) | No external service needed; Decap CMS handles uploads |

---

## 3. Directory Structure

```
vyaptix-website/
├── app/                              ← Next.js App Router (NEW)
│   ├── layout.tsx                    ← Root layout (Header + Footer)
│   ├── globals.css                   ← Global styles (copied from src/index.css)
│   ├── not-found.tsx                 ← 404 page
│   ├── page.tsx                      ← Home /
│   ├── solutions/
│   │   ├── page.tsx                  ← /solutions
│   │   └── ai-review-generation/
│   │       └── page.tsx              ← /solutions/ai-review-generation
│   ├── agent-mitra/
│   │   └── page.tsx                  ← /agent-mitra
│   ├── about/
│   │   └── page.tsx                  ← /about
│   ├── contact/
│   │   └── page.tsx                  ← /contact (server wrapper)
│   ├── thank-you/
│   │   └── page.tsx                  ← /thank-you
│   ├── blog/
│   │   ├── page.tsx                  ← /blog (SSG listing)
│   │   └── [slug]/
│   │       └── page.tsx              ← /blog/:slug (SSG post + SEO)
│   ├── privacy-policy/
│   │   └── page.tsx                  ← /privacy-policy
│   ├── terms-of-service/
│   │   └── page.tsx                  ← /terms-of-service
│   ├── admin/
│   │   ├── layout.tsx                ← Empty layout (no Header/Footer)
│   │   └── page.tsx                  ← Decap CMS admin UI
│   └── api/
│       ├── auth/
│       │   └── route.ts              ← GitHub OAuth initiation
│       ├── callback/
│       │   └── route.ts              ← GitHub OAuth callback
│       └── submit-to-zoho/
│           └── route.ts              ← Contact form → Zoho CRM
│
├── content/
│   └── blog/                         ← Markdown blog posts (NEW)
│       ├── collect-real-customer-reviews-in-20-seconds.md
│       ├── setu-turns-whatsapp-chaos-into-accountable-business.md
│       └── why-businesses-fail-at-automation-2026.md
│
├── public/
│   ├── admin/
│   │   └── config.yml                ← Decap CMS configuration (NEW)
│   ├── blog/                         ← Blog post images (existing)
│   └── ...
│
├── src/
│   ├── components/                   ← Shared components (mostly unchanged)
│   │   ├── layout/
│   │   │   ├── Header.tsx            ← Updated: next/link + usePathname
│   │   │   ├── Footer.tsx            ← Updated: next/link
│   │   │   ├── Layout.tsx            ← Unchanged
│   │   │   └── Section.tsx           ← Unchanged
│   │   ├── ui/
│   │   │   └── ScrollToTop.tsx       ← Updated: 'use client' + usePathname
│   │   └── contact/
│   │       └── ContactForm.tsx       ← NEW: client component extracted from Contact.tsx
│   ├── lib/
│   │   └── blog.ts                   ← NEW: Markdown file utilities
│   └── pages/                        ← Old Vite pages (kept, no longer used)
│
├── next.config.js                    ← NEW: Next.js configuration
├── next-sitemap.config.js            ← NEW: Sitemap configuration
├── package.json                      ← Updated: next replaces vite
└── tailwind.config.js                ← Updated: content paths include app/
```

---

## 4. Data Flow: Blog Post Rendering

```typescript
// At build time, Next.js calls:
generateStaticParams() → reads all .md files from /content/blog/
                       → returns [{ slug: 'post-1' }, { slug: 'post-2' }, ...]

// For each slug, Next.js renders:
generateMetadata({ params }) → reads frontmatter from {slug}.md
                              → returns { title, description, openGraph, ... }

// Page component:
BlogPostPage({ params }) → reads full .md file
                         → parses with gray-matter
                         → renders with react-markdown
                         → injects JSON-LD BlogPosting schema
```

---

## 5. Blog Utility API (`src/lib/blog.ts`)

```typescript
getAllPosts(): BlogPost[]
  // Reads all .md files from /content/blog/
  // Filters published: true
  // Sorts by date descending
  // Returns array of BlogPost objects

getPostBySlug(slug: string): BlogPost | null
  // Reads single .md file
  // Returns null if not found or not published
```

**BlogPost type:**
```typescript
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: 'Products' | 'Trending in AI' | 'Business'
  author: string
  authorRole: string
  image: string
  published: boolean
  content: string  // raw Markdown body
}
```

---

## 6. Decap CMS Configuration

**File:** `public/admin/config.yml`

```yaml
backend:
  name: github
  repo: manizvlabs/vyaptix-website
  branch: revamp/website-v2  # ← update to main after revamp merges
  base_url: https://vyaptix.com
  auth_endpoint: /api/auth

media_folder: public/blog
public_folder: /blog

collections:
  - name: blog
    label: Blog Posts
    folder: content/blog
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: excerpt, label: Excerpt, widget: text }
      - { name: date, label: Date, widget: datetime, format: "YYYY-MM-DD" }
      - { name: readTime, label: Read Time, widget: string, default: "5 min read" }
      - { name: category, label: Category, widget: select, options: [Products, "Trending in AI", Business] }
      - { name: author, label: Author Name, widget: string }
      - { name: authorRole, label: Author Role, widget: string }
      - { name: image, label: Hero Image, widget: image }
      - { name: published, label: Published, widget: boolean, default: false }
      - { name: body, label: Body, widget: markdown }
```

---

## 7. OAuth API Routes

### `app/api/auth/route.ts`
```
GET /api/auth?provider=github
→ Builds: https://github.com/login/oauth/authorize?client_id=...&scope=repo&state=...
→ 302 Redirect to GitHub
```

### `app/api/callback/route.ts`
```
GET /api/callback?code=...&state=...
→ POST https://github.com/login/oauth/access_token (exchange code for token)
→ Sends postMessage to opener window with { token, provider: 'github' }
→ Decap CMS receives token and opens admin
```

**Environment variables required:**
```
GITHUB_CLIENT_ID=       ← from GitHub OAuth App (Ajeet must create)
GITHUB_CLIENT_SECRET=   ← from GitHub OAuth App (Ajeet must create)
```

---

## 8. Admin Page

`app/admin/page.tsx` is a client component that:
1. Uses an empty layout (no Header/Footer)
2. Loads the Decap CMS JS bundle from CDN: `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`
3. Provides the `config.yml` link via `<link rel="cms-config-url">`

The admin page is excluded from the sitemap.

---

## 9. SEO Implementation

**Blog listing (`/blog`):**
```typescript
export const metadata = {
  title: 'Blog | VyaptIX',
  description: 'AI automation insights, product updates, and business growth strategies from the VyaptIX team.',
}
```

**Blog post (`/blog/[slug]`):**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  return {
    title: `${post.title} | VyaptIX`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: `https://vyaptix.com${post.image}` }],
      type: 'article',
      publishedTime: post.date,
    },
    alternates: { canonical: `https://vyaptix.com/blog/${post.slug}` },
  }
}
```

**JSON-LD per post:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post title",
  "datePublished": "2026-02-18",
  "author": { "@type": "Person", "name": "Ajeet Singh" },
  "publisher": { "@type": "Organization", "name": "VyaptIX" },
  "image": "https://vyaptix.com/blog/image.png",
  "url": "https://vyaptix.com/blog/slug"
}
```

---

## 10. Package Changes

**Add:**
```json
"next": "^14.2.0",
"gray-matter": "^4.0.3",
"react-markdown": "^9.0.0",
"remark-gfm": "^4.0.0",
"next-sitemap": "^4.2.3"
```

**Remove (kept in devDependencies but unused after migration):**
```json
"vite": "^5.4.2",
"@vitejs/plugin-react": "^4.3.1",
"eslint-plugin-react-refresh": "^0.4.11"
```

**Scripts update:**
```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"postbuild": "next-sitemap"
```

---

## 11. One-Time Setup Checklist for Ajeet

After the code is deployed to Vercel:

1. **Create GitHub OAuth App:**
   - Go to: github.com → Settings → Developer Settings → OAuth Apps → New OAuth App
   - App name: `VyaptIX Blog Admin`
   - Homepage URL: `https://vyaptix.com`
   - Authorization callback URL: `https://vyaptix.com/api/callback`
   - Click Register

2. **Add to Vercel env vars:**
   - `GITHUB_CLIENT_ID` = Client ID from step 1
   - `GITHUB_CLIENT_SECRET` = Client Secret from step 1

3. **Update `public/admin/config.yml` branch field** to `main` after the revamp branch merges to main

4. **Test login** at `https://vyaptix.com/admin`

---

## 12. Limitations & Future Improvements

| Limitation | Impact | Future Fix |
|---|---|---|
| New posts require ~2 min Vercel build | Minor — acceptable delay | None needed |
| Images stored in Git repo | Repo size grows over time | Migrate to Cloudinary when images exceed 50MB total |
| No draft preview on staging URL | Writers can't preview before publish | Set up Vercel preview deployments on branches |
| No post scheduling | Must publish manually | Could add `scheduledDate` field and filter client-side |
