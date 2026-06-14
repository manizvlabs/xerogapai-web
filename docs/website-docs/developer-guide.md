# Developer Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Git
- Vercel CLI (for local full-stack dev)

---

## Local Development Setup

```bash
# Install dependencies
npm install

# Copy env file and populate values
cp .env.example .env

# Start frontend only (port 5173)
npm run dev

# Start API server only (port 3000)
npm run dev:api

# Start both via Vercel dev (recommended)
npm run dev:vercel
```

---

## Environment Variables Required

Create `.env` in project root (never commit this file):

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Zoho CRM (WARNING: move to server-side only — see security-review.md)
VITE_ZOHO_CLIENT_ID=your-client-id
VITE_ZOHO_CLIENT_SECRET=your-client-secret
VITE_ZOHO_REFRESH_TOKEN=your-refresh-token

# OpenAI (server-side only)
OPENAI_API_KEY=your-openai-key
```

---

## Adding a New Page

1. Create `src/pages/YourPage.tsx`
2. Export a named function: `export function YourPage() { ... }`
3. Import and add route in `src/App.tsx`:
   ```tsx
   import { YourPage } from './pages/YourPage';
   <Route path="/your-page" element={<YourPage />} />
   ```
4. Add nav link in `src/components/layout/Header.tsx` (navItems array)
5. Add breadcrumb on the page using `<Breadcrumb>` component

---

## Adding a Blog Post

Blog content is managed only in the embedded Sanity Studio.

1. Run `npm run dev`.
2. Open `http://localhost:3000/studio`.
3. Log in with an account invited to the `VyaptIX Blog` Sanity project.
4. Create or select an Author and Category.
5. Create the Blog Post and complete all required fields.
6. Turn the custom `Published` switch on.
7. Use Sanity's Publish action.
8. Review the post at `/blog/[slug]`.

Relevant implementation files:

- `sanity/schemaTypes/`: blog authoring schemas
- `src/lib/blog.ts`: Sanity queries and public-view mapping
- `app/(main)/blog/`: public blog routes
- `app/api/revalidate/sanity/route.ts`: signed publishing webhook

Do not add blog posts as repository files.

---

## Build & Deploy

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build

# Preview build locally
npm run preview
```

Deployment is via Vercel — push to `main` triggers automatic deployment. Feature work should be done on `develop` or feature branches.

---

## Component Usage

### Section
```tsx
<Section background="alt" padding="lg">
  {/* content */}
</Section>
```
`background`: `default` | `alt` | `gradient` | `dark`
`padding`: `sm` | `md` | `lg`

### Button
```tsx
<Button variant="primary" size="lg" onClick={handler}>
  Click Me
</Button>
```

### Breadcrumb
```tsx
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'AI Review Generation' }  // no href = current page
]} />
```

---

## Code Conventions

- Named exports for all components (no default exports except `App.tsx`)
- One component per file
- TypeScript strict mode — all props must be typed
- No inline styles — Tailwind classes only
- No comments unless explaining non-obvious behavior
- No TODO comments — use GitHub issues instead
