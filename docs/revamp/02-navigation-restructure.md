# Navigation Restructure Spec

See `REVAMP-MASTER-PLAN.md` Phase 1.2 for implementation.

## Before vs After

### Header Nav

| Before | After |
|---|---|
| "Solutions" dropdown | "Products" dropdown |
| AI Review Generation | AI Review Generator (+ description) |
| Setu - WhatsApp Assistant (BROKEN link) | Removed |
| No CTA in header | "Book a Demo" button |

### Dropdown Enhancement

Current dropdown shows just an icon + label.  
New dropdown shows icon + label + one-line description for each product, helping visitors self-qualify.

### Footer Nav

| Before | After |
|---|---|
| Privacy Policy → # (broken) | Privacy Policy → /privacy-policy |
| Terms of Service → # (broken) | Terms of Service → /terms-of-service |
| Facebook → facebook.com (placeholder) | Facebook → actual brand page URL |
| No Resources column | Resources column (Blog, Support) |

## Mobile Nav

No structural changes needed to mobile nav — it inherits the `navItems` array changes automatically.

## URL Structure

Final URL structure after revamp:

```
/                                 Home
/solutions/ai-review-generation   AI Review Generator detail
/blog                             Blog listing
/blog/:slug                       Individual blog post
/about                            About
/contact                          Contact / Book Demo
/thank-you                        Post-submission (noindex)
/privacy-policy                   Privacy Policy (noindex)
/terms-of-service                 Terms of Service (noindex)
```

## Accessibility Notes

- All nav items must be keyboard navigable (tab order)
- Dropdown must close on Escape key
- Mobile menu button must have aria-expanded attribute
- Active page must have `aria-current="page"` on its nav link
