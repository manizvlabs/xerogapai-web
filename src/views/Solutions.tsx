'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Star, MessageCircle, BarChart3,
  ArrowRight, ExternalLink,
} from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';

/* ─── Product directory data ────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 'ai-review',
    name: 'AI Review Generator',
    tagline: 'More Google reviews — on autopilot, in about 20 seconds.',
    accentColor: '#06CEFF',
    Icon: Star,
    statusLabel: 'Live',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.10)',
    statusBorder: 'rgba(74,222,128,0.22)',
    href: '/solutions/ai-review-generation',
    externalHref: 'https://reviews.vyaptix.ai',
    externalLabel: 'Get Started',
  },
  {
    id: 'setu',
    name: 'Setu',
    tagline: 'WhatsApp growth platform — campaigns, chatbot, inbox & commerce.',
    accentColor: '#25D366',
    Icon: MessageCircle,
    statusLabel: 'Live',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.10)',
    statusBorder: 'rgba(74,222,128,0.22)',
    href: '/solutions/setu',
    externalHref: 'https://setu.vyaptix.ai',
    externalLabel: 'Get Started',
  },
  {
    id: 'banklens',
    name: 'BankLens',
    tagline: 'AI credit decisioning for NBFCs in under 5 minutes.',
    accentColor: '#F59E0B',
    Icon: BarChart3,
    statusLabel: 'Live',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.10)',
    statusBorder: 'rgba(74,222,128,0.22)',
    href: '/solutions/banklens',
    externalHref: 'https://banklens.vyaptix.ai',
    externalLabel: 'Open Platform',
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

const sgHeading: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: '-0.025em',
};

/* ─── Main view ─────────────────────────────────────────────────── */

export function Solutions() {
  const [listRef, listVisible] = useInView();
  const [fitsRef, fitsVisible] = useInView();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
        </div>
      </div>

      {/* ── Page header ── */}
      <section className="py-16 md:py-20 bg-[#050D1A]">
        <div className="container-main max-w-2xl">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-5 border"
            style={{ color: '#06CEFF', background: 'rgba(6,206,255,0.08)', borderColor: 'rgba(6,206,255,0.28)' }}
          >
            VyaptIX Products
          </span>
          <h1
            className="font-bold text-white mb-4"
            style={{ ...sgHeading, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Three products.{' '}
            <span style={{ color: '#06CEFF' }}>Each solves one specific problem.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl">
            Pick the one that fits your situation, or scroll down to find it by use case.
          </p>
        </div>
      </section>

      {/* ── Thin product directory ── */}
      <section className="pb-16 bg-[#050D1A]">
        <div className="container-main">
          <div
            ref={listRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col divide-y"
            style={{ borderColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', overflow: 'hidden' }}
          >
            {PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 bg-[#0A1628] first:rounded-t-2xl last:rounded-b-2xl"
                style={{
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`,
                  borderBottom: i < PRODUCTS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined,
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.accentColor}14`, border: `1px solid ${p.accentColor}28` }}
                >
                  <p.Icon className="w-5 h-5" style={{ color: p.accentColor }} />
                </div>

                {/* Name + tagline */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5 flex-wrap">
                    <span
                      className="font-semibold text-white text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {p.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: p.statusColor, background: p.statusBg, border: `1px solid ${p.statusBorder}` }}
                    >
                      {p.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{p.tagline}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  {p.externalHref && (
                    <a
                      href={p.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-80"
                      style={{ background: `${p.accentColor}18`, border: `1px solid ${p.accentColor}30`, color: p.accentColor }}
                    >
                      {p.externalLabel} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-white/10 transition-all duration-200 hover:text-white hover:border-white/25"
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pick your fit ── */}
      <section className="py-20 md:py-28 bg-[#0A1628] border-t border-white/6">
        <div className="container-main">
          <div className="text-center mb-12 flex flex-col items-center">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-5 border"
              style={{ color: '#06CEFF', background: 'rgba(6,206,255,0.08)', borderColor: 'rgba(6,206,255,0.28)' }}
            >
              Not sure where to start?
            </span>
            <h2
              className="font-bold text-white mb-4"
              style={{ ...sgHeading, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15 }}
            >
              Find the right product for your situation
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Each product solves a different problem. Match your role below.
            </p>
          </div>

          <div
            ref={fitsRef as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FITS.map((fit, i) => (
              <Link
                key={fit.persona}
                href={fit.href}
                className="group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300"
                style={{
                  borderColor: 'rgba(255,255,255,0.07)',
                  background: 'rgba(10,22,40,0.6)',
                  opacity: fitsVisible ? 1 : 0,
                  transform: fitsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms, border-color 0.2s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${fit.accentColor}35`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${fit.accentColor}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
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
            <Link href="/contact" className="text-[#06CEFF] font-semibold hover:underline">
              Book a 30-minute call
            </Link>{' '}
            and we'll tell you exactly where to start.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 md:py-32 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
        </div>
        <div className="container-main relative text-center max-w-2xl mx-auto">
          <h2
            className="font-bold text-white mb-4"
            style={{ ...sgHeading, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Start with one.{' '}
            <span style={{ color: '#06CEFF' }}>Scale with the right fit.</span>
          </h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            Every product is live and built for real business teams. Get started in minutes, or book a call and we'll walk you through exactly what fits your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reviews.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-[#050D1A] bg-white rounded-xl hover:shadow-[0_0_28px_rgba(6,206,255,0.3)] transition-all text-sm"
            >
              Try AI Review Generator <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all text-sm"
            >
              Book a Discovery Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
