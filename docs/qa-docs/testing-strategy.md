# Testing Strategy

## Current State

As of 2026-04-21, there are **no automated tests** in this codebase. No test files, no test runner configured, no CI test step.

This is acceptable for a very early-stage startup, but should be addressed before:
- Launching the revamped website to significant traffic
- Adding more than 1 developer to the codebase
- Integrating with payment systems or sensitive data flows

---

## Recommended Testing Layers

### Layer 1: TypeScript (Already Active)
Type checking via `npm run typecheck` acts as a first-pass correctness check. This catches:
- Wrong prop types
- Missing required fields
- Import errors

**Recommendation:** Run `typecheck` in CI on every pull request.

### Layer 2: Unit Tests (Not Implemented)

**Recommended Tool:** Vitest (native Vite integration, zero config)

**Priority targets:**
- `src/services/zohoService.ts` — token refresh logic, retry handling
- `src/services/contactService.ts` — data mapping
- `src/data/blogs.ts` — slug uniqueness, required fields present
- URL validation utilities (if added)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

### Layer 3: Component Tests (Not Implemented)

**Recommended Tool:** Vitest + React Testing Library

**Priority targets:**
- `<Contact />` form — field validation, submission states
- `<Blog />` — category filter behavior
- `<Header />` — mobile menu toggle, dropdown behavior
- `<BlogPost />` — 404 handling for invalid slugs

### Layer 4: E2E Tests (Not Implemented)

**Recommended Tool:** Playwright

**Priority flows:**
1. Homepage → Solutions → AI Review Generation → Contact form → Thank You
2. Homepage → Blog → individual post
3. Contact form submission (happy path + validation errors)
4. Mobile nav open/close

```bash
npm install -D @playwright/test
```

---

## Manual QA Checklist (Pre-Deploy)

See [qa-checklist.md](./qa-checklist.md) for the full manual testing checklist.

---

## CI/CD Integration

No CI pipeline is currently configured. Recommended setup using GitHub Actions:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

---

## Testing the Contact Form Integration

Since the form submits to Zoho CRM and Supabase, local integration testing requires:

1. Real Zoho sandbox credentials (not production)
2. A Supabase test project
3. Use `npm run dev:vercel` to test the full serverless function path

For automated integration tests, use Zoho CRM Sandbox environment and a separate Supabase test database.
