# Website Architecture

## Overview

VyaptIX website is a single-page application (SPA) built with React 18 + TypeScript, served via Vercel with serverless API functions handling backend operations.

---

## High-Level Architecture

```
Browser (React SPA)
    │
    ├── Vite (build & dev server)
    ├── React Router DOM 7 (client-side routing)
    ├── Tailwind CSS (utility-first styling)
    │
    └── /api/* (Vercel Serverless Functions)
            ├── submit-to-zoho.ts   → Zoho CRM + Supabase
            └── (future endpoints)

External Services:
    ├── Supabase (PostgreSQL database — contact storage)
    ├── Zoho CRM (lead management via OAuth2)
    ├── Vercel (hosting, CDN, serverless runtime)
    └── reviews.vyaptix.ai (separate Review Platform — external domain)
```

---

## Directory Structure

```
vyaptix-website/
├── src/
│   ├── App.tsx                  # Root: BrowserRouter + Route definitions
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles + Tailwind directives
│   │
│   ├── pages/                   # Route-level page components (1 per route)
│   │   ├── Home.tsx
│   │   ├── Solutions.tsx
│   │   ├── AIReviewGeneration.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── ThankYou.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   └── [orphaned pages — see routing-and-navigation.md]
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Fixed nav, dropdown, mobile menu
│   │   │   ├── Footer.tsx       # Footer with social + links
│   │   │   ├── Layout.tsx       # Min-h-screen wrapper
│   │   │   └── Section.tsx      # Reusable section with bg variants
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Accordion.tsx
│   │       ├── Badge.tsx
│   │       ├── Breadcrumb.tsx
│   │       └── ScrollToTop.tsx
│   │
│   ├── data/
│   │   └── blogs.ts             # Hardcoded blog content + metadata
│   │
│   ├── services/
│   │   ├── contactService.ts    # Supabase contact insert
│   │   └── zohoService.ts       # Zoho CRM OAuth + lead creation
│   │
│   ├── types/                   # Shared TypeScript type definitions
│   └── lib/                     # Utility functions
│
├── api/
│   └── submit-to-zoho.ts        # Vercel serverless function
│
├── prisma/
│   └── schema.prisma            # PostgreSQL schema (Contact model)
│
├── public/                      # Static assets (served as-is)
│   ├── final_logo_-_light.png   # Company logo (759KB — needs optimizing)
│   ├── hero-ai-bg.svg
│   ├── blog/                    # Blog featured images
│   └── tool-logos/              # 18+ integration logos
│
├── docs/                        # All documentation (this folder)
├── tailwind.config.js           # Design system tokens
├── vite.config.ts               # Build configuration
├── vercel.json                  # Vercel routing rules
└── package.json
```

---

## Data Flow

### Contact Form Submission
```
User fills Contact form
    → Client-side: contactService.ts → Supabase (PostgreSQL) 
    → Client-side: POST /api/submit-to-zoho
        → Vercel Function: submit-to-zoho.ts
            → zohoService.ts: token refresh → Zoho CRM API
            → File attachments: Formidable parser → attached to lead
```

### Blog Content
```
blogs.ts (TypeScript data file)
    → Blog.tsx (listing with category filter)
    → BlogPost.tsx (dynamic render by slug)
```
Note: No CMS — blog content is static TypeScript. Scaling requires architectural change.

---

## Environment Variables

| Variable | Used By | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | contactService.ts | Supabase project endpoint |
| `VITE_SUPABASE_ANON_KEY` | contactService.ts | Supabase public key |
| `VITE_ZOHO_CLIENT_ID` | zohoService.ts | Zoho OAuth client ID |
| `VITE_ZOHO_CLIENT_SECRET` | zohoService.ts | Zoho OAuth client secret |
| `VITE_ZOHO_REFRESH_TOKEN` | zohoService.ts | Zoho refresh token |
| `OPENAI_API_KEY` | api/ (future) | OpenAI LLM calls |

**Security Note:** `VITE_` prefix exposes variables to the browser bundle. Zoho credentials should NOT use `VITE_` prefix — they should be server-side only via Vercel environment variables without the prefix. See [security-review.md](../qa-docs/security-review.md).

---

## Known Architecture Gaps

1. **No analytics** — No GA4, PostHog, or equivalent installed
2. **No error tracking** — No Sentry or equivalent
3. **Blog CMS** — Content is hardcoded in TypeScript, not scalable
4. **Logo performance** — 759KB PNG hurts Core Web Vitals
5. **Orphaned routes** — 6 product pages with no nav links (see routing-and-navigation.md)
6. **Broken nav links** — 2 nav items point to non-existent routes
