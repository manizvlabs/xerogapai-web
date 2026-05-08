# VyaptIX Website — Implementation Plan
**Created:** May 2026 | **Based on:** `website-review.md` audit + revamp-status.md
**Branch for all code:** `revamp/website-v2`
**Target score:** 9/10 (from current ~5.5/10 average)

---

## Current State Summary

Batches 1–8 of the dark SaaS revamp are complete (all pages exist in dark theme). Despite that, the website-review identified a significant gap between "code exists" and "site converts." The plan below addresses every finding in priority order.

---

## Agent/Skill Assignments

| Phase | Skill to Use | Reason |
|---|---|---|
| Phase 1 (P0 fixes) | `vyaptix-frontend-developer-agent` | Pure code changes — WhatsApp, contact form, bounce fix |
| Phase 2 (Messaging) | `vyaptix-pm-agent` → then `vyaptix-frontend-developer-agent` | Positioning decisions first, then implement |
| Phase 3 (Trust layer) | `vyaptix-ux-designer-agent` → then `vyaptix-frontend-developer-agent` | Design the proof sections, then build |
| Phase 4 (Content) | `vyaptix-research-agent` → `vyaptix-pm-agent` | Research what to write, define structure |
| Phase 5 (SEO pages) | `vyaptix-frontend-developer-agent` | Build landing pages once content is defined |
| Phase 6 (Security) | `vyaptix-frontend-developer-agent` | Zoho credential migration after Ajeet rotates token |

---

## Phase 1 — Emergency P0 Fixes
**Timeline: This session / today**
**Effort: ~2 hours**
**Impact: Unblocks every single conversion action on the site**

These are production bugs. Every day they stay live, conversions are being lost.

### Sprint 1.1 — Fix WhatsApp Button Number
- **Issue:** WhatsApp floating button uses `wa.me/917000000000` (placeholder). Every click goes nowhere.
- **Fix:** Replace with Ajeet's real WhatsApp number.
- **Files to check:** search for `7000000000` across `src/`
- **Ajeet action needed:** Confirm real WhatsApp number to use

### Sprint 1.2 — Configure Calendly
- **Issue:** `NEXT_PUBLIC_CALENDLY_URL` not set → Demo page shows broken widget. Highest-converting CTA on the site is dead.
- **Fix:** Ajeet sets the env var in Vercel dashboard.
- **Ajeet action needed:** Create Calendly event + set `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR/EVENT` in Vercel env vars

### Sprint 1.3 — Contact Form Simplification
- **Issue:** 20+ fields including Skype ID, fax, Twitter handle, "DP/DP Compliance" service. Near-zero submission rate.
- **Fix:** Replace with 6-field Stage 1 form (already decided as Decision 7 in decisions-log.md)
  - First Name, Last Name, Work Email, Company (optional), Product Interest (dropdown), Message
  - Remove: Skype, fax, Twitter, all enterprise-only fields
  - Remove: "DP/DP Compliance" from the service/product list
  - Optional: accordion-hidden "Enterprise Details" section for those who need it
- **Files:** `src/views/Contact.tsx` (or wherever the form lives)
- **Skill:** `vyaptix-frontend-developer-agent`

### Sprint 1.4 — Hide AgentMitra Waitlist Count
- **Issue:** "47 users on waitlist" is displayed prominently. This creates a "ghost town" impression.
- **Fix:** Remove the count entirely. Replace with something non-quantitative like "Join the Early Access List" or "Limited early access spots."
- **Files:** `src/views/AgentMitra.tsx`
- **Condition:** Show a real number only when it reaches 500+

---

## Phase 2 — Messaging Surgery
**Timeline: Week 1**
**Effort: ~1 day code + Ajeet copy review**
**Impact: Fundamental credibility improvement at first impression**

### Sprint 2.1 — Rewrite Hero Headline & Subheadline
- **Issue:** "Transform Your Business With Intelligent AI" is used by 10,000 companies. "cutting-edge," "unprecedented growth," "modern enterprises" are credibility-reducing filler.
- **Fix:** Lead with the genuine differentiator — Indian SMB focus + speed + outcomes.
- **Directional options (pick one, refine with Ajeet):**
  - `"AI automation that goes live in days — built for Indian SMBs"`
  - `"Stop losing customers to better-automated competitors."`
  - `"Real AI automation. Working in days, not months."`
- **Subheadline:** Remove "cutting-edge" and "unprecedented." Replace with specific proof: "From collecting Google reviews to automating customer workflows — we build AI systems that fit how your business actually works."
- **Ajeet action needed:** Pick/refine the headline direction before implementation
- **Skill:** `vyaptix-pm-agent` to draft options → Ajeet approves → `vyaptix-frontend-developer-agent` implements

### Sprint 2.2 — Reorder Homepage Sections
- **Issue:** "Why VyaptIX" (the 4 strongest differentiators: Outcome-first, Fast to value, Vendor-neutral, SMB-first) is buried as section 4 of 7.
- **Fix:** Move it to section 2, immediately after the hero. This is the site's strongest argument and should be the first thing a visitor reads after the headline.
- **New section order:**
  1. Hero
  2. Why VyaptIX (outcome-first, fast to value, vendor-neutral, SMB-first) ← **MOVE UP**
  3. Capabilities
  4. Products
  5. Tech Stack Marquee
  6. Industries (or replace — see Sprint 2.4)
  7. Final CTA
- **Files:** `src/views/Home.tsx`

### Sprint 2.3 — Fix AgentMitra Positioning Consistency
- **Issue:** AgentMitra has two incompatible descriptions across pages:
  - Homepage: "AI-powered business assistant for Indian SMBs — handles WhatsApp + web queries"
  - Solutions/AgentMitra page: "Role-based service operations platform consolidating agents, clients, and workflows"
- **Fix:** Pick one consistent positioning and apply it across all 4 locations: homepage product card, solutions page, AgentMitra hero, AgentMitra meta description.
- **Ajeet action needed:** Confirm which description is correct (or define the right one)
- **Skill:** `vyaptix-pm-agent` → then implement

### Sprint 2.4 — Replace/Elevate Industries Section
- **Issue:** 8 emoji tiles with no supporting content. Decorative, not persuasive.
- **Options (pick one):**
  - **Option A:** Replace with micro case studies — 3 tiles, each with "Restaurant: 3x Google reviews in 30 days" type stat
  - **Option B:** Remove entirely, use that space for a client logo strip
  - **Option C:** Elevate with hover-expand showing a 2-line use case per industry
- **Recommendation:** Option A if you have the proof, Option B if you have logos, remove if neither
- **Ajeet action needed:** Confirm which direction + supply the proof data

### Sprint 2.5 — Fix `animate-bounce` on Icon Hover
- **Issue:** CSS default bounce animation on icon hover looks cheap and unpolished.
- **Fix:** Replace with `scale-110` + subtle glow shadow (`drop-shadow-[0_0_8px_rgba(6,206,255,0.4)]`). This is a 10-minute code change.
- **Files:** `src/views/Home.tsx` capability cards section
- **Skill:** `vyaptix-frontend-developer-agent`

---

## Phase 3 — Trust & Social Proof Layer
**Timeline: Week 2**
**Effort: ~2 days code + Ajeet content approval**
**Impact: Highest-leverage gap vs. every competitor (Wati, Intercom, Jasper all have this)**

### Sprint 3.1 — Add Social Proof Strip (Client Logos)
- **Issue:** Zero client logos visible. Wati shows "16,000+ customers." VyaptIX shows nothing.
- **Fix:** Add a logo strip above the fold (between hero and Why VyaptIX, or just below hero).
  - Even 3–5 early client logos transforms trust perception dramatically
  - Fallback if logos not ready: "Trusted by SMBs across restaurants, clinics, and real estate" with industry icons
- **Ajeet action needed:** Supply client logos (even 3 is enough to start) OR approve the fallback text approach
- **Files:** `src/views/Home.tsx` — new section after hero
- **Skill:** `vyaptix-frontend-developer-agent`

### Sprint 3.2 — Add Testimonials Section
- **Issue:** Zero customer quotes anywhere on homepage. This is among the strongest conversion factors in B2B.
- **Fix:** 3 testimonial cards with: quote, name, role, company, photo (if available)
  - Even informal quotes collected over WhatsApp/email work — just need permission to use
  - Format: dark glass card, 2–3 sentences, star rating if applicable
  - Placement: after Products section on homepage
- **Ajeet action needed:** Supply 3 customer quotes with permission to use
- **Files:** `src/views/Home.tsx` (new Testimonials section), optionally also on product pages

### Sprint 3.3 — Add Product Screenshots/Mockups
- **Issue:** Both products described in text bullets only. Looks like vaporware without any visual evidence.
- **Fix:** One UI screenshot or annotated mockup per product.
  - AI Review Generator: a screenshot of the review flow (QR scan → review text → submit)
  - AgentMitra: a screenshot or wireframe-style mockup of the agent interface
  - Can use browser mockup frames (CSS only, no library needed) for polish
- **Ajeet action needed:** Supply screenshots from `reviews.vyaptix.ai` dashboard + AgentMitra interface
- **Files:** `src/views/Solutions.tsx`, `src/views/AIReviewGeneration.tsx`, `src/views/AgentMitra.tsx`

### Sprint 3.4 — Add Team Photos to About Page
- **Issue:** Founders named but not shown. In Indian B2B 2026, founder-led companies without founder faces lose trust.
- **Fix:** Add headshots of both founders to the team section on About. Keep it authentic — no stock photo studio look needed.
- **Ajeet action needed:** Supply headshots (even phone photos work if lighting is decent)
- **Files:** `src/views/About.tsx`, `public/team/`

### Sprint 3.5 — Add Author Profiles to Blog
- **Issue:** 5 of 7 blog posts have no author. Google E-E-A-T signals are weak.
- **Fix:**
  - Add author name to all 7 posts in the markdown frontmatter
  - Create author profile component: small photo, 2-line bio, LinkedIn link
  - Add Ajeet's author profile to all posts he authored
- **Files:** `content/blog/*.md` (frontmatter), `src/views/BlogPost.tsx`, `src/components/ui/AuthorCard.tsx` (new)
- **Skill:** `vyaptix-frontend-developer-agent`

---

## Phase 4 — Conversion Optimization
**Timeline: Week 2–3**
**Effort: ~1.5 days**
**Impact: Closes the gap between visitor interest and contact action**

### Sprint 4.1 — Add Risk Reversal Messaging
- **Issue:** No guarantee, no "cancel anytime," no trial offer. Every competitor offers some form of risk reduction.
- **Fix:** Add 1–2 risk-reversal lines near all CTAs:
  - "No long-term contracts. Results or we talk."
  - "30-minute discovery call. No slides, no sales script."
  - "See automation live in your business context."
- **Files:** CTAs in `src/views/Home.tsx`, `src/views/Solutions.tsx`, product pages

### Sprint 4.2 — Add Page Transition Animations
- **Issue:** Hard cuts between pages feel jarring. Even 200ms fade feels premium.
- **Fix:** Add route-level fade-in transition via CSS in `app/layout.tsx`
  - Simple approach: apply `animate-fadeIn` class to the page wrapper in layout
  - No Framer Motion needed — pure CSS `opacity 0→1, translateY 8px→0` over 200ms
- **Files:** `app/layout.tsx` or page wrapper component

### Sprint 4.3 — Dark/Light Theme Consistency Audit
- **Issue:** Homepage has sophisticated dark-to-light bridge system. Other pages use inconsistent backgrounds.
- **Specific gaps from review:**
  - Blog article: `bg-[#050D1A]` with `text-white/50` body text → poor readability for long-form reading
  - Contact page: light calendar components clashing with dark surrounding sections
- **Fix:** Audit all inner pages. Where dark-only, ensure consistent use of `#050D1A` / `#0A1628` alternation. For blog article body text, increase contrast to `text-white/70` minimum.
- **Files:** `src/views/BlogPost.tsx`, `src/views/Contact.tsx`

### Sprint 4.4 — Add "Book a Call" Direct CTA
- **Issue:** Both CTAs on final CTA section link to pages. A direct calendar-open action converts better.
- **Fix:** Make the primary CTA on the homepage final CTA section open the Calendly modal inline (not navigate to `/demo`).
  - This requires Calendly's popup widget, not the iframe embed
  - Lower friction = higher conversion
- **Files:** `src/views/Home.tsx` final CTA section, `src/components/ui/CalendlyWidget.tsx`

---

## Phase 5 — Content Strategy & Blog Cleanup
**Timeline: Week 3–4**
**Effort: Mostly content work (Ajeet) + ~0.5 day code**
**Impact: SEO foundation + brand authority**

### Sprint 5.1 — Remove/Reclassify News Aggregation Blog Posts
- **Issue:** Posts like "Meta Is Building an AI Clone of Zuckerberg" and "Claude AI Design" are pure news aggregation. No SEO value, dilutes expert positioning.
- **Fix options:**
  - Remove them entirely from published list (easiest)
  - Add original analysis layer: "What this means for Indian SMBs using AI tools"
  - Move to a "News" category with a clear visual distinction
- **Ajeet decision needed:** Remove or repurpose?
- **Affected posts:** Check `content/blog/` for the news-style posts

### Sprint 5.2 — Create Author Profile Pages
- **Fix:** Build a `/authors/ajeet-singh` page (and any other authors) with:
  - Photo, full bio, areas of expertise
  - List of authored posts
  - LinkedIn link
- This directly improves Google E-E-A-T scoring for all blog posts
- **Files:** `app/authors/[slug]/page.tsx` (new), `src/views/AuthorPage.tsx` (new)
- **Skill:** `vyaptix-frontend-developer-agent`

### Sprint 5.3 — Blog Internal Linking
- **Issue:** Blog posts don't link to relevant product pages. Missing basic on-page SEO.
- **Fix:** Add relevant CTAs within blog post content:
  - Automation posts → link to `/solutions/ai-review-generation`
  - Restaurant posts → link to AI Review Generator
  - Update `content/blog/*.md` files with inline links
- **Files:** `content/blog/*.md` (content edits)

### Sprint 5.4 — Create 3 Industry Landing Pages
- **Issue:** Industries section is decorative. No specific landing pages exist.
- **Target industries** (highest intent for Indian SMB AI):
  1. `/industries/restaurants` — "AI automation for restaurants"
  2. `/industries/clinics` — "AI automation for clinics and healthcare"
  3. `/industries/real-estate` — "AI automation for real estate agencies"
- **Each page structure:** Problem → VyaptIX solution → Specific metrics → Use cases → CTA
- **Skill:** `vyaptix-pm-agent` for content structure → `vyaptix-frontend-developer-agent` for build
- **Ajeet action needed:** Real metrics per industry (or at least one real example per)

### Sprint 5.5 — Blog Content Production Rhythm
- **Issue:** 7 posts provides near-zero search traction. Need 30–50 minimum for any keyword visibility.
- **Plan:** Establish a consistent cadence:
  - Target: 2 posts/week for 3 months → 24–26 posts
  - Focus: Indian SMB pain points, not tech news
  - Topics to prioritize:
    - "How [Restaurant Name Type] in [City] collected 100 Google reviews in a month"
    - "WhatsApp automation vs hiring a receptionist — real cost comparison"
    - "Why Indian SMBs fail at AI: the 5 implementation mistakes"
    - "How to get more Google reviews without asking awkwardly"
- **Tool:** Decap CMS is already configured — Ajeet can write and publish without code
- **Ajeet action needed:** Calendly (blocker) + GitHub OAuth (for CMS) must be done first

---

## Phase 6 — SEO Growth Engine
**Timeline: Month 2**
**Effort: ~3 days code + significant content**
**Impact: Organic traffic acquisition**

### Sprint 6.1 — Comparison Page: VyaptIX vs Wati
- **Why:** High commercial intent. People searching "VyaptIX vs Wati" are ready to decide.
- **Structure:**
  - Side-by-side table on key criteria: pricing model, setup time, Indian SMB focus, WhatsApp + review combo, direct founder access
  - Honest positioning — acknowledge where Wati is stronger (scale, ecosystem)
  - Clear differentiation where VyaptIX wins (speed, customization, SMB focus, bundled AI review + automation)
- **Route:** `/compare/vyaptix-vs-wati`
- **Skill:** `vyaptix-research-agent` for competitive analysis → `vyaptix-frontend-developer-agent` for build

### Sprint 6.2 — High-Intent SEO Landing Pages
- Target keywords with real commercial intent:
  1. `/solutions/google-review-generation-india` — "Google review software India"
  2. `/solutions/whatsapp-automation-india` — "WhatsApp business automation India"
  3. `/solutions/ai-for-small-business-india` — "AI tools for small business India 2026"
- **Each page:** keyword in H1, India-specific content, pricing signal, CTA
- **Skill:** `vyaptix-research-agent` (keyword validation) → `vyaptix-frontend-developer-agent`

### Sprint 6.3 — Add Pricing Signals
- **Issue:** No pricing anywhere. This is causing qualified traffic to leave without contacting.
- **Fix options:**
  - "Starting from ₹X/month" on each product card
  - "Project-based pricing — typical engagement ₹X–Y" on Solutions page
  - A dedicated `/pricing` page with tier overview (even "Contact for pricing" is better than nothing)
- **Ajeet decision needed:** What pricing to show and where
- **Skill:** `vyaptix-pm-agent` for pricing structure → `vyaptix-frontend-developer-agent` for UI

---

## Phase 7 — Security & Technical Debt
**Timeline: Month 2 (when unblocked)**
**Effort: ~0.5 day**

### Sprint 7.1 — Zoho OAuth Credentials Migration
- **Issue:** `VITE_ZOHO_CLIENT_ID`, `VITE_ZOHO_CLIENT_SECRET`, `VITE_ZOHO_REFRESH_TOKEN` exposed in browser bundle via `VITE_` prefix.
- **Fix:** Move to server-side only. The serverless function at `api/submit-to-zoho.ts` should use `process.env` without `VITE_/NEXT_PUBLIC_` prefix.
- **Blocker:** Ajeet must rotate the Zoho token first, then update env vars in Vercel
- **Files:** `api/submit-to-zoho.ts`, `src/services/contactService.ts`

### Sprint 7.2 — Decap CMS GitHub OAuth Setup
- **Issue:** CMS is 90% wired but needs a GitHub OAuth App for authentication.
- **Fix:** Ajeet creates a GitHub OAuth App (5-minute task), adds credentials to Vercel env vars.
- **Ajeet action needed:** Follow `public/admin/config.yml` instructions to create OAuth App

---

## Blocked Items — Ajeet Must Action First

These cannot be implemented until Ajeet provides the inputs. All have been flagged before — collecting them here in one place:

| Item | Needed For | Status |
|---|---|---|
| Real WhatsApp number | Sprint 1.1 | 🔴 Provide number |
| Calendly booking link | Sprint 1.2 | 🔴 Create event + set env var |
| Confirmed AgentMitra positioning | Sprint 2.3 | 🔴 Pick one description |
| Client logos (3+ minimum) | Sprint 3.1 | 🔴 Supply logo files |
| 3 customer testimonials | Sprint 3.2 | 🔴 Collect from customers |
| AI Review Generator screenshot | Sprint 3.3 | 🔴 From reviews.vyaptix.ai |
| Founder headshots | Sprint 3.4 | 🔴 Photo files |
| Approve hero headline direction | Sprint 2.1 | 🔴 Pick/refine copy |
| Pricing to show (if any) | Sprint 6.3 | 🔴 Decision needed |
| GitHub OAuth App | Sprint 7.2 | 🔴 5-min Ajeet task |
| Zoho token rotation | Sprint 7.1 | 🔴 Security prerequisite |
| Blog news posts: remove or repurpose | Sprint 5.1 | 🔴 Decision needed |

---

## What NOT to Change

The review identified several things that are genuinely good. Do not touch:

- "No pitch decks, no generic demos — just a real conversation" copy throughout
- "Made with ❤️ in India 🇮🇳" identity — lean in, not away
- Design system: Sora + IBM Plex Mono + navy/cyan — distinctive and correct
- SparklesHero hero background
- Tech stack marquee — communicates vendor breadth well
- Word-stagger animation on hero headline
- "Outcome-first, fast to value, vendor-neutral, SMB-first" 4-point positioning — just needs to move higher

---

## Score Projection

| Dimension | Current | Target | Key Changes |
|---|---|---|---|
| Visual Design | 6.5 | 8.5 | Fix bounce, add screenshots, theme consistency |
| Messaging & Positioning | 5.0 | 8.5 | New hero, Why VyaptIX to top, AgentMitra fix |
| Homepage Structure | 5.5 | 8.5 | Reorder, add proof, add testimonials |
| Animation & Motion | 7.0 | 8.5 | Page transitions, fix bounce, counter rollout |
| Dark/Light Theme Balance | 5.0 | 8.0 | Blog article contrast, contact page fix |
| Content Depth | 4.5 | 7.5 | Screenshots, testimonials, case studies |
| SEO Strategy | 4.0 | 7.0 | Industry pages, comparison page, blog volume |
| Conversion Funnel | 4.0 | 8.0 | Fix P0s, simplify form, add proof, risk reversal |
| Technical Completeness | 4.0 | 8.0 | Calendly, WhatsApp, Zoho security, CMS setup |

**Projected average after Phase 1–4: ~8.0**
**Projected average after Phase 5–6: ~8.8**

---

*Review source: `docs/discovery/website-review.md` | Revamp state: `revamp-status.md` | All code changes on `revamp/website-v2`*
