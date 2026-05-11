'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Mail } from 'lucide-react';

/* ── Design A: Lost astronaut floating in space ── */
function AstronautIllustration() {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[320px] mx-auto"
      aria-hidden="true"
    >
      {/* Stars */}
      {[
        [20, 30], [60, 15], [100, 45], [150, 10], [200, 35], [250, 18], [290, 40],
        [35, 80], [80, 65], [130, 75], [180, 58], [230, 72], [275, 60],
        [10, 130], [55, 145], [110, 120], [165, 140], [215, 125], [265, 148], [305, 115],
        [40, 200], [95, 215], [155, 195], [205, 210], [260, 200], [300, 220],
        [25, 255], [75, 242], [135, 260], [185, 248], [240, 258], [285, 240],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 1.5 : 1}
          fill="white"
          opacity={0.3 + (i % 4) * 0.15}
        />
      ))}

      {/* Planet (bottom-left) */}
      <circle cx="52" cy="220" r="38" fill="url(#planetGrad)" opacity="0.85" />
      <ellipse cx="52" cy="220" rx="58" ry="10" stroke="#A855F7" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="38" cy="208" r="6" fill="#7C3AED" opacity="0.4" />
      <circle cx="62" cy="230" r="4" fill="#7C3AED" opacity="0.3" />

      {/* Small moon (top-right) */}
      <circle cx="272" cy="48" r="18" fill="url(#moonGrad)" />
      <circle cx="266" cy="42" r="4" fill="#0A1628" opacity="0.35" />
      <circle cx="278" cy="54" r="2.5" fill="#0A1628" opacity="0.25" />
      <circle cx="270" cy="58" r="3" fill="#0A1628" opacity="0.2" />

      {/* Floating stars/sparkles */}
      <g opacity="0.7">
        <path d="M245 95 l2 6 l2-6 l-6 2 l6 2z" fill="#06CEFF" />
        <path d="M80 100 l1.5 4.5 l1.5-4.5 l-4.5 1.5 l4.5 1.5z" fill="#A855F7" />
        <path d="M290 160 l1.5 4.5 l1.5-4.5 l-4.5 1.5 l4.5 1.5z" fill="#06CEFF" opacity="0.5" />
      </g>

      {/* Tether/rope drifting */}
      <path
        d="M160 85 Q145 100 155 118 Q165 136 150 150"
        stroke="#06CEFF"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.4"
        fill="none"
      />

      {/* === ASTRONAUT === */}
      <g transform="translate(130, 75) rotate(-12, 60, 90)">
        {/* Jetpack */}
        <rect x="44" y="68" width="16" height="22" rx="4" fill="#1A3A5C" stroke="#06CEFF" strokeWidth="0.8" opacity="0.9" />
        <rect x="46" y="72" width="5" height="10" rx="2" fill="#06CEFF" opacity="0.3" />
        <rect x="53" y="72" width="5" height="10" rx="2" fill="#06CEFF" opacity="0.3" />
        {/* Thruster glow */}
        <ellipse cx="52" cy="91" rx="6" ry="3" fill="#06CEFF" opacity="0.25" />

        {/* Body / spacesuit */}
        <rect x="36" y="65" width="32" height="36" rx="10" fill="url(#suitGrad)" stroke="#06CEFF" strokeWidth="1" />
        {/* Chest panel */}
        <rect x="43" y="74" width="18" height="12" rx="3" fill="#0A1628" stroke="#06CEFF" strokeWidth="0.6" opacity="0.8" />
        <circle cx="47" cy="78" r="1.5" fill="#06CEFF" opacity="0.8" />
        <circle cx="52" cy="78" r="1.5" fill="#A855F7" opacity="0.8" />
        <circle cx="57" cy="78" r="1.5" fill="#4ADE80" opacity="0.8" />
        <rect x="44" y="82" width="16" height="2" rx="1" fill="#06CEFF" opacity="0.3" />

        {/* Helmet */}
        <circle cx="52" cy="52" r="22" fill="url(#helmetGrad)" stroke="#06CEFF" strokeWidth="1.2" />
        {/* Visor */}
        <ellipse cx="52" cy="52" rx="14" ry="13" fill="url(#visorGrad)" opacity="0.9" />
        {/* Visor reflection */}
        <ellipse cx="46" cy="46" rx="5" ry="4" fill="white" opacity="0.12" transform="rotate(-20 46 46)" />
        <ellipse cx="56" cy="48" rx="2" ry="3" fill="white" opacity="0.08" transform="rotate(10 56 48)" />

        {/* Left arm (reaching out) */}
        <path d="M36 75 Q22 68 16 60" stroke="url(#suitGrad)" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="58" r="6" fill="url(#suitGrad)" stroke="#06CEFF" strokeWidth="0.8" />

        {/* Right arm (down/drifting) */}
        <path d="M68 75 Q78 80 82 88" stroke="url(#suitGrad)" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="84" cy="91" r="6" fill="url(#suitGrad)" stroke="#06CEFF" strokeWidth="0.8" />

        {/* Legs */}
        <rect x="38" y="98" width="13" height="18" rx="6" fill="url(#suitGrad)" stroke="#06CEFF" strokeWidth="0.8" />
        <rect x="53" y="98" width="13" height="18" rx="6" fill="url(#suitGrad)" stroke="#06CEFF" strokeWidth="0.8" />
        {/* Boots */}
        <rect x="36" y="113" width="17" height="7" rx="4" fill="#1A3A5C" stroke="#06CEFF" strokeWidth="0.6" />
        <rect x="51" y="113" width="17" height="7" rx="4" fill="#1A3A5C" stroke="#06CEFF" strokeWidth="0.6" />
      </g>

      {/* Floating wrench (drifting away) */}
      <g transform="translate(238, 148) rotate(35)">
        <rect x="0" y="-3" width="22" height="6" rx="3" fill="#334155" stroke="#475569" strokeWidth="0.8" />
        <rect x="-3" y="-5" width="8" height="10" rx="2" fill="#475569" />
        <rect x="17" y="-5" width="8" height="10" rx="2" fill="#475569" />
      </g>

      {/* Gradients */}
      <defs>
        <radialGradient id="planetGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </radialGradient>
        <radialGradient id="moonGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <radialGradient id="helmetGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </radialGradient>
        <radialGradient id="visorGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0A1628" stopOpacity="0.9" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function NotFound() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-[#050D1A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-[#06CEFF]/4 blur-3xl" />
      </div>

      <div
        className="relative z-10 text-center max-w-xl w-full flex flex-col items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          className="w-full mb-2"
          style={{ animation: 'astronautFloat 6s ease-in-out infinite' }}
        >
          <AstronautIllustration />
        </div>

        <p
          className="font-black leading-none select-none mb-3"
          style={{
            fontSize: 'clamp(72px, 15vw, 120px)',
            background: 'linear-gradient(180deg, rgba(6,206,255,0.85) 0%, rgba(6,206,255,0.12) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </p>

        <p className="label-mono-cyan mb-3">Houston, we have a problem</p>
        <h1
          className="font-playfair italic font-bold text-white mb-4"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
        >
          You&apos;re floating in the void
        </h1>
        <p className="text-slate-400 mb-10 leading-relaxed max-w-sm">
          This page drifted off into deep space. Let&apos;s get you back to familiar territory.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,206,255,0.3)] transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/8 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes astronautFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(1.5deg); }
          66%       { transform: translateY(-6px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
}
