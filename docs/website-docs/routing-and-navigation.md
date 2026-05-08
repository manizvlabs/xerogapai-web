# Routing & Navigation

## Current Route Map

Defined in `src/App.tsx`.

| Route | Component File | In Nav? | In Footer? | Status |
|---|---|---|---|---|
| `/` | `pages/Home.tsx` | Yes (Logo) | Yes | ✅ Active |
| `/solutions` | `pages/Solutions.tsx` | Yes | No | ✅ Active |
| `/solutions/ai-review-generation` | `pages/AIReviewGeneration.tsx` | Yes (dropdown) | Yes | ✅ Active |
| `/about` | `pages/About.tsx` | Yes | Yes | ✅ Active |
| `/contact` | `pages/Contact.tsx` | Yes | Yes | ✅ Active |
| `/thank-you` | `pages/ThankYou.tsx` | No | No | ✅ Active (post-form) |
| `/blog` | `pages/Blog.tsx` | Yes | Yes | ✅ Active |
| `/blog/:slug` | `pages/BlogPost.tsx` | No | No | ✅ Active (dynamic) |
| `/whatsapp-cx` | `pages/WhatsAppCX.tsx` | ⚠️ Broken link | No | ⚠️ Orphaned |
| `/vyaptix-ai` | `pages/VyaptixAI.tsx` | No | No | ❌ Orphaned |
| `/enterprise-copilots` | `pages/EnterpriseCopilots.tsx` | No | No | ❌ Orphaned |
| `/sales-automation` | `pages/SalesAutomation.tsx` | No | No | ❌ Orphaned |
| `/contact-center-ai` | `pages/ContactCenterAI.tsx` | No | No | ❌ Orphaned |
| `/dpdp-compliance` | `pages/DPDPCompliance.tsx` | No | No | ❌ Orphaned |

---

## Navigation Link Audit

### Header Nav (`src/components/layout/Header.tsx` — `navItems` array)

| Nav Label | Link Points To | Route Exists? | Issue |
|---|---|---|---|
| Solutions | `/solutions` | ✅ Yes | OK |
| AI Review Generation (dropdown) | `/solutions/ai-review-generation` | ✅ Yes | OK |
| Setu - WhatsApp Assistant (dropdown) | `/whatsapp-automation` | ❌ **NO** | **BROKEN** — page is at `/whatsapp-cx` |
| Agent Mitra (dropdown) | `/agent-mitra` | ❌ **NO** | **BROKEN** — no page exists at all |
| Blog | `/blog` | ✅ Yes | OK |
| About | `/about` | ✅ Yes | OK |
| Contact | `/contact` | ✅ Yes | OK |

### Footer Nav (`src/components/layout/Footer.tsx`)

| Footer Label | Link Points To | Route Exists? | Issue |
|---|---|---|---|
| About | `/about` | ✅ Yes | OK |
| Blog | `/blog` | ✅ Yes | OK |
| Contact | `/contact` | ✅ Yes | OK |
| AI Review Generator | `/solutions/ai-review-generation` | ✅ Yes | OK |
| Reviews Platform | `https://reviews.vyaptix.ai` | External | OK |
| Privacy Policy | `#` | ❌ No page | Placeholder — needs a real page |
| Terms of Service | `#` | ❌ No page | Placeholder — needs a real page |

---

## The 6 Orphaned Product Pages

These pages exist as fully built React components with routes registered in `App.tsx`, but they are **not reachable** from any navigation link, footer link, or internal link. They are only accessible by typing the URL directly.

### 1. WhatsApp CX — `/whatsapp-cx` → `pages/WhatsAppCX.tsx`
- **What it is:** "Setu" — WhatsApp business automation, multi-channel lead qualification, conversation analytics
- **Nav entry:** Yes, but the nav links to `/whatsapp-automation` (wrong URL) — so it's effectively orphaned

### 2. VyaptixAI — `/vyaptix-ai` → `pages/VyaptixAI.tsx`
- **What it is:** Workflow intelligence, Notion workspace automation, reporting
- **Nav entry:** None
- **Footer entry:** None

### 3. Enterprise Copilots — `/enterprise-copilots` → `pages/EnterpriseCopilots.tsx`
- **What it is:** Multi-lingual Q&A over company docs, compliance-ready knowledge base, role-based access
- **Nav entry:** None
- **Footer entry:** None

### 4. Sales Automation — `/sales-automation` → `pages/SalesAutomation.tsx`
- **What it is:** AI prospecting, tailored outreach messaging, pipeline prioritization
- **Nav entry:** None
- **Footer entry:** None

### 5. Contact Center AI — `/contact-center-ai` → `pages/ContactCenterAI.tsx`
- **What it is:** Automated QA scoring, agent coaching, sentiment tracking
- **Nav entry:** None
- **Footer entry:** None

### 6. DPDP Compliance — `/dpdp-compliance` → `pages/DPDPCompliance.tsx`
- **What it is:** India's Digital Personal Data Protection Act compliance solution
- **Nav entry:** None
- **Footer entry:** None

---

## Target State (Post-Revamp)

Per product decision: website will focus on **2 products only**:
1. **AI Review Generator** — existing, fully built ✅
2. **AgentMitra** — in nav but NO page built yet ❌ (needs to be created)

### Actions Required
1. Remove routes for all 6 orphaned product pages from `App.tsx`
2. Archive or delete the 6 orphaned `.tsx` page files (or keep in codebase but remove routes)
3. Fix the nav: remove "Setu - WhatsApp Assistant" entry
4. Fix the nav: keep "Agent Mitra" but point to a new `/agent-mitra` page that needs to be built
5. Update `Solutions.tsx` to present both products (currently only shows AI Review Generation)
6. Update `Footer.tsx` solutions column to include both products
7. Create `pages/AgentMitra.tsx` — new product page

See [REVAMP-MASTER-PLAN.md](../revamp/REVAMP-MASTER-PLAN.md) for detailed implementation spec.
