# Product: AgentMitra

## Overview

AgentMitra is VyaptIX's second product — an AI agent platform for business automation. The name "Mitra" means "friend/ally" in Sanskrit, positioning the product as a trusted AI co-pilot for business teams.

**Status:** Navigation entry exists in `src/components/layout/Header.tsx`, but:
- No website page exists (`/agent-mitra` route returns 404)
- No product page component built yet
- Product details and feature set need to be defined by the VyaptIX team

**Priority:** Building the AgentMitra product page is a required deliverable for the website revamp.

---

## What We Know from Codebase Context

The header nav lists AgentMitra as the third solution (alongside AI Review Generation and previously "Setu"). Based on the existing orphaned pages that are being deprecated, AgentMitra likely consolidates capabilities from:

- **Enterprise Copilots** (`/enterprise-copilots`) — Multi-lingual Q&A over company documents, knowledge base AI, role-based access
- **VyaptixAI** (`/vyaptix-ai`) — Workflow intelligence, Notion integration, reporting automation
- Possibly elements of **Setu (WhatsApp CX)** — Multi-channel automation

---

## Questions to Clarify Before Building the Page

The product team must answer these before the AgentMitra page can be developed:

1. **What exactly is AgentMitra?** Is it:
   - An enterprise knowledge base AI (like the old Enterprise Copilots)?
   - A workflow automation platform (like VyaptixAI)?
   - A multi-agent orchestration platform?
   - Something entirely new?

2. **Who is the target customer?** (ICP — size, industry, role)

3. **What is the core use case in one sentence?**

4. **What are the top 3 features / capabilities?**

5. **How does a customer get started?** (Self-serve, demo, enterprise sales?)

6. **What is the pricing model?** (Per seat, per workflow, enterprise contract?)

7. **Are there any existing customers or beta users?** (For testimonials)

8. **Is there a live product URL** (like `reviews.vyaptix.ai` for AI Review Generator)?

9. **What differentiates AgentMitra from Zapier, n8n, Make, and other automation tools?**

10. **What integrations does it support?**

---

## Placeholder Page Structure (To Be Validated)

Once the above questions are answered, the page at `/agent-mitra` should follow this structure:

```
1. Hero Section
   - Headline: [Key benefit in 7 words or fewer]
   - Sub-headline: [ICP + pain + outcome in 2 sentences]
   - Primary CTA: Book a Demo
   - Secondary CTA: Watch 2-min overview (video)

2. Problem Statement Section
   - 3 pain points the target buyer faces today

3. How AgentMitra Works
   - 3–5 step visual flow

4. Key Features / Capabilities
   - 4–6 feature cards with icons

5. Use Cases / Industries
   - 3–4 specific scenarios with outcomes

6. Social Proof
   - Customer quotes (if available)
   - Metrics (if available)

7. Integration Logos
   - What tools it connects with

8. Pricing or "Get Started" Section
   - Even if just "Contact us for pricing"

9. FAQ
   - 5–7 common questions
```

---

## Source File to Create

`src/pages/AgentMitra.tsx` — new file, does not exist yet.

See `revamp/REVAMP-MASTER-PLAN.md` for the full implementation spec once product details are confirmed.
