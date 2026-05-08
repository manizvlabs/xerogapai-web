'use client';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('article h2, article h3'));
    const toc = headings.map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '',
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));

    headings.forEach((el, i) => {
      if (!el.id) el.id = toc[i].id;
    });

    setItems(toc);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24 space-y-0.5" aria-label="Table of contents">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Contents</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-[13px] py-1 transition-all duration-150 border-l-2 ${
            item.level === 3 ? 'pl-5' : 'pl-3'
          } ${
            activeId === item.id
              ? 'border-[#06CEFF] text-[#06CEFF] font-medium'
              : 'border-white/10 text-slate-300 hover:text-slate-100 hover:border-white/20'
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
