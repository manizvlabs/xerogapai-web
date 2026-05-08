# Performance Benchmarks

## Target Metrics (Core Web Vitals)

| Metric | Target | Good | Needs Improvement | Poor |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.0s | < 2.5s | 2.5–4.0s | > 4.0s |
| INP (Interaction to Next Paint) | < 150ms | < 200ms | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.1 | 0.1–0.25 | > 0.25 |
| TTFB (Time to First Byte) | < 200ms | < 800ms | 800ms–1.8s | > 1.8s |
| FCP (First Contentful Paint) | < 1.5s | < 1.8s | 1.8–3.0s | > 3.0s |

---

## Known Performance Issues

### Critical: Logo PNG (759KB)

`public/final_logo_-_light.png` is 759KB. This is the likely LCP element on most pages because it appears in the fixed header.

**Impact:** LCP will likely exceed 3s on 4G connections.

**Fix:**
```
Option A: Convert to SVG (ideal — vectors scale perfectly, typically < 10KB)
Option B: Convert to WebP with width=240px: target < 15KB
Option C: Use srcset with WebP + PNG fallback
```

### Medium: No Image Optimization Pipeline

All images in `public/` are served as-is. No automatic compression, no format conversion, no responsive sizes.

**Fix:**
- Use `vite-plugin-imagemin` for build-time compression
- Or migrate to Next.js for built-in `<Image>` optimization (longer-term)
- At minimum: optimize all blog images before placing in `public/blog/`

### Medium: No Resource Hints

No `<link rel="preconnect">` or `<link rel="preload">` for critical resources.

**Fix (add to `index.html`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/final_logo_-_light.png" as="image">
```

### Low: Google Fonts Blocking

Inter and IBM Plex Mono are loaded from Google Fonts. This adds a render-blocking resource.

**Fix:**
```html
<!-- Add display=swap to font URL -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## How to Measure

```bash
# Local Lighthouse audit
npm run build && npm run preview
# Open http://localhost:4173 in Chrome
# DevTools → Lighthouse → Run audit

# Or use web.dev/measure for production URL
```

---

## Bundle Size Targets

| Asset | Target | Action if Exceeded |
|---|---|---|
| JS bundle (gzipped) | < 150KB | Code split, remove unused deps |
| CSS bundle (gzipped) | < 30KB | Purge unused Tailwind classes |
| Largest image | < 100KB | Compress/convert to WebP |
| Logo | < 20KB | Convert to SVG |

---

## Vercel Analytics

Once analytics is set up, monitor:
- Real User Metrics (RUM) from Vercel Speed Insights
- Core Web Vitals per page
- TTFB by region (important for global audience)
