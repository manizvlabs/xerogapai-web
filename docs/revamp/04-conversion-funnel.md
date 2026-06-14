# Conversion Funnel Design

## Current State Problem

Every CTA on the website leads to the same 30+ field contact form. This treats every visitor identically regardless of where they are in their decision process:

- A curious visitor who just heard of VyaptIX is asked to provide their annual revenue
- A warm lead ready to buy is stuck in the same form as a cold visitor
- There is no self-serve entry point

**Result:** Most visitors bounce without converting because the barrier is too high for where they are in their journey.

## Target Funnel

```
AWARENESS
  ↓
Homepage / Blog / Product pages
  ↓
CONSIDERATION
  ↓
Watch demo video (2 min, zero friction)
  OR
Try AI Review Generator free (external platform)
  ↓
INTENT
  ↓
Book a 30-min demo call (Calendly — name + email only)
  ↓
QUALIFIED LEAD
  ↓
Full discovery form (current 30-field form — for enterprise)
```

## CTA Strategy by Funnel Stage

### Top of Funnel CTAs (Awareness visitors)
- "Watch 2-min Overview" → opens video modal (zero commitment)
- "Try AI Review Generator Free" → `https://reviews.vyaptix.ai` (self-serve, no sales friction)

### Mid Funnel CTAs (Consideration visitors)
- "Book a 30-min Demo" → Calendly link, collects name + email + company only
- "See How It Works" → scrolls to product section or how-it-works page section

### Bottom of Funnel CTAs (Intent visitors)
- "Get Enterprise Pricing" → full contact form
- "Start Free Trial" → `https://reviews.vyaptix.ai` registration

## Contact Page Redesign

### Stage 1 Form (Default, visible to all visitors)

Fields:
- First Name *
- Last Name *
- Work Email *
- Company Name *
- Message (optional)
- Submit: "Send Message"

On submission: save to Supabase + Zoho, show brief thank-you message inline, then show booking prompt:

> "Thanks! We'll reach out within 1 business day. Want to skip the wait? **Book a slot directly** →"

### Stage 2 / Enterprise Form (Opt-in, separate or expandable section)

Label: "Planning a large deployment? Tell us more"

Additional fields (only shown when user opts in):
- Company size
- Industry
- Estimated monthly transactions / volume
- Budget range
- Timeline
- Challenges

This way enterprise buyers can provide the detail you need for Zoho, without blocking SMB leads who just want a quick conversation.

## Demo Video Requirements

The "Watch 2-min Overview" CTA requires a video to exist. Until the video is produced, this CTA should be removed or replaced with "See How It Works" (internal anchor link).

**Video spec:**
- Length: 90–120 seconds
- Content: Problem → Solution → Demo of product in action → CTA
- Format: MP4, hosted on Vimeo or YouTube (not self-hosted — too slow)
- Implementation: `<VideoModal>` component that opens a lightbox with iframe embed

## Calendly Integration

For the demo booking CTA, integrate Calendly:

```tsx
// Simple approach: open Calendly in new tab
<a href="https://calendly.com/vyaptix/30min" target="_blank">
  Book a 30-min Demo
</a>

// Better approach: Calendly popup widget
// npm install @calendly/react
// Opens without leaving the page
```

Add `VITE_CALENDLY_URL` to `.env` so the URL can be changed without code deployment.

## Conversion Tracking Events

When analytics is set up (Phase 5), track:
- `cta_clicked` with `{ label: 'Book Demo', page: '/solutions/ai-review-generation' }`
- `video_modal_opened`
- `contact_form_started` (first field focused)
- `contact_form_submitted`
- `contact_form_error`
- `calendly_opened`
