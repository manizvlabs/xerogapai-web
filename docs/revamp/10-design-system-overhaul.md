# Phase 10 — Design System Overhaul
## VyaptIX Website — UX/UI Design Specification

**Prepared by:** VyaptIX UX Designer Agent  
**Date:** 2026-04-21  
**Status:** ✅ IMPLEMENTED — core design system live on revamp/website-v2  
**Scope:** Visual identity, design tokens, component style, motion, layout patterns, implementation path

---

## Verdict Upfront

The current VyaptIX website looks like a Tailwind starter template with a blue primary color applied. It communicates nothing unique about intelligence, automation, or pervasiveness. Every design decision below is made to fix that — specifically.

The target aesthetic: **"precision tool for serious operators."** Not playful. Not corporate. Not startup-generic. Think Linear, Vercel, Resend — companies whose websites feel like the product itself: fast, smart, controlled.

---

## 1. Theme Recommendation — Hybrid Dark-First

**Decision: Dark hero + dark feature sections + light utility sections.**

Not full dark. Not full light. Hybrid with a clear rule:

| Section Type | Background | Why |
|---|---|---|
| Hero | Dark (`#080D1A`) | Commands attention, signals premium, makes the gradient accent pop |
| How It Works | Dark (`#0D1426`) | Maintains momentum from hero, keeps the "intelligent" mood |
| Product feature deep-dives | Dark with light card islands | Contrast draws focus to product content |
| Social proof / testimonials | Light (`#F8F9FA`) | Warmth, human credibility — dark testimonials feel cold |
| Blog listing | Light | Scannable, readable, editorial feel |
| Contact / forms | Light | Reduces cognitive load on action pages |
| Footer | Dark (`#080D1A`) | Bookends the experience |

**Emotional tone to communicate:**  
*Confident intelligence.* Not flashy. Not trying hard. The site should feel like it was made by people who know exactly what they're doing — and built it that way on purpose. The SMB owner should feel "these people will handle it." The enterprise evaluator should feel "this is the real thing."

**What this is NOT:**  
- Not moody/dark-for-dark's-sake (avoid full black backgrounds)
- Not clinical/cold corporate (avoid pure white light sections)
- Not playful SaaS (avoid candy gradients, big emojis, rounded-everything)

---

## 2. Visual Language — "Flowing Intelligence"

**The core metaphor: intelligence that moves through things — not intelligence as a static object.**

The name "Vyapti" means pervasiveness — something that flows through, fills spaces, connects everything. That is the visual language. Not circuits. Not robots. Not abstract geometric shapes.

### What to use

**Gradient meshes on dark sections**  
Subtle, slow-moving gradient blobs (pure CSS radial-gradients, no images) on dark backgrounds. Two or three overlapping radial gradients in violet, indigo, and teal — placed off-center, asymmetric. This creates the impression of something living and intelligent behind the interface without any literal AI imagery.

Implementation: pure CSS `background: radial-gradient(...)` on section wrappers. Zero performance cost.

```css
background:
  radial-gradient(ellipse 800px 600px at 20% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 70%),
  radial-gradient(ellipse 600px 400px at 80% 20%, rgba(20, 184, 166, 0.08) 0%, transparent 70%),
  #080D1A;
```

**Thin grid overlay (optional, subtle)**  
A 1px dot grid or line grid at 2–3% opacity on hero sections only. Communicates precision and structure without being a circuit board. Implemented as an SVG background-image data URI. Used sparingly — hero only.

**Gradient-bordered cards**  
Cards on dark backgrounds with a 1px border using a CSS gradient (`border-image` or pseudo-element trick). The border gradient shifts from violet to teal. This single detail separates premium from generic instantly.

**Glowing accent elements**  
Key numbers, key icons, key CTAs get a subtle `box-shadow` glow in the accent color. Not overdone — only on the single most important element per section.

**No stock imagery anywhere on the site.**  
No laptop mockups. No diverse-team-in-office photos. No AI brain illustrations. Product screenshots/UI mockups only — showing real product UI is more credible than any illustration.

---

## 3. Color Palette — Full Recommendation

### Decision: Pivot from generic blue. Move to Indigo-Violet primary.

**Why:** `#0066CC` is the default blue of every B2B SaaS made since 2015. Indigo-violet (`#6366F1` / Tailwind Indigo-500) is now the signal color for serious AI/developer-tool companies (Linear, Vercel, Supabase, Resend). It reads as "intelligent and precise" rather than "corporate and trustworthy." For VyaptIX's audience — founders and operators who evaluate tools — this is the right signal.

### New Token System

```js
// tailwind.config.js — replace existing color section with this

colors: {
  // Base surfaces
  surface: {
    900: '#080D1A',   // deepest dark — hero, footer
    800: '#0D1426',   // dark sections — features, how-it-works
    700: '#111827',   // dark cards, elevated surfaces on dark bg
    100: '#F8F9FA',   // light sections — blog, contact, testimonials
    50:  '#FFFFFF',   // pure white — form cards, modal backgrounds
  },

  // Primary — Indigo (replaces current blue)
  primary: {
    900: '#1E1B4B',
    800: '#312E81',
    700: '#3730A3',
    600: '#4338CA',
    500: '#6366F1',   // ← PRIMARY CTA COLOR
    400: '#818CF8',
    300: '#A5B4FC',
    200: '#C7D2FE',
    100: '#E0E7FF',
    50:  '#EEF2FF',
  },

  // Secondary — Teal (kept, refined)
  secondary: {
    700: '#0F766E',
    600: '#0D9488',
    500: '#14B8A6',   // ← SECONDARY ACCENT
    400: '#2DD4BF',
    300: '#5EEAD4',
    200: '#99F6E4',
    100: '#CCFBF1',
  },

  // Amber — "intelligence warmth" (new addition)
  // Used for key metric highlights, star ratings, achievement signals
  amber: {
    500: '#F59E0B',
    400: '#FBBF24',
    300: '#FCD34D',
  },

  // Neutrals — replaces current text/border tokens
  neutral: {
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
    600: '#475569',
    500: '#64748B',
    400: '#94A3B8',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50:  '#F8FAFC',
  },

  // Semantic (keep existing pattern)
  success: { 500: '#10B981', 100: '#D1FAE5' },
  error:   { 500: '#EF4444', 100: '#FEE2E2' },
  warning: { 500: '#F59E0B', 100: '#FEF3C7' },
}
```

### Color Usage Rules

| Token | Use |
|---|---|
| `surface-900` | Hero, footer, CTA section backgrounds |
| `surface-800` | Feature section, how-it-works backgrounds |
| `surface-100` | Testimonials, blog, contact backgrounds |
| `primary-500` (#6366F1) | Primary CTA buttons, active nav indicator, key links |
| `primary-400` (#818CF8) | Hover state for primary CTA, icon accent on dark bg |
| `primary-300` (#A5B4FC) | Body text accent on dark backgrounds |
| `secondary-500` (#14B8A6) | Success states, checkmarks, "live" indicators, AI Review Generator accent |
| `amber-400` (#FBBF24) | Star ratings, metric highlights ("< 20 seconds"), key numbers |
| `neutral-400` (#94A3B8) | Body text on dark backgrounds |
| `neutral-700` (#334155) | Body text on light backgrounds |

### Background Gradient Recipe (hero sections)

```
surface-900 base +
radial-gradient violet blob (primary-500 at 10% opacity, top-left)  
radial-gradient teal blob (secondary-500 at 6% opacity, bottom-right)
```

This is the only "designed" background on the site. Everything else is flat surface colors.

---

## 4. Typography — Replace Display Font, Keep Inter Body

**Decision: Add Sora as display font. Keep Inter for body and UI.**

### Why Sora?

Sora is a geometric sans-serif with slightly rounded terminals and wide tracking at large sizes. It reads as modern-intelligent without feeling cold or techno-dystopian. It is free on Google Fonts, zero licensing risk, fast to load. Competitors like Linear use custom fonts — Sora achieves a similar premium feel without a custom type budget.

Inter stays for body because it is the best-in-class UI font for readability across devices at 14–18px. No reason to change it.

### Font Load (add to `index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Tailwind Font Config

```js
fontFamily: {
  display: ['Sora', 'sans-serif'],   // headlines, hero text, section titles
  sans:    ['Inter', 'sans-serif'],  // all body text, UI labels, nav
  mono:    ['IBM Plex Mono', 'monospace'], // code snippets (keep existing)
},
```

### Type Scale

| Token | Font | Size | Weight | Use |
|---|---|---|---|---|
| `text-display` | Sora | 3.5–4.5rem | 800 | Hero headline only |
| `text-h1` | Sora | 2.5–3rem | 700 | Page titles |
| `text-h2` | Sora | 2rem | 700 | Section headings |
| `text-h3` | Sora | 1.375rem | 600 | Card titles, sub-sections |
| `text-h4` | Inter | 1.125rem | 600 | Labels, captions, stat titles |
| `text-body-lg` | Inter | 1rem | 400 | Primary body copy |
| `text-body` | Inter | 0.875rem | 400 | Secondary body, descriptions |
| `text-body-sm` | Inter | 0.75rem | 400 | Footnotes, meta text |

**One rule:** Sora only for headings and display text. Never use Sora for body paragraphs or UI labels. The contrast between Sora's geometric character and Inter's neutral utility is what creates the premium feel.

---

## 5. Component Design Style

**Decision: Flat with controlled glassmorphism — only on dark backgrounds, only for cards.**

Full glassmorphism (heavy blur + transparency everywhere) is overdone and performs poorly. The approach here is surgical: glass treatment only for product feature cards and stat cards on dark sections. Everything else stays flat.

### Cards (on dark backgrounds)

```
Background:     rgba(255, 255, 255, 0.04)
Border:         1px solid rgba(255, 255, 255, 0.10)
Border-radius:  12px
Box-shadow:     0 0 0 1px rgba(99, 102, 241, 0.15)  ← subtle violet glow ring
Padding:        24px
```

On hover: border lifts to `rgba(99, 102, 241, 0.40)`. No blur. No backdrop-filter (performance).

### Cards (on light backgrounds)

```
Background:     #FFFFFF
Border:         1px solid #E2E8F0
Border-radius:  12px
Box-shadow:     0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)
Padding:        24px
```

On hover: `box-shadow` lifts to `0 8px 24px rgba(0,0,0,0.10)`. Translates up `translateY(-2px)`.

### Buttons

**Primary CTA (dark backgrounds):**
```
Background:     linear-gradient(135deg, #6366F1, #4F46E5)
Text:           #FFFFFF, font-weight: 600, font-size: 0.9375rem
Border-radius:  8px
Padding:        12px 24px
Box-shadow:     0 0 20px rgba(99, 102, 241, 0.35)  ← glow
Hover:          background shifts brighter, glow intensifies to 0.50 opacity
Active:         scale(0.98) transform
```

**Primary CTA (light backgrounds):**
```
Background:     #6366F1
Text:           #FFFFFF
No glow — just flat fill with subtle shadow
Hover:          #4F46E5
```

**Secondary CTA (ghost):**
```
Background:     transparent
Border:         1px solid rgba(255,255,255,0.20) on dark / #CBD5E1 on light
Text:           #A5B4FC on dark / #475569 on light
Hover:          Border brightens, background becomes rgba(255,255,255,0.05)
```

**No rounded-full pill buttons.** Border-radius stays at 8px. Pill buttons read as casual/consumer. 8px reads as precise/professional.

### Navigation

```
Background:     rgba(8, 13, 26, 0.85) + backdrop-blur-sm (12px)
Border-bottom:  1px solid rgba(255, 255, 255, 0.08)
Position:       sticky top-0, z-50
Logo:           Left-aligned
Nav links:      Center or right — Inter 500, 0.875rem, neutral-400 default, white on hover
Active link:    primary-400 color + 2px underline offset
CTA button:     "Book Demo" — primary button style, right-aligned
```

On scroll past 50px: `backdrop-blur` activates. Before scroll: transparent background.

### Hero Section Layout

```
Max-width:      1200px container
Layout:         60/40 split — text left, product visual right (desktop)
                Stacked on mobile — text first, visual second
Headline:       Sora 800, display size, white
Subheadline:    Inter 400, body-lg, neutral-400
CTA row:        Primary button + ghost button, gap-4
Trust line:     Small text below CTAs — "500+ businesses · No credit card · 20-second setup"
Right panel:    Product UI mockup card (dark card, product screenshot or inline UI mockup)
```

### Stat/Metric Cards

```
Number:         Sora 700, 2.5rem, white (on dark) or primary-700 (on light)
Label:          Inter 400, 0.8125rem, neutral-400
Accent:         amber-400 for time-based metrics ("< 20s"), primary-400 for count metrics
Layout:         2-column or 4-column grid, centered alignment
```

---

## 6. Motion & Micro-Interaction Recommendations

**Rule: Motion must earn its place. Every animation must make the UI clearer, not busier.**

### Animations to add (all CSS only — no Framer Motion, no GSAP)

**1. Scroll reveal on sections**  
Elements fade up 20px as they enter the viewport. Implemented with `IntersectionObserver` + a CSS class toggle. Zero library needed.

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Apply to: section headings, stat cards, feature cards, team cards. **Not** the hero (above fold should render immediately).

**2. Number counter on stats**  
When the stats bar enters the viewport, numbers count up from 0 to their final value over 1.2 seconds. Implemented with a simple `IntersectionObserver` + `requestAnimationFrame` counter. No library.

Apply to: homepage stats bar, About page milestones.

**3. Hero gradient pulse (CSS only)**  
The radial gradient blobs on the hero background slowly shift position using `@keyframes`. Cycle: 12 seconds, ease-in-out, infinite. Movement is subtle — 5% position shift only. Creates a "breathing" intelligent background.

```css
@keyframes gradientShift {
  0%, 100% { background-position: 20% 50%, 80% 20%; }
  50%       { background-position: 25% 45%, 75% 25%; }
}
```

**4. Card hover lift**  
Cards translate up 2px and shadow deepens on hover. CSS transition 0.2s. Already covered in card spec above.

**5. Button active press**  
`transform: scale(0.98)` on `:active`. 0.1s transition. Makes buttons feel physical.

**6. Nav link underline slide**  
Active/hover underline animates from `width: 0` to `width: 100%` in 0.2s. Left-to-right slide.

**7. CTA button glow pulse (hero only)**  
The primary hero CTA button has a subtle pulsing glow — `box-shadow` oscillates between two opacity values. 2-second cycle. Apply only to the single primary hero CTA — nowhere else.

### What NOT to animate
- Page transitions (full-page slide/fade animations hurt Core Web Vitals and feel slow)
- Text typing effects (overused, looks dated)
- Loading spinners on every interaction
- Parallax scrolling (kills performance on mobile)

---

## 7. Section Layout Patterns

### Homepage section-by-section

| Section | Background | Layout pattern | Notes |
|---|---|---|---|
| Nav | Dark + blur | Fixed top | Transparent → blurred on scroll |
| Hero | `surface-900` + gradient blobs | 60/40 split | Sora display headline, product mockup right |
| Stats bar | `surface-800` | 4-col grid, centered | Number counters, amber accents |
| How It Works | `surface-900` | Numbered steps, horizontal timeline desktop / stacked mobile | Connecting line between steps |
| Products | `surface-800` | Side-by-side cards with gradient borders | Each product gets its own accent color |
| Social proof | `surface-100` (LIGHT) | 3-col testimonial cards | First light section — creates breathing room |
| "Why VyaptIX" | `surface-900` | 3-col icon grid | Return to dark, sharp contrast after testimonials |
| Final CTA | `surface-900` + prominent gradient blob | Centered, single headline, two CTAs | Most intense gradient treatment here — visual climax |
| Footer | `surface-900` | 4-col links + logo | Subtle dividers, no visual noise |

**The rhythm:** dark → dark → dark → LIGHT → dark → dark → dark. The single light break (social proof) is intentional. It signals "independent validation" — a psychological shift from VyaptIX speaking to customers speaking.

### Solutions page

| Section | Background |
|---|---|
| Hero | Dark |
| Product cards side-by-side | Dark with glass cards |
| "Pick the right product" comparison | Light — makes the comparison scannable |
| Individual product deep-dives | Alternating dark/light |
| CTA | Dark |


```
Hero: dark + product gradient (each product owns one gradient color pair)
  - AI Review Generator: primary-500 (indigo) + secondary-500 (teal)
Steps section: dark
Feature list: light
Pricing/CTA: dark
```

---

## 8. Reference Brands

These are real, live websites. Each one is chosen for a specific thing to borrow — not to copy wholesale.

### 1. Linear (linear.app)
**Borrow:** The dark base, the typography density, the section rhythm. Linear proves you can have a dark website that feels clean rather than heavy. Their hero copy is short, precise, and confident — no marketing fluff. Their product screenshots are the hero visual, not illustrations.  
**Apply to VyaptIX:** Hero structure, nav style, headline brevity, product mockup treatment.

### 2. Vercel (vercel.com)
**Borrow:** The gradient mesh backgrounds on dark sections — Vercel uses exactly the "gradient blobs on dark" technique described above. Also: their stats sections with large numbers. Also: their use of white text hierarchy (headline → subtext → micro-copy) on dark backgrounds.  
**Apply to VyaptIX:** Background gradient implementation, stats bar design, dark section text hierarchy.

### 3. Resend (resend.com)
**Borrow:** Their restraint. Resend's website has almost no decoration — just typography, spacing, and one strong accent color. It communicates "we are serious engineers." Their card style (minimal border, clean background) is exactly the card treatment described for VyaptIX light sections.  
**Apply to VyaptIX:** Card minimalism, the idea that whitespace IS the design, button style.

### 4. Clerk (clerk.com)
**Borrow:** Their trust signal design. Clerk has enterprise buyers and developer buyers simultaneously — exactly VyaptIX's dual audience (SMB owners + enterprise evaluators). Notice how they handle social proof: logos + specific quotes + specific metrics. Also borrow their nav: clean, sticky, glass blur.  
**Apply to VyaptIX:** Social proof section layout, trust signal placement, dual-audience nav CTA strategy.

### 5. Perplexity (perplexity.ai)
**Borrow:** How they communicate AI without using AI clichés. No robots. No brains. No circuit boards. The product IS the visual. Their dark palette uses a warm dark (slightly brown-tinted dark) rather than cold blue-black — creates approachability without sacrificing premium.  
**Apply to VyaptIX:** Avoiding AI visual clichés, the "product UI is the hero visual" approach.

---

## 9. What to Avoid

These are specific choices that will actively make VyaptIX look generic or dated.

| Avoid | Why |
|---|---|
| `#0066CC` as primary CTA color | It is the default Tailwind blue. Every non-designer's first choice. Signals zero design investment. |
| Gradient hero with blue-to-purple sweep | Overdone 2021–2023 SaaS pattern. Looks like Canva template. |
| Stock AI imagery (neural networks, brain scans, humanoid robots) | Signals that the company has nothing real to show. Damages credibility. |
| Poppins or DM Sans as headline font | Both are over-saturated in the Indian SaaS market. Signals "built by a freelancer from a template." |
| Rounded-full pill buttons everywhere | Reads as consumer/B2C. VyaptIX is B2B. 8px border-radius is correct. |
| Heavy glassmorphism (backdrop-blur on everything) | Performance killer on mobile. Also peaked in 2022. Use surgically. |
| Full dark website with no light sections | Dark-only sites feel heavy and inaccessible. The hybrid approach is correct. |
| Animated gradient text (rainbow shimmer on headlines) | Cheap visual trick. Undermines the "precision tool" positioning. |
| 30+ icon grid "features" section | The "here are our 12 features with icons" section layout is a trust-destroyer. Shows no design thinking. Use 3–4 features max, with depth. |
| Typing/typewriter text animations in hero | Peaked 2019. Also reduces perceived performance as users wait for text to appear. |
| Sidebar navigation on the marketing site | Sidebars are for dashboards (product). Marketing sites use top nav. |
| Confetti or celebration animations | VyaptIX's audience is business operators. They want results, not delightful moments. |

---

## 10. Implementation Path — superdesign.dev + 21st.dev

### Step 1: superdesign.dev — Generate and Export Design Tokens (Day 1)

superdesign.dev is a token-generation tool. Use it to generate a complete, consistent design token set before writing a single line of implementation code.

**What to do:**

1. Go to superdesign.dev and create a new project: "VyaptIX Website"
2. In the color section, input the primary color as `#6366F1` (Indigo-500). Let the tool generate the full 50–900 scale. Compare against the manually defined palette above — adjust if the generated mid-tones differ significantly.
3. Input secondary color as `#14B8A6` (Teal-500). Same process.
4. Add neutral scale starting from `#0F172A` (dark) to `#F8FAFC` (near-white).
5. Export the token set as CSS custom properties.
6. Map the exported tokens to `tailwind.config.js` — replace the existing `colors` section entirely with the new token set.
7. Set typography: Primary font = "Sora", UI font = "Inter". superdesign.dev will generate the type scale — compare against the scale defined in Section 4 above.
8. Export the final `tailwind.config.js` update. This is the single source of truth for all implementation.

**Time estimate:** 2–3 hours for token generation + tailwind integration.

### Step 2: 21st.dev — Source Components by Category (Days 2–5)

21st.dev is a component marketplace for Tailwind-compatible components. The strategy is: source the hardest components (navigation, hero sections, cards with gradient borders, stat counters) rather than building from scratch, then adapt them to the VyaptIX token system.

Search and implement in this exact order — hardest-to-get-right first:

**Priority 1 — Navigation (Day 2)**  
Search: "sticky nav blur" or "glass navbar tailwind"  
What to look for: sticky, blur-on-scroll, dark background, right-aligned CTA button  
Adapt: replace their color tokens with VyaptIX `primary-500`, `surface-900`, `neutral-400`  

**Priority 2 — Hero section (Day 2)**  
Search: "dark hero split layout" or "SaaS hero tailwind"  
What to look for: 60/40 text-left / visual-right layout, large headline, two CTA buttons  
Adapt: Replace font with Sora display, replace gradient with VyaptIX gradient recipe from Section 2  

**Priority 3 — Gradient border cards (Day 3)**  
Search: "gradient border card tailwind" or "glowing card dark"  
What to look for: pseudo-element border gradient technique (not `border-image`, use `::before` with `background: linear-gradient`)  
Adapt: Change gradient colors to `primary-500 → secondary-500`  

**Priority 4 — Stat/counter section (Day 3)**  
Search: "animated counter tailwind" or "stats section dark"  
What to look for: IntersectionObserver-based number counter, large number + label layout  
Adapt: Apply `amber-400` to the metric numbers, Sora font for the numbers  

**Priority 5 — Feature cards grid (Day 4)**  
Search: "feature grid dark tailwind" or "icon feature cards"  
What to look for: 3-column grid, icon + heading + description, dark background  
Adapt: Replace icons with consistent icon set (Lucide — already likely installed)  

**Priority 6 — Testimonial cards (Day 4)**  
Search: "testimonial cards light tailwind"  
What to look for: quote + author + company, light background, clean minimal  
Adapt: Use on `surface-100` background sections  

**Priority 7 — CTA section (Day 5)**  
Search: "CTA section dark gradient tailwind"  
What to look for: Centered headline + two buttons, gradient background or spotlight effect  
Adapt: Use the gradient blob recipe on `surface-900`  

**Priority 8 — Footer (Day 5)**  
Search: "footer dark 4-column tailwind"  
What to look for: Logo + 4 link columns + bottom legal row  
Adapt: Match surface-900 background, neutral-400 link colors  

### Step 3: Assemble and QA (Day 6)

1. Run `npm run build` — verify no TypeScript errors introduced during token rename
3. Run Lighthouse — target: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 95
4. Check dark sections on mobile (Safari iOS + Chrome Android) — gradient blobs occasionally render badly on older devices; if so, reduce opacity
5. Verify Sora font load — confirm no FOUT (flash of unstyled text) on hero headline; add `font-display: swap` and preload link
6. Test all animations: scroll reveal, number counter, hero gradient pulse — confirm all work on reduced-motion preference (`@media (prefers-reduced-motion: reduce)` — disable all animations)

---

## Deliverable Summary

| Item | Decision |
|---|---|
| Theme | Hybrid dark-first: dark hero/features, light social proof/utility |
| Visual language | Flowing gradient meshes on dark, no AI imagery, product UI as the hero visual |
| Primary color | `#6366F1` (Indigo-500) — replaces current `#0066CC` |
| Secondary color | `#14B8A6` (Teal-500) — refined from current teal |
| Accent | `#FBBF24` (Amber-400) — for metrics, stars, achievement signals |
| Display font | Sora (700/800 weight) — headlines only |
| Body font | Inter (keep) — all UI and body text |
| Card style | Glass on dark (4% opacity bg + gradient border) / Flat white on light |
| Button style | Gradient fill with glow on dark / Flat fill on light / 8px radius |
| Motion | CSS only: scroll reveal, number counter, hero gradient pulse, hover lifts |
| Reference brands | Linear, Vercel, Resend, Clerk, Perplexity |
| Tools | superdesign.dev → tokens → tailwind.config.js / 21st.dev → 8 component categories |
| Effort estimate | 6 developer days for full Phase 10 implementation |

---

## Files to Change in Implementation

| File | Change |
|---|---|
| `tailwind.config.js` | Replace entire `colors` section, add `display` font family |
| `index.html` | Add Sora + Inter Google Fonts preconnect + link |
| `src/index.css` | Add reveal animation CSS, gradient pulse keyframes, reduced-motion media query |
| `src/components/layout/Header.tsx` | Glass nav implementation |
| `src/components/layout/Footer.tsx` | Dark footer redesign |
| `src/views/Home.tsx` | Full redesign per section layout plan |
| `src/views/Solutions.tsx` | Updated card styles, dark sections |
| `src/pages/AIReviewGeneration.tsx` | Indigo + teal gradient treatment |
| `src/views/About.tsx` | Updated stat counters, team cards |
| All page components | Swap color classes from `primary-500` (old blue) → `primary-500` (new indigo) — tokens align so only `tailwind.config.js` change propagates |
