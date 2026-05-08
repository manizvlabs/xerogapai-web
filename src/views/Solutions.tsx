'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Star,
  Zap,
  BarChart3,
  QrCode,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Users,
  Search,
  LayoutDashboard,
  Activity,
  CheckCircle,
} from 'lucide-react';
import { ScrollRevealGroup } from '../components/ui/ScrollRevealGroup';
import { SEO } from '../components/SEO';
import { trackEvent } from '../lib/analytics';

function WordStagger({ text, startDelay = 0, visible }: { text: string; startDelay?: number; visible: boolean }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            transitionDelay: `${startDelay + i * 70}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function Solutions() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);
  const [agentVisible, setAgentVisible] = useState(false);
  const aiRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observe = (ref: React.RefObject<HTMLDivElement | null>, setter: (v: boolean) => void) => {
      const el = ref.current;
      if (!el) return () => {};
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.unobserve(el); } },
        { threshold: 0.12 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    const c1 = observe(aiRef, setAiVisible);
    const c2 = observe(agentRef, setAgentVisible);
    return () => { c1(); c2(); };
  }, []);

  return (
    <>
      <SEO
        title="Our Products"
        description="Two AI products built for real business outcomes: AI Review Generator and AgentMitra. See how they transform customer engagement and team operations."
        canonical="/solutions"
      />

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
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 1.05 }}
          >
            <span className="block">
              <WordStagger text="Two Products." visible={heroVisible} startDelay={200} />
            </span>
            <span className="block" style={{ color: '#06CEFF' }}>
              <WordStagger text="Real Business Outcomes." visible={heroVisible} startDelay={500} />
            </span>
          </h1>
          <p
            className="text-lg text-white/55 max-w-2xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '700ms',
            }}
          >
            VyaptIX builds practical AI tools that remove real friction from business operations.
            No hype, no bloat — just tools that work.
          </p>
        </div>
      </section>

      {/* ── AI Review Generator ── */}
      <section ref={aiRef} className="py-20 md:py-28 bg-[#0A1628] overflow-hidden">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div
              style={{
                opacity: aiVisible ? 1 : 0,
                transform: aiVisible ? 'translateX(0)' : 'translateX(-48px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live — Available Now
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06CEFF]/10 border border-[#06CEFF]/20 text-[#06CEFF] text-xs font-bold uppercase tracking-wide">
                  ★ Most Popular
                </span>
              </div>
              <h2
                className="font-playfair italic font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
              >
                AI Review Generator
              </h2>
              <p className="text-lg text-white/55 mb-7">
                Transform customer feedback into authentic Google reviews in under 20 seconds.
                Your customers rate their experience, AI writes the review, they post it in one tap.
              </p>
              <ScrollRevealGroup className="grid sm:grid-cols-2 gap-3 mb-8" staggerMs={80}>
                {[
                  { icon: <Zap className="w-4 h-4" />, text: 'Under 20 seconds' },
                  { icon: <Star className="w-4 h-4" />, text: 'AI-powered review text' },
                  { icon: <QrCode className="w-4 h-4" />, text: 'QR code + shareable link' },
                  { icon: <BarChart3 className="w-4 h-4" />, text: 'Real-time analytics' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-lg glass-luxury">
                    <div className="text-[#06CEFF]">{item.icon}</div>
                    <span className="text-white/75 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </ScrollRevealGroup>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/solutions/ai-review-generation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Learn More — AI Review Generator', page: '/solutions' })}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://reviews.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[#06CEFF] border border-[#06CEFF]/30 rounded-xl hover:bg-[#06CEFF]/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Try Platform Free', page: '/solutions' })}
                >
                  Try Platform Free <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mockup */}
            <div
              style={{
                opacity: aiVisible ? 1 : 0,
                transform: aiVisible ? 'translateX(0)' : 'translateX(48px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '150ms',
              }}
            >
              <div className="rounded-2xl glass-luxury-cyan p-6">
                <div className="bg-[#050D1A] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/15 border border-[#06CEFF]/25 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#06CEFF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Customer Feedback</p>
                      <p className="text-sm text-slate-300">Quick rating + comments</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-7 h-7 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <div className="p-3 rounded-lg glass-luxury mb-4">
                    <p className="text-sm text-slate-200 italic">"Great service, friendly staff, would recommend!"</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <Sparkles className="w-4 h-4 text-[#06CEFF]" />
                    <span className="text-xs font-medium text-[#06CEFF]">AI Magic</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/8 border border-emerald-500/20 mb-4">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">Generated Review</p>
                    <p className="text-sm text-white/85">
                      "Had an absolutely wonderful experience! The staff was incredibly friendly.
                      The service exceeded my expectations — will definitely be coming back!"
                    </p>
                  </div>
                  <button className="w-full py-3 text-center text-[#050D1A] font-semibold rounded-lg bg-white hover:shadow-[0_0_20px_rgba(6,206,255,0.25)] transition-all text-sm">
                    Copy & Post to Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AgentMitra ── */}
      <section ref={agentRef} className="py-20 md:py-28 bg-[#050D1A] bg-dot-grid overflow-hidden">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mockup */}
            <div
              className="order-2 lg:order-1"
              style={{
                opacity: agentVisible ? 1 : 0,
                transform: agentVisible ? 'translateX(0)' : 'translateX(-48px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '150ms',
              }}
            >
              <div className="rounded-2xl glass-luxury p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/15 border border-[#06CEFF]/25 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#06CEFF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Agent Dashboard</p>
                    <p className="text-sm text-slate-300">All clients, one view</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg glass-luxury">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Search clients by name or mobile...</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Jordan Lee', status: 'Active', cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { name: 'Sara Müller', status: 'Pending', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { name: 'David Okafor', status: 'Resolved', cls: 'text-[#06CEFF] bg-[#06CEFF]/10 border-[#06CEFF]/20' },
                  ].map((client) => (
                    <div key={client.name} className="flex items-center justify-between p-3 rounded-lg glass-luxury">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#06CEFF]/15 flex items-center justify-center text-[#06CEFF] font-bold text-xs">
                          {client.name[0]}
                        </div>
                        <span className="text-sm font-medium text-white/80">{client.name}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${client.cls}`}>
                        {client.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '24', label: 'Active' },
                    { value: '8', label: 'Pending' },
                    { value: '97%', label: 'On Time' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-lg glass-luxury text-center">
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy */}
            <div
              className="order-1 lg:order-2"
              style={{
                opacity: agentVisible ? 1 : 0,
                transform: agentVisible ? 'translateX(0)' : 'translateX(48px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Early Access
              </div>
              <h2
                className="font-playfair italic font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
              >
                AgentMitra
              </h2>
              <p className="text-lg text-white/55 mb-7">
                A role-based service operations platform that connects agents, clients, and workflows
                in one structured environment. Replace scattered tools and manual follow-ups with a
                consistent operating layer.
              </p>
              <ScrollRevealGroup className="grid sm:grid-cols-2 gap-3 mb-8" staggerMs={80}>
                {[
                  { icon: <Users className="w-4 h-4" />, text: 'Role-based access' },
                  { icon: <Search className="w-4 h-4" />, text: 'Instant client search' },
                  { icon: <LayoutDashboard className="w-4 h-4" />, text: 'Unified workspace' },
                  { icon: <Activity className="w-4 h-4" />, text: 'Live status tracking' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-lg glass-luxury">
                    <div className="text-[#06CEFF]">{item.icon}</div>
                    <span className="text-white/75 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </ScrollRevealGroup>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/agent-mitra"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Learn More — AgentMitra', page: '/solutions' })}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[#06CEFF] border border-[#06CEFF]/30 rounded-xl hover:bg-[#06CEFF]/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Request Early Access — AgentMitra', page: '/solutions' })}
                >
                  Request Early Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product picker ── */}
      <section className="py-16 md:py-24 bg-[#0A1628] border-y border-white/8">
        <div className="container-main">
          <div className="text-center mb-10">
            <p className="label-mono-cyan mb-3">Not sure where to start?</p>
            <h2
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              Pick the product that fits your problem right now
            </h2>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" staggerMs={120}>
            {/* AI Review Generator */}
            <div className="rounded-2xl glass-luxury-cyan p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#06CEFF]/15 border border-[#06CEFF]/25 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#06CEFF]" />
                </div>
                <div>
                  <p className="font-bold text-white">AI Review Generator</p>
                  <p className="text-xs text-emerald-400 font-semibold">Available now — free to try</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white/55 mb-3">Choose this if you need to:</p>
              <ul className="space-y-2 mb-6">
                {[
                  'Get more Google reviews without chasing customers',
                  'Build trust for your local business online',
                  'Automate the post-sale review ask in under 20 seconds',
                  'Improve your Google Maps ranking',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="https://reviews.vyaptix.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#050D1A] bg-white rounded-xl hover:shadow-[0_0_20px_rgba(6,206,255,0.25)] transition-all"
                onClick={() => trackEvent('cta_clicked', { label: 'Try Free — AI Review Generator', page: '/solutions' })}
              >
                Try Free <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* AgentMitra */}
            <div className="rounded-2xl glass-luxury p-7 border border-[#06CEFF]/12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#06CEFF]" />
                </div>
                <div>
                  <p className="font-bold text-white">AgentMitra</p>
                  <p className="text-xs text-[#06CEFF] font-semibold">Early access — join waitlist</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white/55 mb-3">Choose this if you need to:</p>
              <ul className="space-y-2 mb-6">
                {[
                  'Manage clients, tasks, and agents in one place',
                  'Replace scattered tools and manual follow-ups',
                  'Give your team a structured operating layer',
                  'Get real-time visibility across your service operations',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#06CEFF] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#050D1A] bg-white rounded-xl hover:shadow-[0_0_20px_rgba(6,206,255,0.25)] transition-all"
                onClick={() => trackEvent('cta_clicked', { label: 'Request Early Access — AgentMitra', page: '/solutions' })}
              >
                Request Early Access <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollRevealGroup>
          <p className="text-center text-sm text-slate-300 mt-8">
            Still not sure?{' '}
            <Link
              href="/contact"
              className="text-[#06CEFF] font-semibold hover:underline"
              onClick={() => trackEvent('cta_clicked', { label: 'Book a 30-minute call', page: '/solutions' })}
            >
              Book a 30-minute call
            </Link>{' '}
            and we'll tell you exactly where to start.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 md:py-32 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[#06CEFF]/5 blur-3xl animate-glow-pulse" />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <p className="label-mono-cyan mb-5">Ready to See These in Action?</p>
          <h2
            className="font-playfair italic font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1.1 }}
          >
            Two products. Real outcomes.
            <br />
            <span style={{ color: '#06CEFF' }}>Your business, automated.</span>
          </h2>
          <p className="text-lg text-slate-200 mb-10">
            Try the AI Review Generator free today, or book a demo to explore both products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reviews.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#050D1A] bg-white rounded-xl hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,206,255,0.3)] transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Try AI Review Generator Free', page: '/solutions' })}
            >
              Try AI Review Generator Free <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/8 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Get in Touch', page: '/solutions' })}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
