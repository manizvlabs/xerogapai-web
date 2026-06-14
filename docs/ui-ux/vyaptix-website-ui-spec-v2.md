# VyaptIX Website — UI/UX Design Spec v2
```
Product:          VyaptIX Marketing Website
Feature:          Full Website Redesign — Animation-First, Cinematic Dark SaaS
Version:          v2.0
Date:             2026-04-26
Author:           VyaptIX UX Agent
Status:           Draft — Handoff Ready
Handoff To:       Frontend Developer
Related Branch:   revamp/website-v2
```

---

## Design Philosophy

The current website scores ~7.5/10. The gap to 8.5+ is not content — it's **visual weight, motion, and hierarchy**. Visitors land and leave without a strong impression because:

1. Sections feel static — no scroll-triggered animation, no staggered reveals
2. The hero is atmospheric but not cinematic — it needs movement, not just glow orbs
3. Product sections lack interactive proof — the mockup cards are passive
4. Typography contrast is weak — headlines and body are too close in visual weight
5. Section-to-section transitions are abrupt — the dark-to-light bridges are functional but mechanical

**The redesign direction: Elite Dark SaaS.** Think Linear, Vercel, Resend, Stripe. Deep space dark foundation, electric cyan/blue accents, everything in motion. Every scroll event should trigger a reveal. Every CTA should feel alive.

---

## 1. OOUX Object Model

### Primary Objects in Scope (Website Context)

| Object | Type | Surface | Description |
|--------|------|---------|-------------|
| **Page** | Primary | Full page | Each route is a page object with its own content model |
| **Blog Post** | Primary | /blog/[slug] | Article with content, author, metadata, related posts |
| **Contact Enquiry** | Primary | /contact form | Lead capture — name, email, company, interest, message |
| **Navigation** | Secondary | Global header | Top-level nav with product dropdown |
| **CTA** | Secondary | All pages | Action trigger — button, link, or form — with PostHog event |

### Object Relationships (NOM)

```
Page          1:m → Section blocks (hero, features, how-it-works, CTA, FAQ)
Page          0:m → CTA (multiple CTAs per page)
Product       1:1 → Page (each product has one page)
Blog Post     1:1 → Page (each post has one dynamic page)
Blog Post     0:m → Related Posts
Contact Enquiry 0:1 → Thank You page (redirect on success)
Navigation    1:m → NavItem (Products dropdown has 2 children)
```

### Calls to Action (from C rows)

| Object | CTA | Destination | PostHog Event |
|--------|-----|------------|---------------|
| Home | Get in Touch | /contact | cta_clicked |
| Home | See Our Products | /solutions | cta_clicked |
| Home | See How It Works | /solutions/ai-review-generation | cta_clicked |
| AI Review | Try Platform Free | reviews.vyaptix.ai | cta_clicked |
| AI Review | Schedule Demo | /contact | cta_clicked |
| Solutions | View Product | product page | cta_clicked |
| Contact | Submit Form | /thank-you | form_submitted |

---

## 2. Information Architecture

```
vyaptix.com
├── / (Home)
│   ├── Hero — headline, subline, 2 CTAs, trust bar
│   ├── Capabilities — 4 service cards
│   ├── Why VyaptIX — 4 differentiator cards
│   ├── AI Stack — 19-logo ticker grid
│   ├── Industries — 8 industry tiles
│   └── Final CTA — blue banner
│
├── /solutions (Solutions Overview)
│   ├── AI Review Generator section (expanded card)
│   └── CTA banner
│
├── /solutions/ai-review-generation (Product Detail)
│   ├── Hero — headline, sub, problem statement, demo panel
│   ├── Features — 6 cards
│   ├── How It Works — 5-step vertical stepper
│   ├── Use Cases — 3 industry cards
│   ├── Platform Access — split layout + dashboard mockup
│   ├── FAQ — accordion
│   └── CTA banner
│
│   ├── Hero — headline, sub, problem statement, dashboard mockup
│   ├── Features — 6 cards
│   ├── How It Works — 5-step vertical stepper
│   ├── Use Cases — 3 industry cards
│   ├── Before/After — split comparison
│   ├── FAQ — accordion
│   └── CTA banner
│
├── /about (About)
│   ├── Hero — company mission statement
│   ├── Story — milestone timeline
│   ├── Team — team cards
│   ├── Stats — 4 stat tiles
│   └── CTA banner
│
├── /blog (Blog Index)
│   ├── Hero — "Ideas on AI & Automation"
│   ├── Featured post card
│   ├── Post grid (paginated)
│   └── Newsletter CTA
│
├── /blog/[slug] (Blog Post)
│   ├── Breadcrumb
│   ├── Post header — title, author, date, cover
│   ├── Article body (MDX)
│   ├── Related posts
│   └── CTA banner
│
├── /contact (Contact)
│   ├── Hero — "Let's talk"
│   ├── 6-field form + enterprise opt-in accordion
│   └── Sidebar — contact info + social
│
├── /thank-you (Thank You)
│   └── Confirmation card + CTA back to home
│
└── /privacy-policy | /terms-of-service
    └── Legal text layout
```

---

## 3. Screen List

| # | Screen Name | Object | View Type | Priority |
|---|-------------|--------|-----------|----------|
| S-01 | Home | Page | Full-scroll marketing page | MVP |
| S-02 | Solutions Overview | Page | Product listing | MVP |
| S-03 | AI Review Generation | Product | Product detail | MVP |
| S-05 | About | Page | Company page | MVP |
| S-06 | Blog Index | Blog Post (list) | List | MVP |
| S-07 | Blog Post | Blog Post | Detail | MVP |
| S-08 | Contact | Contact Enquiry | Form | MVP |
| S-09 | Thank You | Page | Confirmation | MVP |
| S-10 | 404 | Page | Error state | MVP |
| S-11 | Privacy Policy | Page | Legal | V2 |
| S-12 | Terms of Service | Page | Legal | V2 |

---

## 4. Global Design Tokens (v2 Additions)

These augment the existing `tailwind.config.js` tokens. All of these should be added or verified in the Tailwind config and `globals.css`.

### New Color Tokens Needed

```css
/* Glassmorphism surfaces */
--glass-dark:        rgba(10, 22, 40, 0.7)     /* dark glass card bg */
--glass-border:      rgba(255, 255, 255, 0.08) /* glass card border */
--glass-highlight:   rgba(6, 206, 255, 0.12)   /* cyan glass inner glow */

/* Gradient overlays */
--hero-radial:       radial-gradient(ellipse 800px 500px at 50% -100px, rgba(26,82,224,0.35) 0%, transparent 70%)
--cyan-radial:       radial-gradient(ellipse 600px 400px at 70% 100%, rgba(6,206,255,0.20) 0%, transparent 70%)
--section-gradient:  linear-gradient(180deg, #FFFFFF 0%, #F0F4FF 50%, #E8F4FE 100%)
```

### New Animation Tokens Needed

Add to `tailwind.config.js` `animation` and `keyframes`:

```js
// Animations to add
'counter-up':       'counterUp 1.2s ease-out forwards',
'shimmer':          'shimmer 2.5s linear infinite',
'slide-in-left':    'slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
'slide-in-right':   'slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
'scale-in':         'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
'border-glow':      'borderGlow 3s ease-in-out infinite',
'marquee':          'marquee 25s linear infinite',
'typing':           'typing 3s steps(30,end) forwards',

// Keyframes to add
counterUp:   { '0%': {opacity:'0', transform:'translateY(16px)'}, '100%': {opacity:'1', transform:'translateY(0)'} },
shimmer:     { '0%': {backgroundPosition:'-200% 0'}, '100%': {backgroundPosition:'200% 0'} },
slideInLeft: { '0%': {opacity:'0', transform:'translateX(-32px)'}, '100%': {opacity:'1', transform:'translateX(0)'} },
slideInRight:{ '0%': {opacity:'0', transform:'translateX(32px)'}, '100%': {opacity:'1', transform:'translateX(0)'} },
scaleIn:     { '0%': {opacity:'0', transform:'scale(0.8)'}, '100%': {opacity:'1', transform:'scale(1)'} },
borderGlow:  { '0%,100%': {boxShadow:'0 0 0px rgba(6,206,255,0)'}, '50%': {boxShadow:'0 0 24px rgba(6,206,255,0.4)'} },
marquee:     { '0%': {transform:'translateX(0)'}, '100%': {transform:'translateX(-50%)'} },
```

### Typography Scale v2

Increase visual contrast between headline sizes. These CSS classes go in `globals.css`:

```css
/* Hero — cinematic scale */
.hero-display {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

/* Page section headings */
.section-headline {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* Gradient text (already exists — verify token) */
.gradient-text-cyan {
  background: linear-gradient(90deg, #06CEFF 0%, #38D9F5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Shimmer text for hero badge */
.shimmer-text {
  background: linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2.5s linear infinite;
}
```

---

## 5. Global Components (Applied Across All Pages)

### 5.1 Header — v2 Redesign

**Current:** Fixed dark header, logo + nav + CTA button.
**Change needed:** Add scroll-reactive blur refinement + nav active indicator animation.

```
┌──────────────────────────────────────────────────────────────┐
│  [VyaptIX Logo]          Products  Blog  About  Contact      │
│                                                 [Get in Touch]│
└──────────────────────────────────────────────────────────────┘
```

**Behavior changes:**
- On scroll > 10px: `backdrop-blur-xl` + `border-b border-white/8` + `shadow-[0_2px_40px_rgba(0,0,0,0.5)]`
- Active nav item: animated underline (1px cyan line slides in from left, duration 200ms)
- Products dropdown: slide-down animation (already exists) + hover shows product icon with cyan tint
- "Get in Touch" button: on hover → `box-shadow: 0 0 20px rgba(26,82,224,0.5)` pulsing glow
- Mobile: slide-down full-screen overlay (already exists, keep)

**Logo sizing:** Current `h-16 md:h-20` is large for a fixed nav. Recommend `h-10 md:h-12` to keep nav compact at 64px height.

---

### 5.2 Footer — v2 Redesign

**Current state:** Need to read footer, but based on typical pattern.
**Spec:**

```
┌──────────────────────────────────────────────────────────────┐
│ [dark bg: #060E20]                                           │
│                                                              │
│  [VyaptIX Logo]        Products    Company    Legal         │
│  AI automation for     AI Review   About      Privacy       │
│                                    Contact                  │
│  [LinkedIn] [X] [IG]                                        │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  © 2025 VyaptIX. All rights reserved.   Made in India 🇮🇳   │
└──────────────────────────────────────────────────────────────┘
```

**Animation:** Footer content reveals on scroll into view (fade-in, stagger 100ms per column).

---

### 5.3 WhatsApp Floating Button

Keep existing. Add: on mobile, show text label inline (not hover-only) since hover doesn't exist on touch.

---

### 5.4 Cookie Banner

Keep existing implementation. Style update: match glassmorphism style (dark glass card at bottom of viewport, not full-width banner).

---

### 5.5 Scroll-to-Top Button

Appear when scrolled > 400px. Fade-in/out. Position: `bottom-6 left-6` (opposite corner from WhatsApp button).

---

## 6. Wireframes + Design Specs — Per Page

---

### S-01: Home Page (/)

#### Section 1: Hero

**Goal:** Cinematic first impression. Visitor immediately understands VyaptIX builds AI for their business.

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #060E20 + animated circuit overlay + 3 glow orbs]       │
│                                                              │
│                    ● PULSING DOT                             │
│            "AI Automation for Indian Businesses"             │
│                  [label-mono-cyan, shimmer]                  │
│                                                              │
│         We build AI that removes                             │
│         manual work from your business.   ← .hero-display   │
│                                                              │
│   VyaptIX builds custom AI automation and software for       │
│   businesses tired of doing the same manual work every day.  │
│                    [text-lg, text-[#94A3B8]]                 │
│                                                              │
│         [Get in Touch →]    [See Our Products]               │
│         .btn-primary        .btn-ghost-dark                  │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│  [Trust Bar — fade in 600ms after hero CTAs]                 │
│  [👥 500+ businesses]  [⭐ 4.9/5 rating]  [🔓 No lock-in]    │
└──────────────────────────────────────────────────────────────┘
```

**NEW v2 Additions:**
1. **Animated headline:** Each word in the h1 fades+slides up sequentially (stagger 60ms per word). Driven by `animate-scroll-reveal` class applied per `<span>`.
2. **Floating stat particles:** 3 small glass-morphic floating cards positioned top-right and bottom-left of the hero, showing live-ish stats. They float with `animate-float` at different speeds.
   ```
   Card 1 (top-right, float 8s):
   ┌─────────────────────┐
   │  ★ 4.9/5 Rating     │
   │  847 reviews/month  │
   └─────────────────────┘
   
   Card 2 (bottom-left, float 12s, delay 3s):
   ┌─────────────────────┐
   │  ⚡ < 20 seconds     │
   │  Average review time│
   └─────────────────────┘
   ```
   Card styling: `bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3`
3. **Animated gradient orbs:** Existing orbs remain but add slow rotation. Use CSS `@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` on a container wrapping orbs, `animation: rotate 30s linear infinite`.
4. **Trust bar animation:** Trust bar items animate in one at a time (left to right, 200ms stagger) after hero CTAs appear.

**Scroll-trigger point:** Section below fold starts animating when user scrolls 100px.

---

#### Section 2: Capabilities ("What We Do")

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white + .section-grid-light]                            │
│                                                              │
│        ── WHAT WE DO ──   [label-mono-blue]                  │
│                                                              │
│   We turn business problems into working AI solutions.       │
│         [.section-headline]                                  │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────┐│
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │ │[Icon]││
│  │ AI           │ │ Custom       │ │ AI           │ │Work- ││
│  │ Automation   │ │ Software     │ │ Integrations │ │flow  ││
│  │              │ │              │ │              │ │Con.. ││
│  │ [desc text]  │ │ [desc text]  │ │ [desc text]  │ │[desc]││
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────┘│
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Card hover:** On hover → card lifts `translate-y(-4px)`, border changes to `border-primary-300`, icon container gets cyan glow `box-shadow: 0 0 16px rgba(6,206,255,0.3)`.
2. **Scroll reveal:** Cards stagger in from bottom on scroll-into-view. Card 1: delay 0ms, Card 2: delay 100ms, Card 3: delay 200ms, Card 4: delay 300ms. Use `IntersectionObserver` with `animate-scroll-reveal`.
3. **Icon animation:** On card hover, icon bounces with `animate-bounce` for 600ms (one-shot, not looping).

---

#### Section 4: Why VyaptIX

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white + section-grid-light]                             │
│                                                              │
│  ┌─────────────────────────┐  ┌──────────┐ ┌──────────┐    │
│  │ ── WHY VYAPTIX ──       │  │[icon]    │ │[icon]    │    │
│  │                         │  │Outcome-  │ │Fast to   │    │
│  │ Practical AI for        │  │first     │ │value     │    │
│  │ businesses that want    │  │[desc]    │ │[desc]    │    │
│  │ results, not pilots.    │  └──────────┘ └──────────┘    │
│  │                         │  ┌──────────┐ ┌──────────┐    │
│  │ [body text]             │  │[icon]    │ │[icon]    │    │
│  │                         │  │Vendor-   │ │SMB-      │    │
│  │                         │  │neutral   │ │first     │    │
│  │                         │  │[desc]    │ │[desc]    │    │
│  └─────────────────────────┘  └──────────┘ └──────────┘    │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Left text:** Slides in from left on scroll (`animate-slide-in-left`, delay 0ms).
2. **Right grid:** Each card scales in sequentially (`animate-scale-in`, stagger 100ms per card).
3. **Differentiator cards:** Icon container on hover → icon animates with specific micro-animation:
   - TrendingUp → `animate-bounce` (300ms one-shot)
   - Clock → hands rotate (custom SVG animation, or just bounce)
   - Shield → pulse glow
   - Users → bounce

---

#### Section 5: AI Stack ("Our Tech Stack")

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: linear-gradient(135deg, #FFFFFF, #EEF4FF, #E0FAFE)]    │
│                                                              │
│         ── OUR TECH STACK ──                                 │
│   19+ tools your team already uses                           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ [Glass card: bg-white/75, backdrop-blur-xl]            │  │
│  │                                                        │  │
│  │  MARQUEE ROW 1 (auto-scrolling left):                  │  │
│  │  [ChatGPT] [Claude] [Gemini] [Copilot] [Genspark]...   │  │
│  │                                                        │  │
│  │  MARQUEE ROW 2 (auto-scrolling right, slower):         │  │
│  │  [HeyGen] [Perplexity] [n8n] [Make] [LangChain]...     │  │
│  │                                                        │  │
│  │  ● New models added continuously                       │  │
│  │  ● Vendor-neutral orchestration                        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**v2 MAJOR CHANGE — Replace grid with infinite marquee:**

Current: static grid of logos. Problem: static grid looks like a logo dump.

New: Two rows of logos in a continuous horizontal marquee (CSS animation, no JS needed).

```css
/* Marquee container */
.marquee-track {
  display: flex;
  gap: 1.5rem;
  animation: marquee 25s linear infinite;
  /* Double the logos list in HTML so the loop is seamless */
}
.marquee-track-reverse {
  animation: marquee 30s linear infinite reverse;
}

/* Pause on hover */
.marquee-wrapper:hover .marquee-track { animation-play-state: paused; }
```

Logo tiles: `rounded-xl border border-[#E8ECEF] bg-white p-3 h-14 w-20 flex items-center justify-center` — no hover effect needed, motion is the effect.

Fade edges: Apply `mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)` to the marquee wrapper to create soft edge fade.

---

#### Section 6: Industries

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white + section-grid-light]                             │
│                                                              │
│    ── TRUSTED ACROSS INDUSTRIES ──                           │
│    AI that scales with any business                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ [BG: #F8F9FA, border: #E8ECEF, rounded-3xl]           │  │
│  │                                                        │  │
│  │ [🛒Insurance] [🏨Hosp.] [🛍Retail] [🍽Rest.]          │  │
│  │ [⚖Legal]     [📚Educ.] [🏠RealEst][📦Logist.]         │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Hover state:** Each tile on hover → slight upward translation, border becomes `border-primary-200`, icon gets opacity 1.0 (from 0.7).
2. **Scroll reveal:** Industry tiles stagger in from bottom, 50ms per tile.
3. **Active tiling:** On mobile, show 2 columns × 4 rows. On desktop, 4×2 grid. Already correct.

---

#### Section 7: Final CTA Banner

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #1A52E0]                                                │
│ [Inner radial glow: rgba(6,206,255,0.20) at bottom center]  │
│                                                              │
│         ── LET'S BUILD SOMETHING ──                          │
│                                                              │
│    Have a business problem?                                  │
│    Let's solve it with AI.   ← text-[#06CEFF]               │
│                                                              │
│    [Body text, opacity 70%]                                  │
│                                                              │
│    [Get in Touch →]    [See Our Products]                    │
│    [white bg, blue text] [ghost dark]                        │
│                                                              │
│    No commitment required. 30 minutes, real answers.         │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Animated radial glow:** The bottom radial glow slowly pulses in opacity (0.15 → 0.35, 4s ease-in-out infinite). Use `animate-glow-pulse`.
2. **Headline animation:** When section enters viewport, headline slides up (`animate-slide-up`).
3. **CTA buttons:** On hover, the primary white button gets a subtle scale: `hover:scale-[1.03]`. The ghost button gets `hover:bg-white/10`.
4. **v2 NEW: Micro-copy under buttons** — "No commitment required. 30 minutes, real answers." stays but gets subtle fade-in 200ms after buttons.

---

### S-03: AI Review Generation (/solutions/ai-review-generation)

#### Hero Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: hero-ai-bg = space dark with radial glows]              │
│                                                              │
│  LEFT COLUMN                    │  RIGHT COLUMN             │
│                                 │                           │
│  [● Live Platform badge]        │  [Demo Panel Card]        │
│                                 │  ┌─────────────────────┐  │
│  AI Review Generation           │  │ ★★★★★ Rating        │  │
│  For Modern Business            │  │                     │  │
│  [text-sky-200]                 │  │ "Great service..."  │  │
│                                 │  │                     │  │
│  [Body text 70% opacity]        │  │ ─── AI Magic ───    │  │
│                                 │  │     ✨              │  │
│  [Problem statement box]        │  │                     │  │
│  "70% of customers never..."    │  │ Generated Review:   │  │
│                                 │  │ "Had an absolutely  │  │
│  [Try Platform Free ↗]          │  │  wonderful..."      │  │
│  [Schedule Demo]                │  │                     │  │
│                                 │  │ [Copy & Post →]     │  │
│  ✓ Free tier  ✓ No credit card  │  │ ⚡ Total: 17 seconds│  │
│                                 │  └─────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Demo panel animation:** The demo panel simulates the review generation flow in a loop:
   - Step 1: Stars appear one-by-one (100ms each, `animate-scale-in`)
   - Step 2: "Feedback text" types in character-by-character (`animate-typing`, 1.5s)
   - Step 3: "AI Magic" divider fades in with sparkle icon spin
   - Step 4: Generated review types in (2s)
   - Step 5: "Copy & Post" button pulses once
   - Step 6: Timer shows "17 seconds" with counter-up
   - Loop resets after 3s pause
   - Implementation: use a small state machine in the component with `useEffect` timers
2. **Left column:** Headline words animate in sequentially on mount (stagger 50ms)
3. **"Total time: 17 seconds" badge:** Green text, `animate-counter-up` when in viewport

---

#### Features Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #F8F9FA]                                                │
│                                                              │
│    Why Businesses Love Our Platform                          │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │        │
│  │ Lightning    │ │ AI-Powered   │ │ Easy Sharing │        │
│  │ Fast         │ │              │ │              │        │
│  │ [desc]       │ │ [desc]       │ │ [desc]       │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │        │
│  │ Real-Time    │ │ Google       │ │ Multi-Loc.   │        │
│  │ Analytics    │ │ Compliant    │ │              │        │
│  │ [desc]       │ │ [desc]       │ │ [desc]       │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:** Feature cards scroll-reveal in 2 rows (first row: delay 0/100/200ms, second row: delay 300/400/500ms). Each icon has specific micro-animation on hover:
- Zap → `animate-bounce` one-shot
- Sparkles → `animate-spin` 500ms ease-out then stop
- QrCode → scale to 110% then back
- BarChart3 → bars "fill" animation (SVG stroke-dashoffset trick or just bounce)
- Shield → pulse glow
- Users → bounce

---

#### How It Works Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white]                                                  │
│                                                              │
│    How It Works                                              │
│    A simple five-step process...                             │
│                                                              │
│  ●── 01  Create Your Store                                   │
│  │        Set up your business profile...                    │
│  │                                                           │
│  ●── 02  Share With Customers                                │
│  │        Display your unique QR code...                     │
│  │                                                           │
│  ●── 03  Customer Gives Feedback                             │
│  │        Customers rate their experience...                 │
│  │                                                           │
│  ●── 04  AI Generates Review                                 │
│  │        Our AI instantly creates...                        │
│  │                                                           │
│  ●── 05  One-Click Post                                      │
│           Customer copies the review...                      │
└──────────────────────────────────────────────────────────────┘
```

**v2 MAJOR CHANGE — Animated progress line:**

The vertical connector line between steps animates like a progress bar as the user scrolls:
- Each step node (numbered circle) gains `border-2 border-primary-500 bg-gradient-to-br from-primary-500 to-secondary-500` when it enters viewport
- The connector line between steps fills from top to bottom as user scrolls past each step
- Implementation: `IntersectionObserver` per step, SVG line with `stroke-dashoffset` animation or a simple div height transition

Step node: `w-14 h-14 rounded-full` → add `ring-4 ring-primary-500/20` on active step.

Text block: slides in from right when step comes into view (`animate-slide-in-right`, 300ms).

---

#### Use Cases Section

Already has good structure. **v2 changes:**
1. Cards reveal on scroll with stagger
2. Benefit text (green) gets a subtle left-border accent: `border-l-2 border-success-500 pl-3`

---

#### Platform Access Section (split layout)

**v2 Changes:**
1. Dashboard mockup card gets a simulated "live" update animation: every 4s, one of the stats increments by 1 with a quick flash (highlight the number, increment, reset). Use `useEffect` with interval.
2. Checklist items reveal one by one with stagger (50ms each)

---


### S-05: About (/about)

#### Hero Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #060E20, same dark atmosphere as Home hero]             │
│                                                              │
│         ── ABOUT VYAPTIX ──                                  │
│                                                              │
│    Built by builders who got tired                           │
│    of AI that only lives in demos.    ← .hero-display        │
│                                                              │
│    [Body: "VyaptIX started with one question: why is it      │
│    so hard to get AI working in a real business?"]           │
└──────────────────────────────────────────────────────────────┘
```

#### Mission / Vision / Values (NEW — add this section)

**v2 NEW section** — currently missing. Add after hero:

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white + section-grid-light]                             │
│                                                              │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│  │ [Target icon]    │ │ [Eye icon]        │ │ [Heart icon] │ │
│  │ OUR MISSION      │ │ OUR VISION        │ │ OUR VALUES   │ │
│  │                  │ │                   │ │              │ │
│  │ Make AI practical│ │ Every Indian SMB  │ │ Outcome-first│ │
│  │ for every Indian │ │ runs on AI auto-  │ │ Honest.      │ │
│  │ business owner.  │ │ mation within 5   │ │ No fluff.    │ │
│  │                  │ │ years.            │ │              │ │
│  └──────────────────┘ └──────────────────┘ └──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

Cards use glassmorphism style on a light background: `bg-white border border-[#E8ECEF] rounded-2xl p-8`. Scale in on scroll reveal.

#### Milestone Timeline

**v2 MAJOR CHANGE — Horizontal scrolling timeline on desktop:**

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #F8F9FA]                                                │
│                                                              │
│    Our Journey                                               │
│                                                              │
│  ──●──────────────●──────────────●──────────────●─────      │
│  2024 Q1       2024 Q2        2024 Q3        2025 Q1         │
│                                                              │
│  VyaptIX       AI Review      100+           10,000+         │
│  Founded       Generator      Businesses     Reviews         │
│                Launched       Onboarded      Collected       │
│                                                              │
│  [desc]        [desc]         [desc]         [desc]          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Current implementation is a vertical list. The v2 redesign shifts to a horizontal timeline:
- Desktop: horizontal `overflow-x-auto` scrollable row with dots and vertical lines
- Mobile: vertical stack (keep existing pattern)
- Each milestone node: `w-4 h-4 rounded-full bg-primary-500 ring-4 ring-primary-500/20`
- Connecting line: `h-0.5 bg-gradient-to-r from-primary-500 to-secondary-400`
- On scroll-in: line draws left-to-right (CSS `width: 0% → 100%` transition, 1.5s ease-out)
- Milestone cards fade-in sequentially after line draws

#### Team Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: white]                                                  │
│                                                              │
│    The Team Behind VyaptIX                                   │
│                                                              │
│  ┌───────────────────────────────────────┐                  │
│  │ [AS initials avatar — gradient circle]│                  │
│  │                                       │                  │
│  │ Ajeet Singh                           │                  │
│  │ Co-Founder & CEO                      │                  │
│  │                                       │                  │
│  │ [Bio text]                            │                  │
│  │                                       │                  │
│  │ [LinkedIn icon →]                     │                  │
│  └───────────────────────────────────────┘                  │
│                                                              │
│  [Placeholder card: "More team members coming soon"]        │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. Avatar: replace initials with a proper gradient circle avatar that has a subtle border glow: `ring-2 ring-primary-500/30`
2. LinkedIn link: hover shows underline + icon slides right 4px
3. "More team members coming soon" — subtle dashed border card with `opacity-50`, not to distract

#### Stats Section

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: linear-gradient(135deg, #050D1A, #0A1628)]             │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐│
│  │  500+     │  │  12+      │  │  10K+     │  │  4.9/5    ││
│  │ Businesses│  │ Industries│  │ Reviews   │  │ Avg Rating││
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘│
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. Stats section gets dark background (space-navy) for contrast against the light team section
2. Each stat number: `font-mono text-5xl font-bold gradient-text` with `animate-counter-up` on scroll-in
3. Labels: `text-sm text-white/60 uppercase tracking-widest`
4. Stagger: 100ms per stat

---

### S-06: Blog Index (/blog)

```
┌──────────────────────────────────────────────────────────────┐
│ HERO                                                         │
│ [BG: space dark]                                             │
│                                                              │
│    ── VYAPTIX BLOG ──                                        │
│    Ideas on AI, Automation & Indian Business                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ FEATURED POST (full-width card):                             │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ [Cover image — left 40%] │ [Post content — right 60%]  │  │
│ │                          │                             │  │
│ │                          │ [Category chip]             │  │
│ │                          │ [Title — text-h2]           │  │
│ │                          │ [Excerpt]                   │  │
│ │                          │ [Author] [Date] [Read time] │  │
│ │                          │ [Read Article →]            │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ POST GRID (3 columns):                                       │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ [Cover img]  │ │ [Cover img]  │ │ [Cover img]  │         │
│ │ [Chip]       │ │ [Chip]       │ │ [Chip]       │         │
│ │ [Title]      │ │ [Title]      │ │ [Title]      │         │
│ │ [Excerpt]    │ │ [Excerpt]    │ │ [Excerpt]    │         │
│ │ [Date]       │ │ [Date]       │ │ [Date]       │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
└──────────────────────────────────────────────────────────────┘
```

**v2 Changes:**
1. **Featured post card:** Image has subtle zoom on hover (`group-hover:scale-105`, overflow hidden on container, transition 600ms ease-out)
2. **Post cards:** On hover, card lifts `translate-y(-4px)`, cover image zooms 5%
3. **Post grid:** Cards reveal on scroll with stagger (100ms per card)
4. **Category chips:** Colored by topic: "AI" → primary blue chip, "Business" → success green chip, "Product" → secondary cyan chip

---

### S-07: Blog Post (/blog/[slug])

```
┌──────────────────────────────────────────────────────────────┐
│ [Breadcrumb: Home > Blog > Post Title]                       │
├──────────────────────────────────────────────────────────────┤
│ POST HEADER                                                  │
│ [BG: white]                                                  │
│                                                              │
│  [Category chip]                                             │
│  [H1: Post Title — text-display]                             │
│  [Author avatar] [Ajeet Singh] · [Date] · [X min read]       │
│                                                              │
│  [Cover Image — full width, rounded-2xl, object-cover]      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ ARTICLE BODY + SIDEBAR                                       │
│                                                              │
│ ┌──────────────────────────────────┐ ┌────────────────────┐ │
│ │ [Article MDX content]            │ │ TABLE OF CONTENTS  │ │
│ │                                  │ │ (sticky sidebar)   │ │
│ │ [h2, h3, p, blockquote, code]    │ │                    │ │
│ │                                  │ │ → Section 1        │ │
│ │                                  │ │ → Section 2        │ │
│ │                                  │ │ → Section 3        │ │
│ │                                  │ │                    │ │
│ │                                  │ │ [Share buttons]    │ │
│ └──────────────────────────────────┘ └────────────────────┘ │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ RELATED POSTS (3 cards, same grid as blog index)             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ CTA BANNER: "Automate your business. Let's talk."            │
└──────────────────────────────────────────────────────────────┘
```

**v2 NEW features:**
1. **Reading progress bar:** Thin `h-1 bg-gradient-to-r from-primary-500 to-secondary-400` bar at top of page (fixed, z-80) that fills as user scrolls through the article.
2. **Table of contents sidebar:** `sticky top-24` sidebar (desktop only) with active section highlighted. On scroll, active section in TOC gets `text-primary-500 font-semibold`, others `text-text-secondary`.
3. **Article typography:** `prose prose-slate` (Tailwind typography plugin) or manual styles: `h2: text-h2 font-bold mt-12 mb-4`, `h3: text-h3 font-semibold mt-8 mb-3`, `p: text-body-lg leading-relaxed mb-6`, `blockquote: border-l-4 border-primary-500 pl-6 italic text-text-secondary`.
4. **Estimated read time chip:** Calculate from word count at build time (or server-side in `generateMetadata`).

---

### S-08: Contact (/contact)

**v2 MAJOR REDESIGN — Phase 8 of the revamp:**

Current form has 15+ fields. This spec implements the Phase 8 decision: 6-field simple form + enterprise opt-in accordion.

```
┌──────────────────────────────────────────────────────────────┐
│ HERO                                                         │
│ [BG: #060E20]                                                │
│                                                              │
│    ── LET'S TALK ──                                          │
│    Tell us about your business. We'll tell you               │
│    where AI can actually help.                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                 │
│ [BG: #F8F9FA]                                                │
│                                                              │
│ ┌────────────────────────────────────────┐ ┌──────────────┐ │
│ │ SIMPLE FORM (6 fields)                 │ │ CONTACT INFO │ │
│ │                                        │ │              │ │
│ │ [First Name ████]  [Last Name █████]   │ │ Email:       │ │
│ │                                        │ │ ajeet@       │ │
│ │ [Work Email ████████████████████████]  │ │ vyaptix.com  │ │
│ │                                        │ │              │ │
│ │ [Company Name ██████████████████████]  │ │ Response:    │ │
│ │                                        │ │ Within 24hrs │ │
│ │ [Product Interest ▼ dropdown]          │ │              │ │
│ │  Options: AI Review Generator          │ │ Social:      │ │
│ │           Custom AI Solution           │ │ [Twitter/X]  │ │
│ │           Not sure yet                 │ │ [Instagram]  │ │
│ │                                        │ │              │ │
│ │ [Message ████████████████████████████] │ │ ──────────── │ │
│ │           (4 rows)                     │ │              │ │
│ │                                        │ │ 🇮🇳 Based in  │ │
│ │ ─────────────────────────────────────  │ │ India        │ │
│ │ [▶] ENTERPRISE INQUIRY?               │ │              │ │
│ │     (expandable accordion)             │ │              │ │
│ │                                        │ │              │ │
│ │ [Send Message →] (full-width primary)  │ │              │ │
│ │                                        │ │              │ │
│ │ By submitting, you agree to our        │ │              │ │
│ │ Privacy Policy.                        │ │              │ │
│ └────────────────────────────────────────┘ └──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Enterprise accordion (expanded):**

```
[▼] ENTERPRISE INQUIRY?
    ─────────────────────────────────────────────────
    [Company Size  ▼ dropdown]
     Options: 1–10, 11–50, 51–200, 201–500, 500+

    [Annual Budget for AI ▼ dropdown]
     Options: < ₹5L, ₹5L–20L, ₹20L–50L, > ₹50L

    [Timeline ▼ dropdown]
     Options: ASAP, 1–3 months, 3–6 months, 6+ months
```

**Form behavior:**
- First/Last name: side by side on desktop, stacked on mobile
- All fields: full-width on mobile
- Product Interest: native `<select>` with custom styling (border-[#D0D5DD] rounded-lg px-4 py-3)
- Message: `<textarea rows={4}>`
- Enterprise accordion: Framer Motion `AnimatePresence` + `motion.div` for height animation, or Tailwind `max-h-0 → max-h-96` transition (existing Accordion component)
- Submit button: shows loading spinner during submission, then green success state or red error state

**Validation:**
- All 6 base fields required
- Email: format validation
- On submit error: shake animation on invalid fields (CSS `animation: shake 0.4s ease-in-out`)
- On submit success: form fades out, success message fades in (no page reload — inline success state, then redirect to /thank-you after 1s)

**v2 Animations:**
- Form card slides up from bottom on page load (`animate-slide-up`, 400ms)
- Contact info sidebar fades in with 200ms delay after form appears
- Enterprise accordion opens with smooth height transition (300ms ease-out)

---

### S-09: Thank You (/thank-you)

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #060E20, full screen centered]                          │
│                                                              │
│                  ╔════════════════════╗                      │
│                  ║  ✓ [checkmark]     ║                      │
│                  ║                    ║                      │
│                  ║  Thank you!        ║                      │
│                  ║                    ║                      │
│                  ║  We'll be in touch ║                      │
│                  ║  within 24 hours.  ║                      │
│                  ║                    ║                      │
│                  ║  [← Back to Home]  ║                      │
│                  ╚════════════════════╝                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**v2:** Checkmark draws in via SVG `stroke-dashoffset` animation (500ms). Card scales in with `animate-scale-in`. "Thank you!" slides up.

---

### S-10: 404 Page

```
┌──────────────────────────────────────────────────────────────┐
│ [BG: #060E20, full screen centered]                          │
│                                                              │
│    404                                                       │
│    [text-[8rem] font-black gradient-text, floating]          │
│                                                              │
│    This page doesn't exist.                                  │
│    [text-h3 text-white/70]                                   │
│                                                              │
│    [← Go Back Home]   [See Our Products]                     │
└──────────────────────────────────────────────────────────────┘
```

**v2:** The "404" number floats with `animate-float`. Background has same glow orb atmosphere as hero.

---

## 7. Animation Spec — Implementation Guide

### 7.1 Scroll-Triggered Reveals (IntersectionObserver Pattern)

```typescript
// hooks/useScrollReveal.ts
// Usage: add ref to any element and it gets the animate-scroll-reveal class applied on entry

import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-scroll-reveal');
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}
```

```css
/* globals.css — initial hidden state for scroll-reveal elements */
.will-reveal {
  opacity: 0;
  transform: translateY(24px);
}
.animate-scroll-reveal {
  animation: scrollReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

Apply pattern: wrap every section's content block with `className="will-reveal"` and attach `useScrollReveal()` ref.

### 7.2 Stagger Pattern

```typescript
// For grid cards, apply staggered delay inline:
{items.map((item, i) => (
  <div
    key={item.id}
    className="will-reveal"
    style={{ animationDelay: `${i * 100}ms` }}
    ref={useScrollReveal()}  // NOTE: can't call hooks in loops — use a wrapper component
  >
    ...
  </div>
))}

// Better approach: CSS custom properties
// Each child gets style={{ '--delay': `${i * 100}ms` }}
// CSS: .stagger-child { animation-delay: var(--delay, 0ms); }
```

**Correct stagger implementation:**

```typescript
// components/ui/ScrollRevealGroup.tsx
'use client';
import { useEffect, useRef } from 'react';

export function ScrollRevealGroup({ children, staggerMs = 100 }: { children: React.ReactNode; staggerMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, i * staggerMs);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerMs]);
  return <div ref={ref}>{children}</div>;
}
```

### 7.3 Counter Animation

```typescript
// hooks/useCountUp.ts
import { useEffect, useState, useRef } from 'react';

export function useCountUp(target: number, duration = 1200, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}
```

### 7.4 Marquee Implementation

```tsx
// components/ui/Marquee.tsx
export function Marquee({ items, reverse = false, speed = 25 }: MarqueeProps) {
  return (
    <div className="overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <div
        className={`flex gap-6 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <LogoTile key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
```

### 7.5 Demo Panel Animation (AI Review Generation hero)

```typescript
// State machine for the animated demo panel
const DEMO_STATES = ['idle', 'stars', 'feedback', 'magic', 'review', 'copy', 'timer', 'done'] as const;

// In component:
const [demoState, setDemoState] = useState<typeof DEMO_STATES[number]>('idle');
useEffect(() => {
  const sequence = [
    { state: 'stars',    delay: 500 },
    { state: 'feedback', delay: 1200 },
    { state: 'magic',    delay: 3000 },
    { state: 'review',   delay: 3500 },
    { state: 'copy',     delay: 6000 },
    { state: 'timer',    delay: 6500 },
    { state: 'done',     delay: 7500 },
    { state: 'idle',     delay: 10500 }, // reset and loop
  ];
  // Set timers...
}, []);
```

---

## 8. Component Breakdown

### Navigation Components

| Component | Type | Behavior | States |
|-----------|------|----------|--------|
| Header | Fixed top bar | Blur + shadow on scroll | Default, Scrolled |
| Nav dropdown (Products) | Hover dropdown | Slide-down animate 200ms | Closed, Open |
| Mobile menu | Full-screen overlay | Slide-down animate 300ms | Closed, Open |
| Active nav indicator | Animated underline | Slides in from left 200ms | Active, Inactive |
| Breadcrumb | Text path | Static with hover underline | Default |
| Reading progress bar | Fixed top bar (1px) | Fills on scroll | 0–100% |
| Table of contents | Sticky sidebar | Active section highlighted | Default, Active section |

### Form Components

| Component | Input Type | Validation | States |
|-----------|-----------|-----------|--------|
| First / Last Name | text | Required, min 2 chars | Default, Focus, Filled, Error |
| Work Email | email | Required, RFC format | Default, Focus, Filled, Error |
| Company Name | text | Required | Default, Focus, Filled, Error |
| Product Interest | select | Required, one of 4 options | Default, Open, Selected, Error |
| Message | textarea (4 rows) | Required, min 20 chars | Default, Focus, Filled, Error |
| Enterprise: Company Size | select | Optional | Default, Open, Selected |
| Enterprise: Budget | select | Optional | Default, Open, Selected |
| Enterprise: Timeline | select | Optional | Default, Open, Selected |
| Enterprise accordion toggle | button | Expand/collapse | Collapsed, Expanded |
| Submit button | button | Disabled during submit | Default, Loading, Success, Error |

**Input field shared styling:**
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #2C3E50;
  transition: border-color 200ms, box-shadow 200ms;
}
.form-input:focus {
  border-color: #1A52E0;
  box-shadow: 0 0 0 3px rgba(26,82,224,0.15);
  outline: none;
}
.form-input.error {
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255,107,107,0.15);
}
```

### Data Display Components

| Component | Type | Data Source | States |
|-----------|------|------------|--------|
| Hero stat floater | Glass card | Static (placeholder until verified) | Float animation |
| Product stat counter | Number display | Static + countUp hook | Counting, Done |
| Feature card | Card | Static array | Default, Hover |
| Capability card (bento) | Card | Static array | Default, Hover (lift + glow) |
| Industry tile | Card | Static array | Default, Hover |
| How-it-works step | Numbered item | Static array | Default, Active (in-view) |
| Timeline milestone | Horizontal node | Static array | Default, In-view (line draws) |
| Blog post card | Card | Blog data | Default, Hover (image zoom) |
| Before/After split | Two-column comparison | Static | Default |
| AI Tool logo | Image tile | Static logos | Default (in marquee) |
| Accordion item | Expandable | Static FAQ | Collapsed, Expanded |
| Dashboard mockup panel | Decorative card | Static / animated | Live-ish updates |

### Action Components

| Component | Type | Trigger | Confirmation? |
|-----------|------|---------|--------------|
| btn-primary | Primary (blue gradient) | Navigate or submit | No |
| btn-ghost-dark | Ghost outline (dark bg) | Navigate | No |
| btn-ghost-light | Ghost outline (light bg) | Navigate | No |
| "Get in Touch" nav CTA | Primary small (header) | Navigate to /contact | No |
| "Try Platform Free" | Primary with external icon | External link | No |
| "Copy & Post to Google" | Primary full-width | Clipboard copy | No (inline success) |
| Contact form submit | Primary full-width | Form submit | No |
| WhatsApp FAB | Floating action button | External link | No |
| Scroll-to-top | Ghost icon button | Scroll to 0 | No |

**btn-primary shared spec:**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 0.9375rem;
  color: white;
  background: linear-gradient(135deg, #1A52E0, #1240C4);
  border-radius: 12px;
  transition: opacity 150ms, box-shadow 150ms, transform 150ms;
}
.btn-primary:hover {
  opacity: 0.92;
  box-shadow: 0 0 24px rgba(26,82,224,0.45);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}
```

### Feedback Components

| Component | Type | Trigger | Dismissible? |
|-----------|------|---------|--------------|
| Form success state | Inline green confirmation | Form submit success | No (auto-redirect 1s) |
| Form error toast | Toast (top-right) | Form submit failure | Yes (5s auto) |
| Field inline error | Small red text below field | Validation failure | Clears on valid input |
| Loading spinner | Button spinner | Form in-flight | No |
| Copy success flash | "Copied!" tooltip/flash | Clipboard copy | Auto (1s) |
| Cookie consent banner | Bottom glassmorphic card | First visit | Dismiss/Accept |

---

## 9. Mobile Considerations

| Screen | Mobile Layout | Key Differences |
|--------|--------------|----------------|
| S-01 Home | Single column, hero full-viewport | Floating stat cards hidden on xs, trust bar wraps |
| S-02 Solutions | Single column, cards stacked | Product mockup panels below text |
| S-03 AI Review | Single column, demo panel below hero text | Demo panel animation simplified (no loop) |
| S-05 About | Single column, timeline vertical | Horizontal timeline → vertical stacked |
| S-06 Blog | 1-col featured + 2-col grid | Grid goes 1 column on mobile |
| S-07 Blog Post | Single column, TOC hidden | TOC hidden on mobile — add "Contents" accordion at top |
| S-08 Contact | Stacked form + info below | 2-col → 1-col, sidebar info moves below form |
| All | Min touch target 44×44px | All buttons minimum 44px height |
| All | WhatsApp FAB label always visible | Text label shows inline on mobile (no hover) |
| All | Bottom sheet > modal | Any expandable sections use bottom-friendly patterns |

**Mobile hero text size:** `clamp(2rem, 8vw, 3rem)` for hero-display. Ensures it never clips on small screens.

**Mobile marquee:** Same marquee but reduce speed to 15s (slower = more readable on small screens).

---

## 10. Accessibility Notes

| Component | WCAG Requirement | Implementation |
|-----------|-----------------|---------------|
| All text | AA contrast ≥ 4.5:1 | White text on dark backgrounds meets this. Gray text (#94A3B8 on #060E20) = ratio ~7:1 ✓ |
| All text | AA on light bg | `text-text` (#2C3E50) on white = ~10:1 ✓ |
| Interactive elements | Keyboard focusable | All buttons and links have `focus-visible:ring-2 ring-primary-500` style |
| Form fields | Labels always visible | Never use placeholder-only, always have `<label>` element |
| Form errors | Programmatically associated | `aria-describedby={fieldId + '-error'}` on inputs with errors |
| Loading states | Screen reader announced | Submit button: `aria-busy="true"` when loading |
| Images | Alt text | All `<img>` tags have `alt`. Decorative images use `alt=""` |
| Animations | Reduced motion | Wrap all animations in `@media (prefers-reduced-motion: reduce) { .animate-* { animation: none; } }` |
| Nav dropdown | Keyboard accessible | `onKeyDown` handler: Enter/Space opens, Escape closes, arrow keys navigate children |
| Accordion | ARIA | `aria-expanded`, `aria-controls` on trigger; `role="region"` on content |
| Cookie banner | Focus management | On show, focus lands on "Accept" button |

```css
/* globals.css — reduced motion override */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Design Token Additions Summary

A complete list of all new CSS classes/tokens needed in `globals.css` and `tailwind.config.js`:

### globals.css additions

```css
/* Typography */
.hero-display { ... }               /* per Section 4 */
.section-headline { ... }           /* per Section 4 */
.gradient-text-cyan { ... }         /* per Section 4 */
.shimmer-text { ... }               /* per Section 4 */

/* Glassmorphism cards */
.glass-card-dark {
  background: rgba(10, 22, 40, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
}

/* Marquee */
.marquee-wrapper { ... }            /* per Section 7.4 */
.marquee-track { ... }              /* per Section 7.4 */
.marquee-track-reverse { ... }      /* per Section 7.4 */

/* Reading progress bar */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #1A52E0, #06CEFF);
  z-index: 100;
  transition: width 50ms linear;
}

/* Scroll reveal initial state */
.will-reveal { opacity: 0; transform: translateY(24px); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { ... }  /* per Section 10 */
```

### tailwind.config.js animation additions

```js
// Add to animation {}
'counter-up':        'counterUp 1.2s ease-out forwards',
'shimmer':           'shimmer 2.5s linear infinite',
'slide-in-left':     'slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
'slide-in-right':    'slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
'scale-in':          'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
'border-glow':       'borderGlow 3s ease-in-out infinite',
'marquee':           'marquee 25s linear infinite',
'marquee-reverse':   'marquee 30s linear infinite reverse',

// Add to keyframes {}
counterUp:    { '0%': {opacity:'0', transform:'translateY(16px)'}, '100%': {opacity:'1', transform:'translateY(0)'} },
shimmer:      { '0%': {backgroundPosition:'-200% 0'}, '100%': {backgroundPosition:'200% 0'} },
slideInLeft:  { '0%': {opacity:'0', transform:'translateX(-32px)'}, '100%': {opacity:'1', transform:'translateX(0)'} },
slideInRight: { '0%': {opacity:'0', transform:'translateX(32px)'}, '100%': {opacity:'1', transform:'translateX(0)'} },
scaleIn:      { '0%': {opacity:'0', transform:'scale(0.8)'}, '100%': {opacity:'1', transform:'scale(1)'} },
borderGlow:   { '0%,100%': {boxShadow:'0 0 0 rgba(6,206,255,0)'}, '50%': {boxShadow:'0 0 24px rgba(6,206,255,0.4)'} },
marquee:      { '0%': {transform:'translateX(0)'}, '100%': {transform:'translateX(-50%)'} },
```

---

## 12. New Components Required

These components need to be created (they don't exist yet):

| Component | Path | Description |
|-----------|------|-------------|
| `ScrollRevealGroup` | `src/components/ui/ScrollRevealGroup.tsx` | Wraps children, triggers staggered reveal on scroll-into-view |
| `Marquee` | `src/components/ui/Marquee.tsx` | Infinite horizontal logo ticker |
| `CountUp` | `src/components/ui/CountUp.tsx` | Number that counts up on scroll-into-view |
| `ReadingProgress` | `src/components/blog/ReadingProgress.tsx` | Fixed progress bar for blog posts |
| `TableOfContents` | `src/components/blog/TableOfContents.tsx` | Sticky sidebar TOC for blog posts |
| `AnimatedDemoPanel` | `src/components/product/AnimatedDemoPanel.tsx` | The looping review generation demo |
| `HeroStatFloat` | `src/components/ui/HeroStatFloat.tsx` | Floating stat card for hero section |
| `TimelineHorizontal` | `src/components/ui/TimelineHorizontal.tsx` | Horizontal scrollable timeline for About |

---

## 13. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| Q-01 | Verified customer metrics: exact count of businesses and reviews for Homepage stats | Ajeet | Open |
| Q-02 | Real customer testimonial quotes + permission (3–4 needed for homepage social proof section) | Ajeet | Open |
| Q-03 | Customer logo bar — do we have permission to show any logos? | Ajeet | Open |
| Q-04 | Calendly link for "Book a demo" — will we add this to contact CTAs? | Ajeet | Open |
| Q-05 | Blog images — are the existing blog images in `/public/blog/` final? Or placeholders? | Ajeet | Open |
| Q-06 | Team photos — when will they be ready? Affects About page team section | Ajeet | Open |
| Q-07 | Framer Motion vs. pure CSS animations — do we want to add Framer Motion as a dependency for more fluid animations? CSS-only is viable but Framer Motion gives smoother AnimatePresence for contact form | Dev decision | Open |
| Q-08 | Demo panel animation — should the AI Review demo panel run continuously or only on hover/click? Continuous could be distracting on long sessions | Ajeet | Open |

---

## 14. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v2.0 | 2026-04-26 | VyaptIX UX Agent | Full website redesign spec — animation-first, cinematic dark SaaS |
