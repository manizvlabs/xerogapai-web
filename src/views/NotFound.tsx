'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Mail } from 'lucide-react';

export function NotFound() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-[#050D1A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#06CEFF]/4 blur-3xl" />
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary-500/8 blur-3xl" />
      </div>

      <div
        className="relative z-10 text-center max-w-lg w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* 404 number */}
        <p
          className="font-black leading-none select-none mb-6"
          style={{
            fontSize: 'clamp(100px, 20vw, 160px)',
            background: 'linear-gradient(180deg, rgba(6,206,255,0.7) 0%, rgba(6,206,255,0.08) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </p>

        <p className="label-mono-cyan mb-4">Page Not Found</p>
        <h1 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
          This page doesn&apos;t exist
        </h1>
        <p className="text-slate-300 mb-10 leading-relaxed">
          The page you&apos;re looking for has been moved, deleted, or never existed.
          Head back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
