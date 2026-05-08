# Design System

All design tokens are defined in `tailwind.config.js` and consumed via Tailwind utility classes.

---

## Color Palette

### Primary (Blue)
| Token | Hex | Use |
|---|---|---|
| `primary-50` | #E6F0FA | Backgrounds, highlights |
| `primary-100` | #CCE0F5 | Light backgrounds |
| `primary-500` | #0066CC | **Main brand blue — CTAs, links, active states** |
| `primary-600` | #0052A3 | Hover states |
| `primary-700` | #003D7A | Dark mode accents |
| `primary-900` | #001429 | Hero backgrounds |

### Secondary (Cyan/Teal)
| Token | Hex | Use |
|---|---|---|
| `secondary-400` | #33BFD6 | Footer hover, accents |
| `secondary-500` | #00A8CC | **Gradient pair with primary** |
| `secondary-900` | #002E2E | Dark backgrounds |

### Semantic Colors
| Token | Hex | Use |
|---|---|---|
| `success-500` | #00B894 | Positive states, "Available Now" badges |
| `warning-500` | #FFB92C | Star ratings, attention |
| `error-500` | #FF6B6B | Form errors |
| `info-500` | #0099E0 | Informational states |

### Neutrals
| Token | Hex | Use |
|---|---|---|
| `text` (default) | #2C3E50 | Body text |
| `text-secondary` | #6C757D | Secondary labels |
| `text-tertiary` | #99A3AF | Muted text, footer links |
| `background` | #F8F9FA | Default page background |
| `background-alt` | #F0F2F5 | Alternating section backgrounds |
| `border-light` | — | Subtle dividers |

---

## Typography

Fonts loaded via Google Fonts (in `index.html`):
- **Inter** — primary UI font (sans-serif)
- **IBM Plex Mono** — code/monospace

### Type Scale
| Class | Size | Weight | Use |
|---|---|---|---|
| `.text-display` | 3.5rem | Bold | Hero headline |
| `h1` | 2.5rem | Bold | Page titles |
| `h2` | 2rem | Bold | Section headers |
| `h3` | 1.5rem | Semibold | Card titles |
| `h4` | 1.125rem | Semibold | Sub-section headers |
| Body-lg | 1rem | Regular | Lead paragraphs |
| Body | 0.875rem | Regular | Default text |
| Body-sm | 0.75rem | Regular | Captions, labels |

---

## Gradients

| Class | Definition | Use |
|---|---|---|
| `.gradient-primary` | `135deg, #0066CC → #00A8CC` | CTA buttons, step circles |
| `.gradient-hero` | Dark navy gradient | CTA section backgrounds |
| `.hero-ai-bg` | Dark gradient + SVG mask | Page hero sections |
| `.gradient-text` | Blue-to-cyan text fill | Accent text in headlines |

---

## Spacing & Borders

| Token | Value |
|---|---|
| `rounded-sm` | 6px |
| `rounded-md` | 8px |
| `rounded-lg` | 12px |
| `rounded-xl` | 16px |
| `shadow-subtle` | Defined in config |
| `shadow-medium` | Defined in config |
| `shadow-large` | Defined in config |

---

## Animations (CSS Keyframes)

| Class | Duration | Behavior |
|---|---|---|
| `animate-fade-in` | 0.5s | Opacity 0 → 1 |
| `animate-slide-up` | 0.5s | Translate Y + fade in |
| `animate-slide-down` | 0.3s | Dropdown entrance |
| `animate-float` | 6s infinite | Gentle vertical float |
| `animate-pulse` | 2s infinite | Badge pulsing dot |

---

## Layout Utilities

| Class | Definition |
|---|---|
| `.container-main` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

---

## Component Variants

### `<Button>` variants
- `primary` — gradient background, white text
- `secondary` — outlined, primary text
- `outline` — border only
- `ghost` — transparent, hover background

### `<Section>` backgrounds
- `default` — white
- `alt` — `background-alt`
- `gradient` — gradient-hero dark
- `dark` — dark navy

---

## Known Design Issues

1. **Logo PNG at 759KB** — `public/final_logo_-_light.png` hurts Core Web Vitals. Should be SVG or WebP < 20KB.
2. **No dark mode** — Design system is light-only. No `dark:` variant classes used.
3. **No skeleton loaders** — Blog and contact pages show blank during load.
4. **Inconsistent heading hierarchy** — Some pages skip h2→h4.
