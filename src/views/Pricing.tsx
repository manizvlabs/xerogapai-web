'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, Users, Building2 } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { HeroSection } from '../components/blocks/hero-section';

const reviewPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Try the platform with your first location — no credit card required.',
    cta: 'Start Free',
    ctaHref: 'https://reviews.vyaptix.ai',
    ctaExternal: true,
    highlighted: false,
    features: [
      '1 business location',
      'Up to 30 review requests / month',
      'QR code + shareable link',
      'AI-generated review text',
      'Basic analytics dashboard',
      'Google My Business integration',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/ month',
    description: 'For growing businesses that need volume and brand control.',
    cta: 'Get Started',
    ctaHref: 'https://reviews.vyaptix.ai',
    ctaExternal: true,
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Up to 5 business locations',
      'Unlimited review requests',
      'Custom branded experience',
      'White-label QR codes',
      'Advanced analytics & reporting',
      'Multi-language review text',
      'Priority email support',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For agencies, chains, and multi-location enterprises.',
    cta: 'Talk to Sales',
    ctaHref: '/contact',
    ctaExternal: false,
    highlighted: false,
    features: [
      'Unlimited locations',
      'White-label platform',
      'Custom domain',
      'Dedicated account manager',
      'SLA-backed uptime',
      'SSO / SAML authentication',
      'Custom integrations & CRM sync',
      'Quarterly business reviews',
    ],
  },
];

const agentMitraFeatures = [
  'Role-based agent + client workspace',
  'Instant client search by name or mobile',
  'Live case status tracking',
  'Structured workflow automation',
  'Team coordination & task assignment',
  'Audit logs & compliance reporting',
];

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
        description="Start free. Scale when you're ready. No long-term contracts, no hidden fees."
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
              Collect authentic Google reviews in under 20 seconds. Used by businesses across multiple industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviewPlans.map((plan) => (
              <div
                key={plan.name}
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
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-300 mb-1">{plan.period}</span>}
                  </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* AgentMitra — Early Access */}
      <section className="py-16 md:py-24 bg-[#0A1628]">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-[#1A52E0]/30 bg-[#050D1A] p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A52E0]/10 border border-[#1A52E0]/20 text-[#06CEFF] text-sm font-medium mb-5">
                    <Users className="w-3.5 h-3.5" />
                    Early Access
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">AgentMitra</h2>
                  <p className="text-white/55 mb-6 leading-relaxed">
                    AI-powered agent workspace for service businesses. Built for teams that manage clients, cases, and workflows. Pricing is being finalized — join the waitlist to lock in early-access rates.
                  </p>
                  <Link
                    href="/agent-mitra"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-white text-[#050D1A] hover:shadow-[0_0_20px_rgba(6,206,255,0.3)] hover:scale-[1.02] transition-all"
                  >
                    Join the Waitlist <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <ul className="space-y-3">
                    {agentMitraFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-white/85">
                        <CheckCircle className="w-4 h-4 text-[#06CEFF] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
                  a: 'Yes — the AI Review Generator Starter plan is permanently free for one location with up to 30 review requests per month. No credit card required.',
                },
                {
                  q: 'Can I change plans later?',
                  a: "Absolutely. You can upgrade or downgrade your AI Review Generator plan at any time. Changes take effect at the start of your next billing cycle.",
                },
                {
                  q: 'Do you offer annual billing?',
                  a: 'Yes — annual plans include a 20% discount. Contact us or ask during your demo to get an annual quote.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, and bank transfers for annual enterprise contracts.',
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
