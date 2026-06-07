import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Linkedin, Twitter, Share2 } from 'lucide-react';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { ReadingProgress } from '@/src/components/blog/ReadingProgress';
import { TableOfContents } from '@/src/components/blog/TableOfContents';
import { BlogContent } from '@/src/components/blog/BlogContent';
import { getAllSlugs, getPostBySlug } from '@/src/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function absoluteImageUrl(image: string) {
  return image.startsWith('http') ? image : `https://vyaptix.com${image}`;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const ogImage = absoluteImageUrl(post.image);

  return {
    title: post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `https://vyaptix.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `https://vyaptix.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: ogImage, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDescription ?? post.excerpt,
      images: [ogImage],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Products: 'text-[#06CEFF] bg-[#06CEFF]/10 border-[#06CEFF]/20',
  'Trending in AI': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Business: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VyaptIX',
      logo: { '@type': 'ImageObject', url: 'https://vyaptix.com/vyaptix-logo.png' },
    },
    url: `https://vyaptix.com/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://vyaptix.com/blog/${post.slug}` },
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://vyaptix.com/blog/${post.slug}`)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://vyaptix.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading progress bar — fixed at top */}
      <ReadingProgress />

      {/* ── Breadcrumb ── */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>
      </div>

      <article>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden hero-luxury-bg text-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/7 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A52E0]/12 blur-3xl" />
          </div>
          <div className="container-main py-14 md:py-20 relative">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-white text-sm mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>

              <div className="mb-5">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[post.category] ?? 'text-slate-200 bg-white/5 border-white/10'}`}>
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-slate-200 mb-10">{post.excerpt}</p>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#06CEFF]/20 border border-[#06CEFF]/30 flex items-center justify-center text-[#06CEFF] font-bold text-sm">
                    {post.author.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{post.author.name}</p>
                    <p className="text-xs text-slate-300">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured image ── */}
        <div className="bg-[#050D1A] pt-10 pb-0">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Article body + ToC sidebar ── */}
        <section className="bg-[#050D1A] py-14 pb-20">
          <div className="container-main">
            <div className="grid lg:grid-cols-[1fr_240px] gap-14 max-w-5xl mx-auto">

              {/* Article content */}
              <div className="min-w-0">
                <BlogContent blocks={post.content} />

                {/* Share bar */}
                <div className="mt-14 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-sm font-medium text-slate-200">Share this article</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={linkedInShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:border-[#06CEFF]/40 hover:text-[#06CEFF] transition-all"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={twitterShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:border-[#06CEFF]/40 hover:text-[#06CEFF] transition-all"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <button
                        className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:border-[#06CEFF]/40 hover:text-[#06CEFF] transition-all"
                        aria-label="Copy link"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ToC sidebar — desktop only */}
              <aside className="hidden lg:block">
                <TableOfContents />
              </aside>
            </div>
          </div>
        </section>
      </article>

    </>
  );
}
