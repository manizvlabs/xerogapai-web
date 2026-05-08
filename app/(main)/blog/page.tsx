import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

      {/* ── Final CTA ── */}
      <section className="py-24 md:py-32 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
        </div>
        <div className="container-main text-center relative max-w-2xl mx-auto">
          <p className="label-mono-cyan mb-4">Ready to Automate?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Turn reading into results.
          </h2>
          <p className="text-slate-200 mb-10 max-w-lg mx-auto">
            See how VyaptIX AI tools work in real businesses — and get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/solutions/ai-review-generation"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(6,206,255,0.3)] transition-all"
            >
              Try AI Review Generator <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
