'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Users,
  Search,
  LayoutDashboard,
  Activity,
  GitBranch,
  TrendingUp,
  Clock,
  Target,
  Shield,
  Building2,
  Headphones,
  Briefcase,
  XCircle,
} from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/Accordion';
import { ScrollRevealGroup } from '../components/ui/ScrollRevealGroup';
import { HeroSection } from '../components/blocks/hero-section';

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Role-Based Access',
    description: 'Separate, purpose-built experiences for agents and clients — every user sees exactly what they need.',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Instant Client Search',
    description: 'Find any client record by name or mobile in seconds. No more digging through spreadsheets or CRMs.',
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Unified Workspace',
    description: 'One operating environment for search, action, status updates, and coordination — no tool switching.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Live Status Tracking',
    description: 'Every interaction is logged and visible. Teams and managers see exactly where each case stands.',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Structured Workflows',
    description: 'Standardized process flows ensure consistent execution across every agent, every time.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Built to Scale',
    description: 'Designed as a foundation for automation, reporting, and enterprise controls as your team grows.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Search Client',
    description: 'Agents instantly look up any client by name or mobile number. Full context — history, status, and open items — loads immediately.',
  },
  {
    step: '02',
    title: 'Review & Assess',
    description: 'See the complete interaction history, pending tasks, and current workflow stage in a single view.',
  },
  {
    step: '03',
    title: 'Take Action',
    description: 'Update status, assign tasks, send follow-ups, and move the case forward — all from one screen.',
  },
  {
    step: '04',
    title: 'Track Progress',
    description: 'Managers monitor team activity and case progress in real time. No blind spots, no chasing updates.',
  },
  {
    step: '05',
    title: 'Deliver Consistently',
    description: 'Structured workflows ensure every client gets the same quality of service, regardless of which agent handles it.',
  },
];

const useCases = [
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: 'Agencies & Consultancies',
    description: 'Coordinate internal teams and external clients without email chains and scattered follow-ups.',
    benefit: 'Structured account handling with full client visibility',
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: 'Support-Driven Businesses',
    description: 'Handle service requests faster, track resolution status, and deliver consistent response quality.',
    benefit: 'Faster resolution with standardized escalation flows',
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: 'Operations-Heavy SMEs',
    description: 'Build process discipline before you scale. Replace ad-hoc coordination with a reliable operating layer.',
    benefit: 'Scale headcount without scaling chaos',
  },
];

const faqs = [
  {
    question: 'What kind of businesses does AgentMitra serve?',
    answer: 'AgentMitra is designed for any business where teams handle ongoing client interactions — agencies, consultancies, service businesses, support teams, and operations-heavy SMEs. If your team manages recurring client touchpoints, AgentMitra brings structure to those workflows.',
  },
  {
    question: 'How is AgentMitra different from a CRM?',
    answer: 'CRMs are built around sales pipelines and deal tracking. AgentMitra is built around service execution — the day-to-day coordination between agents and clients. Think of it as the operational layer that sits between your CRM and your team: structured workflows, instant client lookup, and real-time status visibility.',
  },
  {
    question: 'What does role-based access mean in practice?',
    answer: 'Agents see their client queue, pending tasks, and action tools. Clients see their case status and communication history. Managers see team activity, workload distribution, and progress tracking. Each role gets a purpose-built view — not a generic interface with permissions turned off.',
  },
  {
    question: 'Can AgentMitra integrate with our existing tools?',
    answer: 'AgentMitra is built with integrations in mind. Our roadmap includes connections to popular CRMs, communication platforms, and ticketing systems. Reach out to discuss your specific integration requirements during your demo.',
  },
  {
    question: 'How do I get started?',
    answer: "Book a demo through our contact page. We'll walk you through the platform, understand your current workflows, and show you how AgentMitra fits into your operations. Early access is available for qualifying businesses.",
  },
];

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentMitra — AI Workspace for Business Teams',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://vyaptix.com/agent-mitra',
  description: 'Role-based platform that connects agents, clients, and workflows in one structured environment — for service teams, agencies, consultancies, and operations-heavy SMEs.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
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

export function AgentMitra() {
  const [stepperVisible, setStepperVisible] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);

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

      {/* ── Breadcrumb ── */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/solutions' },
              { label: 'AgentMitra' },
            ]}
          />
        </div>
      </div>

      <HeroSection
        badge={{ text: 'Early Access', dot: 'amber' }}
        title="AgentMitra — Smarter Service Operations"
        description="A role-based platform that connects agents, clients, and workflows in one structured environment — so your team moves faster, works smarter, and delivers consistently."
        actions={[
          { text: 'Request Early Access', href: '/contact', variant: 'primary' },
          { text: 'Book a Demo', href: '/demo', variant: 'secondary' },
        ]}
      />

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Platform</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Everything Your Team Needs to Operate at Scale
            </h2>
            <p className="text-slate-200 max-w-2xl mx-auto">
              Purpose-built for service teams that can't afford inconsistency.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerMs={80}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 hover:border-[#06CEFF]/30 hover:shadow-[0_0_20px_rgba(6,206,255,0.08)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-[#06CEFF] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Workflow</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              How AgentMitra Works
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A structured five-step flow that replaces scattered coordination with consistent execution.
            </p>
          </div>

          <div ref={stepperRef} className="max-w-3xl mx-auto relative">
            {/* Gradient connector line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-[#06CEFF]/40 via-[#06CEFF]/20 to-transparent" />

            <div className="space-y-0">
              {howItWorks.map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-6 pb-10 last:pb-0"
                  style={{
                    opacity: stepperVisible ? 1 : 0,
                    transform: stepperVisible ? 'translateX(0)' : 'translateX(-32px)',
                    transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-[#06CEFF]/30 bg-[#06CEFF]/10 flex items-center justify-center z-10">
                    <span className="text-sm font-bold text-[#06CEFF]">{item.step}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-200 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Use Cases</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Built for Teams That Handle Clients Every Day
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              AgentMitra fits wherever structured client operations matter.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-3 gap-6" staggerMs={100}>
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 hover:-translate-y-1 hover:border-[#06CEFF]/20 transition-all duration-300"
              >
                <div className="w-13 h-13 rounded-xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-[#06CEFF] mb-5 p-3">
                  {uc.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">{uc.description}</p>
                <p className="text-xs font-semibold text-[#06CEFF] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> {uc.benefit}
                </p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Before &amp; After</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              What Changes When You Use AgentMitra
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              The shift from reactive, fragmented handling to structured, scalable service operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Before */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-7">
              <p className="text-sm font-bold text-red-400 uppercase tracking-widest mb-5">Before AgentMitra</p>
              <ul className="space-y-3">
                {[
                  'Slow, frustrating client lookups',
                  'Fragmented communication across tools',
                  'Inconsistent follow-ups and missed tasks',
                  'Managers flying blind on team activity',
                  'Process knowledge trapped in individuals',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                    <XCircle className="w-4 h-4 text-red-500/60 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-7">
              <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-5">After AgentMitra</p>
              <ul className="space-y-3">
                {[
                  'Instant client search — name or mobile',
                  'Structured, trackable workflows in one place',
                  'Consistent execution every time, every agent',
                  'Real-time team visibility for managers',
                  'Process scales as the business grows',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ScrollRevealGroup className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto" staggerMs={80}>
            {[
              { icon: <Clock className="w-5 h-5" />, title: 'Faster Client Handling', desc: 'Reduce time spent searching for context. Agents act, not hunt.' },
              { icon: <Target className="w-5 h-5" />, title: 'Consistent Service Quality', desc: 'Standardized workflows mean every client gets the same standard of execution.' },
              { icon: <Shield className="w-5 h-5" />, title: 'Operational Accountability', desc: 'Every action is logged. Managers always know what happened, when, and by whom.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-[#06CEFF] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">FAQ</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-200">Everything you need to know about AgentMitra.</p>
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
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 md:py-32 bg-[#050D1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
        </div>
        <div className="container-main text-center relative max-w-2xl mx-auto">
          <p className="label-mono-cyan mb-4">Early Access</p>
          <h2 className="font-heading font-bold text-white mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1.1 }}>
            Ready to Bring Structure to Your Operations?
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto">
            AgentMitra is in early access. Book a demo to see how it fits your team's workflow — and lock in founding-member pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(6,206,255,0.3)] transition-all"
            >
              Request Early Access <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
