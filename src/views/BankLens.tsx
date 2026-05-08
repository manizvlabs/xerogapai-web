'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FileText,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Clock,
  Users,
  Zap,
  AlertTriangle,
  Download,
  Building2,
  Lock,
  Search,
  ChevronRight,
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
import { SEO } from '../components/SEO';
import { trackEvent } from '../lib/analytics';

const AMBER = '#F59E0B';
const AMBER_LIGHT = '#FCD34D';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Universal Document Ingestion',
    description: 'Drag-and-drop any bank statement — PDF (native, scanned, or password-protected), image files (PNG/JPG), or Account Aggregator JSON. Supports 40+ Indian banks with universal OCR fallback.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: '220+ Financial Signals',
    description: 'Income stability, EMI obligation tracking, cash flow seasonality, salary regularity (CV-based), DTI ratio, overdraft frequency, and balance trajectory — computed automatically from every statement.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'ML-Powered Credit Scoring',
    description: 'A 0–100 credit score with A/B/C/D risk tier classification. Every decision — APPROVE, REVIEW, or REJECT — is explainable via SHAP-based reason codes your credit managers can stand behind.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: '14-Signal Fraud Detection',
    description: 'PDF integrity verification, round-number transaction pattern analysis, salary velocity anomalies, overnight crediting flags, ghost employer signals, and duplicate narration identification — all in one pass.',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Audit-Ready CAM Reports',
    description: 'Download a structured Credit Assessment Memo (CAM) PDF, Excel workbook with all 220+ features, and machine-readable JSON — formatted to satisfy RBI NBFC guidelines and internal audit requirements.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Role-Based Access & Audit Trail',
    description: 'ANALYST, CREDIT_MANAGER, and ADMIN roles with granular permissions. Every action is logged with an immutable SHA-256 audit trail — production-ready compliance from day one.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '7-Stage Async Pipeline',
    description: 'A distributed processing pipeline with Redis locking handles high volumes without bottlenecks. Real-time status tracking at every stage — from document ingestion to final decision.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-Bank Statement Fusion',
    description: 'Merge statements from multiple banks into a single unified credit profile. Captures the full financial picture even when a borrower banks across multiple institutions.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Upload the Bank Statement',
    description: 'Drop any format — PDF (native, scanned, password-protected) or image. BankLens supports 40+ Indian banks with automatic format detection and OCR fallback for scanned documents.',
  },
  {
    step: '02',
    title: 'AI Analyzes 220+ Financial Signals',
    description: 'A 7-stage async pipeline extracts transactions, categorizes them with ML (SALARY, EMI, UTILITIES, FOOD, TRANSFER), engineers 220+ features, and runs the risk scoring model — all in under 5 minutes.',
  },
  {
    step: '03',
    title: 'Receive a Structured Credit Decision',
    description: 'Get a 0–100 credit score, A/B/C/D risk tier, APPROVE/REVIEW/REJECT recommendation, SHAP reason codes, 14-signal fraud report, and a downloadable CAM PDF — ready for your credit committee.',
  },
];

const caseStat = [
  { label: 'Manual review cost', before: '₹2.1L/month', after: '₹42K/month', improvement: '80% reduction' },
  { label: 'Turnaround time', before: '3.5 hours', after: '< 30 minutes', improvement: '7× faster' },
  { label: 'Analyst hours', before: '525 hrs/month', after: '~105 hrs/month', improvement: '420 hrs saved' },
  { label: '5-Year NPV', before: '—', after: '₹6.5L+', improvement: 'Net present value' },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹12',
    per: 'per report',
    description: 'Pay-as-you-go. For teams processing up to 50 reports/month.',
    features: [
      'Up to 50 reports/month',
      'PDF & image upload',
      'All 220+ financial signals',
      'Credit score + tier + decision',
      '14-signal fraud detection',
      'Summary report download',
      'DPDP 2023 compliant',
      'Immutable audit log',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '₹1.5L',
    per: 'per year',
    description: 'For growing NBFCs and DSAs processing 500+ reports monthly.',
    features: [
      '500 reports/month included',
      'CAM PDF generation',
      'Excel workbook export',
      'Multi-user access (10 seats)',
      'REST API (1,000 calls/month)',
      'Immutable audit trail',
      'Priority email support',
      'No setup fees',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: 'contact us',
    description: 'For large lenders, banks, and fintech platforms needing white-label or on-premise.',
    features: [
      'Unlimited reports',
      'Custom XGBoost model training',
      'White-label reports + branding',
      'Account Aggregator integration',
      'On-premise deployment option',
      'Rule engine admin UI',
      '99.9% SLA + dedicated support',
      'Custom compliance documentation',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const faqs = [
  {
    question: 'Which Indian banks does BankLens support?',
    answer: 'BankLens supports 40+ major Indian banks including SBI, HDFC, ICICI, Axis, Kotak, PNB, Bank of Baroda, Canara Bank, and more. For banks not natively supported, our universal OCR fallback processes the statement automatically — no manual configuration needed.',
  },
  {
    question: 'How does BankLens handle password-protected PDFs?',
    answer: 'BankLens uses pikepdf for secure handling of password-protected bank statement PDFs. You provide the password during upload, the system decrypts, processes, and analyzes — the password is never stored after processing.',
  },
  {
    question: 'What makes the fraud detection reliable?',
    answer: 'Our 14-signal fraud detection system checks for PDF integrity (tamper detection), round-number transaction patterns, salary velocity anomalies, overnight crediting, ghost employer signals, and duplicate narrations. Each flag is logged with evidence, giving your credit team auditable justification for any rejection.',
  },
  {
    question: 'Is BankLens compliant with RBI and DPDP guidelines?',
    answer: 'Yes. BankLens is built with RBI NBFC guidelines, the DLG framework, and the DPDP Act 2023 in mind. Every report includes a full immutable audit trail with SHA-256 logging. DPDP consent capture is built into the borrower flow. ISO 27001 and SOC 2 certifications are in the roadmap.',
  },
  {
    question: 'Can we access BankLens via API?',
    answer: 'Yes. The Professional plan includes REST API access with 1,000 calls/month. Enterprise plans include unlimited API access and can be integrated directly into your LOS (Loan Origination System) or CRM. Full API documentation is available upon sign-up.',
  },
  {
    question: 'How long does it take to process a bank statement?',
    answer: 'Most statements are processed in under 5 minutes. Complex multi-bank fusions or large statement files (24-month PDFs with high transaction volumes) may take slightly longer. Our 7-stage async pipeline gives you real-time status updates at every step.',
  },
];

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BankLens — AI Bank Statement Analysis & Credit Decisioning',
  applicationCategory: 'FinancialApplication',
  operatingSystem: 'Web',
  url: 'https://banklens.vyaptix.ai',
  description: 'BankLens ingests bank statements, computes 220+ financial signals, runs ML-powered risk scoring, and outputs a structured credit decision in under 5 minutes. Built for NBFCs, DSAs, and fintech lenders.',
  offers: {
    '@type': 'Offer',
    price: '12',
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

export function BankLens() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepperVisible, setStepperVisible] = useState(false);
  const [caseVisible, setCaseVisible] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observers = [
      { ref: stepperRef, setter: setStepperVisible },
      { ref: caseRef, setter: setCaseVisible },
    ].map(({ ref, setter }) => {
      const el = ref.current;
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.unobserve(el); } },
        { threshold: 0.1 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <SEO
        title="BankLens — AI Bank Statement Analysis & Credit Decisioning for NBFCs"
        description="220+ financial signals, 14-signal fraud detection, and a structured credit decision in under 5 minutes. Built for India's NBFCs, DSAs, and fintech lenders. From ₹12/report."
        canonical="/solutions/banklens"
      />
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
              { label: 'BankLens' },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(245,158,11,0.07)' }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'rgba(26,82,224,0.10)' }} />
        </div>

        <div className="hidden lg:block absolute top-12 right-8 z-10">
          <HeroStatFloat icon="📊" primary="220+ Signals" secondary="computed per statement" floatSpeed="8s" />
        </div>
        <div className="hidden lg:block absolute bottom-12 left-8 z-10">
          <HeroStatFloat icon="⚡" primary="Under 5 minutes" secondary="full credit decision" floatSpeed="12s" animationDelay="3s" />
        </div>

        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'rgba(245,158,11,0.10)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: AMBER_LIGHT,
                  opacity: heroVisible ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: '50ms',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: AMBER_LIGHT }} />
                Live Platform · VyaptIX Product 04
              </div>
              <h1
                className="font-playfair italic font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.05 }}
              >
                <span className="block">
                  <WordStagger text="The Credit Analyst" visible={heroVisible} startDelay={150} />
                </span>
                <span className="block" style={{ color: AMBER_LIGHT }}>
                  <WordStagger text="You Can't Afford To Hire" visible={heroVisible} startDelay={450} />
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
                BankLens AI ingests bank statements, computes 220+ financial signals,
                runs ML-powered risk scoring, and outputs a structured credit decision
                — in under 5 minutes. Built for India's NBFCs, DSAs, and fintech lenders.
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
                  <span className="font-semibold text-white">The Problem:</span> A senior credit analyst costs ₹4–8L per year, reviews one file at a time, and introduces human bias. BankLens processes every statement the same way — faster, cheaper, and with full explainability.
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
                  href="https://banklens.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-[#050D1A] rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(245,158,11,0.30)] transition-all"
                  style={{ background: AMBER }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Open BankLens Platform', destination: 'https://banklens.vyaptix.ai', page: '/solutions/banklens', section: 'hero' })}
                >
                  Open the Platform <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Schedule Demo — BankLens', destination: '/demo', page: '/solutions/banklens', section: 'hero' })}
                >
                  Schedule Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: AMBER_LIGHT }} /> From ₹12/report
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: AMBER_LIGHT }} /> 40+ Indian banks
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: AMBER_LIGHT }} /> DPDP 2023 + RBI compliant
                </span>
              </div>
              <div className="lg:hidden flex gap-3 flex-wrap mt-6">
                <HeroStatFloat icon="📊" primary="220+ Signals" secondary="computed per statement" floatSpeed="10s" />
                <HeroStatFloat icon="⚡" primary="Under 5 minutes" secondary="full credit decision" floatSpeed="14s" animationDelay="2s" />
              </div>
            </div>

            {/* Credit decision mockup */}
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
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10" style={{ background: 'rgba(245,158,11,0.08)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: AMBER }}>
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">BankLens — Credit Decision</p>
                      <p className="text-xs" style={{ color: AMBER_LIGHT }}>● Processing Complete</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Score gauge */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Credit Score</p>
                      <p className="text-5xl font-bold font-mono" style={{ color: AMBER_LIGHT }}>74</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>Tier A</span>
                        <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>APPROVE</span>
                      </div>
                    </div>
                    {/* Signal summary */}
                    {[
                      { label: 'Income Stability', value: 'Consistent salary — 11 months', ok: true },
                      { label: 'DTI Ratio', value: '34% — within threshold', ok: true },
                      { label: 'Fraud Signals', value: '0 of 14 triggered', ok: true },
                      { label: 'Overdraft Events', value: '1 in 12 months — low risk', ok: true },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/8 bg-white/4">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#4ADE80' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white">{s.label}</p>
                          <p className="text-xs text-slate-400">{s.value}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: `1px solid rgba(245,158,11,0.2)` }}>
                      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: AMBER_LIGHT }} />
                      <p className="text-xs" style={{ color: AMBER_LIGHT }}>Decision generated in <strong>3 min 42 sec</strong></p>
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
            {[
              { value: 220, suffix: '+', label: 'Financial signals computed' },
              { value: 5, suffix: ' min', label: 'Average processing time' },
              { value: 14, suffix: '', label: 'Fraud detection signals' },
              { value: 40, suffix: '+', label: 'Indian banks supported' },
            ].map((s, i) => (
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
              Enterprise-Grade Credit Intelligence
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Eight capability groups built for the operational realities of Indian lending — from DSA kiosks to NBFC credit committees.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" staggerMs={70}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.30)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all"
                  style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.20)', color: AMBER_LIGHT }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">The Process</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Upload. Analyze. Decide. Three Steps.
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A process that used to take 3.5 hours now takes under 5 minutes — with more consistency and full audit-readiness.
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
                    style={{ background: AMBER }}
                  >
                    {item.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="w-px flex-1 mt-3" style={{ background: `linear-gradient(to bottom, rgba(245,158,11,0.4), transparent)` }} />
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

      {/* ── Case Study ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Real Results</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Finance Buddha: 80% Cost Reduction in 90 Days
            </h2>
            <p className="text-slate-200 max-w-2xl mx-auto">
              Finance Buddha was spending ₹2.1 lakh per month on manual bank statement review — 525 analyst hours, 3.5-hour turnaround times, and growing headcount. They deployed BankLens.
            </p>
          </div>
          <div ref={caseRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {caseStat.map((c, i) => (
              <div
                key={c.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                style={{
                  opacity: caseVisible ? 1 : 0,
                  transform: caseVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s, transform 0.6s',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{c.label}</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Before</span>
                    <span className="text-sm text-slate-300 line-through">{c.before}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">After</span>
                    <span className="text-base font-bold text-white">{c.after}</span>
                  </div>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}
                >
                  {c.improvement}
                </span>
              </div>
            ))}
          </div>
          <div
            className="rounded-2xl p-8 max-w-3xl mx-auto text-center"
            style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)' }}
          >
            <p className="text-lg text-slate-100 italic mb-4">
              "We went from a 3.5-hour TAT to under 30 minutes, and our monthly credit ops cost dropped from ₹2.1 lakh to ₹42K. BankLens paid for itself in the first week."
            </p>
            <p className="text-sm font-semibold text-white">Finance Buddha — Credit Operations Lead</p>
            <p className="text-xs text-slate-400 mt-1">NBFC · Mumbai</p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Pricing</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Transparent Pricing. No Setup Fees.
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Start pay-as-you-go at ₹12/report. Scale to unlimited when your volume demands it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 flex flex-col"
                style={{
                  background: plan.highlight ? 'rgba(245,158,11,0.06)' : 'rgba(255,255,255,0.03)',
                  border: plan.highlight ? '1.5px solid rgba(245,158,11,0.35)' : '1px solid rgba(255,255,255,0.10)',
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: AMBER, color: '#050D1A' }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: AMBER_LIGHT }}>{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold font-mono text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm">/{plan.per}</span>
                  </div>
                  <p className="text-sm text-slate-300">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: AMBER_LIGHT }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://banklens.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={
                    plan.highlight
                      ? { background: AMBER, color: '#050D1A' }
                      : { border: `1px solid rgba(245,158,11,0.30)`, color: AMBER_LIGHT }
                  }
                  onClick={() => trackEvent('cta_clicked', { label: `${plan.cta} — BankLens ${plan.name}`, destination: 'https://banklens.vyaptix.ai', page: '/solutions/banklens', section: 'pricing' })}
                >
                  {plan.cta} <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            All plans include DPDP 2023 compliance, immutable audit log, RBAC, and no credit card required to start.
          </p>
        </div>
      </section>

      {/* ── Platform Access ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-mono-cyan mb-4">Access the Platform</p>
              <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Your Credit Team. Now 7× Faster.
              </h2>
              <p className="text-lg text-slate-100 mb-6">
                BankLens is live at <strong className="text-white">banklens.vyaptix.ai</strong>. Create your account,
                upload a sample statement, and see a full 220-signal credit decision in under 5 minutes — no sales call required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'No-login dev mode to explore the platform before sign-up',
                  'Role-switcher (ANALYST / CREDIT_MANAGER / ADMIN) built in',
                  'Full CAM PDF report downloadable on first try',
                  'REST API available on Professional plan for LOS integration',
                  'Dedicated onboarding support for NBFC teams',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER_LIGHT }} />
                    <span className="text-slate-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://banklens.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg hover:scale-[1.03] transition-all"
                  style={{ background: AMBER, color: '#050D1A' }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Open BankLens Dashboard', destination: 'https://banklens.vyaptix.ai', page: '/solutions/banklens', section: 'platform_access' })}
                >
                  Open Dashboard <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  style={{ color: AMBER_LIGHT }}
                  onClick={() => trackEvent('cta_clicked', { label: 'Talk to Sales — BankLens', destination: '/contact', page: '/solutions/banklens', section: 'platform_access' })}
                >
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Compliance + metrics panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10" style={{ background: 'rgba(245,158,11,0.08)' }}>
                <p className="font-semibold text-white text-sm">BankLens — Compliance & Standards</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <Building2 className="w-5 h-5 mb-2" style={{ color: AMBER_LIGHT }} />
                    <p className="text-sm font-semibold text-white">RBI NBFC</p>
                    <p className="text-xs text-slate-300 mt-0.5">Guidelines compliant</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <Shield className="w-5 h-5 mb-2" style={{ color: '#4ADE80' }} />
                    <p className="text-sm font-semibold text-white">DPDP 2023</p>
                    <p className="text-xs text-slate-300 mt-0.5">Data privacy compliant</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <Lock className="w-5 h-5 mb-2" style={{ color: '#06CEFF' }} />
                  <p className="text-sm font-semibold text-white">SHA-256 Immutable Audit Log</p>
                  <p className="text-xs text-slate-300 mt-0.5">Every decision logged and tamper-proof</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <BarChart3 className="w-5 h-5 mb-2" style={{ color: AMBER_LIGHT }} />
                  <p className="text-2xl font-bold text-white">
                    <CountUp value={25} suffix="+" duration={1500} />
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">Clients · 5,000+ reports/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">FAQ</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-200">Questions from credit managers, NBFC founders, and DSA teams.</p>
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
      <section className="relative py-20 md:py-28 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full blur-3xl animate-glow-pulse" style={{ background: 'rgba(245,158,11,0.07)' }} />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}>
            Ready to Cut Credit Ops Cost by{' '}
            <span style={{ color: AMBER_LIGHT }}>80%?</span>
          </h2>
          <p className="text-lg text-slate-100 mb-8">
            Join NBFCs and DSAs already using BankLens to process 5,000+ reports per month
            — faster, cheaper, and with full compliance documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://banklens.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#050D1A] rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(245,158,11,0.30)] transition-all"
              style={{ background: AMBER }}
              onClick={() => trackEvent('cta_clicked', { label: 'Start Free Trial — BankLens Final CTA', destination: 'https://banklens.vyaptix.ai', page: '/solutions/banklens', section: 'final_cta' })}
            >
              Start Free Trial <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Contact Sales — BankLens Final CTA', destination: '/contact', page: '/solutions/banklens', section: 'final_cta' })}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
