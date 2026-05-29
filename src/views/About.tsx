'use client';

import Link from 'next/link';
import {
  Compass,
  Telescope,
  Handshake,
  Users,
  Lightbulb,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { ScrollRevealGroup } from '../components/ui/ScrollRevealGroup';
import { TimelineHorizontal } from '../components/ui/TimelineHorizontal';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { HeroSection } from '../components/blocks/hero-section';

const milestones = [
  {
    date: 'Dec 2025',
    title: 'VyaptIX Founded',
    description: 'Co-founded with one mandate: make AI automation practical for real businesses — no dev required, no six-month rollouts.',
  },
  {
    date: 'Feb 2026',
    title: 'AI Review Generator Launches',
    description: 'First product goes live — helping businesses collect authentic Google reviews in under 20 seconds via QR code and AI-generated prompts.',
  },
  {
    date: 'Apr 2026',
    title: 'AgentMitra Early Access',
    description: 'Service operations platform enters early access — giving teams structured workflows, instant client lookup, and real-time case visibility.',
  },
  {
    date: 'Apr 2026',
    title: 'Setu Launches',
    description: 'WhatsApp marketing and automation platform goes live — broadcast campaigns, AI chatbot, shared team inbox, and lead pipeline in one place.',
  },
  {
    date: 'May 2026',
    title: 'BankLens Launches',
    description: 'AI credit decisioning platform for NBFCs and lenders goes live — automated bank statement analysis, 220+ financial signals, and audit-ready CAM reports.',
  },
];

const values = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Practical over Impressive',
    description: 'We build tools that do real work, not demos that look good in a pitch. If it does not save time or make money, we do not ship it.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Trust Through Transparency',
    description: 'No hidden fees, no black-box AI, no vendor lock-in. We tell you exactly what we are building and why it will work.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Speed to Value',
    description: 'Our benchmark is working automation in days, not months. If you are not seeing results in week one, something is wrong.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Right-Sized Thinking',
    description: 'We build for businesses with 5–500 people. Not enterprise complexity, not toy-grade tools — the right level of power for growth-stage businesses.',
  },
];

const missionCards = [
  {
    icon: <Compass className="w-8 h-8" strokeWidth={1.8} />,
    label: 'Our Mission',
    content: 'Deliver practical AI automation that removes friction from customer engagement and makes results visible fast - for businesses that can\'t wait 6 months for ROI.',
    tags: [],
    accent: '#06CEFF',
    accentSoft: 'rgba(6,206,255,0.12)',
    accentBorder: 'rgba(6,206,255,0.28)',
    gradient: 'linear-gradient(135deg, rgba(6,206,255,0.20), rgba(26,82,224,0.10))',
    shadow: 'rgba(6,206,255,0.22)',
  },
  {
    icon: <Telescope className="w-8 h-8" strokeWidth={1.8} />,
    label: 'Our Vision',
    content: 'A world where every growing business runs with trusted AI co-pilots - not as a competitive advantage for the few, but as standard infrastructure for every team.',
    tags: [],
    accent: '#A78BFA',
    accentSoft: 'rgba(167,139,250,0.12)',
    accentBorder: 'rgba(167,139,250,0.28)',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.20), rgba(26,82,224,0.10))',
    shadow: 'rgba(167,139,250,0.20)',
  },
  {
    icon: <Handshake className="w-8 h-8" strokeWidth={1.8} />,
    label: 'Our Values',
    content: 'We lead with integrity, craft, and accountability - and we hold ourselves to the results we deliver, not just the work we ship.',
    tags: ['Customer-first', 'Radical clarity', 'Outcome-driven', 'No fluff'],
    accent: '#34D399',
    accentSoft: 'rgba(52,211,153,0.12)',
    accentBorder: 'rgba(52,211,153,0.28)',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(6,206,255,0.09))',
    shadow: 'rgba(52,211,153,0.18)',
  },
];

export function About() {

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        </div>
      </div>

      <HeroSection
        badge={{ text: 'About VyaptIX' }}
        title={"We believe AI should\nremove work, not add it."}
        description="VyaptIX was built by people tired of AI tools that looked great in demos but never made it into the daily workflow. We build differently — outcome-first, right-sized, practical-first."
      />

      {/* ── Our Story ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="label-mono-cyan mb-5">Our Story</p>
              <h2 className="font-heading font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Started with one frustrating observation.
              </h2>
              <div className="space-y-5 text-slate-100 leading-relaxed text-[15px]">
                <p>
                  Every business owner we spoke to had the same complaint: they knew AI could help them, but they couldn't figure out where to start — and the tools on the market either required a developer, a six-month integration project, or a budget that only enterprises could justify.
                </p>
                <p>
                  VyaptIX was started to solve that. Not by building cheaper versions of enterprise tools — but by rethinking what automation should look like for a 20-person insurance agency, a restaurant with five locations, or a retail shop owner who wears every hat in the business.
                </p>
                <p>
                  Our first product, the AI Review Generator, came directly from watching business owners manually ask customers for Google reviews — an awkward, inconsistent process that was costing them rankings and trust. We built a tool that does it in 20 seconds, every time, without the awkward ask. It worked. Customers loved it.
                </p>
                <p>
                  That experience shaped how we build everything now: start with a problem that's costing businesses real time or money, build the simplest thing that solves it completely, and make sure it's live and delivering value in days — not months.
                </p>
              </div>
            </div>

            <div className="space-y-5 lg:self-center">
              {/* Quote card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#06CEFF]/20 bg-[#06CEFF]/5 p-8 md:p-10">
                <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#06CEFF]/10 blur-3xl" aria-hidden="true" />
                <p className="text-lg font-medium text-white/80 leading-relaxed mb-5">
                  "Most AI projects fail not because of bad technology — they fail because nobody built the bridge between the AI model and the actual daily workflow. That's the only bridge we build."
                </p>
                <div className="relative mt-8 flex items-center justify-center gap-4" aria-hidden="true">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#06CEFF]/25 bg-[#06CEFF]/10 text-[#06CEFF]">
                    <Lightbulb className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="relative h-px flex-1 max-w-32 bg-[#06CEFF]/30">
                    <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#06CEFF]/25 bg-[#0A1628] text-[#06CEFF]">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399]">
                    <CheckCircle className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="py-16 md:py-20 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">Why We Exist</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Mission, Vision &amp; Values</h2>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-3 gap-6" staggerMs={100}>
            {missionCards.map((card) => (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl border bg-white/[0.045] p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: card.accentBorder }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-80"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
                />
                <div
                  className="relative mb-6 flex h-28 items-center justify-center overflow-hidden rounded-2xl border"
                  style={{ background: card.gradient, borderColor: card.accentBorder }}
                >
                  <div
                    className="absolute -right-6 -top-8 h-28 w-28 rounded-full blur-2xl"
                    style={{ backgroundColor: card.shadow }}
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2 opacity-45" aria-hidden="true">
                    {[28, 44, 34, 58, 40].map((height, index) => (
                      <span
                        key={`${card.label}-${height}-${index}`}
                        className="w-full rounded-full"
                        style={{ height, backgroundColor: card.accent }}
                      />
                    ))}
                  </div>
                  <div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border text-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent}, rgba(255,255,255,0.10))`,
                      borderColor: 'rgba(255,255,255,0.28)',
                      boxShadow: `0 18px 50px ${card.shadow}`,
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-3">{card.label}</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">{card.content}</p>
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full border font-medium"
                        style={{ backgroundColor: card.accentSoft, borderColor: card.accentBorder, color: card.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Milestones Timeline ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">How We Got Here</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Building in public, shipping fast
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Every milestone here came from real customers telling us what was broken — and us fixing it.
            </p>
          </div>
          <TimelineHorizontal milestones={milestones} />
        </div>
      </section>

      {/* ── What We Stand For ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">Principles</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>What We Stand For</h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              These are the principles that shape every product decision and every customer conversation.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" staggerMs={80}>
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#06CEFF]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-[#06CEFF] mb-5">
                  {value.icon}
                </div>
                <h3 className="font-bold text-white mb-3 text-sm">{value.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="py-16 bg-[#141E30]">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="label-mono-cyan mb-3">Why VyaptIX</p>
            <h2 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>What makes us different</h2>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto" staggerMs={60}>
            {[
              'Working automation in days, not months',
              'Flat-fee engagements — no surprise invoices',
              'We own outcomes, not just deliverables',
              'Vendor-neutral — we pick the right AI for your problem',
              'Direct access to founders, not account managers',
              'We stay after go-live — no handoff and disappear',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <CheckCircle className="w-5 h-5 text-[#06CEFF] flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-white/85">{point}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 md:py-32 bg-[#050D1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/5 blur-3xl" />
        </div>
        <div className="container-main text-center relative max-w-2xl mx-auto">
          <p className="label-mono-cyan mb-4">Let's Talk</p>
          <h2 className="font-heading font-bold text-white mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
            Want to work with us?
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto">
            Book a 30-minute discovery call. No pitch decks — just a real conversation about where AI can remove friction in your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(6,206,255,0.3)] transition-all"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              See Our Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
