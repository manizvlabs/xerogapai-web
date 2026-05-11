'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Star, Users, MessageCircle, BarChart3,
  ArrowRight, ExternalLink, CheckCircle,
} from 'lucide-react';
import { trackEvent } from '../lib/analytics';

/* ─── Product data ─────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 'ai-review',
    name: 'AI Review Generator',
    tagline: 'Authentic Google reviews in under 20 seconds.',
    description:
      'Customers rate their experience, AI writes the review, they post it in one tap. No chasing, no awkward asks — just a steady stream of real reviews.',
    accentColor: '#06CEFF',
    Icon: Star,
    statusLabel: 'Live — Free to try',
    statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
    stat: { value: '4.7★', label: 'average rating lift' },
    features: ['QR code + shareable link', 'AI-written review text', 'Real-time analytics dashboard', 'Google Maps ranking boost'],
    primaryCta: { label: 'Try Free', href: 'https://reviews.vyaptix.ai', external: true },
    secondaryCta: { label: 'Learn More', href: '/solutions/ai-review-generation', external: false },
  },
  {
    id: 'agent-mitra',
    name: 'AgentMitra',
    tagline: 'One workspace for your entire service team.',
    description:
      'Replace scattered spreadsheets and WhatsApp threads with a role-based platform that keeps every agent, client, and workflow in sync.',
    accentColor: '#A855F7',
    Icon: Users,
    statusLabel: 'Early Access',
    statusClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    dotClass: 'bg-amber-400',
    stat: { value: '2 days', label: 'average onboarding time' },
    features: ['Role-based access control', 'Instant client search', 'Unified agent workspace', 'Live status tracking'],
    primaryCta: { label: 'Learn More', href: '/agent-mitra', external: false },
    secondaryCta: { label: 'Request Access', href: '/contact', external: false },
  },
  {
    id: 'setu',
    name: 'Setu',
    tagline: 'WhatsApp marketing that scales with your business.',
    description:
      'Send campaigns to thousands, automate replies 24/7, manage your team inbox, and close more leads — all without leaving WhatsApp.',
    accentColor: '#25D366',
    Icon: MessageCircle,
    statusLabel: 'Live — From ₹999/mo',
    statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
    stat: { value: '98%', label: 'WhatsApp message open rate' },
    features: ['Segmented broadcast campaigns', '24/7 AI chatbot', 'Shared team inbox', 'Lead pipeline & Kanban'],
    primaryCta: { label: 'Start Free', href: 'https://setu.vyaptix.ai', external: true },
    secondaryCta: { label: 'Learn More', href: '/solutions/setu', external: false },
  },
  {
    id: 'banklens',
    name: 'BankLens',
    tagline: 'AI credit decisioning for NBFCs in under 5 minutes.',
    description:
      '220+ financial signals, 14-signal fraud detection, and a structured APPROVE / REVIEW / REJECT decision — in under 5 minutes. Built for India\'s lenders.',
    accentColor: '#F59E0B',
    Icon: BarChart3,
    statusLabel: 'Live — From ₹12/report',
    statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
    stat: { value: '220+', label: 'financial signals per statement' },
    features: ['40+ Indian banks supported', 'ML-powered credit scoring', '14-signal fraud detection', 'Audit-ready CAM reports'],
    primaryCta: { label: 'Open Platform', href: 'https://banklens.vyaptix.ai', external: true },
    secondaryCta: { label: 'Learn More', href: '/solutions/banklens', external: false },
  },
];

/* ─── "Pick your fit" data ──────────────────────────────────────── */

const FITS = [
  {
    persona: 'Local business owner',
    problem: 'Need more Google reviews without chasing every customer',
    product: 'AI Review Generator',
    href: '/solutions/ai-review-generation',
    accentColor: '#06CEFF',
    Icon: Star,
  },
  {
    persona: 'Service team manager',
    problem: 'Operations scattered across WhatsApp & spreadsheets',
    product: 'AgentMitra',
    href: '/agent-mitra',
    accentColor: '#A855F7',
    Icon: Users,
  },
  {
    persona: 'WhatsApp marketer',
    problem: 'Need to reach thousands and automate follow-ups',
    product: 'Setu',
    href: '/solutions/setu',
    accentColor: '#25D366',
    Icon: MessageCircle,
  },
  {
    persona: 'NBFC or fintech lender',
    problem: 'Manual bank statement analysis slowing credit decisions',
    product: 'BankLens',
    href: '/solutions/banklens',
    accentColor: '#F59E0B',
    Icon: BarChart3,
  },
];

/* ─── Scroll-reveal hook ────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* ─── Product card ──────────────────────────────────────────────── */

function ProductCard({ product, index, visible }: {
  product: typeof PRODUCTS[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { name, tagline, description, accentColor, Icon, statusLabel, statusClass, dotClass, stat, features, primaryCta, secondaryCta } = product;

  return (
    <div
      className="group relative rounded-2xl border overflow-hidden transition-all duration-500"
      style={{
        borderColor: hovered ? `${accentColor}40` : 'rgba(255,255,255,0.07)',
        background: hovered ? `rgba(10,22,40,0.95)` : 'rgba(10,22,40,0.7)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 100}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 100}ms, border-color 0.3s, background 0.3s`,
        boxShadow: hovered ? `0 0 48px ${accentColor}14` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent top bar */}
      <div
        className="h-0.5 w-full transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)`, opacity: hovered ? 1 : 0.4 }}
      />

      {/* Corner squares on hover — 21st.dev Dark Grid pattern */}
      {hovered && (
        <>
          <div className="absolute -left-1 -top-1 h-2.5 w-2.5 z-10" style={{ background: accentColor }} />
          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 z-10" style={{ background: accentColor }} />
          <div className="absolute -left-1 -bottom-1 h-2.5 w-2.5 z-10" style={{ background: accentColor }} />
          <div className="absolute -right-1 -bottom-1 h-2.5 w-2.5 z-10" style={{ background: accentColor }} />
        </>
      )}

      <div className="p-7 flex flex-col gap-5 h-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${statusClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClass}`} />
            {statusLabel}
          </span>
        </div>

        {/* Name + tagline */}
        <div>
          <h2 className="font-playfair italic font-bold text-white text-xl mb-1">{name}</h2>
          <p className="text-sm font-medium" style={{ color: accentColor }}>{tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">{description}</p>

        {/* Key stat */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}18` }}
        >
          <span className="text-2xl font-bold" style={{ color: accentColor }}>{stat.value}</span>
          <span className="text-xs text-slate-400">{stat.label}</span>
        </div>

        {/* Features */}
        <ul className="grid grid-cols-1 gap-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-auto pt-2">
          {primaryCta.external ? (
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
              style={{ background: accentColor, color: '#050D1A' }}
              onClick={() => trackEvent('cta_clicked', { label: `${primaryCta.label} — ${name}`, page: '/solutions' })}
            >
              {primaryCta.label} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
              style={{ background: accentColor, color: '#050D1A' }}
              onClick={() => trackEvent('cta_clicked', { label: `${primaryCta.label} — ${name}`, page: '/solutions' })}
            >
              {primaryCta.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          {secondaryCta.external ? (
            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-200 hover:bg-white/5"
              style={{ color: accentColor, borderColor: `${accentColor}30` }}
              onClick={() => trackEvent('cta_clicked', { label: `${secondaryCta.label} — ${name}`, page: '/solutions' })}
            >
              {secondaryCta.label} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-200 hover:bg-white/5"
              style={{ color: accentColor, borderColor: `${accentColor}30` }}
              onClick={() => trackEvent('cta_clicked', { label: `${secondaryCta.label} — ${name}`, page: '/solutions' })}
            >
              {secondaryCta.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main view ─────────────────────────────────────────────────── */

export function Solutions() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsRef, cardsVisible] = useInView();
  const [fitsRef, fitsVisible] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>

{/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white py-28 md:py-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-[#06CEFF]/6 blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full bg-[#1A52E0]/10 blur-3xl" />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#06CEFF]/25 bg-[#06CEFF]/8 text-[#06CEFF] text-xs font-mono uppercase tracking-widest mb-8"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.5s', transitionDelay: '50ms' }}
          >
            VyaptIX Products
          </div>
          <h1
            className="font-playfair italic font-bold text-white mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              lineHeight: 1.05,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 200ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) 200ms',
            }}
          >
            Four Products.{' '}
            <span style={{ color: '#06CEFF' }}>One Goal.</span>
          </h1>
          <p
            className="text-lg text-white/55 max-w-2xl mx-auto mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1) 500ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) 500ms',
            }}
          >
            Remove real friction from your business. Every VyaptIX product tackles a specific, painful problem — no hype, no bloat, just tools that work.
          </p>

          {/* Product name strip */}
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.6s 700ms',
            }}
          >
            {PRODUCTS.map((p) => (
              <span
                key={p.id}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ color: p.accentColor, borderColor: `${p.accentColor}30`, background: `${p.accentColor}0A` }}
              >
                <p.Icon className="w-3 h-3" />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-product grid ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">The Full Suite</p>
            <h2
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
            >
              Pick the product that fits your problem
            </h2>
          </div>

          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 gap-6"
          >
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} visible={cardsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pick your fit ── */}
      <section className="py-20 md:py-28 bg-[#050D1A] border-y border-white/6">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">Not sure where to start?</p>
            <h2
              className="font-playfair italic font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15 }}
            >
              Find the right product for you
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Each product solves a different problem. Match your situation below.
            </p>
          </div>

          <div
            ref={fitsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FITS.map((fit, i) => (
              <Link
                key={fit.persona}
                href={fit.href}
                className="group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: 'rgba(255,255,255,0.07)',
                  background: 'rgba(10,22,40,0.6)',
                  opacity: fitsVisible ? 1 : 0,
                  transform: fitsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms, border-color 0.2s, scale 0.2s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${fit.accentColor}35`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${fit.accentColor}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
                onClick={() => trackEvent('cta_clicked', { label: `Pick Your Fit — ${fit.product}`, page: '/solutions' })}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${fit.accentColor}14`, border: `1px solid ${fit.accentColor}28` }}
                >
                  <fit.Icon className="w-5 h-5" style={{ color: fit.accentColor }} />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: fit.accentColor }}>
                    If you are a
                  </p>
                  <p className="font-semibold text-white text-sm mb-2">{fit.persona}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{fit.problem}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold" style={{ color: fit.accentColor }}>
                  {fit.product} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-10">
            Still not sure?{' '}
            <Link
              href="/contact"
              className="text-[#06CEFF] font-semibold hover:underline"
              onClick={() => trackEvent('cta_clicked', { label: 'Book a call — solutions', page: '/solutions' })}
            >
              Book a 30-minute call
            </Link>{' '}
            and we'll tell you exactly where to start.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 md:py-32 bg-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[#06CEFF]/5 blur-3xl animate-glow-pulse" />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <p className="label-mono-cyan mb-5">Ready to See These in Action?</p>
          <h2
            className="font-playfair italic font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Start with one.{' '}
            <span style={{ color: '#06CEFF' }}>Scale with all four.</span>
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto">
            Every product is live and built for real business teams. Try one free, or book a demo and we'll walk you through the full suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reviews.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,206,255,0.3)] transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Try AI Review Generator Free — CTA', page: '/solutions' })}
            >
              Try AI Review Generator Free <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/8 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Book a Demo — CTA', page: '/solutions' })}
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
