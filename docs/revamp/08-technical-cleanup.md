# Technical Cleanup Spec

Items that don't fit neatly into other phases but must be done as part of the revamp.

---

## 1. Remove Orphaned Page Routes (Phase 1.1)

Files to deregister from routing (keep files, remove routes):
- `src/pages/WhatsAppCX.tsx`
- `src/pages/VyaptixAI.tsx`
- `src/pages/EnterpriseCopilots.tsx`
- `src/pages/SalesAutomation.tsx`
- `src/pages/ContactCenterAI.tsx`
- `src/pages/DPDPCompliance.tsx`


---

## 2. Logo Optimization

**Current:** `public/final_logo_-_light.png` — 759KB PNG  
**Target:** SVG or WebP — < 20KB

Steps:
1. Request SVG from design team
2. If SVG unavailable: use Squoosh (squoosh.app) to convert PNG → WebP
   - Target dimensions: 480px wide (2x for retina)
   - Target file size: < 15KB
3. Update `src/components/layout/Header.tsx` — image src
4. Update `src/components/layout/Footer.tsx` — image src
5. Verify logo looks correct at all sizes (header: 64px height, footer: 80px height)

---

## 3. Add Resource Hints to index.html

Add to `<head>` in `index.html`:

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Add display=swap to existing font link -->
<!-- Find the Google Fonts <link> tag and add &display=swap to the URL -->

<!-- Preload critical logo image -->
<link rel="preload" href="/vyaptix-logo.svg" as="image" type="image/svg+xml">
```

---

## 4. Fix Console Warnings

Common React warnings to check and fix:
- Missing `key` props on any `.map()` calls in page components
- Missing `alt` text on any `<img>` tags without descriptive alt attributes
- Deprecated API usage in React Router (check for any v5-style patterns)

Run `npm run lint` and `npm run typecheck` to surface issues.

---

## 5. Accessibility Improvements

Minimum accessibility fixes for revamp:

- [ ] All form inputs have associated `<label>` elements (not just placeholder text)
- [ ] All interactive elements are keyboard focusable
- [ ] Focus ring is visible (not removed with `outline: none` without replacement)
- [ ] All images have descriptive `alt` text
- [ ] Color contrast meets WCAG AA (primary-500 #0066CC on white background — verify)
- [ ] Header nav `<nav>` has `aria-label="Main navigation"`
- [ ] Mobile menu button has `aria-expanded` attribute

---

## 6. TypeScript Strict Mode Compliance

The project has strict TypeScript enabled. Before merging revamp branch:

```bash
npm run typecheck
```

Must pass with zero errors. Common pitfalls:
- `any` types in new components
- Unhandled undefined from optional chaining
- Missing return types on exported functions

---

## 7. Update package.json Scripts

Add useful scripts for development workflow:

```json
"scripts": {
  "test": "vitest",                    // once Vitest is installed
  "test:e2e": "playwright test",       // once Playwright is installed
  "analyze": "vite build --mode analyze", // bundle analyzer
  "lighthouse": "lhci autorun"         // Lighthouse CI
}
```
---

## 8. Environment Variable Audit

After revamp, the final list of required environment variables should be:

```env
# Supabase (client-accessible)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Analytics (client-accessible)
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=

# Booking (client-accessible)
VITE_CALENDLY_URL=

# Zoho CRM (SERVER-SIDE ONLY — no VITE_ prefix)
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=

# OpenAI (SERVER-SIDE ONLY — no VITE_ prefix)
OPENAI_API_KEY=
```

Update `.env.example` file with all keys (values blank) so new developers know what to configure.

---

## 9. Vercel Project Settings to Verify

- [ ] Production branch is set to `main`
- [ ] `develop` branch deploys to preview URL
- [ ] All environment variables are set for production environment
- [ ] Zoho vars are set WITHOUT `VITE_` prefix
- [ ] Node.js runtime version is 18.x or higher (for Prisma compatibility)
- [ ] Function timeout is appropriate for Zoho API calls (they can be slow)

---

## 10. 404 Page

Currently there is no custom 404 page. Add to `App.tsx`:

```tsx
// At the end of Routes, add:
<Route path="*" element={<NotFound />} />
```

Create `src/pages/NotFound.tsx`:
```tsx
export function NotFound() {
  return (
    <div className="container-main py-32 text-center">
      <SEO title="Page Not Found — VyaptIX" description="This page doesn't exist." noIndex={true} />
      <h1 className="text-4xl font-bold text-text mb-4">404 — Page Not Found</h1>
      <p className="text-text-secondary mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="...primary button...">Go to Homepage</Link>
    </div>
  );
}
```
