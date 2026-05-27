'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Users,
  MessageCircle,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Clock,
  Shield,
  Zap,
} from 'lucide-react';
import { TestimonialMarquee } from '../components/ui/testimonial-cards';
import FoundersSection from '../components/sections/FoundersSection';
import { HeroSection } from '../components/blocks/hero-section';

/* ─── JSON-LD ─────────────────────────────────────────────────── */

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VyaptIX',
    url: 'https://vyaptix.com',
    logo: 'https://vyaptix.com/vyaptix-logo.png',
    description:
      'AI automation tools for businesses that want real results — not demos. Products go live in 3–7 days.',
    foundingDate: '2025-12',
    founders: [
      { '@type': 'Person', name: 'Ajeet Singh' },
      { '@type': 'Person', name: 'Manish Singh' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://vyaptix.com/contact',
    },
    sameAs: [
      'https://www.linkedin.com/company/vyaptix-ai',
      'https://x.com/Vyaptix_ai',
      'https://www.instagram.com/vyaptixai/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '6',
      bestRating: '5',
      worstRating: '1',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VyaptIX',
    url: 'https://vyaptix.com',
    description: 'AI automation tools for business — Google reviews, WhatsApp marketing, credit decisioning, and service operations.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://vyaptix.com/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
];

/* ─── Products ────────────────────────────────────────────────── */

const products = [
  {
    num: '01',
    name: 'AI Review Generator',
    tagline: 'More Google reviews, zero manual effort.',
    hook: 'Customers scan a QR code, AI drafts the review, and it\'s published in under 20 seconds — no staff involvement.',
    status: 'LIVE',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.12)',
    statusBorder: 'rgba(74,222,128,0.25)',
    accent: '#06CEFF',
    accentBg: 'rgba(6,206,255,0.08)',
    accentBorder: 'rgba(6,206,255,0.20)',
    cardBorder: 'rgba(6,206,255,0.15)',
    cardBg: 'rgba(6,206,255,0.03)',
    Icon: Star,
    href: '/solutions/ai-review-generation',
    platform: 'reviews.vyaptix.ai',
    stats: [
      { value: '20s', label: 'to collect a review' },
      { value: '3×', label: 'avg review growth' },
    ],
  },
  {
    num: '02',
    name: 'Setu',
    tagline: 'Turn WhatsApp into your revenue channel.',
    hook: 'Campaigns, 24/7 AI chatbot, shared team inbox, and a lead pipeline — all inside WhatsApp. Live in 2 minutes.',
    status: 'LIVE',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.12)',
    statusBorder: 'rgba(74,222,128,0.25)',
    accent: '#25D366',
    accentBg: 'rgba(37,211,102,0.08)',
    accentBorder: 'rgba(37,211,102,0.20)',
    cardBorder: 'rgba(37,211,102,0.15)',
    cardBg: 'rgba(37,211,102,0.03)',
    Icon: MessageCircle,
    href: '/solutions/setu',
    platform: 'setu.vyaptix.ai',
    stats: [
      { value: '98%', label: 'open rate' },
      { value: '3×', label: 'reply rate vs email' },
    ],
  },
  {
    num: '03',
    name: 'AgentMitra',
    tagline: 'One hub for agents, clients, and workflows.',
    hook: 'Instant client search, live status tracking, and structured workflows — built for agencies, consultancies, and support teams.',
    status: 'EARLY ACCESS',
    statusColor: '#FFB800',
    statusBg: 'rgba(255,184,0,0.12)',
    statusBorder: 'rgba(255,184,0,0.25)',
    accent: '#A5B4FC',
    accentBg: 'rgba(165,180,252,0.08)',
    accentBorder: 'rgba(165,180,252,0.20)',
    cardBorder: 'rgba(165,180,252,0.15)',
    cardBg: 'rgba(165,180,252,0.03)',
    Icon: Users,
    href: '/contact',
    platform: null,
    stats: [
      { value: 'Unified', label: 'workspace' },
      { value: 'Live', label: 'status tracking' },
    ],
  },
  {
    num: '04',
    name: 'BankLens',
    tagline: 'Credit decisions in minutes, not days.',
    hook: '220+ financial signals, ML scoring, 14-signal fraud detection, and audit-ready CAM reports for lenders.',
    status: 'LIVE',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.12)',
    statusBorder: 'rgba(74,222,128,0.25)',
    accent: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.20)',
    cardBorder: 'rgba(245,158,11,0.15)',
    cardBg: 'rgba(245,158,11,0.03)',
    Icon: BarChart3,
    href: '/solutions/banklens',
    platform: 'banklens.vyaptix.ai',
    stats: [
      { value: '220+', label: 'financial signals' },
      { value: '80%', label: 'cost reduction' },
    ],
  },
];

/* ─── Why VyaptIX ────────────────────────────────────────────── */

const whyPoints = [
  {
    Icon: TrendingUp,
    title: 'We measure in results, not features shipped',
    text: "More reviews. Hours saved per week. Leads followed up. That's what we track — not a feature checklist. If the number isn't moving, we fix it.",
  },
  {
    Icon: Clock,
    title: 'Your first automation goes live in 3–7 days',
    text: "Our founder spent 7 years architecting enterprise systems. We skip the part where we rediscover your problem for three months.",
  },
  {
    Icon: Shield,
    title: "We pick the right AI — not the one we're paid to push",
    text: "No reseller agreements with any AI platform. When we recommend OpenAI, Claude, or Gemini, it's because it's the best fit.",
  },
  {
    Icon: Zap,
    title: 'Built for 5 to 500 people',
    text: "We've automated a jewellery store counter and a 200-person sales team's follow-up workflow. The difference is the workflow, not the price tag.",
  },
];

/* ─── How it works ───────────────────────────────────────────── */

const howItWorks = [
  {
    step: '01',
    title: 'Tell us your problem',
    timeline: '30 min call',
    description:
      'No pitch decks. No discovery theatre. A focused conversation about your business challenge and an honest assessment of what AI can actually fix.',
    accentColor: '#06CEFF',
  },
  {
    step: '02',
    title: 'We design the automation',
    timeline: '2–3 days',
    description:
      'We map your workflow, select the right AI tools, and build a working prototype. You see real output before committing — not slides.',
    accentColor: '#A855F7',
  },
  {
    step: '03',
    title: 'Go live in days',
    timeline: '3–7 days to launch',
    description:
      'Your automation deploys into your real environment. Tested, documented, and ready to scale.',
    accentColor: '#10B981',
  },
];

/* ─── Industries ─────────────────────────────────────────────── */

const iconProps = {
  fill: 'none',
  stroke: '#06CEFF',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-8 h-8',
};

const industries = [
  {
    label: 'Restaurants & Cafes',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
    useCase: 'Turn every diner into a Google reviewer with a QR scan at the table.',
  },
  {
    label: 'Legal & CA Firms',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M12 3v18M3 6l9-3 9 3" />
        <path d="M6 6l-3 9a6 6 0 006 0L6 6z" />
        <path d="M18 6l-3 9a6 6 0 006 0L18 6z" />
        <path d="M5 21h14" />
      </svg>
    ),
    useCase: 'Automate client document collection, deadline reminders, and follow-ups on WhatsApp.',
  },
  {
    label: 'Healthcare & Clinics',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    useCase: 'Collect patient reviews post-appointment and automate recall reminders without staff effort.',
  },
  {
    label: 'Real Estate & Property',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    useCase: 'Stop losing leads. Automate inquiry responses and agent follow-up workflows.',
  },
  {
    label: 'Retail & Jewellery',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    useCase: 'Build your Google rating and drive repeat customers with WhatsApp loyalty campaigns.',
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-5 border"
      style={{
        color: '#06CEFF',
        background: 'rgba(6,206,255,0.08)',
        borderColor: 'rgba(6,206,255,0.28)',
      }}
    >
      {children}
    </span>
  );
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}


/* ─── Component ───────────────────────────────────────────────── */

export function Home() {
  const [howRef, howInView] = useInView();
  const [productsRef, productsInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [industriesRef, industriesInView] = useInView();
  const [whyRef, whyInView] = useInView();

  const sgHeading: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: '-0.025em',
  };

  return (
    <>
      {homeJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <HeroSection
        badge={{ text: 'AI Automation for Business' }}
        title={"Grow your business\nwithout growing\nyour team."}
        description="VyaptIX builds focused AI tools that remove real friction from your operations — practical, fast to deploy, and built for how modern businesses actually work."
        actions={[
          { text: 'See Our Products', href: '/#products', variant: 'primary' },
          { text: 'Book a Free Call', href: '/contact', variant: 'secondary' },
        ]}
      />

      {/* ════════════════════════════════════════════
          PRODUCTS — alternating layout
          (Social Proof Bar + Capabilities removed;
           products presented with depth)
      ════════════════════════════════════════════ */}
      <section id="products" className="py-20 md:py-28" style={{ backgroundColor: '#0A1628' }}>
        <div className="container-main">
          <div className="text-center mb-12 flex flex-col items-center">
            <SectionLabel>Our Products</SectionLabel>
            <h2
              className="font-bold text-white mb-4"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              Four products.{' '}
              <span style={{ color: '#06CEFF' }}>Built for real workflows.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#CBD5E1' }}>
              Each one tackles a specific, painful problem. No hype, no bloat.
            </p>
          </div>

          {/* 2×2 product card grid */}
          <div
            ref={productsRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {products.map((p, i) => (
              <div
                key={p.num}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: p.cardBg,
                  border: `1.5px solid ${p.cardBorder}`,
                  opacity: productsInView ? 1 : 0,
                  transform: productsInView ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                }}
              >
                {/* Top row: icon + status badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: p.accentBg, border: `1.5px solid ${p.accentBorder}` }}
                  >
                    <p.Icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: p.statusBg, color: p.statusColor, border: `1px solid ${p.statusBorder}` }}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Product label */}
                <span
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1"
                  style={{ color: p.accent }}
                >
                  Product {p.num}
                </span>

                {/* Name */}
                <h3
                  className="font-bold text-white text-lg leading-snug mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}
                >
                  {p.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm font-medium mb-3" style={{ color: p.accent }}>
                  {p.tagline}
                </p>

                {/* Hook */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#94A3B8' }}>
                  {p.hook}
                </p>

                {/* Divider */}
                <div className="my-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />

                {/* Bottom row: stats + CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-5">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <div
                          className="font-bold text-lg leading-none mb-0.5"
                          style={{ color: p.accent, fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {s.value}
                        </div>
                        <div className="text-[11px]" style={{ color: '#64748B' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex-shrink-0"
                    style={{
                      background: p.accentBg,
                      border: `1px solid ${p.accentBorder}`,
                      color: p.accent,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = p.accentBorder;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = p.accentBg;
                    }}
                    data-event={`cta-product-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center">
            <SectionLabel>The Process</SectionLabel>
            <h2
              className="font-bold text-white"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              From first call to{' '}
              <span style={{ color: '#06CEFF' }}>live automation.</span>
            </h2>
          </div>

          <div ref={howRef as React.RefObject<HTMLDivElement>} className="relative">
            <div
              className="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(6,206,255,0.65), rgba(168,85,247,0.65), rgba(16,185,129,0.65))' }}
            />
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
              {howItWorks.map((step, i) => (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center"
                  style={{
                    opacity: howInView ? 1 : 0,
                    transform: howInView ? 'translateY(0)' : 'translateY(32px)',
                    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 flex-shrink-0 font-mono font-bold text-lg text-white relative"
                    style={{
                      border: `2px solid ${step.accentColor}`,
                      boxShadow: `0 0 28px ${step.accentColor}50, inset 0 0 14px ${step.accentColor}10`,
                      background: `${step.accentColor}0A`,
                    }}
                  >
                    {step.step}
                    <div
                      className="absolute inset-[-6px] rounded-full"
                      style={{ border: `1px solid ${step.accentColor}30` }}
                    />
                  </div>
                  <h3
                    className="text-white font-bold text-xl mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
                  >
                    {step.title}
                  </h3>
                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${step.accentColor}14`, color: step.accentColor, border: `1px solid ${step.accentColor}30` }}
                  >
                    {step.timeline}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#0A1628' }}>
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center">
            <SectionLabel>What Our Customers Say</SectionLabel>
            <h2
              className="font-bold text-white"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              Real results from{' '}
              <span style={{ color: '#06CEFF' }}>real businesses.</span>
            </h2>
          </div>
          <div
            ref={testimonialsRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: testimonialsInView ? 1 : 0,
              transform: testimonialsInView ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <TestimonialMarquee speed={25} />
          </div>
          <p className="text-center text-xs mt-8" style={{ color: '#64748B' }}>
            *Results are from actual client deployments. Individual outcomes vary based on business size, foot traffic, and usage.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHY VYAPTIX — 2-column list layout
          (different from the card grid pattern)
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

            {/* Left: sticky label + intro */}
            <div className="lg:sticky lg:top-32">
              <SectionLabel>Why VyaptIX</SectionLabel>
              <h2
                className="font-bold text-white mb-6"
                style={{
                  ...sgHeading,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.12,
                }}
              >
                We don&apos;t do pilots.{' '}
                <span style={{ color: '#06CEFF' }}>We don&apos;t do 6-month timelines.</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                Most AI implementations fail because they optimize for demos, not deployment.
                We skip the theatre.
              </p>
            </div>

            {/* Right: list of points */}
            <div
              ref={whyRef as React.RefObject<HTMLDivElement>}
              className="flex flex-col divide-y"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {whyPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="flex gap-5 py-7 first:pt-0 last:pb-0"
                  style={{
                    opacity: whyInView ? 1 : 0,
                    transform: whyInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                    borderColor: 'rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(6,206,255,0.08)',
                      border: '1px solid rgba(6,206,255,0.20)',
                    }}
                  >
                    <point.Icon className="w-5 h-5" style={{ color: '#06CEFF' }} />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-white text-base mb-2 leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
                    >
                      {point.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INDUSTRIES
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#0A1628' }}>
        <div className="container-main">
          <div className="text-center mb-14 flex flex-col items-center">
            <SectionLabel>Built for These Industries</SectionLabel>
            <h2
              className="font-bold text-white"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              Automation that fits your business —{' '}
              <span style={{ color: '#06CEFF' }}>not the other way around.</span>
            </h2>
          </div>
          <div
            ref={industriesRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {industries.map((industry, i) => (
              <Link
                key={industry.label}
                href="/solutions"
                className="group rounded-2xl p-5 transition-all duration-500 glass-luxury block"
                style={{
                  opacity: industriesInView ? 1 : 0,
                  transform: industriesInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(6,206,255,0.22)';
                  el.style.boxShadow = '0 0 30px rgba(6,206,255,0.08)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = '';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div className="mb-3">{industry.icon}</div>
                <div
                  className="text-white font-semibold text-sm mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {industry.label}
                </div>
                <p
                  className="text-xs leading-snug md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-16 opacity-60 max-h-16 transition-all duration-300 overflow-hidden"
                  style={{ color: '#CBD5E1' }}
                >
                  {industry.useCase}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOUNDERS
      ════════════════════════════════════════════ */}
      <FoundersSection />

      {/* ════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-40 relative overflow-hidden"
        style={{ backgroundColor: '#050D1A' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 65% at 50% 100%, rgba(6,206,255,0.12) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(26,82,224,0.6) 0%, transparent 70%)' }}
        />

        <div className="container-main text-center relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <SectionLabel>Let&apos;s build something</SectionLabel>
          </div>
          <h2
            className="font-bold text-white mb-4"
            style={{
              ...sgHeading,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1.08,
            }}
          >
            Have a business problem?
          </h2>
          <h2
            className="font-bold mb-10"
            style={{
              ...sgHeading,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1.08,
              color: '#06CEFF',
            }}
          >
            Let&apos;s solve it with AI.
          </h2>
          <p
            className="text-lg mb-12 leading-relaxed max-w-xl mx-auto"
            style={{ color: '#CBD5E1' }}
          >
            Book a 30-minute discovery call. No pitch decks, no generic demos — just an honest
            conversation about where AI can remove friction in your business. If we can&apos;t
            help, we&apos;ll tell you that too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 font-semibold rounded-xl transition-all duration-200 text-white hover:shadow-[0_0_50px_rgba(6,206,255,0.36)] hover:brightness-110 text-base"
              style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
              data-event="cta-final-primary"
            >
              Book Your Free Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/[0.07] hover:border-white/35"
              style={{ border: '1px solid rgba(255,255,255,0.20)', color: 'rgba(255,255,255,0.65)' }}
              data-event="cta-final-secondary"
            >
              See Our Products First <ArrowRight className="w-4 h-4 opacity-60" />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 text-sm" style={{ color: '#CBD5E1' }}>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22C55E' }} />
              No commitment required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22C55E' }} />
              30 minutes, real answers
            </span>
            <a
              href="https://wa.me/919717156466?text=Hi%20VyaptIX!%20I%20want%20to%20know%20more%20about%20your%20AI%20automation%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22C55E' }} />
              WhatsApp us anytime
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHATSAPP FLOATING BUTTON
      ════════════════════════════════════════════ */}
      <a
        href="https://wa.me/919717156466?text=Hi%20VyaptIX!%20I%20want%20to%20know%20more%20about%20your%20AI%20automation%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-28 right-6 z-50 group flex items-center gap-3"
      >
        <span
          className="hidden sm:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-sm font-semibold text-white px-3 py-1.5 rounded-lg pointer-events-none"
          style={{ backgroundColor: '#128C7E' }}
        >
          Chat with us
        </span>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <span
          className="absolute right-0 bottom-0 w-14 h-14 rounded-full animate-ping opacity-25"
          style={{ backgroundColor: '#25D366' }}
        />
      </a>

    </>
  );
}
