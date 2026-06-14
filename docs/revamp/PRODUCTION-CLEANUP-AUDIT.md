# Production Cleanup Audit — VyaptIX Website
**Generated:** 2026-04-24  
**Branch:** revamp/website-v2  
**Purpose:** Identify all dead code, orphaned files, stale dependencies, and security issues before Git push + Vercel deployment

---

## Executive Summary

The project has migrated from React + Vite + React Router → Next.js App Router. The new structure is solid and working. However, the old Vite/React Router scaffolding was **never cleaned up** and still exists alongside the new code. This audit identifies everything that must be removed before the project is production-ready.

**Total items to clean:** ~35 files + 3 npm packages + 1 critical security issue

---

## CATEGORY 1 — Dead Source Files

### 1A. Orphaned View Components (`src/views/`)

These 9 files exist in `src/views/` but are **not imported** anywhere in the active Next.js `app/` directory. The first two use `react-router-dom` directly. The last six are explicitly removed products per CLAUDE.md.

| File | Reason Dead |
|------|-------------|
| `src/views/Blog.tsx` | Replaced by `app/blog/page.tsx` |
| `src/views/BlogPost.tsx` | Replaced by `app/blog/[slug]/page.tsx`. Uses `react-router-dom`. |
| `src/views/SolutionTemplate.tsx` | React Router template. Not imported. |
| `src/views/ContactCenterAI.tsx` | Removed product. Not imported. |
| `src/views/DPDPCompliance.tsx` | Removed product. Not imported. |
| `src/views/EnterpriseCopilots.tsx` | Removed product. Not imported. |
| `src/views/SalesAutomation.tsx` | Removed product. Not imported. |
| `src/views/VyaptixAI.tsx` | Removed product. Not imported. |
| `src/views/WhatsAppCX.tsx` | Removed product. Not imported. |

**Action:** DELETE ALL 9  
**Risk:** Safe — none are imported anywhere in active code

---

### 1B. Unused Component

| File | Reason Dead |
|------|-------------|
| `src/components/layout/Layout.tsx` | Old React Router wrapper. `app/layout.tsx` is the active root layout. Not imported by any Next.js page. |

**Action:** DELETE  
**Risk:** Safe

---

### 1C. Unused Library Files

| File | Reason Dead |
|------|-------------|
| `src/lib/supabase.ts` | Not imported anywhere. Supabase is accessed directly in `src/services/contactService.ts`. |
| `src/lib/zoho.ts` | Old version. Replaced by `src/services/zohoService.ts`. |

**Action:** DELETE BOTH  
**Risk:** Safe

---

## CATEGORY 2 — Old Vite / React Router Artifacts

These files were part of the old Vite build system and React Router SPA. They are completely bypassed by Next.js.

| File | Reason Dead |
|------|-------------|
| `src/App.tsx` | React Router app shell. `app/layout.tsx` is the active root. Imports deleted `src/pages/*`. |
| `src/main.tsx` | Vite/React DOM entry point. Next.js has its own entry. |
| `index.html` | Vite's root HTML template. Next.js generates HTML per-route. |
| `src/index.css` | Imported by `src/main.tsx` (dead). Active CSS is `app/globals.css`. |
| `vite.config.ts` | Vite build config. Next.js uses `next.config.js`. |
| `tsconfig.app.json` | Vite-style split tsconfig. Next.js uses single `tsconfig.json`. |
| `tsconfig.node.json` | Vite Node tsconfig (for `vite.config.ts`). Not needed. |
| `src/vite-env.d.ts` | Vite environment type declarations. Next.js has `next-env.d.ts`. |

**Action:** DELETE ALL 8  
**Risk:** Safe — Next.js build does not touch any of these

---

## CATEGORY 3 — Dead npm Dependencies

| Package | Why Dead | Still Referenced? |
|---------|----------|-------------------|
| `react-router-dom` | Routing is handled by Next.js file-based system | Only in files being deleted (BlogPost.tsx, SolutionTemplate.tsx, App.tsx) |
| `vite` | Old build tool | Not in any npm script (scripts use `next dev`, `next build`) |
| `@vitejs/plugin-react` | Vite React plugin | Not referenced anywhere |

**Action:** Remove all 3 from `package.json`, run `npm install`  
**Risk:** Safe after orphaned view files are deleted

**Note on `express` + `cors`:** Used only in `scripts/local-api-server.js` for development testing. Keep for now — useful for local Zoho API testing.

---

## CATEGORY 4 — Dead Configuration Files

| File | Issue |
|------|-------|
| `prisma.config.ts` | Likely empty/leftover. Prisma uses `prisma/schema.prisma`. Verify if empty then delete. |
| `PROJECT_STRUCTURE.md` | Documents old Vite structure (`src/pages/`, `src/App.tsx`, etc.). Completely outdated. |
| `InfoGraphics.html` | 16KB design mockup artifact from planning phase. Not imported or linked anywhere. |

**Action:** DELETE ALL 3  
**Risk:** Safe

---

## CATEGORY 5 — Dead API Route File

| File | Issue |
|------|-------|
| `api/submit-to-zoho.js` | Old JavaScript version of the Zoho serverless function. The active TypeScript version is `api/submit-to-zoho.ts`. Also, this flow has been migrated to `app/api/submit-to-zoho/route.ts`. |

**Action:** DELETE  
**Risk:** Safe — `app/api/` routes are the active ones in Next.js

---

## CATEGORY 6 — Public Assets

| File/Folder | Issue |
|-------------|-------|
| `public/vyaptix-logo.png` | 759KB PNG. Optimized WebP exists at `public/vyaptix-logo.webp`. All code references `.webp`. |
| `public/admin/` | Netlify CMS configuration folder. Next.js blog uses static markdown in `/content/`. Not integrated with any Next.js route. |

**Action:** DELETE BOTH  
**Risk:** Safe — webp is confirmed referenced in `app/layout.tsx` and views

---

## CATEGORY 7 — Git / Build Artifacts

These should be in `.gitignore` but currently are not (or exist as committed files):

| Item | Fix |
|------|-----|
| `.next/` directory | Add `/.next/` to `.gitignore`. Never commit build output. |
| `tsconfig.tsbuildinfo` | Add to `.gitignore`. Generated incremental build file. |
| `.env.local` | Redundant with `.env`. Delete or keep only for local overrides. |

---

## CATEGORY 8 — CRITICAL: Security Issues ⚠️

### 8A. Secrets Exposed in `.env`

The `.env` file is in `.gitignore` (correct) but **if it was ever committed, all secrets are in git history and must be treated as compromised.**

Secrets that must be **rotated immediately** before deployment:

| Secret | Risk Level |
|--------|-----------|
| `DATABASE_URL` | 🔴 CRITICAL — Full database access |
| `SUPABASE_SERVICE_ROLE_KEY` | 🔴 CRITICAL — Bypasses Row Level Security |
| `JWT_SECRET` | 🔴 HIGH — Token forgery |
| `OPENAI_API_KEY` | 🔴 HIGH — Billing fraud |
| `ZOHO_CLIENT_SECRET` + `ZOHO_REFRESH_TOKEN` | 🔴 HIGH — CRM access |
| `UPSTASH_REDIS_REST_TOKEN` | 🟡 MEDIUM |
| `CRON_SECRET` | 🟡 MEDIUM |

**Correct approach for Vercel:**
- Server-only secrets: add directly to Vercel project → Settings → Environment Variables (no prefix)
- Client-side values: prefix with `NEXT_PUBLIC_` in Vercel env vars

### 8B. Stale `VITE_` Variables in `.env`

The following variables use the old Vite convention and are NOT read by Next.js:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_ZOHO_WEB_TO_LEAD_URL
VITE_ZOHO_XNQSJSDP
VITE_ZOHO_XMIWTLD
VITE_ZOHO_RETURN_URL
```

**Action:** Remove all `VITE_` prefixed variables from `.env`. If any are still needed, rename to `NEXT_PUBLIC_` (client) or unprefixed (server).

### 8C. Missing `.env.example`

No `.env.example` file exists. Create one with all required keys and blank/dummy values so developers know what to configure.

---

## CATEGORY 9 — Documentation to Update

| File | Issue |
|------|-------|
| `CLAUDE.md` | "Current State" section says "Pre-implementation. Code revamp not yet started." — **FALSE**. Revamp is substantially complete. Must update this section. |

---

## Summary Checklist — Ordered for Safe Execution

### Step 1: Security (do this first, before any push)
- [ ] Check if `.env` was ever committed (`git log --all -- .env`)
- [ ] If yes: rotate ALL secrets listed in 8A above
- [ ] Move all production secrets to Vercel env vars (not in `.env`)
- [ ] Remove all `VITE_*` lines from `.env`
- [ ] Create `.env.example` with all keys + blank values

### Step 2: .gitignore Updates
- [ ] Add `/.next/` to `.gitignore`
- [ ] Add `tsconfig.tsbuildinfo` to `.gitignore`
- [ ] Verify `.env` and `.env.local` are in `.gitignore`

### Step 3: Delete Dead Files (safe to batch)
- [ ] `src/views/Blog.tsx`
- [ ] `src/views/BlogPost.tsx`
- [ ] `src/views/SolutionTemplate.tsx`
- [ ] `src/views/ContactCenterAI.tsx`
- [ ] `src/views/DPDPCompliance.tsx`
- [ ] `src/views/EnterpriseCopilots.tsx`
- [ ] `src/views/SalesAutomation.tsx`
- [ ] `src/views/VyaptixAI.tsx`
- [ ] `src/views/WhatsAppCX.tsx`
- [ ] `src/components/layout/Layout.tsx`
- [ ] `src/lib/supabase.ts`
- [ ] `src/lib/zoho.ts`
- [ ] `src/App.tsx`
- [ ] `src/main.tsx`
- [ ] `index.html`
- [ ] `src/index.css`
- [ ] `vite.config.ts`
- [ ] `tsconfig.app.json`
- [ ] `tsconfig.node.json`
- [ ] `src/vite-env.d.ts`
- [ ] `api/submit-to-zoho.js`
- [ ] `public/vyaptix-logo.png`
- [ ] `public/admin/` (entire folder)
- [ ] `prisma.config.ts` (verify empty first)
- [ ] `PROJECT_STRUCTURE.md`
- [ ] `InfoGraphics.html`
- [ ] `.env.local`

### Step 4: Dependency Cleanup
- [ ] Remove `react-router-dom` from `package.json`
- [ ] Remove `vite` from `package.json`
- [ ] Remove `@vitejs/plugin-react` from `package.json`
- [ ] Run `npm install` to update `package-lock.json`

### Step 5: Config Cleanup
- [ ] Update `tsconfig.json` — remove excludes for deleted files
- [ ] Update `CLAUDE.md` — fix "Current State" section

### Step 6: Build Verification
- [ ] `npm run typecheck` — no errors
- [ ] `npm run lint` — no errors
- [ ] `npm run build` — successful
- [ ] Test all routes locally: `npm run dev`

### Step 7: Git Push
- [ ] `git add` only clean files (no `.env`, no `.next/`)
- [ ] Commit: `chore: remove Vite/React Router artifacts, clean up dead code`
- [ ] Push `revamp/website-v2` → open PR to `main`

---

## What Is NOT Dead (keep everything else)

- `app/` — entire Next.js app directory ✅
- `src/views/` — all 10 active views ✅
- `src/components/` — all except `Layout.tsx` ✅
- `src/services/` — both files ✅
- `src/lib/analytics.ts`, `src/lib/blog.ts` ✅
- `sanity/`, `sanity.config.ts`, `sanity.cli.ts` — Studio schemas and configuration ✅
- `api/submit-to-zoho.ts` ✅ (keep .ts, delete .js)
- `app/studio/`, `app/api/revalidate/sanity/` — Studio and publish revalidation routes ✅
- `docs/` — all documentation ✅
- `scripts/` — keep for dev testing ✅
- `public/` — all except logo.png and admin/ ✅
- `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json`, `tsconfig.json` ✅
- `prisma/schema.prisma` ✅
