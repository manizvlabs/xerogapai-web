'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Users,
  Zap,
  Code2,
  GitMerge,
  LayoutDashboard,
  Shield,
  Clock,
  TrendingUp,
  MessageCircle,
  BarChart3,
  CheckCircle,
} from 'lucide-react';
import { TestimonialMarquee } from '../components/ui/testimonial-cards';
import FoundersSection from '../components/sections/FoundersSection';

/* ─── Static data ─────────────────────────────────────────────── */

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VyaptIX',
  url: 'https://vyaptix.com',
  logo: 'https://vyaptix.com/vyaptix-logo.png',
  description:
    'AI automation and custom software development for businesses that want real results — not demos.',
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
};

const capabilities = [
  {
    Icon: Zap,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    hoverGlow: 'rgba(6,206,255,0.14)',
    title: 'Automate the work slowing your team down',
    description:
      'Customer follow-ups, data entry, reporting, WhatsApp workflows — automated in days, not months.',
    href: '/solutions',
    badge: null,
  },
  {
    Icon: Code2,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    hoverGlow: 'rgba(6,206,255,0.14)',
    title: 'Purpose-built SaaS and internal tools',
    description:
      'Platforms designed around how your business operates — not how a vendor wishes you operated.',
    href: '/contact',
    badge: null,
  },
  {
    Icon: GitMerge,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    hoverGlow: 'rgba(6,206,255,0.14)',
    title: 'Connect your existing stack to AI',
    description:
      'OpenAI, Claude, Gemini, and custom-trained models — integrated into what you already use, without rebuilding from scratch.',
    href: '/solutions',
    badge: null,
  },
  {
    Icon: LayoutDashboard,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    hoverGlow: 'rgba(6,206,255,0.14)',
    title: 'Map your workflows. Find the ROI.',
    description:
      'We audit your current processes, identify where AI creates the most value, and build a practical roadmap — grounded in actual outcomes, not AI hype.',
    href: '/contact',
    badge: 'Advisory',
  },
];

const whyVyaptix = [
  {
    Icon: TrendingUp,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    title: 'We measure in results, not features shipped',
    text: "More reviews collected. Hours saved per week. Leads followed up. That's what we track — not a feature checklist. If the number isn't moving, we fix it.",
  },
  {
    Icon: Clock,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    title: 'Your first automation goes live in 3–7 days',
    text: "Our founder spent 7 years architecting enterprise systems. He knows exactly how long things take when they should — and how much time gets wasted when they shouldn't. We skip the part where we rediscover your problem for three months.",
  },
  {
    Icon: Shield,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    title: "We pick the right AI — not the one we're paid to push",
    text: "We have no reseller agreements with any AI platform. When we recommend OpenAI, Claude, or Gemini for your workflow, it's because it's the best fit. Our stack recommendation is our credibility.",
  },
  {
    Icon: Users,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    title: 'Built for 5 to 500 people — not startup experiments or enterprise complexity',
    text: "We've automated a jewellery store counter in Hyderabad and a 200-person sales team's follow-up workflow. The difference is the workflow, not the price tag.",
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Tell us your problem',
    timeline: '30 min call',
    description:
      'No pitch decks. No discovery theatre. A focused conversation about your business challenge and an honest assessment of what AI can actually fix — and what it can\'t.',
    accentColor: '#06CEFF',
  },
  {
    step: '02',
    title: 'We design the automation',
    timeline: '2–3 days',
    description:
      'We map your workflow, select the right AI tools, and build a working prototype. You see real output before committing — not a slide deck with promises.',
    accentColor: '#A855F7',
  },
  {
    step: '03',
    title: 'Go live in days',
    timeline: '3–7 days to launch',
    description:
      'Your automation deploys into your real business environment. Simple integrations in 3–5 days; complex multi-step workflows in 1–2 weeks. Tested, documented, and ready to scale.',
    accentColor: '#10B981',
  },
];

/* ─── Industry SVG Icons ──────────────────────────────────────── */

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
    useCase: 'Automate client document collection, deadline reminders, and GST follow-ups on WhatsApp.',
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

/* ─── Section label pill ──────────────────────────────────────── */

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

/* ─── Intersection observer hook ─────────────────────────────── */

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

/* ─── Hero product results card ───────────────────────────────── */

function HeroProductCard({ heroVisible }: { heroVisible: boolean }) {
  return (
    <div
      className="relative"
      style={{
        opacity: heroVisible ? 1 : 0,
        transform: heroVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(24px)',
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s',
      }}
    >
      {/* Floating badge */}
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: 'rgba(6,206,255,0.12)',
          border: '1px solid rgba(6,206,255,0.32)',
          borderRadius: '20px',
          padding: '5px 14px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#06CEFF', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
          QR Scan → Instant Review
        </span>
      </div>

      {/* Main glass card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(6,206,255,0.20)',
          borderRadius: '20px',
          padding: '28px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maxWidth: '360px',
          margin: '0 auto',
          boxShadow: '0 0 60px rgba(6,206,255,0.07), 0 24px 48px rgba(0,0,0,0.28)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
              Live Client · Hyderabad
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>
              Sri Balaji Jewellers
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.28)',
            borderRadius: '20px', padding: '4px 10px', flexShrink: 0,
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E', letterSpacing: '0.10em' }}>LIVE</span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />

        {/* Reviews stat */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Google Reviews Collected</span>
            <span style={{ fontSize: '30px', fontWeight: 800, color: '#06CEFF', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
              109
            </span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: '82%', borderRadius: '99px',
              background: 'linear-gradient(90deg, #1A52E0, #06CEFF)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ fontSize: '10px', color: '#475569' }}>Before: 12 reviews</span>
            <span style={{ fontSize: '10px', color: '#22C55E', fontWeight: 600 }}>+3.2× growth</span>
          </div>
        </div>

        {/* Sub-stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
          {[
            { label: 'Timeline', value: '6 wks' },
            { label: 'QR Scans', value: '847' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', padding: '12px',
              }}
            >
              <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#06CEFF', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Star rating */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.16)',
          borderRadius: '10px', padding: '10px 14px',
        }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} viewBox="0 0 16 16" width="13" height="13" fill="#F59E0B">
                <path d="M8 1.5l1.7 3.4 3.8.55-2.75 2.68.65 3.77L8 9.77l-3.4 1.78.65-3.77L2.5 5.45l3.8-.55z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#F1F5F9' }}>4.9</span>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Google Rating</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Social proof bar ────────────────────────────────────────── */

function SocialProofBar() {
  const stats = [
    { value: '12+', label: 'Businesses Deployed' },
    { value: '3–7', label: 'Days to Launch' },
    { value: '109', label: 'Reviews in 6 Weeks' },
    { value: '★ 4.9', label: 'Avg Client Rating' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#060F22',
        borderTop: '1px solid rgba(6,206,255,0.10)',
        borderBottom: '1px solid rgba(6,206,255,0.10)',
        padding: '18px 0',
      }}
    >
      <div className="container-main">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-0 md:justify-between">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div
                  className="hidden md:block mr-8"
                  style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.09)' }}
                />
              )}
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    color: '#06CEFF',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', letterSpacing: '0.06em', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Sticky CTA bar ──────────────────────────────────────────── */

function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        background: 'rgba(3,9,26,0.93)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(6,206,255,0.14)',
      }}
      aria-hidden={!show}
    >
      <div className="container-main py-3 flex items-center gap-3">
        <p className="text-sm hidden sm:block flex-1" style={{ color: '#94A3B8' }}>
          <span className="text-white font-semibold">Ready to automate?</span>{' '}
          Book a free 30-min call — no pitch deck.
        </p>
        <div className="flex items-center gap-3 ml-auto">
          <a
            href="https://wa.me/919717156466?text=Hi%20VyaptIX!%20I%20want%20to%20know%20more%20about%20your%20AI%20automation%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.16)', color: '#94A3B8' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(6,206,255,0.28)]"
            style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
          >
            Book Free Call <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────── */

export function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [capsRef, capsInView] = useInView();
  const [howRef, howInView] = useInView();
  const [productsRef, productsInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [industriesRef, industriesInView] = useInView();
  const [whyRef, whyInView] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const sgHeading: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: '-0.025em',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen text-white overflow-hidden"
        style={{ backgroundColor: '#050D1A', paddingTop: '80px' }}
      >
        {/* Corner glow blobs */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(26,82,224,0.28) 0%, transparent 65%)',
            transform: 'translate(-35%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%)',
            transform: 'translate(25%, 25%)',
          }}
        />

        {/* Central ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(6,206,255,0.10) 0%, rgba(26,82,224,0.05) 45%, transparent 70%)',
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Vertical accent marks */}
        <div className="absolute left-10 top-1/3 pointer-events-none hidden lg:block"
          style={{ width: 3, height: 64, background: 'linear-gradient(to bottom, #06CEFF 0%, transparent 100%)', borderRadius: 99, opacity: 0.50 }} />
        <div className="absolute left-[60px] top-[calc(33%+28px)] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 42, background: 'linear-gradient(to bottom, #1A52E0 0%, transparent 100%)', borderRadius: 99, opacity: 0.40 }} />
        <div className="absolute right-10 top-[38%] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 56, background: 'linear-gradient(to bottom, #06CEFF 0%, transparent 100%)', borderRadius: 99, opacity: 0.45 }} />
        <div className="absolute right-[60px] top-[calc(38%+24px)] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 36, background: 'linear-gradient(to bottom, #1A52E0 0%, transparent 100%)', borderRadius: 99, opacity: 0.35 }} />

        <div className="container-main relative z-10 min-h-[calc(100vh-80px)] flex items-center py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center w-full">

            {/* Left: Text content */}
            <div>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border transition-all duration-700"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(-10px)',
                  background: 'rgba(6,206,255,0.09)',
                  borderColor: 'rgba(6,206,255,0.35)',
                  boxShadow: '0 0 24px rgba(6,206,255,0.12)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#06CEFF' }} />
                <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: '#06CEFF' }}>
                  AI AUTOMATION · NOIDA, INDIA
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-bold mb-6"
                style={{
                  ...sgHeading,
                  fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
                  lineHeight: 1.05,
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: '180ms',
                }}
              >
                One QR code.<br />
                <span style={{ color: '#06CEFF' }}>109 more Google reviews.</span><br />
                Six weeks.
              </h1>

              {/* Subheadline */}
              <p
                className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
                style={{
                  color: '#CBD5E1',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(18px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.7s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: '360ms',
                }}
              >
                That&apos;s what Sri Balaji Jewellers in Hyderabad got. We build AI systems that
                produce results like this — for restaurants, clinics, CA firms, property agencies,
                and any business losing customers to manual workflows and weak online presence.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.7s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: '520ms',
                }}
              >
                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 text-white hover:shadow-[0_0_40px_rgba(6,206,255,0.32)] hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
                  data-event="cta-hero-primary"
                >
                  See How It Works <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-white/[0.08] hover:border-white/40"
                  style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.65)' }}
                  data-event="cta-hero-secondary"
                >
                  Book a 30-Minute Call — No Pitch
                </Link>
              </div>

              {/* Trust line — contrast fixed: #64748B meets 4.7:1 on #050D1A */}
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: '#64748B',
                  opacity: heroVisible ? 1 : 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '0.7s',
                  transitionDelay: '700ms',
                }}
              >
                Deployed for businesses across Delhi NCR · Hyderabad · Jaipur · Bengaluru<br />
                No commitment required on the first call.
              </p>

              {/* Mobile stat block */}
              <div
                className="lg:hidden mt-10 grid grid-cols-3 gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '0.7s',
                  transitionDelay: '750ms',
                }}
              >
                {[
                  { value: '3×',     label: 'more reviews'        },
                  { value: '7 days', label: 'to launch'           },
                  { value: '12+',    label: 'businesses deployed' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="font-bold text-xl mb-1"
                      style={{ color: '#06CEFF', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px]" style={{ color: '#CBD5E1' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product results card (desktop only) */}
            <div className="hidden lg:flex items-center justify-center">
              <HeroProductCard heroVisible={heroVisible} />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #050D1A)' }}
        />
      </section>

      {/* ════════════════════════════════════════════
          SOCIAL PROOF BAR
      ════════════════════════════════════════════ */}
      <SocialProofBar />

      {/* ════════════════════════════════════════════
          CAPABILITIES
      ════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 bg-dot-grid"
        style={{ backgroundColor: '#050D1A' }}
      >
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center" ref={capsRef as React.RefObject<HTMLDivElement>}>
            <SectionLabel>What We Build</SectionLabel>
            <h2
              className="font-bold text-white mb-4"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              We turn business problems into{' '}
              <span style={{ color: '#06CEFF' }}>working AI solutions.</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#CBD5E1' }}>
              Purpose-built for your specific workflow. Not generic software forced to fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <Link
                key={cap.title}
                href={cap.href}
                className="glass-luxury rounded-2xl p-6 group transition-all duration-500 block"
                style={{
                  opacity: capsInView ? 1 : 0,
                  transform: capsInView ? 'translateY(0)' : 'translateY(28px)',
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                  transitionDuration: '0.6s, 0.6s, 0.3s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease, ease',
                  transitionDelay: `${i * 90}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = `0 0 40px ${cap.hoverGlow}`;
                  el.style.borderColor = cap.iconBorder;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = '0 0 0 transparent';
                  el.style.borderColor = '';
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: cap.iconBg,
                      border: `1px solid ${cap.iconBorder}`,
                      color: cap.iconColor,
                    }}
                  >
                    <cap.Icon className="w-6 h-6" />
                  </div>
                  {cap.badge && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(6,206,255,0.10)', color: '#06CEFF', border: '1px solid rgba(6,206,255,0.25)' }}
                    >
                      {cap.badge}
                    </span>
                  )}
                </div>
                <h3
                  className="text-white font-bold text-base mb-3 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
                >
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                  {cap.description}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-4 transition-colors"
                  style={{ color: cap.iconColor }}
                >
                  Explore <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 md:py-32" style={{ backgroundColor: '#0A1628' }}>
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
            {/* Connector line — desktop only */}
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
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '0.65s',
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${i * 140}ms`,
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
          PRODUCTS
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center">
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
              Not demos. Not pilots. Live tools used by real businesses.
            </p>
          </div>

          <div
            ref={productsRef as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                num: '01',
                name: 'AI Review Generator',
                hook: 'Collect Google reviews in under 20 seconds via QR code + AI.',
                status: 'LIVE',
                statusColor: '#4ADE80',
                statusBg: 'rgba(74,222,128,0.14)',
                statusBorder: 'rgba(74,222,128,0.28)',
                accent: '#06CEFF',
                iconBg: 'linear-gradient(135deg, rgba(6,206,255,0.28), rgba(26,82,224,0.28))',
                iconBorder: 'rgba(6,206,255,0.35)',
                cardBorder: 'rgba(6,206,255,0.20)',
                cardBg: 'rgba(6,206,255,0.04)',
                Icon: Star,
                href: '/solutions/ai-review-generation',
              },
              {
                num: '02',
                name: 'Setu',
                hook: 'WhatsApp broadcasts, AI chatbot, and shared team inbox — turn WhatsApp into your revenue channel.',
                status: 'LIVE',
                statusColor: '#4ADE80',
                statusBg: 'rgba(74,222,128,0.14)',
                statusBorder: 'rgba(74,222,128,0.28)',
                accent: '#25D366',
                iconBg: 'rgba(37,211,102,0.16)',
                iconBorder: 'rgba(37,211,102,0.28)',
                cardBorder: 'rgba(37,211,102,0.18)',
                cardBg: 'rgba(37,211,102,0.03)',
                Icon: MessageCircle,
                href: '/solutions/setu',
              },
              {
                num: '03',
                name: 'AgentMitra',
                hook: 'One hub for agents, clients, and workflows — built for service businesses.',
                status: 'EARLY ACCESS',
                statusColor: '#FFB800',
                statusBg: 'rgba(255,184,0,0.14)',
                statusBorder: 'rgba(255,184,0,0.28)',
                accent: '#FFB800',
                iconBg: 'rgba(255,184,0,0.16)',
                iconBorder: 'rgba(255,184,0,0.28)',
                cardBorder: 'rgba(255,184,0,0.16)',
                cardBg: 'rgba(255,184,0,0.03)',
                Icon: Users,
                href: '/contact',
              },
              {
                num: '04',
                name: 'BankLens',
                hook: '220+ financial signals and a credit decision in under 5 minutes.',
                status: 'LIVE',
                statusColor: '#4ADE80',
                statusBg: 'rgba(74,222,128,0.14)',
                statusBorder: 'rgba(74,222,128,0.28)',
                accent: '#F59E0B',
                iconBg: 'rgba(245,158,11,0.16)',
                iconBorder: 'rgba(245,158,11,0.28)',
                cardBorder: 'rgba(245,158,11,0.16)',
                cardBg: 'rgba(245,158,11,0.03)',
                Icon: BarChart3,
                href: '/solutions/banklens',
              },
            ].map((p, i) => (
              <div
                key={p.num}
                className="relative flex flex-col rounded-2xl p-6 group transition-all duration-300"
                style={{
                  background: p.cardBg,
                  border: `1.5px solid ${p.cardBorder}`,
                  opacity: productsInView ? 1 : 0,
                  transform: productsInView ? 'translateY(0)' : 'translateY(24px)',
                  transitionProperty: 'opacity, transform, box-shadow',
                  transitionDuration: '0.6s, 0.6s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${p.accent}1A`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: p.accent }}
                />

                {/* Icon + status */}
                <div className="flex items-center justify-between mb-5 mt-1">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: p.iconBg, border: `1px solid ${p.iconBorder}` }}
                  >
                    <p.Icon className="w-4.5 h-4.5" style={{ color: p.accent }} />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: p.statusBg, color: p.statusColor, border: `1px solid ${p.statusBorder}` }}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Product number + name */}
                <div className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: p.accent }}>
                  Product {p.num}
                </div>
                <h3
                  className="font-bold text-white text-base mb-3 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
                >
                  {p.name}
                </h3>

                <p className="text-sm leading-relaxed flex-1" style={{ color: '#94A3B8' }}>{p.hook}</p>

                <Link
                  href={p.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:underline underline-offset-2"
                  style={{ color: p.accent }}
                  data-event={`cta-product-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_32px_rgba(26,82,224,0.32)]"
              style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
              data-event="cta-products-explore-all"
            >
              Explore all four products <ArrowRight className="w-4 h-4" />
            </Link>
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

          <p className="text-center text-xs mt-8" style={{ color: '#475569' }}>
            *Results are from actual client deployments. Individual outcomes vary based on business size, foot traffic, and usage.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INDUSTRIES
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#050D1A' }}>
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
              We go deep,{' '}
              <span style={{ color: '#06CEFF' }}>not wide.</span>
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
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                  transitionDuration: '0.55s, 0.55s, 0.3s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease, ease',
                  transitionDelay: `${i * 70}ms`,
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
          WHY VYAPTIX
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div
            ref={whyRef as React.RefObject<HTMLDivElement>}
            className="text-center mb-16 flex flex-col items-center"
            style={{
              opacity: whyInView ? 1 : 0,
              transform: whyInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <SectionLabel>Why VyaptIX</SectionLabel>
            <h2
              className="font-bold text-white"
              style={{
                ...sgHeading,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.1,
              }}
            >
              We don&apos;t do pilots.{' '}
              <span style={{ color: '#06CEFF' }}>We don&apos;t do 6-month timelines.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyVyaptix.map((point, i) => (
              <div
                key={point.title}
                className="glass-luxury rounded-2xl p-6 group cursor-default"
                style={{
                  opacity: whyInView ? 1 : 0,
                  transform: whyInView ? 'translateY(0)' : 'translateY(24px)',
                  transitionProperty: 'opacity, transform, box-shadow, border-color',
                  transitionDuration: '0.6s, 0.6s, 0.3s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease, ease',
                  transitionDelay: `${i * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = point.iconBorder;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: point.iconBg,
                    border: `1px solid ${point.iconBorder}`,
                    color: point.iconColor,
                  }}
                >
                  <point.Icon className="w-5 h-5" />
                </div>
                <h4
                  className="text-white font-bold text-sm mb-3 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
                >
                  {point.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#CBD5E1' }}>
                  {point.text}
                </p>
              </div>
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
        {/* Multi-color glow blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 65% at 50% 100%, rgba(6,206,255,0.12) 0%, transparent 65%)',
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
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(6,206,255,0.4), transparent)' }}
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

          {/* Trust signals — Lucide icons replacing unicode checkmarks */}
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
        className="fixed bottom-24 right-6 z-50 group flex items-center gap-3"
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

      {/* ════════════════════════════════════════════
          STICKY CTA BAR
      ════════════════════════════════════════════ */}
      <StickyCTA />
    </>
  );
}
