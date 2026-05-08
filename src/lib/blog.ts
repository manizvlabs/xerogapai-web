import { blogs, type BlogPostRecord, type BlogCategory, type BlogContentBlock } from '../data/blogs';

export type { BlogCategory, BlogContentBlock };
export type BlogPost = BlogPostRecord;

export async function getAllPosts(): Promise<BlogPost[]> {
  return blogs.filter((p) => p.published);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogs.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  return blogs.filter((p) => p.published).map((p) => p.slug);
}
