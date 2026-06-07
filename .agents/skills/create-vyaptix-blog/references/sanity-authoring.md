# Sanity Authoring Reference

## Current Blog Fields

| Field | Requirement |
|---|---|
| `title` | Required |
| `slug` | Required, generated from title then reviewed |
| `excerpt` | Required, maximum 300 characters |
| `seoDescription` | Optional, maximum 160 characters |
| `published` | Keep `false` during drafting and review |
| `publishedAt` | Required |
| `readTime` | Required, e.g. `8 min read` |
| `category` | Required reference |
| `author` | Required reference |
| `authorRole` | Optional per-post override |
| `coverImage` | Required before publishing; alt text required |
| `body` | Required structured array |

## Supported Body Blocks

- Portable Text block styles: `normal`, `h2`, `h3`
- `blogImage`: image asset, required alt text, optional caption
- `callout`: one text field
- `table`: headers and rows of cells
- `steps`: items with title and optional description
- `highlights`: items with title and description

The current public renderer supports:

- paragraphs
- Heading 2 and Heading 3
- bold marks
- callouts
- body images and captions
- tables
- numbered Steps
- Highlight cards
- automatic links for VyaptIX URLs, VyaptIX email addresses, and supported phone
  numbers

The Studio text toolbar intentionally exposes only bold inline formatting. It
does not expose arbitrary external links, italics, underline, or normal bullet
lists because the public renderer does not support them. Use Steps or
Highlights instead of manually typed lists.

## Draft Creation Pattern

Always reuse existing Author and Category documents:

```powershell
npx sanity documents query "*[_type == 'author']{_id,name,role}" --api-version 2026-06-06
npx sanity documents query "*[_type == 'category']{_id,title,slug}" --api-version 2026-06-06
```

Create only a draft document:

```json
{
  "_id": "drafts.blogPost-example-slug",
  "_type": "blogPost",
  "title": "Example Title",
  "slug": {"_type": "slug", "current": "example-slug"},
  "published": false
}
```

Upsert and verify:

```powershell
npx sanity documents create <temporary-json-file> --replace --project-id a3ejtqyf --dataset production
npx sanity documents get drafts.blogPost-<slug> --project-id a3ejtqyf --dataset production
```

Remove the temporary JSON file after verification.

## Studio Manual Workflow

1. Open `/studio`.
2. Open or create the Blog Post.
3. Keep `Published` off while editing.
4. Use the Body field's `+` control to insert images, callouts, tables, steps,
   and highlights between paragraphs.
5. Drag complete blocks to reposition them.
6. Upload a 16:9 cover image and add alt text.
7. Review all fields.
8. Turn `Published` on only after approval.
9. Use Sanity's Publish action.

Both the custom switch and Sanity Publish action are needed for a public post.

## Verification

Before reporting success:

- validate draft or published status directly
- confirm required fields
- query public published-post count when creating a draft
- validate schema after schema changes
- verify the public route after publishing
- check webhook state if immediate production refresh matters
