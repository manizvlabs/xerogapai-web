'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendlyWidget } from '../components/ui/CalendlyWidget';

export function ThankYou() {
  const [scaled, setScaled] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScaled(true), 60);
    const t2 = setTimeout(() => setDrawn(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const circumference = 2 * Math.PI * 45; // ≈ 282.7

  return (
    <section className="min-h-screen bg-[#050D1A] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
      </div>

      {/* Confirmation card */}
      <div
        className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-10 md:p-14 max-w-lg w-full text-center"
        style={{
          opacity: scaled ? 1 : 0,
          transform: scaled ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(16px)',
          transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* SVG animated checkmark */}
        <div className="flex justify-center mb-8">
          <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
            {/* Outer glow ring */}
            <circle cx="50" cy="50" r="48" fill="rgba(6,206,255,0.06)" />
            {/* Animated circle border */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#06CEFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={drawn ? 0 : circumference}
              style={{
                transition: `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)`,
                transform: 'rotate(-90deg)',
                transformOrigin: '50px 50px',
              }}
            />
            {/* Animated checkmark */}
            <polyline
              points="28,52 43,67 72,36"
              fill="none"
              stroke="#06CEFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="72"
              strokeDashoffset={drawn ? 0 : 72}
              style={{
                transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1) 0.7s',
              }}
            />
          </svg>
        </div>

        <p className="label-mono-cyan mb-3">Message Received</p>
        <h1 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>We&apos;ll be in touch soon.</h1>
        <p className="text-slate-200 mb-6 leading-relaxed">
          Your message is with us. Ajeet (founder) typically replies within a few hours during business days.
        </p>

        {/* What happens next */}
        <div className="text-left space-y-3 mb-8">
          {[
            { step: '1', text: 'You\'ll get a confirmation email shortly.' },
            { step: '2', text: 'Ajeet will review your message and reply within 24 hours.' },
            { step: '3', text: 'If it\'s a good fit, you\'ll get a direct link to book a 15-minute call.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#06CEFF]/15 border border-[#06CEFF]/30 text-[#06CEFF] text-xs font-semibold flex items-center justify-center mt-0.5">
                {item.step}
              </span>
              <p className="text-slate-100 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
          >
            Book a Call Now
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
          >
            Explore Products
          </Link>
        </div>
      </div>

      {/* Calendly — skip the wait */}
      <div
        className="relative z-10 mt-16 w-full max-w-2xl"
        style={{
          opacity: scaled ? 1 : 0,
          transform: scaled ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}
      >
        <div className="text-center mb-8">
          <p className="label-mono-cyan mb-2">Skip the Wait</p>
          <h2 className="font-playfair italic font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Book a time that works for you</h2>
          <p className="text-slate-300 mt-2 text-sm">15-minute intro call — no fluff, just real answers.</p>
        </div>
        <CalendlyWidget />
      </div>
    </section>
  );
}
