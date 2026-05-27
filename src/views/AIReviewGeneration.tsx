'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Star,
  Zap,
  BarChart3,
  QrCode,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Users,
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
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
import { HeroSection } from '../components/blocks/hero-section';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Google Compliant',
    description: 'Fully compliant with Google review guidelines. Real customers, real reviews — no policy risk.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Customers complete the entire review process in under 20 seconds.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Powered',
    description: 'Advanced AI transforms simple feedback into detailed, authentic reviews.',
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'Easy Sharing',
    description: 'Generate QR codes and shareable links for seamless customer access.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Real-Time Analytics',
    description: 'Track reviews, ratings, and customer sentiment in your dashboard.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-Location',
    description: 'Manage reviews across all your business locations from one dashboard.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Create Your Store',
    description: 'Set up your business profile in minutes. Add your Google Business link and customize your feedback form.',
  },
  {
    step: '02',
    title: 'Share With Customers',
    description: 'Display your unique QR code at your location or send the link via email, SMS, or receipts.',
  },
  {
    step: '03',
    title: 'Customer Gives Feedback',
    description: 'Customers rate their experience and add a few comments. Takes under 20 seconds.',
  },
  {
    step: '04',
    title: 'AI Generates Review',
    description: 'Our AI instantly creates a personalized, detailed review based on their feedback.',
  },
  {
    step: '05',
    title: 'One-Click Post',
    description: 'Customer copies the review and posts directly to Google. Done in seconds.',
  },
];

const useCases = [
  {
    icon: <ShoppingBag className="w-7 h-7" />,
    title: 'Retail & eCommerce',
    description: 'Boost your online presence with authentic customer reviews after every purchase.',
    benefit: '3x increase in Google reviews within 30 days',
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    title: 'Restaurants & Hospitality',
    description: 'Turn happy diners into brand advocates with table-side review generation.',
    benefit: '40% improvement in average star rating',
  },
  {
    icon: <Stethoscope className="w-7 h-7" />,
    title: 'Healthcare Services',
    description: 'Privacy-first feedback collection that builds trust with patients.',
    benefit: '2x more reviews with 50% less effort',
  },
];

const faqs = [
  {
    question: 'How is the AI review quality?',
    answer: "Our AI analyzes customer feedback sentiment, specific details mentioned, and industry context to generate authentic, personalized review text. Reviews are unique, natural-sounding, and accurately reflect the customer's experience. Customers can also edit the generated text before posting.",
  },
  {
    question: 'Is it compliant with Google My Business policies?',
    answer: 'Yes, 100%. Our system encourages genuine customers to share authentic experiences. The AI helps articulate their feedback, but customers always have final control over what they post. We never create fake reviews or incentivize with discounts for reviews.',
  },
  {
    question: 'What languages are supported?',
    answer: 'Currently, we support English. Support for additional languages is on our roadmap — reach out to let us know your requirements.',
  },
  {
    question: 'Can I white-label this for my customers?',
    answer: 'Yes! Our Pro and Enterprise plans include white-label options. You can customize the entire experience with your brand colors, logo, and domain. Perfect for agencies and multi-location businesses.',
  },
  {
    question: "What's the average feedback-to-review time?",
    answer: 'Most customers complete the entire flow in under 20 seconds. From scanning the QR code to posting on Google, the process is designed to be frictionless.',
  },
  {
    question: 'Can I integrate with my CRM or POS system?',
    answer: 'Yes, our Pro and Enterprise plans include API access for custom integrations. We also offer pre-built integrations with popular CRMs like Salesforce, HubSpot, and POS systems like Square and Toast.',
  },
];

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Review Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://reviews.vyaptix.ai',
  description:
    'Collect authentic Google reviews in under 20 seconds using QR codes and AI-generated review text.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
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
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export function AIReviewGeneration() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
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
              { label: 'AI Review Generation' },
            ]}
          />
        </div>
      </div>

      <HeroSection
        badge={{ text: 'Live Platform', dot: 'green' }}
        title="Collect Google Reviews in Under 20 Seconds"
        description="Transform customer feedback into authentic Google reviews in seconds. Our AI understands sentiment and creates natural, personalized review text that customers are happy to post."
        actions={[
          { text: 'Try Platform Free', href: 'https://reviews.vyaptix.ai', variant: 'primary', external: true },
          { text: 'Schedule Demo', href: '/demo', variant: 'secondary' },
        ]}
      />

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-[#0A1628] section-grid-light">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Why Businesses Love It</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Everything You Need to Collect More Reviews
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A complete platform to grow your online presence and build trust.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerMs={80}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 hover:border-secondary-400/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-400/10 border border-secondary-400/20 flex items-center justify-center text-secondary-400 mb-4 group-hover:shadow-[0_0_16px_rgba(6,206,255,0.25)] transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── How It Works — animated stepper ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">The Process</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              How It Works
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A simple five-step process that turns customer interactions into valuable reviews.
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
                  <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold font-mono">
                    {item.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-primary-500/40 to-transparent mt-3" />
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

      {/* ── Use Cases ── */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Use Cases</p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Built for Every Industry
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              See how businesses across industries are leveraging AI review generation.
            </p>
          </div>
          <ScrollRevealGroup className="grid md:grid-cols-3 gap-6" staggerMs={100}>
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-7 hover:-translate-y-1 hover:border-secondary-400/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary-400/10 border border-secondary-400/20 flex items-center justify-center text-secondary-400 mb-5 group-hover:shadow-[0_0_16px_rgba(6,206,255,0.2)] transition-all">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-slate-200 text-sm mb-4 leading-relaxed">{useCase.description}</p>
                <p className="text-sm font-semibold text-success-400">{useCase.benefit}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* ── Platform Access + live analytics mockup ── */}
      <section className="py-20 md:py-28 bg-[#050D1A]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-mono-cyan mb-4">Access the Platform</p>
              <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Start Growing Your Reviews Today
              </h2>
              <p className="text-lg text-slate-100 mb-6">
                Our AI Review Generation platform is available as a standalone web application
                at <strong className="text-white">reviews.vyaptix.ai</strong>. Create your free
                account and start collecting reviews today.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Separate login for dedicated review management',
                  'Full dashboard with analytics and insights',
                  'Manage multiple locations from one account',
                  'Export data and generate reports',
                  'Priority support on paid plans',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://reviews.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-[#050D1A] bg-white rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
                >
                  Go to Platform <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-secondary-400 border border-secondary-400/30 rounded-lg hover:bg-secondary-400/10 transition-all"
                >
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Animated analytics dashboard */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="bg-primary-500/20 border-b border-white/10 px-6 py-4">
                <p className="font-semibold text-white text-sm">Review Analytics Dashboard</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <BarChart3 className="w-5 h-5 text-primary-400 mb-2" />
                    <p className="text-2xl font-bold text-white">
                      <CountUp value={847} duration={1500} />
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Total Reviews</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <Star className="w-5 h-5 text-warning-400 mb-2" />
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-xs text-slate-300 mt-0.5">Avg Rating</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <TrendingUp className="w-5 h-5 text-success-400 mb-2" />
                  <p className="text-2xl font-bold text-white">
                    +<CountUp value={127} suffix="%" duration={1800} />
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">Growth This Month</p>
                </div>
                <div className="p-4 rounded-xl bg-success-500/10 border border-success-500/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-success-400" />
                    <p className="text-sm font-medium text-success-400">Average review time: about 20 seconds</p>
                  </div>
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
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-200">Got questions? We've got answers.</p>
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
      <section className="relative py-20 md:py-28 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl animate-glow-pulse" />
        </div>
        <div className="container-main relative text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}>
            Ready to Grow Your Online Presence?
          </h2>
          <p className="text-lg text-slate-100 mb-8">
            Start collecting reviews today with our AI-powered platform.
            Free tier available, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reviews.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#050D1A] bg-white rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(6,206,255,0.3)] transition-all"
            >
              Get Started Free <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
