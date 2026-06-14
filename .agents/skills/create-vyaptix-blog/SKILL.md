---
name: create-vyaptix-blog
description: Create, plan, review, or prepare publication-ready VyaptIX website blogs for Sanity Studio. Use when a team member asks for blog-topic ideas, a complete blog draft, founder-style writing, Sanity body-block structure, ChatGPT image prompts, alt text, captions, an unpublished Studio draft, or a review of an existing VyaptIX blog.
---

# Create VyaptIX Blog

Produce useful, human-sounding VyaptIX articles that match the live website,
existing blog library, Sanity schema, and public renderer.

## Safety Rule

Default to planning or an unpublished Sanity draft.

- Never publish, turn `published` on, or replace a published document unless the
  user explicitly requests publishing or updating that live post.
- Never invent customer stories, metrics, product capabilities, quotes, or
  founder experiences.
- State clearly when a draft still needs images, factual confirmation, or human
  review.

## Select The Task Mode

Infer the requested mode:

- **Topic discovery:** audit current positioning and posts, then recommend five
  ranked topics with one strongest recommendation.
- **Content package:** write the complete article and supply Sanity fields,
  structured-block plan, image prompts, alt text, captions, and placements.
- **Studio draft:** create the content package as an unpublished Sanity draft.
- **Review:** inspect an existing draft or published article and recommend or
  apply corrections.
- **Publish:** perform only after explicit approval and a completed review.

Ask a question only when the missing answer cannot be discovered and guessing
would risk writing the wrong article or publishing incorrectly.

## Gather Current Context

Before recommending or writing:

1. Read `AGENTS.md`.
2. Read `docs/guides/sanity-blog-setup.md`.
3. Read `sanity/schemaTypes/blogPost.ts`, `src/lib/blog.ts`, and
   `src/components/blog/BlogContent.tsx`.
4. Query current published Sanity posts to avoid repetition and understand the
   active editorial mix.
5. Query recent posts by the intended author to match their voice.
6. Read relevant website product pages and source files for company claims.
7. Browse authoritative sources for current external facts, statistics, laws,
   product information, or news.

Read [editorial-standard.md](references/editorial-standard.md) before writing.
Read [sanity-authoring.md](references/sanity-authoring.md) before creating or
editing a Studio document. Read [image-standard.md](references/image-standard.md)
before proposing images.

## Define The Brief

Establish:

- intended reader
- one clear promise or argument
- author and suitable voice
- exact category: `Products`, `Trending in AI`, or `Business`
- desired reader action
- facts that require verification
- how the post differs from existing published posts

If the user supplies only a topic, infer a practical brief from current company
positioning and explain the chosen angle briefly.

## Write The Content Package

Deliver:

- title
- slug
- excerpt of at most 300 characters
- SEO description of at most 160 characters
- category
- author
- author-role override only when needed
- estimated reading time
- complete article
- Sanity body-block plan
- image plan with prompts, placement, alt text, and captions
- pre-publish review checklist

Use semantic Sanity blocks instead of simulating layout with spaces or symbols:

- paragraphs for narrative
- Heading 2 for major sections
- Heading 3 for subsections
- Callout for a single strong takeaway
- Steps for an ordered process
- Highlights for short scannable cards
- Table for compact comparisons
- Image for a section-specific visual

Keep the structure varied but intentional. Do not insert a table, card group, or
image merely to make the article look busy.

## Create An Unpublished Studio Draft

When the user asks to create the article in Studio:

1. Query and reuse existing Author and Category references.
2. Create a temporary JSON document outside permanent source folders.
3. Use a stable draft ID such as `drafts.blogPost-<slug>`.
4. Set `published` to `false`.
5. Add the structured body blocks.
6. Leave cover or body images missing when the user has not supplied them.
7. Upsert only the draft with `npx sanity documents create ... --replace`.
8. Verify the draft by ID and confirm the public post count did not increase.
9. Remove the temporary JSON file.

Do not create a non-draft document during this workflow.

## Review Before Publishing

Check:

- every claim is verified or clearly framed as opinion
- the article does not duplicate an existing post
- the opening provides a reason to keep reading
- paragraphs sound natural when read aloud
- first-person statements are genuinely attributable to the author
- title, excerpt, SEO description, slug, category, author, and reading time are
  complete
- Heading 2 and Heading 3 hierarchy is logical
- each image explains one nearby point
- every image has descriptive alt text and a useful caption
- no unsupported formatting is relied upon
- cover image is present and crops well at 16:9
- `Published` remains off until approval

If asked to publish, confirm both the custom `Published` switch and Sanity's
Publish action are required. Check whether a webhook exists and warn if
production updates may require redeployment.

## Report The Result

Keep the final report practical:

- what was created or changed
- Studio document title and draft/published status
- strongest editorial decisions
- exact remaining human-review items
- image requirements
- verification performed

Do not tell the user the post is live unless the published document and public
website route have both been verified.
