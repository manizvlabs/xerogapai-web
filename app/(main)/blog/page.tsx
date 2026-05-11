import type { Metadata } from 'next';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { CategoryFilter } from '@/src/components/blog/CategoryFilter';
import { getAllPosts } from '@/src/lib/blog';
import { NewsletterCapture } from '@/src/components/blog/NewsletterCapture';

export const metadata: Metadata = {
  title: 'Blog — AI Automation Insights | VyaptIX',
  description:
    'AI automation insights, product updates, and business growth strategies from the VyaptIX team.',
  alternates: { canonical: 'https://vyaptix.com/blog' },
  openGraph: {
    title: 'Blog — AI Automation Insights | VyaptIX',
    description:
      'AI automation insights, product updates, and business growth strategies from the VyaptIX team.',
    url: 'https://vyaptix.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/7 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A52E0]/12 blur-3xl" />
        </div>
        <div className="container-main relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label-mono-cyan mb-4">The VyaptIX Blog</p>
            <h1
              className="font-playfair italic font-bold text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 1.05 }}
            >
              AI Automation Insights
            </h1>
            <p className="text-lg text-slate-200 max-w-xl mx-auto">
              AI automation insights, product updates, and business growth from the VyaptIX team.
            </p>
          </div>
        </div>
      </section>

      {/* ── Newsletter capture ── */}
      <NewsletterCapture />

      {/* ── Post grid ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-400 text-lg">No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <CategoryFilter posts={posts} />
          )}
        </div>
      </section>

    </>
  );
}
