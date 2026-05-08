# Blog System PRD — VyaptIX Website

**Prepared by:** VyaptIX PM Agent  
**Date:** 2026-04-21  
**Status:** Approved for implementation  
**Phase:** Current revamp (revamp/website-v2 branch)

---

## 1. Problem Statement

VyaptIX currently has no sustainable blog publishing workflow. Creating a post requires a developer to edit `src/data/blogs.ts`, open a PR, and deploy. This blocks non-developer team members from contributing content and creates an unnecessary dependency on engineering for every blog post.

**Desired outcome:** Any VyaptIX employee (2–5 people) can write, edit, and publish a blog post from a browser — on the live website — without touching code or waiting for a developer.

---

## 2. Goals

| Goal | Metric |
|---|---|
| Non-developer blog publishing | Zero code changes required per post |
| SEO-indexed blog posts | Each post has unique meta title, description, OG, JSON-LD |
| Time to publish | < 5 minutes from starting a draft to live post |
| System cost | $0/month ongoing |
| Writer access control | Only team members with GitHub repo access can publish |

---

## 3. Non-Goals (Out of Scope for Phase 1)

- Comments or reader interaction
- Email newsletter integration
- Analytics per post (can use PostHog page views later)
- Multi-language content
- Post scheduling / draft preview on a staging URL
- Custom image CDN (images stored in `/public/blog/`)

---

## 4. User Stories

### Writer (VyaptIX Employee)

| ID | Story | Acceptance Criteria |
|---|---|---|
| W1 | As a writer, I can access the blog admin at `/admin` on the live website | Admin UI loads at `vyaptix.com/admin` |
| W2 | As a writer, I log in with my GitHub account | GitHub OAuth flow completes; only repo members can access |
| W3 | As a writer, I can create a new blog post with a Markdown editor | Editor loads with title, body, category, author, date, excerpt, image fields |
| W4 | As a writer, I can upload an image for the post hero | Image uploads and stores in `/public/blog/`; URL auto-inserted |
| W5 | As a writer, I can save a draft without publishing | Draft saved to GitHub as a post with `published: false` |
| W6 | As a writer, I can publish a post | Sets `published: true`; triggers Vercel deploy; post live in ~2 min |
| W7 | As a writer, I can edit an existing post | Changes commit to GitHub; Vercel redeploys |
| W8 | As a writer, I can unpublish a post | Sets `published: false`; post disappears from `/blog` after redeploy |

### Reader (Website Visitor)

| ID | Story | Acceptance Criteria |
|---|---|---|
| R1 | As a reader, I can browse all published posts at `/blog` | Posts shown as cards with title, excerpt, category, date, author |
| R2 | As a reader, I can click a post to read it | Opens `/blog/{slug}` with full content rendered |
| R3 | As a reader, each post page has a proper page title | Browser tab shows post title |
| R4 | As a reader, I can share a post on LinkedIn/Twitter | OG tags present; correct image and description shown when shared |
| R5 | As a reader, I can navigate back to blog listing | "Back to Blog" link on every post page |

### SEO / Google

| ID | Story | Acceptance Criteria |
|---|---|---|
| S1 | Each post is indexed with unique meta | `<title>`, `<meta description>`, `<link rel="canonical">` present per post |
| S2 | Posts appear in sitemap | `sitemap.xml` includes all published post URLs |
| S3 | Posts have structured data | JSON-LD `BlogPosting` schema in `<head>` |
| S4 | Blog listing appears in sitemap | `/blog` URL in sitemap.xml |

---

## 5. Blog Post Data Model

Each blog post is a Markdown file at `content/blog/{slug}.md` with this frontmatter:

```yaml
---
title: "Post Title Here"
slug: "post-slug-here"
excerpt: "One paragraph summary shown on listing page and in meta description."
date: "2026-02-18"
readTime: "6 min read"
category: "Products"   # Products | Trending in AI | Business
author: "Ajeet Singh"
authorRole: "Co-Founder | CEO, VyaptIX Technologies"
image: "/blog/hero-image.png"
published: true
---

# Heading

Post body in standard Markdown...
```

**Required fields:** title, slug, excerpt, date, category, author, authorRole, image, published  
**Body:** Standard CommonMark Markdown (headings, paragraphs, bold, italic, blockquotes, tables, images, lists)

---

## 6. Admin URL Structure

| URL | What it does |
|---|---|
| `/admin` | Decap CMS admin UI (requires GitHub login) |
| `/api/auth` | GitHub OAuth initiation endpoint |
| `/api/callback` | GitHub OAuth callback endpoint |

---

## 7. Categories

Fixed set (matches existing blog data):
- **Products** — VyaptIX product features, launches, case studies
- **Trending in AI** — AI industry news, trends, analysis
- **Business** — Business strategy, operations, growth

---

## 8. Content Constraints

- **No fake testimonials** — already enforced in codebase via code comment; blog must not reference products removed from the site (Setu/WhatsApp CX, EnterpriseCopilots, etc.)
- **Images:** Must be compressed before upload. Recommended max 500KB per image.
- **Slug format:** Lowercase, hyphenated (e.g., `why-ai-matters-for-smes`). Auto-generated by Decap CMS from the title.

---

## 9. Access Control

- Admin access = GitHub account with write access to `manizvlabs/vyaptix-website`
- No separate user management system needed
- New team members: grant GitHub repo access to enable blog admin access

---

## 10. Publish Flow

```
Writer opens vyaptix.com/admin
     ↓ (clicks Login with GitHub)
GitHub OAuth authentication
     ↓
Writer creates/edits post in Markdown editor
     ↓ (clicks Publish)
Decap CMS commits .md file to GitHub (manizvlabs/vyaptix-website)
     ↓ (automatic)
Vercel detects push → triggers build (~1–2 min)
     ↓
New post live at vyaptix.com/blog/{slug}
```

---

## 11. Migration of Existing Posts

The 3 existing blog posts in `src/data/blogs.ts` must be converted to Markdown files:

| Current slug | New file |
|---|---|
| `collect-real-customer-reviews-in-20-seconds` | `content/blog/collect-real-customer-reviews-in-20-seconds.md` |
| `setu-turns-whatsapp-chaos-into-accountable-business` | `content/blog/setu-turns-whatsapp-chaos-into-accountable-business.md` |
| `why-businesses-fail-at-automation-2026` | `content/blog/why-businesses-fail-at-automation-2026.md` |

The TypeScript custom block types (callout, steps, highlights, table) are converted to standard Markdown equivalents (blockquotes, ordered lists, bold headings, Markdown tables).

---

## 12. Definition of Done

- [ ] `/admin` loads Decap CMS on production URL
- [ ] GitHub OAuth login works
- [ ] New blog post created via admin appears on `/blog` after Vercel redeploy
- [ ] Each post page has correct title, description, OG tags, canonical, JSON-LD
- [ ] `/sitemap.xml` includes all post URLs
- [ ] All 3 existing posts display correctly in the new system
- [ ] No broken links in blog listing or blog post pages
- [ ] Vercel build passes with zero TypeScript errors
