# Product: AI Review Generator

## Overview

AI Review Generator is VyaptIX's first and flagship product. It enables businesses to collect authentic Google reviews from customers in under 20 seconds using AI-generated, personalized review text based on customer sentiment input.

**Live Platform:** https://reviews.vyaptix.ai  
**Website Page:** `/solutions/ai-review-generation`  
**Source File:** `src/pages/AIReviewGeneration.tsx`

---

## How It Works

1. **Business Setup** — The business creates a profile and customizes their feedback form on `reviews.vyaptix.ai`
2. **QR Code / Link Sharing** — Business shares QR code or link at point of interaction (table tent, receipt, counter card, WhatsApp message)
3. **Customer Rates + Provides Feedback** — Customer opens link, gives a star rating and brief comment (~10 seconds)
4. **AI Generates Personalized Review** — AI converts the rating + comment into a well-written, natural Google review text
5. **Customer Posts with One Click** — Copy button → Google review page opens → Customer pastes and posts

**Total customer time:** Under 20 seconds

---

## Key Features

| Feature | Description |
|---|---|
| QR Code Generation | Auto-generates scannable QR code for each business location |
| AI Personalization | Review text is unique per customer based on their actual sentiment |
| One-Click Copy | Customer copies AI text and is redirected to Google Maps review page |
| Multi-language | Review text can be generated in customer's language |
| Real-time Analytics | Dashboard showing review collection rate, sentiment trends, ratings distribution |
| Multi-location | Single account can manage multiple business locations |

---

## Target Customers

**Primary ICP (Ideal Customer Profile):**
- Local businesses (restaurants, salons, gyms, clinics, retail)
- Business owners who know Google reviews drive local SEO and foot traffic
- Businesses with high transaction volume and face-to-face customer interactions
- Companies currently getting 1–5 organic Google reviews per month

**Secondary ICP:**
- Digital marketing agencies managing reputation for multiple local clients
- Franchise operators (chain restaurants, multi-location retail)

---

## Differentiators vs. Competition

| Competitor Type | Their Approach | VyaptIX Advantage |
|---|---|---|
| Review request emails/SMS | Sends a link and hopes customer writes their own review | AI removes the "blank page" problem — customer just rates |
| Generic survey tools | Collect feedback but don't link to Google reviews | Direct path from feedback → Google post |
| Reputation management platforms | Enterprise pricing, complex setup | Under 20 seconds for customer, simple setup |

---

## Metrics to Showcase on Website

*(Confirm actual numbers before publishing)*

- Reviews collected for customers
- Average time to complete (claim: under 20 seconds)
- Industries served
- Average rating increase for customers

---

## Website Page Requirements

The existing `AIReviewGeneration.tsx` page covers:
- Product description
- 4-step "how it works" flow
- Industry use cases
- CTA to try platform + contact for demo

**Gaps to add in revamp:**
- Real customer testimonials with names and results
- Before/after metrics ("went from 4 to 47 reviews in 30 days")
- Product screenshots/demo video
- Pricing section or "Starting from" indicator
- FAQ section

---

## Integrations (Product-Level)

- **Google Business Profile API** — links customer directly to Google review page for their business
- **WhatsApp Business** — optionally sends review link via WhatsApp
- **Internal Analytics** — real-time dashboard on `reviews.vyaptix.ai`
