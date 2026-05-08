# Analytics Setup Spec

See `REVAMP-MASTER-PLAN.md` Phase 5 for full code.

## Tool: PostHog

**Why PostHog:**
- Open-source (can self-host for data sovereignty)
- Free tier: 1M events/month
- Session recording + heatmaps built-in
- Feature flags (useful for A/B testing future homepage variants)
- Privacy-friendly (can configure to not capture PII)
- Better than GA4 for product analytics

**Alternative:** Google Analytics 4 (GA4) — more widely used, free, good for SEO correlation in Search Console, simpler setup. Choose if team is more familiar with Google ecosystem.

## Setup Steps

1. Create account at `https://posthog.com`
2. Create new project for `vyaptix.com`
3. Get project API key
4. Add `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` to `.env` and Vercel env vars
5. Install package: `npm install posthog-js`
6. Create `src/lib/analytics.ts` (see master plan)
7. Create `src/components/RouteTracker.tsx` (see master plan)
8. Add `<RouteTracker />` in App.tsx
9. Add event tracking to CTA buttons

## Key Events to Track

### Automatic (via RouteTracker)
- `$pageview` — every route change with path

### Manual Events to Add

**Homepage CTAs:**
```typescript
// Book Demo button
trackEvent('cta_clicked', { label: 'Book Free Demo', page: 'homepage', position: 'hero' });

// Watch Video button
trackEvent('video_modal_opened', { page: 'homepage' });

// Product card CTAs
trackEvent('cta_clicked', { label: 'Learn More', product: 'ai-review-generator', page: 'homepage' });
```

**Contact Form:**
```typescript
// Form field first touch
trackEvent('contact_form_started', { page: 'contact' });

// Successful submission
trackEvent('contact_form_submitted', {
  product_interest: formData.serviceInterested,
  company_size: formData.companySize,
});

// Error
trackEvent('contact_form_error', { error: errorMessage });
```

**Product Pages:**
```typescript
trackEvent('product_page_viewed', { product: 'ai-review-generator' });
trackEvent('cta_clicked', { label: 'Try Platform', destination: 'reviews.vyaptix.ai' });
```

## Dashboard Setup (PostHog)

After events start flowing, create these dashboards:

1. **Traffic Overview** — pageviews by page, by date
2. **Conversion Funnel** — Homepage → Product page → Contact → Thank You
3. **CTA Performance** — Which CTAs get clicked most
4. **Form Analytics** — Form start vs. submit rate

## Respecting Cookie Consent

Connect analytics initialization to cookie consent:

```typescript
// In analytics.ts
export function initAnalytics() {
  const consent = localStorage.getItem('cookie-consent');
  if (consent !== 'accepted') return; // don't initialize if declined
  
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    // ...config
  });
}
```

Re-initialize when consent is given:
```typescript
// In CookieBanner.tsx accept handler:
const accept = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  setVisible(false);
  initAnalytics(); // initialize now that we have consent
};
```
