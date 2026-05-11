'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  Zap,
  Shield,
  Linkedin,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Star,
} from 'lucide-react';
import { ScrollRevealGroup } from '../components/ui/ScrollRevealGroup';
import { CountUp } from '../components/ui/CountUp';
import { TimelineHorizontal } from '../components/ui/TimelineHorizontal';
import { trackEvent } from '../lib/analytics';

const team = [
  {
    name: 'Ajeet Singh',
    title: 'Co-Founder & CEO',
    bio: 'Drives product vision and customer success. Passionate about making AI automation practical and accessible for every business owner.',
    linkedin: 'https://www.linkedin.com/in/ajeetsinghvyaptix/',
    initials: 'AS',
  },
  {
    name: 'Manish Singh',
    title: 'Co-founder & CTO',
    bio: 'Leads engineering and product architecture. Turns complex AI capabilities into reliable, fast-to-deploy systems that businesses can actually use.',
    linkedin: 'https://www.linkedin.com/in/vyaptix-manish/',
    initials: 'MS',
  },
];

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

function WordStagger({ text, startDelay = 0, visible, className = '' }: { text: string; startDelay?: number; visible: boolean; className?: string }) {
  return (
    <span className={className}>
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
    </span>
  );
}

export function About() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>

{/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/7 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A52E0]/12 blur-3xl" />
        </div>

        <div className="container-main py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-semibold uppercase tracking-[0.3em] mb-6"
              style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.5s', transitionDelay: '50ms' }}
            >
              About VyaptIX
            </div>

            <h1
              className="font-playfair italic font-bold text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 1.05 }}
            >
              <span className="block">
                <WordStagger text="We believe AI should" visible={heroVisible} startDelay={150} />
              </span>
              <span
                className="block mt-1"
                style={{
                  color: '#06CEFF',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: '550ms',
                }}
              >
                remove work, not add it.
              </span>
            </h1>

            <p
              className="text-lg text-slate-100 max-w-2xl mx-auto"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s, transform 0.6s',
                transitionDelay: '950ms',
              }}
            >
              VyaptIX was built by people tired of AI tools that looked great in demos but never actually made it into the daily workflow. We build differently — outcome-first, right-sized, practical-first.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="label-mono-cyan mb-5">Our Story</p>
              <h2 className="font-playfair italic font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
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

            <div className="space-y-5">
              {/* Quote card */}
              <div className="rounded-2xl border border-[#06CEFF]/20 bg-[#06CEFF]/5 p-8">
                <p className="text-lg font-medium text-white/80 leading-relaxed mb-5">
                  "Most AI projects fail not because of bad technology — they fail because nobody built the bridge between the AI model and the actual daily workflow. That's the only bridge we build."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#06CEFF]/20 border border-[#06CEFF]/30 flex items-center justify-center text-[#06CEFF] font-bold text-sm">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Ajeet Singh</p>
                    <p className="text-slate-300 text-xs">Co-Founder, VyaptIX</p>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 500, suffix: '+', label: 'Businesses served', icon: <Users className="w-5 h-5" /> },
                  { value: 12, suffix: '+', label: 'Industries covered', icon: <TrendingUp className="w-5 h-5" /> },
                  { value: 4, suffix: '', label: 'Products live & in market', icon: <Zap className="w-5 h-5" /> },
                  { value: 20, suffix: 's', label: 'Review collection time', icon: <Star className="w-5 h-5" /> },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="text-[#06CEFF] mb-2">{stat.icon}</div>
                    <p className="text-2xl font-bold text-white">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
                  </div>
                ))}
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
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Mission, Vision &amp; Values</h2>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-3 gap-6" staggerMs={100}>
            {[
              {
                icon: <Target className="w-6 h-6" />,
                label: 'Our Mission',
                content: 'Deliver practical AI automation that removes friction from customer engagement and makes results visible fast — for businesses that can\'t wait 6 months for ROI.',
                tags: [],
              },
              {
                icon: <Eye className="w-6 h-6" />,
                label: 'Our Vision',
                content: 'A world where every growing business runs with trusted AI co-pilots — not as a competitive advantage for the few, but as standard infrastructure for every team.',
                tags: [],
              },
              {
                icon: <Heart className="w-6 h-6" />,
                label: 'Our Values',
                content: 'We lead with integrity, craft, and accountability — and we hold ourselves to the results we deliver, not just the work we ship.',
                tags: ['Customer-first', 'Radical clarity', 'Outcome-driven', 'No fluff'],
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 hover:border-[#06CEFF]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-[#06CEFF] mb-5">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-3">{card.label}</h3>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">{card.content}</p>
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[#06CEFF]/10 border border-[#06CEFF]/20 text-[#06CEFF] font-medium">
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

      {/* ── Team ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">The Team</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Built by people who've felt the pain
            </h2>
            <p className="text-slate-200 max-w-2xl mx-auto">
              We're not a research lab — we're builders who've sat across from business owners and watched manual work slow them down.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 w-full max-w-sm hover:border-[#06CEFF]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center text-xl font-bold text-[#06CEFF] flex-shrink-0">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-[#06CEFF] font-medium">{member.title}</p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-5">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#06CEFF] hover:text-white transition-colors"
                  onClick={() => trackEvent('cta_clicked', { label: 'LinkedIn Profile', page: '/about', section: 'team' })}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Milestones Timeline ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-mono-cyan mb-3">How We Got Here</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
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
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>What We Stand For</h2>
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
            <h2 className="font-playfair italic font-bold text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>What makes us different</h2>
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
          <h2 className="font-playfair italic font-bold text-white mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
            Want to work with us?
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto">
            Book a 30-minute discovery call. No pitch decks — just a real conversation about where AI can remove friction in your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(6,206,255,0.3)] transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Get in Touch', destination: '/contact', page: '/about', section: 'final_cta' })}
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'See Our Products', destination: '/solutions', page: '/about', section: 'final_cta' })}
            >
              See Our Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
