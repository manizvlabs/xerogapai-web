# Blog System UX Spec — VyaptIX Website

**Prepared by:** VyaptIX UX/UI Designer Agent  
**Date:** 2026-04-21  
**Design System:** Existing VyaptIX Tailwind tokens (primary, secondary, text, border-light)

---

## 1. Design Principles

- **Consistency first** — Blog pages must feel like an extension of the existing site, not a new product
- **Content-first layout** — Reading experience is primary; navigation/chrome is minimal
- **Mobile-ready** — All blog pages must be fully usable on mobile (primary Indian SMB audience)
- **SEO-visible** — All key content (title, excerpt, author, date) must be in server-rendered HTML, never loaded by JS

---

## 2. Blog Listing Page (`/blog`)

### Layout
```
┌─────────────────────────────────────────┐
│  HEADER (existing)                       │
├─────────────────────────────────────────┤
│  HERO SECTION                            │
│  ┌───────────────────────────────────┐   │
│  │  "Insights & Ideas"               │   │
│  │  Subtitle: from the VyaptIX team  │   │
│  └───────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  CATEGORY FILTER BAR                     │
│  [All] [Products] [Trending in AI] [Business]│
├─────────────────────────────────────────┤
│  POST GRID (3 cols desktop, 1 col mobile)│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ [Image]  │ │ [Image]  │ │ [Image]  │ │
│  │ Category │ │ Category │ │ Category │ │
│  │ Title    │ │ Title    │ │ Title    │ │
│  │ Excerpt  │ │ Excerpt  │ │ Excerpt  │ │
│  │ Author   │ │ Author   │ │ Author   │ │
│  │ Date·Time│ │ Date·Time│ │ Date·Time│ │
│  └──────────┘ └──────────┘ └──────────┘ │
├─────────────────────────────────────────┤
│  FOOTER (existing)                       │
└─────────────────────────────────────────┘
```

### Hero Section
- Background: `hero-ai-bg` (same dark gradient as other pages)
- Title: "Insights & Ideas" — `text-4xl md:text-5xl font-bold text-white`
- Subtitle: "AI automation insights, product updates, and business growth from the VyaptIX team."
- Padding: `py-16 md:py-20`

### Category Filter
- Single row of pill buttons: `All | Products | Trending in AI | Business`
- Active state: `bg-primary-500 text-white`
- Inactive state: `bg-white border border-border-light text-text hover:border-primary-300`
- Implemented as client component (useState for active category)
- "All" is selected by default

### Post Card Component
Each card in the grid:
```
┌──────────────────────────────────┐
│  [Hero image — 16:9 aspect ratio]│
│  rounded-t-xl overflow-hidden     │
├──────────────────────────────────┤
│  [Category badge]  Products      │
│  text-xs font-semibold           │
│  bg-primary-50 text-primary-600  │
│                                  │
│  Title (2 lines max)             │
│  text-lg font-bold text-text     │
│                                  │
│  Excerpt (3 lines max, truncate) │
│  text-sm text-text-secondary     │
│                                  │
│  ─────────────────────────────── │
│  [Avatar initials] Author Name   │
│  Date · Read time                │
└──────────────────────────────────┘
```

Card interaction:
- Hover: `shadow-large -translate-y-1 border-primary-200`
- Full card is clickable (Link wraps entire card)
- No "Read more" button — card itself is the link

Grid layout:
- Desktop: `grid-cols-3 gap-8`
- Tablet: `grid-cols-2 gap-6`  
- Mobile: `grid-cols-1 gap-6`

Empty state (no posts in category): Center-aligned text "No posts in this category yet."

---

## 3. Blog Post Page (`/blog/[slug]`)

### Layout
```
┌─────────────────────────────────────────┐
│  HEADER (existing)                       │
├─────────────────────────────────────────┤
│  BREADCRUMB: Home > Blog > Post Title   │
├─────────────────────────────────────────┤
│  POST HERO (dark gradient)              │
│  ┌───────────────────────────────────┐  │
│  │  ← Back to Blog                   │  │
│  │  [Category badge]                  │  │
│  │  Post Title (large)                │  │
│  │  Excerpt                           │  │
│  │  [Avatar] Author · Date · ReadTime │  │
│  │  [Share LinkedIn] [Share Twitter]  │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  HERO IMAGE (16:9, full width, rounded) │
├─────────────────────────────────────────┤
│  POST CONTENT (max-w-3xl centered)      │
│  ┌───────────────────────────────────┐  │
│  │  Markdown rendered with prose     │  │
│  │  Tailwind typography styles       │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  SHARE BAR (bottom)                     │
├─────────────────────────────────────────┤
│  CTA SECTION (gradient — existing)      │
│  "Ready to Transform Your Business?"    │
├─────────────────────────────────────────┤
│  FOOTER (existing)                      │
└─────────────────────────────────────────┘
```

### Post Hero Section
- Same `hero-ai-bg` dark background
- Back link: `← Back to Blog` — white/70 opacity, top left
- Category badge: `bg-white/10 border border-white/20 text-white rounded-full px-3 py-1 text-sm`
- Title: `text-3xl md:text-4xl lg:text-5xl font-bold text-white`
- Excerpt: `text-xl text-white/70`
- Author row: Avatar initials in circle + author name + role
- Meta row: Calendar icon + date | Clock icon + read time
- Share buttons: LinkedIn + Twitter icon buttons (white/10 background)

### Post Content
- Container: `max-w-3xl mx-auto`
- Markdown rendered using `react-markdown` with `remark-gfm`
- Prose styling using Tailwind `prose prose-lg` class
- Custom prose overrides to match VyaptIX color tokens:
  - `prose-headings:text-text prose-headings:font-bold`
  - `prose-p:text-text-secondary prose-p:leading-relaxed`
  - `prose-a:text-primary-500 prose-a:hover:text-primary-600`
  - `prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50`
  - `prose-strong:text-text`
  - `prose-code:text-primary-600 prose-code:bg-primary-50`
  - `prose-table:border-collapse`
  - `prose-th:bg-primary-500 prose-th:text-white`

### 404 State (post not found)
- Centered card: "Post Not Found" + "The blog post you're looking for doesn't exist."
- Button: "Back to Blog"

---

## 4. Admin Page (`/admin`)

The Decap CMS admin is rendered by the Decap CMS JavaScript library loaded from CDN. The VyaptIX team does NOT customize the admin UI — we use Decap CMS defaults.

### What the editor sees after login:
- Left sidebar: "Blog Posts" collection
- Main area: List of all posts (with status Published/Draft)
- "New Blog Post" button top right
- Click a post → opens the editor

### Editor layout (Decap CMS default):
```
┌─────────────────────────────────────────┐
│  [←] Blog Posts  |  Saving...  [Publish] │
├──────────────────┬──────────────────────┤
│  FIELDS          │  MARKDOWN PREVIEW    │
│  ─────────────   │  ─────────────────   │
│  Title           │  (live preview as   │
│  Excerpt         │   you type)          │
│  Date            │                      │
│  Category        │                      │
│  Author          │                      │
│  Author Role     │                      │
│  Hero Image      │                      │
│  Published ☐     │                      │
│  ──────────────  │                      │
│  BODY (Markdown) │                      │
│  Toolbar: B I H  │                      │
│  [editor area]   │                      │
└──────────────────┴──────────────────────┘
```

Writers use the toolbar for basic formatting. The Markdown source is hidden by default; a toggle reveals the raw Markdown.

---

## 5. Component Map

| Component | Type | File |
|---|---|---|
| Blog listing page | Server | `app/blog/page.tsx` |
| Category filter bar | Client | `src/components/blog/CategoryFilter.tsx` |
| Post card | Server | `src/components/blog/PostCard.tsx` |
| Blog post page | Server | `app/blog/[slug]/page.tsx` |
| Markdown renderer | Server | inline in blog post page |
| Admin page | Client | `app/admin/page.tsx` |
| Admin layout (empty) | Server | `app/admin/layout.tsx` |

---

## 6. Responsive Breakpoints

| Screen | Blog listing grid | Post content width | Post title size |
|---|---|---|---|
| Mobile (<640px) | 1 col | full width, px-4 | text-3xl |
| Tablet (640–1024px) | 2 cols | full width, px-6 | text-4xl |
| Desktop (>1024px) | 3 cols | max-w-3xl centered | text-5xl |

---

## 7. Accessibility

- All images must have descriptive `alt` text (enforced via Decap CMS required field)
- Post cards: entire card is wrapped in `<Link>`, `aria-label` includes post title
- Category filter: `role="group"`, `aria-label="Filter by category"`
- Active category filter button: `aria-pressed="true"`
- Share buttons: `aria-label="Share on LinkedIn"` etc.
- Back to Blog link: standard anchor with visible text

---

## 8. Loading States

- Blog listing: No loading state needed (SSG — HTML is fully pre-rendered)
- Blog post: No loading state needed (SSG)
- Category filter: Instant client-side filter, no spinner needed
- Admin: Decap CMS shows its own loading spinner on auth
