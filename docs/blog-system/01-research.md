# Blog System Research — VyaptIX Website

**Prepared by:** VyaptIX Research Agent  
**Date:** 2026-04-21  
**Scope:** Git-based CMS selection, Next.js blog architecture, OAuth strategy, SEO patterns

---

## 1. Problem Statement

VyaptIX's website stores blog posts as hardcoded TypeScript objects in `src/data/blogs.ts`. Every new post requires a code change, a PR, and a deployment. The goal is a system where 2–5 non-developer employees can create and publish blog posts directly from a browser UI on the live website, with full SEO support, at zero ongoing cost.

---

## 2. CMS Options Compared

| Criteria | Decap CMS | Keystatic | TinaCMS | Strapi (self-hosted) |
|---|---|---|---|---|
| **Free / self-hosted** | ✅ 100% free, MIT licensed | ✅ Free tier, GitHub mode needs Keystatic Cloud | ⚠️ Free tier limited; self-hosting needs their infra | ✅ Free self-hosted, needs server |
| **Next.js App Router support** | ✅ Works (admin served as static HTML) | ✅ Native Next.js integration | ✅ Has Next.js starter | ✅ API-based, works with any framework |
| **Markdown editor** | ✅ Built-in rich Markdown editor | ✅ YAML/MD editor, code-focused | ✅ Visual Markdown editor | ⚠️ No native Markdown, uses rich text |
| **Git-based (no DB)** | ✅ Commits content to GitHub | ✅ Commits to GitHub | ✅ Commits to GitHub | ❌ Requires PostgreSQL/MySQL |
| **Auth on Vercel (no Netlify)** | ⚠️ Needs custom OAuth proxy (2 API routes) | ⚠️ GitHub OAuth needs Keystatic Cloud | ⚠️ Needs TinaCloud or self-hosted auth | ✅ Built-in auth |
| **Content stored as Markdown files** | ✅ | ✅ | ✅ | ❌ Database only |
| **Image uploads** | ✅ Commits images to `/public/blog/` | ✅ Same | ✅ Same | ✅ Media manager |
| **Non-tech user friendliness** | ✅ Medium — familiar blog editor | ⚠️ More code-oriented UI | ✅ Best visual editor | ✅ Full CMS UI |
| **Ecosystem maturity** | ✅ Most mature (8+ years, 17k+ GitHub stars) | ⚠️ Newer (2023+), fewer resources | ⚠️ Medium maturity | ✅ Mature, enterprise-grade |
| **Complexity to set up on Vercel** | Medium — 2 OAuth API routes needed | Medium — Keystatic Cloud signup | Medium — TinaCloud or self-host | High — separate server required |

---

## 3. Recommendation: Decap CMS

**Verdict: Decap CMS wins for VyaptIX's requirements.**

Reasons:
1. **Most battle-tested** — used by thousands of production sites with Next.js + Vercel
2. **Markdown editor is clean** — non-developers can write posts without learning any syntax; the editor is visual with a preview pane
3. **Fully free** — nothing to pay now or at scale
4. **Content lives in Git** — posts are `.md` files committed to `manizvlabs/vyaptix-website`. Full version history, reviewable via PRs, no database to maintain
5. **Image uploads commit to `/public/blog/`** — no external storage needed; images live in the repo
6. **The only setup cost** is a one-time GitHub OAuth App creation (5 minutes, done by Ajeet) and two Next.js API routes (already handled in implementation)

---

## 4. Why Next.js Migration is Required

The current Vite/React SPA has a fundamental SEO limitation: all content is rendered client-side. Google can index it, but:
- Blog posts don't have per-page server-rendered `<title>`, `<meta description>`, or Open Graph tags
- Crawlers see an empty HTML shell and must execute JavaScript to get content
- No static sitemap, no JSON-LD structured data per post

Next.js App Router with SSG solves all of this:
- Each blog post is a **statically generated page** with full HTML at build time
- `generateMetadata()` adds per-post title, description, OG image, canonical URL
- JSON-LD `BlogPosting` schema is injected server-side
- Auto-generated sitemap includes every post URL

**Migration effort:** Medium — existing React components port with minimal changes. Main changes: routing (React Router → Next.js file-based), Link imports, and one client/server component split for the Contact form.

---

## 5. ISR vs SSG for Blog Posts

For a Git-based CMS, **SSG (Static Site Generation) is the correct choice**.

- When Decap CMS publishes a post, it commits a `.md` file to GitHub
- GitHub webhook triggers a Vercel deployment (~1–2 minute build)
- The new static page is live after the build completes
- This is the standard pattern for Git-based CMS + Vercel; ISR provides no benefit here since content changes only happen via Git commits (which already trigger a redeploy)

**ISR would only add value** if content updates happened at runtime without deploys (e.g., from a database). Since Decap CMS uses Git, redeploy-on-commit is the natural flow.

---

## 6. GitHub OAuth Architecture for Vercel

Decap CMS requires a server-side OAuth handshake to authenticate editors via GitHub. On Netlify this is built-in; on Vercel it requires two custom API routes:

```
1. GET /api/auth?provider=github
   → Builds GitHub OAuth authorization URL
   → Redirects user to github.com/login/oauth/authorize

2. GET /api/callback
   → Receives ?code= from GitHub after user authorizes
   → Exchanges code for access_token via GitHub API
   → Redirects to /admin with token in hash (Decap CMS reads it)
```

**Required environment variables (Ajeet must set these in Vercel dashboard):**
```
GITHUB_CLIENT_ID=<from GitHub OAuth App>
GITHUB_CLIENT_SECRET=<from GitHub OAuth App>
```

**One-time GitHub OAuth App setup by Ajeet:**
1. Go to: github.com → Settings → Developer Settings → OAuth Apps → New OAuth App
2. Homepage URL: `https://vyaptix.com`
3. Authorization callback URL: `https://vyaptix.com/api/callback`
4. Copy Client ID and Client Secret → paste into Vercel env vars

---

## 7. Image Handling

Without a dedicated media server, images are stored in the Git repository:

- **Location:** `/public/blog/` (already used by current blog posts)
- **How it works:** Decap CMS is configured with `media_folder: public/blog` — when a writer uploads an image in the editor, Decap commits it to `/public/blog/` in the GitHub repo
- **Reference in Markdown:** `![alt text](/blog/image.png)` — Next.js serves from `/public/`
- **Limitation:** Large images (>1MB) will bloat the repo over time. Recommendation: compress images before uploading. A future migration to Cloudinary or Supabase storage is straightforward.

---

## 8. Markdown SEO Best Practices for Next.js

Each blog post page (`app/blog/[slug]/page.tsx`) should:

1. **`generateMetadata()`** — per-post title, description, OG tags, canonical URL
2. **JSON-LD `BlogPosting` schema** — injected in `<head>` via `<script type="application/ld+json">`
3. **`generateStaticParams()`** — pre-renders all post slugs at build time
4. **Canonical URL** — `https://vyaptix.com/blog/{slug}`
5. **Open Graph image** — per-post hero image or default OG image
6. **Sitemap** — `next-sitemap` package auto-generates `/sitemap.xml` including all blog post URLs

---

## Sources

- Decap CMS Documentation: https://decapcms.org/docs/
- Next.js App Router Documentation: https://nextjs.org/docs/app
- Vercel ISR Documentation: https://vercel.com/docs/incremental-static-regeneration
- DEV.to: Building a Markdown Blog in Next.js with Decap CMS
- GitHub: daresaydigital/decap-cms-oauth (Vercel OAuth pattern)
