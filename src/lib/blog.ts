import {client} from '@/sanity/lib/client'

export const BLOG_CATEGORIES = ['Products', 'Trending in AI', 'Business'] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

type BlogImageBlock = {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

type BlogTableBlock = {
  type: 'table'
  headers: string[]
  rows: string[][]
}

type BlogCalloutBlock = {
  type: 'callout'
  text: string
}

type BlogStepsBlock = {
  type: 'steps'
  items: Array<{
    title: string
    description?: string
  }>
}

type BlogHeadingBlock = {
  type: 'h2' | 'h3'
  text: string
}

type BlogHighlightsBlock = {
  type: 'highlights'
  items: Array<{
    title: string
    description: string
  }>
}

export type BlogContentBlock =
  | string
  | BlogImageBlock
  | BlogTableBlock
  | BlogCalloutBlock
  | BlogStepsBlock
  | BlogHighlightsBlock
  | BlogHeadingBlock

export interface BlogPostSummary {
  slug: string
  title: string
  excerpt: string
  seoDescription?: string
  image: string
  imageAlt: string
  category: BlogCategory
  date: string
  readTime: string
  published: boolean
  author: {
    name: string
    role: string
  }
}

export interface BlogPost extends BlogPostSummary {
  content: BlogContentBlock[]
}

type SanitySpan = {
  _type: 'span'
  text?: string
  marks?: string[]
}

type SanityBodyBlock =
  | {
      _type: 'block'
      style?: 'normal' | 'h2' | 'h3'
      children?: SanitySpan[]
    }
  | {
      _type: 'blogImage'
      src?: string
      alt?: string
      caption?: string
    }
  | {
      _type: 'callout'
      text?: string
    }
  | {
      _type: 'table'
      headers?: string[]
      rows?: Array<{cells?: string[]}>
    }
  | {
      _type: 'steps'
      items?: Array<{title?: string; description?: string}>
    }
  | {
      _type: 'highlights'
      items?: Array<{title?: string; description?: string}>
    }

type SanityPostSummary = {
  slug?: string
  title?: string
  excerpt?: string
  seoDescription?: string
  image?: string
  imageAlt?: string
  category?: BlogCategory
  date?: string
  readTime?: string
  author?: {
    name?: string
    role?: string
  }
}

type SanityPost = SanityPostSummary & {
  body?: SanityBodyBlock[]
}

const summaryFields = `
  "slug": slug.current,
  title,
  excerpt,
  seoDescription,
  "image": coverImage.asset->url,
  "imageAlt": coverImage.alt,
  "category": category->title,
  "date": publishedAt,
  readTime,
  "author": {
    "name": author->name,
    "role": coalesce(authorRole, author->role)
  }
`

const postFields = `
  ${summaryFields},
  "body": body[]{
    ...,
    _type == "blogImage" => {
      ...,
      "src": asset->url
    },
    _type == "table" => {
      ...,
      "rows": rows[]{cells}
    }
  }
`

const allPostsQuery = `*[_type == "blogPost" && published == true] | order(publishedAt desc) {${summaryFields}}`
const postBySlugQuery = `*[_type == "blogPost" && published == true && slug.current == $slug][0] {${postFields}}`
const allSlugsQuery = `*[_type == "blogPost" && published == true && defined(slug.current)].slug.current`

function blockText(block: Extract<SanityBodyBlock, {_type: 'block'}>): string {
  return (block.children ?? [])
    .map((child) => {
      const text = child.text ?? ''
      return child.marks?.includes('strong') ? `**${text}**` : text
    })
    .join('')
}

function toContentBlock(block: SanityBodyBlock): BlogContentBlock | null {
  if (block._type === 'block') {
    const text = blockText(block)
    if (!text) return null
    if (block.style === 'h2' || block.style === 'h3') return {type: block.style, text}
    return text
  }

  if (block._type === 'blogImage' && block.src && block.alt) {
    return {type: 'image', src: block.src, alt: block.alt, caption: block.caption}
  }

  if (block._type === 'callout' && block.text) {
    return {type: 'callout', text: block.text}
  }

  if (block._type === 'table' && block.headers?.length) {
    return {
      type: 'table',
      headers: block.headers,
      rows: (block.rows ?? []).map((row) => row.cells ?? []),
    }
  }

  if (block._type === 'steps') {
    const items = (block.items ?? []).flatMap((item) =>
      item.title ? [{title: item.title, description: item.description}] : [],
    )
    return items.length ? {type: 'steps', items} : null
  }

  if (block._type === 'highlights') {
    const items = (block.items ?? []).flatMap((item) =>
      item.title && item.description ? [{title: item.title, description: item.description}] : [],
    )
    return items.length ? {type: 'highlights', items} : null
  }

  return null
}

function toBlogPostSummary(post: SanityPostSummary): BlogPostSummary | null {
  if (
    !post.slug ||
    !post.title ||
    !post.excerpt ||
    !post.image ||
    !post.category ||
    !post.date ||
    !post.readTime ||
    !post.author?.name
  ) {
    return null
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    seoDescription: post.seoDescription,
    image: post.image,
    imageAlt: post.imageAlt ?? post.title,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    published: true,
    author: {
      name: post.author.name,
      role: post.author.role ?? '',
    },
  }
}

function toBlogPost(post: SanityPost): BlogPost | null {
  const summary = toBlogPostSummary(post)
  if (!summary) return null

  return {
    ...summary,
    content: (post.body ?? []).flatMap((block) => {
      const contentBlock = toContentBlock(block)
      return contentBlock ? [contentBlock] : []
    }),
  }
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const posts = await client.fetch<SanityPostSummary[]>(allPostsQuery)
  return posts.flatMap((post) => {
    const mapped = toBlogPostSummary(post)
    return mapped ? [mapped] : []
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, {slug})
  return post ? toBlogPost(post) : null
}

export async function getAllSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allSlugsQuery)
}
