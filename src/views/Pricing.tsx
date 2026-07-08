'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, Building2 } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { HeroSection } from '../components/blocks/hero-section';

type Plan = {
  name: string;
  price: string;
  period: string;
  priceNote?: string;
  description: string;
  cta: string;
  ctaHref: string;
  ctaExternal: boolean;
  highlighted: boolean;
  badge?: string;
  features: string[];
};

const reviewPlan: Plan = {
  name: 'Launch Plan',
  price: '₹1,299',
  period: '/ month',
  priceNote: 'Down from ₹1,999 · incl. 18% GST',
  description: 'Everything you need to collect Google reviews and reply with AI. Cancel anytime.',
  cta: 'Create Your Account',
  ctaHref: 'https://reviews.vyaptix.ai',
  ctaExternal: true,
  highlighted: true,
  badge: 'Launch Offer',
  features: [
    'Self-serve setup with guided onboarding',
    'Up to 5 stores',
    'Unlimited AI review drafts',
    'Google Review Inbox with AI-drafted replies',
    'Custom branding, questions & QR codes',
    'Analytics, CSV exports & team access',
    'Email support',
  ],
};

const setuPlans: Plan[] = [
  {
    name: 'Growth',
    price: '₹2,500',
    period: '/ month',
    priceNote: '₹30,000 billed annually',
    description: 'Core features for emerging operations.',
    cta: 'Get Started',
    ctaHref: 'https://setu.vyaptix.ai',
    ctaExternal: true,
    highlighted: false,
    features: [
      'Broadcast campaigns',
      '24/7 AI chatbot & flows',
      'Shared team inbox',
      'Contact CRM & segments',
      'Website widget',
      'Campaign analytics',
      'Commerce basics',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '₹4,167',
    period: '/ month',
    priceNote: '₹50,000 billed annually',
    description: 'For scaling teams that need more volume and commerce.',
    cta: 'Get Started',
    ctaHref: 'https://setu.vyaptix.ai',
    ctaExternal: true,
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in Growth',
      'Expanded commerce catalogue',
      'Higher usage limits',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: '₹8,333',
    period: '/ month',
    priceNote: '₹1,00,000 billed annually',
    description: 'Full-feature tier with no restrictions.',
    cta: 'Talk to Sales',
    ctaHref: '/contact',
    ctaExternal: false,
    highlighted: false,
    features: [
      'Everything in Pro',
      'Unlimited commerce options',
      'Voice Call Agent (upcoming)',
      'Industry templates',
      'Dedicated support & onboarding',
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col ${
        plan.highlighted
          ? 'bg-[#0A1628] border-2 border-[#1A52E0] shadow-[0_0_40px_rgba(26,82,224,0.25)]'
          : 'bg-[#0A1628] border border-white/10'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="chip-recommended text-xs">{plan.badge}</span>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-1">{plan.name}</p>
        <div className="flex items-end gap-1 mb-1">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          {plan.period && <span className="text-slate-300 mb-1">{plan.period}</span>}
        </div>
        {plan.priceNote && <p className="text-xs text-slate-400 mb-2">{plan.priceNote}</p>}
        <p className="text-sm text-slate-200">{plan.description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-white/85">
            <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {plan.ctaExternal ? (
        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            plan.highlighted
              ? 'bg-white text-[#050D1A] hover:shadow-[0_0_20px_rgba(6,206,255,0.3)] hover:scale-[1.02]'
              : 'border border-white/20 text-white hover:bg-white/10'
          }`}
        >
          {plan.cta} <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <Link
          href={plan.ctaHref}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white hover:bg-white/10 transition-all"
        >
          {plan.cta} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export function Pricing() {
  return (
    <>

{/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Pricing' },
            ]}
          />
        </div>
      </div>

      <HeroSection
        badge={{ text: 'Transparent pricing, no surprises' }}
        title="Simple Pricing for Real Results"
        description="Transparent ₹ pricing with GST included. No long-term contracts, no hidden fees."
      />

      {/* AI Review Generator Pricing */}
      <section className="py-16 md:py-24 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 border border-success-500/20 text-success-400 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
              Live Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">AI Review Generator</h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Get more Google reviews on autopilot — and reply to them with AI. One simple plan, everything included.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <PlanCard plan={reviewPlan} />
          </div>
        </div>
      </section>

      {/* Setu Pricing */}
      <section className="py-16 md:py-24 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 border border-success-500/20 text-success-400 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
              Live Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Setu — WhatsApp Growth Platform</h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Broadcast campaigns, AI chatbot, shared inbox, lead pipeline, and WhatsApp commerce. All prices include 18% GST — annual billing saves two months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {setuPlans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-8 max-w-2xl mx-auto">
            WhatsApp conversation charges (Meta fees) are billed separately at cost with 0% markup — marketing ₹0.88, utility/authentication ₹0.115 per conversation, and service replies free within the 24-hour window.
          </p>
        </div>
      </section>

      {/* Custom AI Automation */}
      <section className="py-16 md:py-20 bg-[#050D1A]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-100 text-sm font-medium mb-5">
              <Building2 className="w-3.5 h-3.5" />
              Custom Engagements
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Custom AI Automation</h2>
            <p className="text-white/55 mb-6 leading-relaxed">
              Need something built specifically for your business? We scope, design, and build custom AI automation projects on a fixed-fee or retainer basis. Engagements typically start at $3,000.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white rounded-lg gradient-primary hover:opacity-90 hover:shadow-[0_0_20px_rgba(26,82,224,0.4)] transition-all"
            >
              Discuss Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-[#0A1628]">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Pricing FAQ</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Is there a free trial?',
                  a: 'The AI Review Generator is self-serve — create your account at reviews.vyaptix.ai and cancel anytime. For Setu, book a product demo and get a 14-day read-only demo account before subscribing.',
                },
                {
                  q: 'Can I change plans later?',
                  a: 'Absolutely. You can upgrade or downgrade your Setu plan at any time. The AI Review Generator is one simple plan — cancel anytime, no lock-in.',
                },
                {
                  q: 'Are taxes included in the prices?',
                  a: 'Yes — all listed prices include 18% GST. Setu annual billing saves two months versus paying monthly.',
                },
                {
                  q: 'Are WhatsApp message charges included in Setu plans?',
                  a: 'WhatsApp conversation charges set by Meta are billed separately at cost with 0% markup — marketing conversations at ₹0.88, utility and authentication at ₹0.115, and service replies free within the 24-hour customer window.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, UPI, and bank transfers for annual contracts.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/10 pb-6">
                  <p className="font-semibold text-white mb-2">{q}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
