# How to Create Blog Posts on the VyaptIX Website

**Who this is for:** Ajeet, Armaan, Manish, and any VyaptIX team member who wants to publish a blog post.  
**Time to publish:** ~3 minutes to write + ~2 minutes for the website to update automatically.

---

## The Big Picture

Blog posts are stored as simple text files (Markdown `.md`) inside the `content/blog/` folder of the GitHub repo. When you save/publish a post, the website rebuilds automatically in about 2 minutes and your post goes live.

You have **two ways** to create a post. Choose based on your preference:

| Method | Best For | Requires |
|---|---|---|
| **Method A — Browser editor (Decap CMS)** | Non-technical team members | One-time GitHub OAuth setup by Ajeet |
| **Method B — Create the file manually** | Anyone comfortable with GitHub or VS Code | Nothing extra |

---

## One-Time Setup (Only Ajeet needs to do this — once)

Before Method A works, Ajeet must create a GitHub OAuth App so the browser editor can log in securely.

**Steps (takes 5 minutes):**

1. Go to: [github.com](https://github.com) → click your profile picture → **Settings**
2. Scroll down to **Developer settings** (bottom of left sidebar) → **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name:** `VyaptIX Blog Admin`
   - **Homepage URL:** `https://vyaptix.com`
   - **Authorization callback URL:** `https://vyaptix.com/api/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy the secret
7. Go to your **Vercel dashboard** → VyaptIX project → **Settings** → **Environment Variables**
8. Add two variables:
   - `GITHUB_CLIENT_ID` = the Client ID from step 6
   - `GITHUB_CLIENT_SECRET` = the secret from step 6
9. Redeploy the website once (Vercel → Deployments → Redeploy latest)

**That's it. Never needs to be done again.**

---

## Method A — Browser Editor (Recommended for Non-Technical Team)

Once the one-time setup above is done:

### Step 1 — Open the editor
Go to: **https://vyaptix.com/admin**

### Step 2 — Log in with GitHub
Click **Login with GitHub**. It will ask you to authorize the VyaptIX app — click Allow. You only need to do this once per browser.

### Step 3 — Create a new post
- Click **Blog Posts** in the left sidebar
- Click **New Blog Posts** button (top right)

### Step 4 — Fill in the fields

| Field | What to put |
|---|---|
| **Title** | The full title of the post. Example: `How AI Helps Restaurants Get More Google Reviews` |
| **Excerpt** | 1–2 sentence summary shown on the blog listing page. Keep it under 200 characters. |
| **Date** | The publish date. Pick today or a future date. Format: YYYY-MM-DD |
| **Read Time** | Estimate in minutes. Example: `5 min read` |
| **Category** | Choose one: **Products**, **Trending in AI**, or **Business** |
| **Author Name** | Your full name. Example: `Ajeet Singh` |
| **Author Role** | Your role. Example: `Co-Founder | CEO, VyaptIX Technologies` |
| **Hero Image** | Upload an image (JPG/PNG, ideally 1200×675px). It will appear at the top of the post. |
| **Published** | Toggle **ON** to make it live. Leave OFF to save as draft. |
| **Body** | The full content of your post (see writing guide below) |

### Step 5 — Publish
- Toggle **Published** to ON
- Click **Publish** (top right)

The editor commits the file to GitHub. Vercel detects the change and rebuilds the site. **Your post will be live at `vyaptix.com/blog/your-post-slug` in about 2 minutes.**

---

## Method B — Create the File Manually (GitHub or VS Code)

This is the faster method if you're already in VS Code or on GitHub.

### File location
All blog posts live here:
```
content/blog/your-post-slug.md
```

### Step 1 — Create a new file
Name the file using lowercase words separated by hyphens. The filename becomes the URL.

Example: `content/blog/how-ai-helps-restaurants-get-more-reviews.md`  
→ URL will be: `vyaptix.com/blog/how-ai-helps-restaurants-get-more-reviews`

### Step 2 — Copy this template and fill it in

```markdown
---
title: "Your Post Title Goes Here"
slug: "your-post-slug-matches-filename"
excerpt: "One or two sentences that summarise the post. Shown on the blog listing page."
date: "2026-05-01"
readTime: "5 min read"
category: "Business"
author: "Your Name"
authorRole: "Your Role, VyaptIX Technologies"
image: "/blog/your-image-filename.png"
published: true
---

Your post content starts here. Write in plain English — no special formatting needed for paragraphs.

## Section Heading

Use two hash symbols for section headings.

### Sub-Heading

Use three hash symbols for sub-headings.

**Bold text** uses two asterisks on each side.

- Bullet point one
- Bullet point two
- Bullet point three

1. Numbered list item one
2. Numbered list item two

> This is a blockquote. Great for callouts or key insights.

| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Row 1 data | Row 1 data | Row 1 data |
| Row 2 data | Row 2 data | Row 2 data |
```

### Step 3 — Add the hero image
Put your image file in the `public/blog/` folder.  
Name it something clean: `how-ai-helps-restaurants.png`  
Then set `image: "/blog/how-ai-helps-restaurants.png"` in the frontmatter.

**Recommended image size:** 1200 × 675 pixels (16:9 ratio)

### Step 4 — Commit and push
If you're in VS Code:
1. Open the Source Control panel (Ctrl+Shift+G)
2. Stage the new file(s)
3. Write a commit message: `Add blog post: your post title`
4. Click Commit, then Push

If you're on GitHub.com:
1. Navigate to `content/blog/`
2. Click **Add file** → **Create new file**
3. Paste your content
4. Click **Commit changes**

Vercel detects the push and rebuilds. **Post is live in ~2 minutes.**

---

## Writing Guide — Markdown Quick Reference

You don't need to know Markdown deeply. Here are the things you'll use most:

```markdown
## Big section heading
### Smaller sub-heading

Normal paragraph text. Just type. No special characters needed.

**Bold** — wrap in double asterisks
*Italic* — wrap in single asterisks

- Unordered list item
- Another item

1. Numbered list item
2. Another numbered item

> Blockquote — great for highlighting a key insight or quote

| Header 1 | Header 2 |
|---|---|
| Cell | Cell |

[Link text](https://example.com)
```

---

## Rules to Follow for Consistent Quality

1. **Always set `published: false` first** while writing — switch to `true` only when the post is ready.
2. **Category must be exactly one of:** `Products` / `Trending in AI` / `Business` (case-sensitive).
3. **Slug must match the filename** exactly (minus the `.md`). If your file is `great-post.md`, set `slug: "great-post"`.
4. **Date format is `YYYY-MM-DD`** — example: `2026-05-01`. Wrong format breaks the sort order.
5. **Image must be placed in `public/blog/`** and the `image:` field must start with `/blog/`.
6. **Read time is manual** — estimate 200 words per minute. A 1000-word post = `5 min read`.
7. **Excerpt should be under 200 characters** — it appears in the card preview and in Google search results.

---

## Checking Your Post Before Publishing

Before setting `published: true`, check:

- [ ] Title is clear and specific (not clickbait, not vague)
- [ ] Excerpt summarises the post accurately in 1–2 sentences
- [ ] Date is set correctly
- [ ] Category is one of the three valid options
- [ ] Hero image is uploaded to `public/blog/` and the path in frontmatter is correct
- [ ] Author name and role are correct
- [ ] `slug` matches the filename

---

## Where Your Post Appears After Publishing

| Location | URL |
|---|---|
| Blog listing page | `vyaptix.com/blog` |
| Individual post page | `vyaptix.com/blog/your-slug` |
| Sitemap (for Google) | `vyaptix.com/sitemap.xml` — auto-updated on each build |

Google will index the post within a few days of publishing.

---

## Frequently Asked Questions

**Q: Can I save a draft without publishing?**  
Yes. Set `published: false` in the frontmatter (or leave the Published toggle OFF in the CMS). The file will be committed to GitHub but the post won't appear on the website.

**Q: How do I edit a post after publishing?**  
- CMS: Open the post in the admin editor, make changes, click Save/Publish.
- Manual: Edit the `.md` file, commit, and push. Website updates in 2 minutes.

**Q: How do I delete a post?**  
Delete the `.md` file from `content/blog/` and commit. The post disappears from the website after the next build.

**Q: Can I schedule a post for the future?**  
Not automatically. You can set a future date in the `date:` field, but the post will go live as soon as `published: true` is committed. To schedule, set `published: false` and manually flip it to `true` on the day you want it to go live.

**Q: What if the website doesn't update after 2 minutes?**  
Go to the Vercel dashboard and check if the build failed. Common causes: a syntax error in the frontmatter YAML (missing quote, wrong category name, wrong date format). Fix the error and push again.

**Q: Who has access to the CMS editor?**  
Anyone who is a member of the `manizvlabs` GitHub organisation can log in. To add a new team member, invite them to the GitHub org first.
