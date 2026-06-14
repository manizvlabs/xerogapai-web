# QA Checklist — Pre-Deploy

Use this checklist before every significant deployment to production. Check on both desktop (Chrome, Firefox, Safari) and mobile (iOS Safari, Android Chrome).

---

## Navigation & Routing

- [ ] Logo click → navigates to `/`
- [ ] All nav links work (no 404s)
- [ ] Solutions dropdown opens on hover (desktop)
- [ ] Solutions dropdown items navigate correctly
- [ ] Mobile hamburger menu opens/closes
- [ ] Mobile nav links work and close menu after tap
- [ ] Browser back/forward navigation works correctly
- [ ] Scroll-to-top fires on every route change
- [ ] Breadcrumbs display and link correctly on all inner pages

## Homepage

- [ ] Hero section renders without horizontal overflow
- [ ] Hero CTA buttons link to correct destinations
- [ ] AI stack logo grid displays all tool logos
- [ ] All images load (no broken image icons)
- [ ] Page loads under 3 seconds on 4G (test via Chrome DevTools throttling)

## Solutions Page

- [ ] "Learn More" links navigate to correct product pages
- [ ] "Try Platform" external link opens `https://reviews.vyaptix.ai` in new tab

## AI Review Generation Page

- [ ] All sections render correctly
- [ ] CTA links work
- [ ] Breadcrumb: Home > Solutions > AI Review Generation


- [ ] All sections render correctly
- [ ] CTA links work

## Contact Page

- [ ] Form renders all fields
- [ ] Required field validation triggers on submit
- [ ] Phone country selector works
- [ ] File upload accepts correct file types
- [ ] File upload rejects disallowed types
- [ ] Form submission → Supabase record created
- [ ] Form submission → Zoho CRM lead created
- [ ] Successful submission → redirects to `/thank-you`
- [ ] Thank You page renders with correct message
- [ ] Error state displays if API call fails

## Blog

- [ ] Blog listing shows all published posts
- [ ] Category filter works (Products, Trending in AI, Business)
- [ ] Clicking a post navigates to `/blog/[slug]`
- [ ] Individual post renders all content block types (text, image, table, callout, steps, highlights)
- [ ] Invalid slug → graceful 404 or redirect
- [ ] Breadcrumb: Home > Blog > Post Title

## About Page

- [ ] All sections render
- [ ] Team section (if added) displays correctly
- [ ] Breadcrumb: Home > About

## Footer

- [ ] All footer links work
- [ ] Social icons link to correct accounts
- [ ] Privacy Policy link → `/privacy-policy` (not `#`)
- [ ] Terms of Service link → `/terms-of-service` (not `#`)
- [ ] Copyright year is current year

## Responsive / Mobile

- [ ] No horizontal scroll on any page at 375px width
- [ ] All text is readable (no overflow, no truncation of important content)
- [ ] Tap targets are at least 44px (buttons, nav links)
- [ ] Images scale correctly on mobile

## Performance

- [ ] Logo loads without visible delay
- [ ] No console errors on any page
- [ ] No console warnings about missing keys in lists
- [ ] Lighthouse score: Performance > 80, Accessibility > 90, SEO > 80

## SEO

- [ ] `<title>` tag is set on all pages
- [ ] `<meta name="description">` is set on all pages
- [ ] OG tags present (`og:title`, `og:description`, `og:image`)
- [ ] `/sitemap.xml` accessible and lists all pages
- [ ] `/robots.txt` accessible
- [ ] Structured data (JSON-LD) present on homepage

## Security

- [ ] No Zoho credentials visible in browser DevTools → Sources
- [ ] Contact form has honeypot or rate limiting
- [ ] Cookie consent banner displays on first visit
- [ ] File upload rejects executable files (.exe, .js, .sh)

## Analytics (once installed)

- [ ] GA4 / PostHog tracking fires on page load
- [ ] CTA button clicks are tracked as events
- [ ] Form submission is tracked as conversion event
