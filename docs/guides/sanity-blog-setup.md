# Sanity Blog Setup

Sanity Studio is embedded at `/studio`. Sanity is the only blog content source
used by the website.

The 7 blogs that were live on the website were migrated into Sanity on June 6,
2026. The former TypeScript, Markdown, Decap CMS, GitHub OAuth, and local blog
image systems have been removed. Create and manage all blog content in Studio.

## Configuration values

These values are configured locally in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=a3ejtqyf
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-06
SANITY_WEBHOOK_SECRET=<generated-secret>
```

- The dataset is the named content store created in Sanity. This project uses
  `production`.
- The API version is a pinned ISO date chosen by the application. It is not a
  value copied from the Sanity dashboard.
- The webhook secret is a private random value chosen by us. It must be the same
  in the website environment and the Sanity webhook configuration.

Add all four variables to the Vercel project for Production, Preview, and
Development. Do not expose `SANITY_WEBHOOK_SECRET` as a `NEXT_PUBLIC_` variable.

## Studio

Run the website and open the embedded Studio:

```powershell
npm run dev
```

Then visit `http://localhost:3000/studio`.

Sanity must allow the Studio origin **with credentials enabled** so login
cookies and tokens can be sent. Verify the project CORS origins with:

```powershell
npx sanity cors list
```

If Studio reports `CorsOriginError` or the browser says a Sanity API request
was blocked by CORS, replace the localhost entry with an authenticated entry:

```powershell
npx sanity cors delete http://localhost:3000
npx sanity cors add http://localhost:3000 --credentials
```

Create content in this order:

1. Create an Author.
2. Create a Category. Existing website filters use `Products`, `Trending in AI`,
   and `Business`.
3. Create a Blog Post and keep `Published` off while writing and reviewing.
4. Add the cover image, body content, SEO description, and reading time.
5. When the article is approved, switch `Published` on and use Sanity's Publish
   action. Both actions are required before the website can display the post.

### Authoring and styling

The Studio stores structured content. The public website controls fonts,
spacing, colors, indentation, responsive layout, and the final appearance.
Do not use spaces or tabs to create visual indentation.

- `Normal`: standard paragraphs. Keep paragraphs to roughly 1-4 sentences.
- `Heading 2`: major article sections. These appear in the article table of
  contents.
- `Heading 3`: subsections under a Heading 2. These appear indented in the table
  of contents.
- `Callout`: one important sentence or takeaway that deserves emphasis.
- `Steps`: ordered processes. Use this instead of manually typing numbered
  lists.
- `Highlights`: short, scannable cards, usually in groups of 2 or 4.
- `Table`: comparisons or structured facts. Avoid long paragraphs inside cells.
- `Image`: supporting images inside the body. Always add useful alt text and an
  optional caption.

The Studio text toolbar intentionally exposes only bold formatting because that
is the inline formatting supported by the public renderer. VyaptIX website
URLs, email addresses, and phone numbers in normal paragraphs are automatically
linked.

### Image guidance

Sanity stores and manages uploaded images; it does not automatically generate
them. Generate or prepare images outside Studio, then upload them into the
cover-image field or add an Image block inside the body.

- Upload cover images at 16:9, ideally 1600x900 or larger.
- Keep the important subject near the center. The current website uses a
  centered 16:9 crop for the cover.
- Prefer authentic product screenshots, diagrams, and real team/customer
  photography over generic AI artwork.
- Use generated editorial artwork only when a real screenshot or photograph
  cannot explain the idea.
- Do not place important article-title text inside an image. The website already
  displays the title and social platforms may crop the image.
- Write alt text that describes what the image communicates. Captions should
  explain why the image matters.

For most articles, use one cover image and 1-3 useful body images. Images should
clarify the article, not merely break up the page.

## Reusable blog-creation skill

The repository includes one canonical team-local skill:

```text
.agents/skills/create-vyaptix-blog/
```

It is shared through Git and supports these coding agents:

| Agent | Discovery | How to use |
|---|---|---|
| Codex | Directly discovers `.agents/skills` | Invoke `$create-vyaptix-blog`, or ask a matching blog request |
| Claude Code | Discovers `.claude/skills/create-vyaptix-blog/SKILL.md`, which delegates to the canonical skill | Invoke `/create-vyaptix-blog`, or ask a matching blog request |
| Gemini CLI | Directly discovers `.agents/skills` as a workspace alias | Ask a matching blog request and approve skill activation |

Team members do not need to install the skill separately. After cloning or
pulling the repository:

1. Start Codex, Claude Code, or Gemini CLI from the repository root.
2. Confirm the repository or workspace is trusted when the agent requests it.
3. Start a new session after initially pulling the skill files.
4. Use the agent-specific invocation above or ask for the blog task normally.

For Codex, use `/skills` to confirm discovery. For Gemini CLI, use
`/skills list` and `/skills reload`. Claude Code exposes the skill as
`/create-vyaptix-blog`.

Do not create separate full copies of the workflow. Update the canonical
`.agents/skills/create-vyaptix-blog/` files so all supported agents continue to
follow the same standards.

This repository currently maintains blog-workflow support only for Codex,
Claude Code, and Gemini CLI. It does not maintain adapters or instructions for
GitHub Copilot, Cursor, or Windsurf.

Use the skill when asking a supported agent to recommend topics, write a
complete article, prepare ChatGPT image prompts, create an unpublished Sanity
draft, or review a blog before publishing.

Agent-neutral example requests:

```text
Use the create-vyaptix-blog skill to recommend five next-blog topics for Ajeet.
```

```text
Use the create-vyaptix-blog skill to turn this topic into a complete VyaptIX
blog content package with Sanity blocks and simple ChatGPT image prompts:
<topic>.
```

```text
Use the create-vyaptix-blog skill to create this approved article as an
unpublished Sanity draft. Do not publish it.
```

```text
Use the create-vyaptix-blog skill to review this Studio draft for voice, claims,
images, SEO, structure, and publishing readiness: <title>.
```

The skill defaults to an unpublished draft. Publishing requires an explicit
request after human review.

Validate the Studio schema after making schema changes:

```powershell
npm run sanity:validate
```

## Webhook

Create one GROQ-powered webhook in
[Sanity Manage](https://www.sanity.io/manage):

- Name: `VyaptIX blog revalidation`
- URL: `https://vyaptix.com/api/revalidate/sanity`
- Dataset: `production`
- Trigger on: create, update, delete
- Filter:
  `coalesce(after()._type, before()._type) in ["blogPost", "author", "category"]`
- Drafts: disabled
- Secret: use the exact `SANITY_WEBHOOK_SECRET` value from Vercel
- Projection:

```groq
{
  "_type": coalesce(after()._type, before()._type)
}
```

The route verifies Sanity's webhook signature before revalidating `/blog`, all
blog detail pages, and `/sitemap.xml`. Author and Category changes are included
because published posts display referenced author and category data.

## Project state

- Sanity project: `a3ejtqyf`
- Dataset verified: `production`
- Published posts verified: `7`
- Blog content source: Sanity only
- Schema validation: zero errors and zero warnings
- Allowed authenticated CORS origins:
  - `http://localhost:3000`
  - `http://localhost:3333`
  - `https://vyaptix.com`
  - `https://www.vyaptix.com`
  - `https://vyaptix.ai`
  - `https://www.vyaptix.ai`
- Webhook: not configured as of June 6, 2026; create it before relying on
  immediate production updates after publishing
