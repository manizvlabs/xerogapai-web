# Component Library

All shared components live in `src/components/`. Components are named exports.

---

## Layout Components (`src/components/layout/`)

### `Header`
**File:** `src/components/layout/Header.tsx`

Fixed header with:
- Logo linking to `/`
- Desktop nav with dropdown for Solutions
- Mobile hamburger menu (full-width overlay)
- Scroll-aware backdrop blur and shadow
- Active route highlighting via `useLocation()`

**State:**
- `isScrolled` — adds shadow + stronger blur at scroll Y > 10px
- `isMobileMenuOpen` — toggles mobile nav
- `openDropdown` — tracks which dropdown is open (mouse hover on desktop)

**Nav Items (current):** See `routing-and-navigation.md` for issues.

---

### `Footer`
**File:** `src/components/layout/Footer.tsx`

Dark background footer with:
- Logo + tagline + social icons (Instagram, Facebook, LinkedIn, Twitter)
- Company links column
- Solutions links column
- Copyright + Privacy Policy + Terms of Service links

**Note:** Privacy Policy and Terms of Service currently link to `#` (no pages built).

---

### `Layout`
**File:** `src/components/layout/Layout.tsx`

Wraps all pages. Provides:
- `min-h-screen flex flex-col` layout
- `<Header />` at top
- `<main>` content area (flex-grow)
- `<Footer />` at bottom

---

### `Section`
**File:** `src/components/layout/Section.tsx`

Reusable section wrapper with background and padding variants.

Props:
```typescript
background?: 'default' | 'alt' | 'gradient' | 'dark'
padding?: 'sm' | 'md' | 'lg'
className?: string
children: ReactNode
```

---

## UI Components (`src/components/ui/`)

### `Button`
Props:
```typescript
variant: 'primary' | 'secondary' | 'outline' | 'ghost'
size: 'sm' | 'md' | 'lg'
fullWidth?: boolean
onClick?: () => void
disabled?: boolean
type?: 'button' | 'submit' | 'reset'
children: ReactNode
```

### `Card`
Props:
```typescript
padding?: 'sm' | 'md' | 'lg'
hover?: boolean       // adds hover shadow transition
shadow?: boolean
className?: string
children: ReactNode
```

### `Accordion`
Used for FAQ sections. Props:
```typescript
items: Array<{ question: string; answer: string }>
```

### `Badge`
Small inline label. Props:
```typescript
variant?: 'default' | 'success' | 'warning' | 'info'
children: ReactNode
```

### `Breadcrumb`
Navigation trail. Props:
```typescript
items: Array<{ label: string; href?: string }>
// Last item without href = current page (not linked)
```

### `ScrollToTop`
No props — automatically scrolls window to top on route change.
Placed once in `App.tsx` inside `<BrowserRouter>`.

---

## Custom SVG Icons (in Header.tsx)

Two inline SVG icon components used in nav dropdown:
- `SolutionIconSun` — sun/brightness icon

These are defined inline in `Header.tsx`. If reuse is needed, extract to `src/components/ui/icons/`.

---

## Lucide React Icons

Used throughout pages. Common icons in use:
- `Star` — reviews, ratings
- `Zap` — speed, automation
- `BarChart3` — analytics
- `QrCode` — QR feature
- `ArrowRight` — CTA arrows
- `ExternalLink` — external links
- `Sparkles` — AI-generated content
- `Menu`, `X` — mobile nav toggle
- `ChevronDown` — dropdown indicator
- `Facebook`, `Instagram`, `Linkedin`, `Twitter` — social icons

---

## Missing Components (Needed for Revamp)

See `revamp/REVAMP-MASTER-PLAN.md` for specs. Components to be created:

1. **`VideoModal`** — Lightbox for product demo video
2. **`TestimonialCard`** — Customer quote with photo, name, company
3. **`MetricCard`** — Large stat number + label (for social proof)
4. **`CookieBanner`** — GDPR/cookie consent
5. **`DemoBookingCTA`** — Inline Calendly embed or link component
6. **`ProductCard`** — Product overview card for Solutions page (2-product layout)
