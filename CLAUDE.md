# VyaptIX Website — Claude Code Project Instructions

**READ THIS ENTIRE FILE BEFORE RESPONDING TO ANYTHING.**
**THEN READ ALL FILES LISTED UNDER "Memory Files" BEFORE DOING ANY WORK.**

---

## Who You Are Working With

- **Name:** Ajeet Singh — Founder/Co-founder of VyaptIX
- **Email:** ajeet@vyaptix.com
- **Role:** Product owner, engineering sponsor, business decision-maker
- **Expectation:** You are a senior team member, not a tool. You have full project context. Ajeet does not re-explain things.

---

## The Company

**VyaptIX** — AI automation startup building practical AI tools for business owners.
- **Website:** vyaptix.com (this codebase)
- **Review platform:** https://reviews.vyaptix.ai (separate product, separate codebase — external link only)
- **Working directory:** `d:/VyaptIX/Projects/vyaptix-website-latest/vyaptix-website`

---

## The 2 Products (ONLY THESE 2 — LOCKED DECISION)

### 1. AI Review Generator
- **Live product** — customers actively using it
- **Platform:** https://reviews.vyaptix.ai
- **Website page:** `/solutions/ai-review-generation` → `src/pages/AIReviewGeneration.tsx`
- **What it does:** Collects authentic Google reviews in under 20 seconds via QR code + AI-generated review text

### 2. AgentMitra
- **In nav but NO page built yet** — `/agent-mitra` returns 404
- **Page to build:** `src/pages/AgentMitra.tsx`
- **BLOCKER:** Product details not yet defined — see `docs/product-docs/agent-mitra.md` for the 10 questions Ajeet must answer before this page can be built

**Do not reference, add, or suggest any other products.** The following pages exist in the codebase but are REMOVED from the website: WhatsAppCX, VyaptixAI, EnterpriseCopilots, SalesAutomation, ContactCenterAI, DPDPCompliance.

---

## Current State (as of 2026-04-21)

- **Website audit score:** 5.2/10 → Target: 8.5/10
- **Phase:** Pre-implementation. All planning and docs are done. Code revamp not yet started.
- **Docs created:** `docs/` folder with 27 files. Primary implementation doc: `docs/revamp/REVAMP-MASTER-PLAN.md`
- **Branch strategy:** Docs changes on `develop`. ALL code revamp changes go on a new branch (Ajeet will create it — likely `revamp/website-v2`)

---

## Critical Issues to Know

1. **SECURITY — CRITICAL:** Zoho OAuth credentials (`VITE_ZOHO_CLIENT_ID`, `VITE_ZOHO_CLIENT_SECRET`, `VITE_ZOHO_REFRESH_TOKEN`) are exposed in the browser bundle via `VITE_` prefix. Must be moved to server-side only. See `docs/qa-docs/security-review.md`.
2. **Broken nav links:** "Setu - WhatsApp Assistant" links to `/whatsapp-automation` (doesn't exist). "Agent Mitra" links to `/agent-mitra` (no page). Both must be fixed.
3. **6 orphaned pages:** Routes registered in `App.tsx` but unreachable from any nav. Must be removed from routes.
4. **No analytics** installed — zero visibility into traffic or conversions.
5. **No SEO** per-page meta, no sitemap, no robots.txt, no JSON-LD.
6. **Logo is 759KB** PNG — kills Core Web Vitals.
7. **No cookie consent** banner — legal/GDPR risk.

---

## Locked Decisions — Do Not Relitigate

| Decision | Detail |
|---|---|
| 2 products only | AI Review Generator + AgentMitra. No others. |
| Revamp branch | All code changes on new branch, not develop or main |
| No README.md | Never create README.md files |
| Analytics: PostHog | Chosen over GA4 — needs Ajeet's PostHog API key |
| Contact form | Simplify to 6 fields Stage 1, enterprise form opt-in |
| Docs location | Everything in `docs/` subfolder |

---

## Key File Locations

| What | Where |
|---|---|
| Route definitions | `src/App.tsx` |
| Header nav (navItems) | `src/components/layout/Header.tsx` lines 66–79 |
| Footer links | `src/components/layout/Footer.tsx` |
| Blog content | `src/data/blogs.ts` |
| Zoho CRM service | `src/services/zohoService.ts` |
| Zoho serverless API | `api/submit-to-zoho.ts` |
| Design tokens | `tailwind.config.js` |
| Primary revamp spec | `docs/revamp/REVAMP-MASTER-PLAN.md` |
| Route audit | `docs/website-docs/routing-and-navigation.md` |
| Security issues | `docs/qa-docs/security-review.md` |
| Revamp progress tracker | Memory file: `revamp-status.md` |

---

## Memory Files — READ THESE NOW

Full context lives in the memory folder. Read all of them at session start:

```
C:/Users/Ajeet/.claude/projects/d--VyaptIX-Projects-vyaptix-website-latest-vyaptix-website/memory/
├── MEMORY.md              ← index
├── user-profile.md        ← who Ajeet is, how to work with him
├── project-overview.md    ← full business context, products, ICP, audit
├── codebase-state.md      ← complete route map, broken links, integrations, key files
├── decisions-log.md       ← all locked decisions + pending blockers
├── revamp-status.md       ← phase-by-phase progress, what's done/TODO/blocked
└── working-style.md       ← collaboration rules, output expectations
```

---

## How to Start Any Session

1. Read this file ✓ (you just did)
2. Read all 6 memory files listed above
3. Check `revamp-status.md` to know current progress
4. Check `decisions-log.md` to know what's locked and what's blocked
5. Then respond to Ajeet's instruction with full context — no "could you remind me" questions

---

## Collaboration Rules

- **Deliver completely** — never give a preview and offer to do the rest
- **Be honest** — frank assessment over flattery; Ajeet wants real verdicts
- **Flag blockers once, clearly** — then move on and complete unblocked work
- **No repeated questions** — if it's in these files, don't ask Ajeet about it
- **No README.md files** — documentation goes in `docs/` only
- **Confirm branch before any code edit** — revamp code must NOT go to develop or main
