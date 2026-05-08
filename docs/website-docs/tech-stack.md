# Tech Stack

## Frontend

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | 18.3.1 | |
| Language | TypeScript | 5.5.3 | Strict mode enabled |
| Build Tool | Vite | 5.4.2 | Fast HMR, ESM native |
| Routing | React Router DOM | 7.12.0 | BrowserRouter, client-side |
| Styling | Tailwind CSS | 3.4.1 | JIT, custom design tokens |
| Icons | Lucide React | 0.344.0 | Tree-shakeable SVG icons |

## Backend / Serverless

| Layer | Technology | Notes |
|---|---|---|
| Hosting | Vercel | CDN + serverless functions |
| Runtime | Node.js (Vercel) | API routes under `/api/` |
| Database | Supabase (PostgreSQL) | Contact data storage |
| ORM | Prisma | 6.19.2 — schema defined |
| File Uploads | Formidable (prod) / Multer (dev) | Contact form attachments |

## Third-Party Integrations

| Service | Purpose | Auth Method |
|---|---|---|
| Supabase | Contact/lead database | Anon key (client-side) |
| Zoho CRM | Lead management | OAuth2 (refresh token) |
| OpenAI | Future LLM features | API key (server-side) |

## Development Tooling

| Tool | Purpose |
|---|---|
| ESLint | Linting (react-hooks plugin) |
| TypeScript Compiler | Type checking |
| `npm run dev` | Vite dev server (port 5173) |
| `npm run dev:api` | Local API server (port 3000) |
| `npm run dev:vercel` | Full local Vercel emulation |
| `npm run build` | Production build |
| `npm run typecheck` | TS check without emit |

## Version Compatibility Notes

- React Router v7 has different API from v5/v6 — do not confuse with older documentation
- Prisma 6.x requires Node.js 18+ — check Vercel runtime settings
- Tailwind CSS v3 uses JIT by default — v4 migration will require config changes (not recommended without planning)
