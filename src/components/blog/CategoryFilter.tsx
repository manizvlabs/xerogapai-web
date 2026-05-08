'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost, BlogCategory } from '@/src/lib/blog';

const CATEGORIES: Array<'All' | BlogCategory> = ['All', 'Products', 'Trending in AI', 'Business'];

const CATEGORY_COLORS: Record<string, string> = {
  Products: 'text-[#06CEFF] bg-[#06CEFF]/10 border-[#06CEFF]/20',
  'Trending in AI': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Business: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

interface CategoryFilterProps {
  posts: BlogPost[];
}

export function CategoryFilter({ posts }: CategoryFilterProps) {
  const [selected, setSelected] = useState<'All' | BlogCategory>('All');

  const filtered = selected === 'All' ? posts : posts.filter((p) => p.category === selected);
  const featured = selected === 'All' ? (filtered[0] ?? null) : null;
  const rest = selected === 'All' ? filtered.slice(1) : filtered;

  const counts: Record<string, number> = { All: posts.length };
  posts.forEach((p) => {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  });

  return (
    <>
      {/* Featured post */}
      {featured && (
        <div className="mb-14">
          <Link href={`/blog/${featured.slug}`} className="block group">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#06CEFF]/20 hover:shadow-[0_0_32px_rgba(6,206,255,0.06)] transition-all duration-300">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#06CEFF] bg-[#06CEFF]/10 border border-[#06CEFF]/20">
                    Featured
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${CATEGORY_COLORS[featured.category] ?? 'text-slate-200 bg-white/5 border-white/10'}`}>
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#06CEFF] transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-slate-200 mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-5 text-xs text-slate-400 mb-7">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#06CEFF]/20 border border-[#06CEFF]/30 flex items-center justify-center text-[#06CEFF] font-bold text-xs">
                      {featured.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{featured.author.name}</p>
                      <p className="text-xs text-slate-300">{featured.author.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#06CEFF] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              cat === selected
                ? 'bg-[#06CEFF]/10 border-[#06CEFF]/40 text-[#06CEFF]'
                : 'bg-white/5 border-white/10 text-slate-200 hover:border-white/20 hover:text-white/85'
            }`}
            aria-pressed={cat === selected}
          >
            {cat} <span className="text-xs opacity-80 ml-0.5">({counts[cat] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* Post grid */}
      {rest.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#06CEFF]/20 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(6,206,255,0.06)] transition-all duration-300"
              aria-label={`Read: ${post.title}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border mb-3 ${CATEGORY_COLORS[post.category] ?? 'text-slate-300 bg-white/5 border-white/10'}`}>
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#06CEFF] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-5 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400">No posts in this category yet.</p>
        </div>
      ) : null}
    </>
  );
}
