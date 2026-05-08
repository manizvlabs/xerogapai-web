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
  CheckCircle2,
  Quote,
  MessageCircle,
  BarChart3,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackEvent } from '../lib/analytics';
import { Marquee } from '../components/ui/Marquee';
import { CountUp } from '../components/ui/CountUp';

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
};

const capabilities = [
  {
    Icon: Zap,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.13)',
    iconBorder: 'rgba(6,206,255,0.28)',
    hoverGlow: 'rgba(6,206,255,0.16)',
    title: 'AI Automation',
    description:
      'Automate the repetitive work slowing your team down — customer follow-ups, data entry, reporting, and more.',
  },
  {
    Icon: Code2,
    iconColor: '#A855F7',
    iconBg: 'rgba(168,85,247,0.13)',
    iconBorder: 'rgba(168,85,247,0.28)',
    hoverGlow: 'rgba(168,85,247,0.14)',
    title: 'Custom Software',
    description:
      'Purpose-built SaaS tools and internal platforms tailored to your exact business processes — not generic software forced to fit.',
  },
  {
    Icon: GitMerge,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.13)',
    iconBorder: 'rgba(16,185,129,0.28)',
    hoverGlow: 'rgba(16,185,129,0.14)',
    title: 'AI Integrations',
    description:
      'Connect your existing stack to AI models — OpenAI, Claude, Gemini — without rebuilding from scratch.',
  },
  {
    Icon: LayoutDashboard,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.13)',
    iconBorder: 'rgba(245,158,11,0.28)',
    hoverGlow: 'rgba(245,158,11,0.14)',
    title: 'Workflow Consulting',
    description:
      'Map your current workflows, identify automation opportunities, and build a practical AI roadmap grounded in ROI.',
  },
];

const whyVyaptix = [
  {
    Icon: TrendingUp,
    iconColor: '#06CEFF',
    iconBg: 'rgba(6,206,255,0.12)',
    iconBorder: 'rgba(6,206,255,0.25)',
    title: 'Outcome-first',
    text: 'We measure success by business results, not features shipped.',
  },
  {
    Icon: Clock,
    iconColor: '#A855F7',
    iconBg: 'rgba(168,85,247,0.12)',
    iconBorder: 'rgba(168,85,247,0.25)',
    title: 'Fast to value',
    text: 'Working automation in days, not months of discovery.',
  },
  {
    Icon: Shield,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.25)',
    title: 'Vendor-neutral',
    text: 'We pick the right AI tools for your problem, not ours.',
  },
  {
    Icon: Users,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.12)',
    iconBorder: 'rgba(245,158,11,0.25)',
    title: 'Right-sized',
    text: 'Built for growing businesses — 5 to 500 people — not enterprise complexity.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Tell us your problem',
    description:
      'A focused 30-minute discovery call. No pitch decks — just your business challenge and our honest assessment of what AI can actually fix.',
    accentColor: '#06CEFF',
  },
  {
    step: '02',
    title: 'We design the automation',
    description:
      'We map your workflow, select the right AI tools, and build a working prototype — not a slide deck. You see real output before committing.',
    accentColor: '#A855F7',
  },
  {
    step: '03',
    title: 'Go live in days',
    description:
      'Your automation deploys into your real business environment. Tested, documented, and ready to scale as your team grows.',
    accentColor: '#10B981',
  },
];

const aiToolsRow1 = [
  { src: '/tool-logos/chatGPT.png', alt: 'ChatGPT' },
  { src: '/tool-logos/claude.png', alt: 'Claude' },
  { src: '/tool-logos/gemini.png', alt: 'Gemini' },
  { src: '/tool-logos/copilot.png', alt: 'Copilot' },
  { src: '/tool-logos/genspark.png', alt: 'Genspark' },
  { src: '/tool-logos/hugging%20face.png', alt: 'Hugging Face' },
  { src: '/tool-logos/11ElevenLabs.png', alt: 'ElevenLabs' },
  { src: '/tool-logos/HeyGen.png', alt: 'HeyGen' },
  { src: '/tool-logos/perplexity.png', alt: 'Perplexity' },
  { src: '/tool-logos/notebookLM.png', alt: 'NotebookLM' },
];

const aiToolsRow2 = [
  { src: '/tool-logos/make.png', alt: 'Make' },
  { src: '/tool-logos/n8n.png', alt: 'n8n' },
  { src: '/tool-logos/manus.png', alt: 'Manus' },
  { src: '/tool-logos/langchain.png', alt: 'LangChain' },
  { src: '/tool-logos/whatsApp%20Business%20API.png', alt: 'WhatsApp Business API' },
  { src: '/tool-logos/google%20cloud.png', alt: 'Google Cloud' },
  { src: '/tool-logos/postman.png', alt: 'Postman' },
  { src: '/tool-logos/zoho.png', alt: 'Zoho' },
  { src: '/tool-logos/notions.png', alt: 'Notion' },
];

/* ─── Testimonials ────────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "We went from 23 to 91 Google reviews in 6 weeks. Every table has the QR card now and customers love how easy it is. Our rating climbed from 4.1 to 4.7 — that's real revenue.",
    name: 'Jordan Lee',
    title: 'Owner',
    company: 'The Corner Café',
    location: 'Melbourne, AU',
    product: 'AI Review Generator',
    accentColor: '#06CEFF',
  },
  {
    quote:
      "Asking patients for reviews always felt awkward. Now we send the link after appointments and the AI gets the tone exactly right — patients tell me the reviews 'sound just like them'. We have 3x more reviews than before.",
    name: 'Sara Müller',
    title: 'Practice Manager',
    company: 'Bright Dental',
    location: 'Zürich, CH',
    product: 'AI Review Generator',
    accentColor: '#A855F7',
  },
  {
    quote:
      "Our agents were spending half their day searching client records across spreadsheets and WhatsApp. AgentMitra gave us one place for everything. Onboarding took two days and the team was fully switched over in a week.",
    name: 'David Okafor',
    title: 'CEO',
    company: 'Vertex Property Group',
    location: 'Lagos, NG',
    product: 'AgentMitra',
    accentColor: '#10B981',
  },
  {
    quote:
      "VyaptIX automated our daily client status update workflow. What used to take our operations team 3 hours now runs in the background. Ajeet's team understood our processes faster than any agency we've worked with.",
    name: 'Lena Strauss',
    title: 'Operations Lead',
    company: 'Novo Logistics',
    location: 'Amsterdam, NL',
    product: 'Custom AI Automation',
    accentColor: '#F59E0B',
  },
];

/* ─── Industry SVG Icons ──────────────────────────────────────── */

const iconProps = { fill: 'none', stroke: '#06CEFF', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'w-8 h-8' };

const industries = [
  {
    label: 'Insurance',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    useCase: 'Automate policy reminders and claim follow-up workflows',
  },
  {
    label: 'Hospitality',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M2 17h20M2 12h20M6 8h.01M6 8a4 4 0 018 0" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <path d="M22 12v5M2 12v5" />
        <path d="M12 8v4" />
      </svg>
    ),
    useCase: 'Collect guest feedback and automate review requests post-stay',
  },
  {
    label: 'Retail',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    useCase: 'Send restock alerts and loyalty messages on WhatsApp',
  },
  {
    label: 'Restaurants',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
    useCase: 'Turn every diner into a Google reviewer with a QR scan',
  },
  {
    label: 'Legal Services',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M12 3v18M3 6l9-3 9 3" />
        <path d="M6 6l-3 9a6 6 0 006 0L6 6z" />
        <path d="M18 6l-3 9a6 6 0 006 0L18 6z" />
        <path d="M5 21h14" />
      </svg>
    ),
    useCase: 'Track client cases and automate appointment follow-ups',
  },
  {
    label: 'Education',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    useCase: 'Send fee reminders and session updates to parents automatically',
  },
  {
    label: 'Real Estate',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
        <path d="M12 7h.01" />
      </svg>
    ),
    useCase: 'Automate lead follow-up and property inquiry responses',
  },
  {
    label: 'Logistics',
    icon: (
      <svg viewBox="0 0 24 24" {...iconProps}>
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v4h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    useCase: 'Keep clients updated on shipment status without manual effort',
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

  return (
    <>
      <SEO
        title="VyaptIX — AI Automation & Custom Software for Business"
        description="VyaptIX builds AI automation and custom software that removes manual work from your business. Real outcomes. No fluff."
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen bg-dot-grid flex flex-col items-center justify-center text-white overflow-hidden"
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
            background: 'radial-gradient(circle, rgba(168,85,247,0.20) 0%, transparent 65%)',
            transform: 'translate(25%, 25%)',
          }}
        />

        {/* Central ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(6,206,255,0.13) 0%, rgba(26,82,224,0.07) 45%, transparent 70%)',
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

        {/* SaaSFly-style colorful vertical accent marks */}
        <div className="absolute left-10 top-1/3 pointer-events-none hidden lg:block"
          style={{ width: 3, height: 64, background: 'linear-gradient(to bottom, #06CEFF 0%, transparent 100%)', borderRadius: 99, opacity: 0.55 }} />
        <div className="absolute left-[60px] top-[calc(33%+28px)] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 42, background: 'linear-gradient(to bottom, #A855F7 0%, transparent 100%)', borderRadius: 99, opacity: 0.45 }} />
        <div className="absolute right-10 top-[38%] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 56, background: 'linear-gradient(to bottom, #10B981 0%, transparent 100%)', borderRadius: 99, opacity: 0.50 }} />
        <div className="absolute right-[60px] top-[calc(38%+24px)] pointer-events-none hidden lg:block"
          style={{ width: 3, height: 36, background: 'linear-gradient(to bottom, #F59E0B 0%, transparent 100%)', borderRadius: 99, opacity: 0.40 }} />

        {/* ── Text content ── */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(-10px)',
              background: 'rgba(6,206,255,0.09)',
              borderColor: 'rgba(6,206,255,0.35)',
              boxShadow: '0 0 24px rgba(6,206,255,0.14)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#06CEFF' }}
            />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: '#06CEFF' }}
            >
              AI-Powered Business Automation
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-playfair italic font-bold mb-5 leading-[1.08]"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.8rem)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.8s',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '180ms',
            }}
          >
            <span className="text-white">Real AI automation.</span>
            <br />
            <span style={{ color: '#06CEFF' }}>Working in days,</span>
            <span className="text-white"> not months.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{
              color: '#CBD5E1',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(18px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '380ms',
            }}
          >
            From collecting Google reviews to automating customer workflows — we build AI
            systems that fit how your business actually works.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '560ms',
            }}
          >
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 text-white hover:shadow-[0_0_40px_rgba(6,206,255,0.35)] hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
              onClick={() =>
                trackEvent('cta_clicked', { label: 'Book Your Free Discovery Call', destination: '/demo', page: '/' })
              }
            >
              Book Your Free Discovery Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/[0.08] hover:border-white/40"
              style={{ border: '1px solid rgba(255,255,255,0.28)' }}
              onClick={() =>
                trackEvent('cta_clicked', { label: 'See Our Products', destination: '/solutions', page: '/' })
              }
            >
              See Our Products <ArrowRight className="w-4 h-4 opacity-60" />
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #050D1A)' }}
        />
      </section>

      {/* ════════════════════════════════════════════
          CAPABILITIES — glassmorphic feature grid
      ════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 bg-dot-grid"
        style={{ backgroundColor: '#050D1A' }}
      >
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center" ref={capsRef as React.RefObject<HTMLDivElement>}>
            <SectionLabel>What We Do</SectionLabel>
            <h2
              className="font-playfair italic font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
            >
              We turn business problems into{' '}
              <em className="not-italic" style={{ color: '#06CEFF' }}>
                working AI solutions.
              </em>
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#CBD5E1' }}>
              Purpose-built for your specific business workflow. Everything we build is designed
              around how your business actually operates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="glass-luxury rounded-2xl p-6 group cursor-default transition-all duration-500"
                style={{
                  opacity: capsInView ? 1 : 0,
                  transform: capsInView ? 'translateY(0)' : 'translateY(28px)',
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                  transitionDuration: '0.6s, 0.6s, 0.3s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease, ease',
                  transitionDelay: `${i * 90}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = `0 0 40px ${cap.hoverGlow}`;
                  el.style.borderColor = cap.iconBorder;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = '0 0 0 transparent';
                  el.style.borderColor = '';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: cap.iconBg,
                    border: `1px solid ${cap.iconBorder}`,
                    color: cap.iconColor,
                  }}
                >
                  <cap.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{cap.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS — 3-step horizontal flow
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#0A1628' }}>
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center">
            <SectionLabel>How It Works</SectionLabel>
            <h2
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
            >
              From first call to{' '}
              <em className="not-italic" style={{ color: '#06CEFF' }}>
                live automation.
              </em>
            </h2>
          </div>

          <div ref={howRef as React.RefObject<HTMLDivElement>} className="relative">
            {/* Connector line — desktop only */}
            <div
              className="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(6,206,255,0.4), rgba(168,85,247,0.4), rgba(16,185,129,0.4))' }}
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
                    transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
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

                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
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
          PRODUCTS — two glassmorphic cards
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center">
            <SectionLabel>Our Products</SectionLabel>
            <h2
              className="font-playfair italic font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
            >
              Four products.{' '}
              <em className="not-italic" style={{ color: '#06CEFF' }}>
                One shared AI engine.
              </em>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#CBD5E1' }}>
              Live tools used by real businesses — not demos, not pilots.
            </p>
          </div>

          <div ref={productsRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-6">
            {/* AI Review Generator — featured */}
            <div
              className="flex flex-col rounded-2xl p-7 hover:shadow-[0_0_60px_rgba(6,206,255,0.12)]"
              style={{
                background: 'rgba(6,206,255,0.04)',
                border: '1.5px solid rgba(6,206,255,0.28)',
                boxShadow: '0 0 40px rgba(6,206,255,0.07)',
                opacity: productsInView ? 1 : 0,
                transform: productsInView ? 'translateX(0)' : 'translateX(-40px)',
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '0.7s, 0.7s, 0.3s',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,rgba(6,206,255,0.35),rgba(26,82,224,0.35))', border: '1px solid rgba(6,206,255,0.35)' }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#06CEFF' }}>
                      Product 01
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(74,222,128,0.14)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.28)' }}
                >
                  LIVE
                </span>
              </div>

              <h3
                className="font-playfair italic font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
              >
                AI Review Generator
              </h3>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: '#CBD5E1' }}>
                Collect authentic Google reviews in under 20 seconds using QR codes and
                AI-generated review text — zero effort for your customers.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  'Instant QR code generation per location',
                  'AI-crafted personalised review text',
                  'Real-time review tracking dashboard',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#CBD5E1' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#06CEFF' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="grid grid-cols-2 gap-4 py-5 mb-6"
                style={{ borderTop: '1px solid rgba(6,206,255,0.12)', borderBottom: '1px solid rgba(6,206,255,0.12)' }}
              >
                <div>
                  <div className="font-mono font-bold text-white text-2xl">&lt; 20s</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>to collect a review</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-2xl">
                    <CountUp value={3} suffix="x" />
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>more reviews vs manual</div>
                </div>
              </div>

              <Link
                href="/solutions/ai-review-generation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 text-white hover:shadow-[0_0_32px_rgba(6,206,255,0.30)] hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
                onClick={() =>
                  trackEvent('cta_clicked', { label: 'See How It Works', destination: '/solutions/ai-review-generation', page: '/', section: 'products' })
                }
              >
                See How It Works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* AgentMitra */}
            <div
              className="flex flex-col rounded-2xl p-7 hover:shadow-[0_0_40px_rgba(168,85,247,0.10)]"
              style={{
                background: 'rgba(168,85,247,0.03)',
                border: '1.5px solid rgba(168,85,247,0.20)',
                opacity: productsInView ? 1 : 0,
                transform: productsInView ? 'translateX(0)' : 'translateX(40px)',
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '0.7s, 0.7s, 0.3s',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease',
                transitionDelay: '150ms',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.30)' }}
                  >
                    <Users className="w-5 h-5" style={{ color: '#C084FC' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#C084FC' }}>
                      Product 02
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(168,85,247,0.14)', color: '#C084FC', border: '1px solid rgba(168,85,247,0.28)' }}
                >
                  EARLY ACCESS
                </span>
              </div>

              <h3
                className="font-playfair italic font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
              >
                AgentMitra
              </h3>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: '#CBD5E1' }}>
                A role-based operations platform that consolidates agents, clients, and workflows
                in one structured environment — built for service businesses and agencies.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  'Role-based access for agents and clients',
                  'Instant client lookup and status tracking',
                  'Structured workflows — consistent execution',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#CBD5E1' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C084FC' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="grid grid-cols-2 gap-4 py-5 mb-6"
                style={{ borderTop: '1px solid rgba(168,85,247,0.12)', borderBottom: '1px solid rgba(168,85,247,0.12)' }}
              >
                <div>
                  <div className="font-mono font-bold text-white text-2xl">24/7</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>always-on automation</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-2xl">0</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>extra staff required</div>
                </div>
              </div>

              <Link
                href="/agent-mitra"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[rgba(168,85,247,0.18)]"
                style={{ border: '1px solid rgba(168,85,247,0.35)', color: '#C084FC' }}
                onClick={() =>
                  trackEvent('cta_clicked', { label: 'Get on the Waitlist', destination: '/agent-mitra', page: '/', section: 'products' })
                }
              >
                Get on the Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Setu */}
            <div
              className="flex flex-col rounded-2xl p-7 hover:shadow-[0_0_60px_rgba(37,211,102,0.12)]"
              style={{
                background: 'rgba(37,211,102,0.04)',
                border: '1.5px solid rgba(37,211,102,0.22)',
                boxShadow: '0 0 40px rgba(37,211,102,0.06)',
                opacity: productsInView ? 1 : 0,
                transform: productsInView ? 'translateX(0)' : 'translateX(-40px)',
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '0.7s, 0.7s, 0.3s',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease',
                transitionDelay: '300ms',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,211,102,0.18)', border: '1px solid rgba(37,211,102,0.30)' }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: '#4ADE80' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#4ADE80' }}>
                      Product 03
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(74,222,128,0.14)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.28)' }}
                >
                  LIVE
                </span>
              </div>

              <h3
                className="font-playfair italic font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
              >
                Setu
              </h3>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: '#CBD5E1' }}>
                WhatsApp marketing that scales — broadcast campaigns, 24/7 AI chatbot, shared team
                inbox, and a full lead pipeline in one platform. Built for Indian businesses.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  'Segmented broadcast campaigns to thousands',
                  '24/7 AI chatbot — no coding required',
                  'Shared team inbox with lead pipeline',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#CBD5E1' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#4ADE80' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="grid grid-cols-2 gap-4 py-5 mb-6"
                style={{ borderTop: '1px solid rgba(37,211,102,0.12)', borderBottom: '1px solid rgba(37,211,102,0.12)' }}
              >
                <div>
                  <div className="font-mono font-bold text-white text-2xl">98%</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>WhatsApp open rate</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-2xl">
                    <CountUp value={3} suffix="×" />
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>higher reply vs email</div>
                </div>
              </div>

              <Link
                href="/solutions/setu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_rgba(37,211,102,0.25)]"
                style={{ background: 'linear-gradient(135deg, #16A34A 0%, #25D366 100%)', color: '#fff' }}
                onClick={() =>
                  trackEvent('cta_clicked', { label: 'See How It Works — Setu', destination: '/solutions/setu', page: '/', section: 'products' })
                }
              >
                See How It Works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* BankLens */}
            <div
              className="flex flex-col rounded-2xl p-7 hover:shadow-[0_0_40px_rgba(245,158,11,0.10)]"
              style={{
                background: 'rgba(245,158,11,0.03)',
                border: '1.5px solid rgba(245,158,11,0.20)',
                opacity: productsInView ? 1 : 0,
                transform: productsInView ? 'translateX(0)' : 'translateX(40px)',
                transitionProperty: 'opacity, transform, box-shadow',
                transitionDuration: '0.7s, 0.7s, 0.3s',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease',
                transitionDelay: '450ms',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.30)' }}
                  >
                    <BarChart3 className="w-5 h-5" style={{ color: '#FCD34D' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#FCD34D' }}>
                      Product 04
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(74,222,128,0.14)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.28)' }}
                >
                  LIVE
                </span>
              </div>

              <h3
                className="font-playfair italic font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
              >
                BankLens
              </h3>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: '#CBD5E1' }}>
                AI bank statement analysis that computes 220+ financial signals, detects fraud, and
                delivers a structured credit decision in under 5 minutes. Built for NBFCs and DSAs.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  '220+ financial signals per statement',
                  '14-signal fraud detection system',
                  'APPROVE / REVIEW / REJECT with reason codes',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#CBD5E1' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FCD34D' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="grid grid-cols-2 gap-4 py-5 mb-6"
                style={{ borderTop: '1px solid rgba(245,158,11,0.12)', borderBottom: '1px solid rgba(245,158,11,0.12)' }}
              >
                <div>
                  <div className="font-mono font-bold text-white text-2xl">&lt; 5min</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>full credit decision</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-2xl">80%</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>ops cost reduction</div>
                </div>
              </div>

              <Link
                href="/solutions/banklens"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[rgba(245,158,11,0.18)]"
                style={{ border: '1px solid rgba(245,158,11,0.35)', color: '#FCD34D' }}
                onClick={() =>
                  trackEvent('cta_clicked', { label: 'See How It Works — BankLens', destination: '/solutions/banklens', page: '/', section: 'products' })
                }
              >
                See How It Works <ArrowRight className="w-4 h-4" />
              </Link>
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
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
            >
              Real results from{' '}
              <em className="not-italic" style={{ color: '#06CEFF' }}>
                real businesses.
              </em>
            </h2>
          </div>

          <div
            ref={testimonialsRef as React.RefObject<HTMLDivElement>}
            className="grid md:grid-cols-2 gap-6"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="glass-luxury rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  opacity: testimonialsInView ? 1 : 0,
                  transform: testimonialsInView ? 'translateY(0)' : 'translateY(28px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.6s',
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `${i * 100}ms`,
                  borderColor: `${t.accentColor}20`,
                }}
              >
                <Quote className="w-5 h-5 flex-shrink-0" style={{ color: t.accentColor, opacity: 0.7 }} />
                <p className="text-white/85 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-300 text-xs">{t.title} · {t.company} · {t.location}</p>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                    style={{
                      background: `${t.accentColor}12`,
                      color: t.accentColor,
                      border: `1px solid ${t.accentColor}28`,
                    }}
                  >
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INDUSTRIES — bento dark grid
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div className="text-center mb-14 flex flex-col items-center">
            <SectionLabel>Built for These Industries</SectionLabel>
            <h2
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
            >
              AI that scales with{' '}
              <em className="not-italic" style={{ color: '#06CEFF' }}>
                any business.
              </em>
            </h2>
          </div>

          <div ref={industriesRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries.map((industry, i) => (
              <div
                key={industry.label}
                className="group rounded-2xl p-5 cursor-default transition-all duration-500 glass-luxury"
                style={{
                  opacity: industriesInView ? 1 : 0,
                  transform: industriesInView ? 'translateY(0)' : 'translateY(24px)',
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                  transitionDuration: '0.55s, 0.55s, 0.3s, 0.3s',
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease, ease',
                  transitionDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(6,206,255,0.22)';
                  el.style.boxShadow = '0 0 30px rgba(6,206,255,0.08)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div className="mb-3">{industry.icon}</div>
                <div className="text-white font-semibold text-sm mb-2">{industry.label}</div>
                <p
                  className="text-xs leading-snug md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-16 opacity-60 max-h-16 transition-all duration-300 overflow-hidden"
                  style={{ color: '#CBD5E1' }}
                >
                  {industry.useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHY VYAPTIX — left text + right glass cards
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-dot-grid" style={{ backgroundColor: '#050D1A' }}>
        <div className="container-main">
          <div ref={whyRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div
              style={{
                opacity: whyInView ? 1 : 0,
                transform: whyInView ? 'translateX(0)' : 'translateX(-36px)',
                transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div className="flex flex-col items-start">
                <SectionLabel>Why VyaptIX</SectionLabel>
              </div>
              <h2
                className="font-playfair italic font-bold text-white mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
              >
                Practical AI for businesses that want{' '}
                <em className="not-italic" style={{ color: '#06CEFF' }}>
                  results, not pilots.
                </em>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#CBD5E1' }}>
                Most AI projects stall at proof-of-concept. We skip the exploration phase
                and build automations that go live fast — because your business can&apos;t
                wait 6 months for a return on investment.
              </p>
            </div>

            {/* Right — 2×2 glass cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyVyaptix.map((point, i) => (
                <div
                  key={point.title}
                  className="glass-luxury rounded-2xl p-5 group cursor-default"
                  style={{
                    opacity: whyInView ? 1 : 0,
                    transform: whyInView ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)',
                    transitionProperty: 'opacity, transform, box-shadow, border-color',
                    transitionDuration: '0.55s, 0.55s, 0.3s, 0.3s',
                    transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1), ease, ease',
                    transitionDelay: `${i * 90 + 180}ms`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = `0 0 32px ${point.iconBg.replace('0.12', '0.20')}`;
                    el.style.borderColor = point.iconBorder;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = 'none';
                    el.style.borderColor = '';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: point.iconBg,
                      border: `1px solid ${point.iconBorder}`,
                      color: point.iconColor,
                    }}
                  >
                    <point.Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1.5">{point.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#CBD5E1' }}>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          AI STACK — marquee
      ════════════════════════════════════════════ */}
      <section
        className="py-10 overflow-hidden"
        style={{
          backgroundColor: '#0A1628',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="text-center mb-8">
          <span
            className="inline-block text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: '#94A3B8' }}
          >
            19+ AI tools. Vendor-neutral. Always expanding.
          </span>
        </div>
        <Marquee items={aiToolsRow1} speed={28} />
        <div className="mt-4">
          <Marquee items={aiToolsRow2} speed={35} reverse />
        </div>
      </section>

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
              'radial-gradient(ellipse 55% 65% at 50% 100%, rgba(6,206,255,0.13) 0%, transparent 65%)',
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
            className="font-playfair italic font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1.08 }}
          >
            Have a business problem?
          </h2>
          <h2
            className="font-playfair italic font-bold mb-10"
            style={{
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
            Book a 30-minute discovery call. No pitch decks, no generic demos — just a real
            conversation about where AI can remove friction in your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 font-semibold rounded-xl transition-all duration-200 text-white hover:shadow-[0_0_50px_rgba(6,206,255,0.38)] hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1A52E0 0%, #06CEFF 100%)' }}
              onClick={() =>
                trackEvent('cta_clicked', { label: 'Book Your Free Discovery Call', destination: '/demo', page: '/', section: 'final_cta' })
              }
            >
              Book Your Free Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/[0.07] hover:border-white/35"
              style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              onClick={() =>
                trackEvent('cta_clicked', { label: 'See Our Products', destination: '/solutions', page: '/', section: 'final_cta' })
              }
            >
              See Our Products <ArrowRight className="w-5 h-5 opacity-60" />
            </Link>
          </div>

          <p
            className="text-sm mt-8"
            style={{ color: '#94A3B8' }}
          >
            No commitment required. 30 minutes, real answers.
          </p>
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
        onClick={() => trackEvent('whatsapp_clicked', { page: '/', source: 'floating_button' })}
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
