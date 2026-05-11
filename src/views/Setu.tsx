'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Send,
  Inbox,
  Users,
  BarChart3,
  Zap,
  Bot,
  Shield,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Clock,
  Target,
  Layers,
  ShoppingBag,
  Building2,
  GraduationCap,
  Stethoscope,
  Home,
  Briefcase,
} from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/Accordion';
import { ScrollRevealGroup } from '../components/ui/ScrollRevealGroup';
import { CountUp } from '../components/ui/CountUp';
import { HeroStatFloat } from '../components/ui/HeroStatFloat';
import { trackEvent } from '../lib/analytics';
import { ScreenshotCarousel } from '../components/ui/ScreenshotCarousel';

const SETU_GREEN = '#25D366';
const SETU_GREEN_LIGHT = '#4ADE80';

const features = [
  {
    icon: <Send className="w-6 h-6" />,
    title: 'Segmented Broadcast Campaigns',
    description: 'Upload contacts, build smart segments, attach media, schedule sends, and track delivery, read, and reply rates live from your dashboard.',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: '24/7 AI Chatbot',
    description: 'Deploy welcome flows, business-hours menus, keyword triggers, and service trees — no coding required. Your chatbot qualifies and captures leads while you sleep.',
  },
  {
    icon: <Inbox className="w-6 h-6" />,
    title: 'Shared Team Inbox',
    description: 'Assign conversations to agents, set intelligent routing rules, and track response times across your entire team in one unified inbox.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Contact CRM & Segments',
    description: 'Import via CSV, tag and group contacts, manage opt-outs automatically, and build reusable segments for precision targeting.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Lead Pipeline & Kanban',
    description: 'Custom pipeline stages, drag-and-drop deals, estimated deal value, automated follow-up reminders, and chatbot-driven auto-capture.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Media Content Library',
    description: 'Organize your flyers, catalogues, PDFs, and videos in one place. Wire any asset directly to campaigns or chatbot flows with a click.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Campaign Analytics',
    description: 'Sent, delivered, read, and reply rates in one view. Track pipeline health and weekly message trends to optimize what converts.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Role-Based Access',
    description: 'Granular Admin, Manager, and Viewer permissions keep your data secure and your team accountable at every level.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Consent-First Messaging',
    description: 'Built-in STOP/opt-out handling, DPDP Act 2023 compliance, and Meta-approved flows — market confidently without regulatory risk.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Connect Your WhatsApp Business Number',
    description: 'Create your workspace and link your WhatsApp Business API number in minutes. VyaptIX is a registered Meta Tech Provider — no paperwork, no waiting.',
  },
  {
    step: '02',
    title: 'Import Contacts & Build Segments',
    description: 'Upload your contact list via CSV. Tag, group, and filter into precision segments — by location, industry, purchase history, or any custom attribute.',
  },
  {
    step: '03',
    title: 'Configure Your AI Chatbot',
    description: 'Set up welcome messages, business-hours flows, and keyword-triggered menus. The chatbot qualifies leads automatically — no developer needed.',
  },
  {
    step: '04',
    title: 'Launch Your First Campaign',
    description: 'Send to a test group, review delivery and read rates, then broadcast to your full segment. A campaign goes live in under 2 minutes.',
  },
  {
    step: '05',
    title: 'Manage, Convert & Grow',
    description: 'Replies land in your shared inbox. Leads move through your Kanban pipeline. Analytics tell you what to send next. The flywheel runs itself.',
  },
];

const industries = [
  { icon: <ShoppingBag className="w-6 h-6" />, name: 'Retail & eCommerce', stat: '3× higher reply rate vs email' },
  { icon: <Stethoscope className="w-6 h-6" />, name: 'Healthcare & Clinics', stat: 'Appointment reminders at 98% open rate' },
  { icon: <GraduationCap className="w-6 h-6" />, name: 'Education & EdTech', stat: 'Enrolment drip campaigns that convert' },
  { icon: <Home className="w-6 h-6" />, name: 'Real Estate', stat: 'Lead pipeline from inquiry to site visit' },
  { icon: <Building2 className="w-6 h-6" />, name: 'Finance & Insurance', stat: 'Policy renewal reminders that get read' },
  { icon: <Briefcase className="w-6 h-6" />, name: 'Professional Services', stat: 'Client onboarding flows on autopilot' },
];

const stats = [
  { value: 98, suffix: '%', label: 'WhatsApp message open rate' },
  { value: 3, suffix: '×', label: 'Higher reply rate vs email' },
  { value: 2, suffix: ' min', label: 'To launch a campaign' },
  { value: 18, suffix: '+', label: 'Industries served' },
];

const faqs = [
  {
    question: 'Do I need technical knowledge to set up Setu?',
    answer: 'No. Setu is built for business owners and marketing teams, not developers. The guided setup checklist takes you from zero to sending your first campaign in under 30 minutes. The AI chatbot builder is point-and-click — no coding required.',
  },
  {
    question: 'Is VyaptIX an official Meta / WhatsApp partner?',
    answer: 'Yes. VyaptIX Technologies LLP is a registered Meta Tech Provider. This means your WhatsApp Business API access is compliant, fast-tracked, and supported directly through our platform.',
  },
  {
    question: 'Can I use my existing WhatsApp Business number?',
    answer: 'Yes, you can migrate your existing WhatsApp Business number to the API via Setu. We guide you through the verification process step by step. Phone numbers must be in E.164 format.',
  },
  {
    question: 'How does consent and opt-out work?',
    answer: 'Setu has built-in STOP and opt-out handling. When a contact replies STOP, they are automatically removed from future broadcasts. All messaging flows are designed to be consent-first and DPDP Act 2023 compliant.',
  },
  {
    question: 'What is the pricing?',
    answer: 'Setu starts at ₹999/month. The price includes your workspace, contacts, campaigns, AI chatbot, team inbox, and analytics. WhatsApp conversation charges (Meta fees) are billed separately based on usage. Contact us for custom pricing on high-volume plans.',
  },
  {
    question: 'Can I add multiple team members?',
    answer: 'Yes. Setu supports role-based access — Admin, Manager, and Viewer — so you can add your sales team, support agents, and managers with appropriate permissions. All conversations are visible in the shared team inbox.',
  },
];

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Setu — WhatsApp Marketing & Automation',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://setu.vyaptix.ai',
  description: 'WhatsApp marketing platform for Indian businesses — broadcast campaigns, AI chatbot, shared team inbox, lead pipeline, and analytics in one place.',
  offers: {
    '@type': 'Offer',
    price: '999',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'Organization',
    name: 'VyaptIX',
    url: 'https://vyaptix.com',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

function WordStagger({ text, startDelay = 0, visible }: { text: string; startDelay?: number; visible: boolean }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${startDelay + i * 70}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function Setu() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepperVisible, setStepperVisible] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = stepperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStepperVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'Setu' },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(37,211,102,0.07)' }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'rgba(26,82,224,0.10)' }} />
        </div>

        <div className="hidden lg:block absolute top-12 right-8 z-10">
          <HeroStatFloat icon="💬" primary="98% Open Rate" secondary="vs 22% email average" floatSpeed="8s" />
        </div>
        <div className="hidden lg:block absolute bottom-12 left-8 z-10">
          <HeroStatFloat icon="⚡" primary="Under 2 minutes" secondary="to launch a campaign" floatSpeed="12s" animationDelay="3s" />
        </div>

        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'rgba(37,211,102,0.10)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  color: SETU_GREEN_LIGHT,
                  opacity: heroVisible ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: '50ms',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: SETU_GREEN_LIGHT }} />
                Live Platform · VyaptIX Product 03
              </div>
              <h1
                className="font-playfair italic font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.05 }}
              >
                <span className="block">
                  <WordStagger text="WhatsApp Marketing" visible={heroVisible} startDelay={150} />
                </span>
                <span className="block" style={{ color: SETU_GREEN_LIGHT }}>
                  <WordStagger text="That Scales With Your Business" visible={heroVisible} startDelay={450} />
                </span>
              </h1>
              <p
                className="text-lg text-slate-100 mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s, transform 0.6s',
                  transitionDelay: '750ms',
                }}
              >
                Send campaigns to thousands, automate replies 24/7, manage your
                entire team inbox, and close more leads — all on WhatsApp.
                One platform. Every channel of your customer conversation.
              </p>
              <div
                className="rounded-xl border border-white/10 bg-white/5 p-4 mb-8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s, transform 0.6s',
                  transitionDelay: '900ms',
                }}
              >
                <p className="text-white/85">
                  <span className="font-semibold text-white">The Reality:</span> WhatsApp has a 98% open rate. Your email marketing gets 22%. Your customers are already on WhatsApp — Setu puts your business there too, at scale.
                </p>
              </div>
              <div
                className="flex flex-wrap gap-4 mb-8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s, transform 0.6s',
                  transitionDelay: '1050ms',
                }}
              >
                <a
                  href="https://setu.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg hover:scale-[1.03] transition-all"
                  style={{ background: SETU_GREEN, color: '#050D1A' }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Start Free — Setu', destination: 'https://setu.vyaptix.ai', page: '/solutions/setu', section: 'hero' })}
                >
                  Start Free <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Schedule Demo — Setu', destination: '/demo', page: '/solutions/setu', section: 'hero' })}
                >
                  Schedule Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: SETU_GREEN_LIGHT }} /> Starts at ₹999/month
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: SETU_GREEN_LIGHT }} /> Meta registered provider
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: SETU_GREEN_LIGHT }} /> DPDP Act 2023 compliant
                </span>
              </div>
              <div className="lg:hidden flex gap-3 flex-wrap mt-6">
                <HeroStatFloat icon="💬" primary="98% Open Rate" secondary="vs 22% email average" floatSpeed="10s" />
                <HeroStatFloat icon="⚡" primary="Under 2 minutes" secondary="to launch a campaign" floatSpeed="14s" animationDelay="2s" />
              </div>
            </div>

            {/* Mockup: WhatsApp-style campaign dashboard */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(32px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '400ms',
              }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="bg-[#050D1A] rounded-xl overflow-hidden">
                  {/* Mockup header */}
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10" style={{ background: 'rgba(37,211,102,0.08)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: SETU_GREEN }}>
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Setu — Campaign Dashboard</p>
                      <p className="text-xs" style={{ color: SETU_GREEN_LIGHT }}>● LIVE</p>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 p-4">
                    {[
                      { label: 'Delivered', value: '4,821', color: SETU_GREEN_LIGHT },
                      { label: 'Read', value: '4,723', color: '#06CEFF' },
                      { label: 'Replied', value: '1,094', color: '#FBBF24' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                        <p className="text-lg font-bold font-mono text-white">{s.value}</p>
                        <p className="text-xs mt-0.5" style={{ color: s.color }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chat preview */}
                  <div className="px-4 pb-2 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Latest Conversations</p>
                    {[
                      { name: 'Aisha Johnson', msg: "I'd like to know more about your offer 🙌", time: '2m', hot: true },
                      { name: 'Carlos Rivera', msg: 'Yes, please send me the brochure', time: '8m', hot: true },
                      { name: 'Sophie Chen', msg: 'What are your pricing plans?', time: '15m', hot: false },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/4 px-3 py-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {c.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{c.name}</p>
                          <p className="text-xs text-slate-400 truncate">{c.msg}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-xs text-slate-500">{c.time} ago</p>
                          {c.hot && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(251,191,36,0.15)', color: '#FBBF24' }}>HOT</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pb-4 mt-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(37,211,102,0.08)', border: `1px solid rgba(37,211,102,0.2)` }}>
                      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: SETU_GREEN_LIGHT }} />
                      <p className="text-xs" style={{ color: SETU_GREEN_LIGHT }}>Campaign launched in <strong>1 min 43 sec</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat bar ── */}
      <section className="py-12 bg-[#0A1628] border-y border-white/8">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-mono font-bold text-white text-3xl md:text-4xl mb-1">
                  <CountUp value={s.value} suffix={s.suffix} duration={1600} />
                </p>
                <p className="text-sm text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-[#050D1A] section-grid-light">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Platform Capabilities</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Everything Your Business Needs on WhatsApp
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Nine battle-tested capabilities — from broadcast to CRM to AI chatbot — built into one coherent platform.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerMs={80}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 transition-all duration-300"
                style={{ ['--hover-border' as string]: 'rgba(37,211,102,0.30)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(37,211,102,0.30)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all"
                  style={{ background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.20)', color: SETU_GREEN_LIGHT }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">Product Tour</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              See Setu In Action
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A real look at the platform — from first setup to live campaigns and lead pipeline.
            </p>
          </div>
          <ScreenshotCarousel
            accentColor={SETU_GREEN}
            appUrl="setu.vyaptix.ai"
            screenshotBg="#f8fafc"
            screenshots={[
              {
                src: '/screenshots/setu/setu-screenshot1.png',
                caption: 'Guided Onboarding — 8-step checklist gets your team from zero to live in under 30 minutes',
              },
              {
                src: '/screenshots/setu/setu-screenshot2.png',
                caption: 'Live Dashboard — contacts, active campaigns, hot leads, and messages sent at a glance',
              },
              {
                src: '/screenshots/setu/setu-screenshot3.png',
                caption: 'Lead Pipeline — Kanban view to track, qualify, and convert WhatsApp leads across stages',
              },
            ]}
          />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">The Process</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              From Setup to First Campaign in 30 Minutes
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              No WhatsApp API experience required. Our guided onboarding takes you from zero to live in under half an hour.
            </p>
          </div>
          <div ref={stepperRef} className="max-w-3xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="flex gap-6 mb-6 last:mb-0"
                style={{
                  opacity: stepperVisible ? 1 : 0,
                  transform: stepperVisible ? 'translateX(0)' : 'translateX(-32px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold font-mono"
                    style={{ background: SETU_GREEN }}
                  >
                    {item.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="w-px flex-1 mt-3" style={{ background: `linear-gradient(to bottom, rgba(37,211,102,0.4), transparent)` }} />
                  )}
                </div>
                <div className="pb-8 pt-2">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-200 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Industries</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              18+ Industries. One Platform.
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              If your customers are on WhatsApp — and they are — Setu gives you a direct line to them at scale.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerMs={80}>
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.20)', color: SETU_GREEN_LIGHT }}
                >
                  {ind.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{ind.name}</h3>
                  <p className="text-sm font-medium" style={{ color: SETU_GREEN_LIGHT }}>{ind.stat}</p>
                </div>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Platform Access ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-mono-cyan mb-4">Access the Platform</p>
              <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Start Reaching Customers on WhatsApp Today
              </h2>
              <p className="text-lg text-slate-100 mb-6">
                Setu is a live, production-ready platform available at{' '}
                <strong className="text-white">setu.vyaptix.ai</strong>. Create your workspace,
                connect your WhatsApp Business number, and send your first campaign — all in one session.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Guided setup checklist — 8 steps from zero to live',
                  'Separate workspace with full team access controls',
                  'AI chatbot builder with no-code configuration',
                  'Real-time campaign analytics and lead pipeline',
                  'Priority support from the VyaptIX team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SETU_GREEN_LIGHT }} />
                    <span className="text-slate-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://setu.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg hover:scale-[1.03] transition-all"
                  style={{ background: SETU_GREEN, color: '#050D1A' }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Go to Setu Platform', destination: 'https://setu.vyaptix.ai', page: '/solutions/setu', section: 'platform_access' })}
                >
                  Go to Platform <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  style={{ color: SETU_GREEN_LIGHT }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Talk to Sales — Setu', destination: '/contact', page: '/solutions/setu', section: 'platform_access' })}
                >
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Animated metrics mockup */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10" style={{ background: 'rgba(37,211,102,0.08)' }}>
                <p className="font-semibold text-white text-sm">Setu Analytics — Live View</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <Send className="w-5 h-5 mb-2" style={{ color: SETU_GREEN_LIGHT }} />
                    <p className="text-2xl font-bold text-white">
                      <CountUp value={485} duration={1500} />
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Messages Sent</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <TrendingUp className="w-5 h-5 mb-2" style={{ color: '#FBBF24' }} />
                    <p className="text-2xl font-bold text-white">2</p>
                    <p className="text-xs text-slate-300 mt-0.5">Hot Leads</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <Users className="w-5 h-5 mb-2" style={{ color: '#06CEFF' }} />
                  <p className="text-2xl font-bold text-white">
                    <CountUp value={468} duration={1800} />
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">Total Contacts</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.20)' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: SETU_GREEN_LIGHT }} />
                    <p className="text-sm font-medium" style={{ color: SETU_GREEN_LIGHT }}>
                      Active campaigns: <strong>0</strong> · Response time: <strong>&lt; 2 min</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">FAQ</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-200">Everything you need to know before getting started.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-1"
                >
                  <AccordionTrigger className="text-[15px] leading-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-20 md:py-28 bg-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full blur-3xl animate-glow-pulse" style={{ background: 'rgba(37,211,102,0.08)' }} />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}>
            Ready to Turn WhatsApp Into Your{' '}
            <span style={{ color: SETU_GREEN_LIGHT }}>Growth Engine?</span>
          </h2>
          <p className="text-lg text-slate-100 mb-8">
            Join businesses across 18+ industries already using Setu to reach customers,
            automate conversations, and close more deals — on the channel that actually gets read.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://setu.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg hover:scale-[1.03] transition-all"
              style={{ background: SETU_GREEN, color: '#050D1A' }}
              onClick={() => trackEvent('cta_clicked', { label: 'Get Started — Setu Final CTA', destination: 'https://setu.vyaptix.ai', page: '/solutions/setu', section: 'final_cta' })}
            >
              Get Started — ₹999/month <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Schedule Demo — Setu Final CTA', destination: '/demo', page: '/solutions/setu', section: 'final_cta' })}
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
