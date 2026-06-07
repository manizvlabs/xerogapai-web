# VyaptIX Website - Shared Agent Instructions

## Repository

This repository contains the current VyaptIX marketing website.

- Framework: Next.js App Router
- Public website routes: `app/(main)/`
- Shared page implementations: `src/views/`
- Shared UI and layout components: `src/components/`
- Server routes: `app/api/`
- Blog content source: Sanity
- Embedded Sanity Studio: `/studio`
- Sanity schemas and configuration: `sanity/`, `sanity.config.ts`, `sanity.cli.ts`
- Public blog queries and mapping: `src/lib/blog.ts`

Do not use instructions, memory files, or absolute paths from another checkout.
Discover current behavior from this repository and its tracked documentation.

## Product And Content Rules

VyaptIX targets a global market and currently presents four products:

1. AI Review Generator
2. Setu
3. AgentMitra
4. BankLens

Verify product claims against the current source files in `src/views/` before
using them in website copy or blogs. Do not invent customer stories, metrics,
capabilities, or company results.

## Engineering Rules

- Preserve the existing Next.js App Router architecture.
- Keep secrets server-side and never add secrets to `NEXT_PUBLIC_` variables.
- Do not commit `.env.local`.
- Do not reintroduce the removed file-based or Decap blog system.
- Do not publish Sanity content without explicit user approval.
- Do not revert unrelated worktree changes.
- Put project documentation under `docs/`; do not create additional README
  files.

Run the relevant checks after code changes:

```powershell
npm run lint
npm run typecheck
npm run build
```

After Sanity schema changes, also run:

```powershell
npm run sanity:validate
```

## Blog Creation Workflow

For requests to recommend, write, structure, review, draft, or publish a
VyaptIX blog, use the canonical repository skill:

```text
.agents/skills/create-vyaptix-blog/
```

- Codex: invoke `$create-vyaptix-blog`
- Gemini CLI: activate the discovered `create-vyaptix-blog` workspace skill
- Claude Code: invoke `/create-vyaptix-blog`; its adapter delegates to the
  canonical skill

The canonical skill defaults to an unpublished Sanity draft. Publishing
requires explicit approval after review.
