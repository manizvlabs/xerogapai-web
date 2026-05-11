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
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Copy,
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
import { HeroStatFloat } from '../components/ui/HeroStatFloat';
import { trackEvent } from '../lib/analytics';

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

export function AIReviewGeneration() {
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/7 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A52E0]/12 blur-3xl" />
        </div>

        {/* Floating product stat cards — desktop only */}
        <div className="hidden lg:block absolute top-12 right-8 z-10">
          <HeroStatFloat icon="⭐" primary="4.9 / 5 Rating" secondary="847 reviews / month" floatSpeed="8s" />
        </div>
        <div className="hidden lg:block absolute bottom-12 left-8 z-10">
          <HeroStatFloat icon="⚡" primary="&lt; 20 seconds" secondary="Average review time" floatSpeed="12s" animationDelay="3s" />
        </div>

        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 border border-success-500/20 text-success-400 text-sm font-medium mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.5s', transitionDelay: '50ms' }}
              >
                <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
                Live Platform
              </div>
              <h1
                className="font-playfair italic font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.05 }}
              >
                <span className="block">
                  <WordStagger text="Collect Google Reviews" visible={heroVisible} startDelay={150} />
                </span>
                <span className="block" style={{ color: '#06CEFF' }}>
                  <WordStagger text="in Under 20 Seconds" visible={heroVisible} startDelay={500} />
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
                Transform customer feedback into authentic Google reviews in seconds.
                Our AI understands sentiment and creates natural, personalized review
                text that customers are happy to post.
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
                  <span className="font-semibold text-white">The Problem:</span> 70% of satisfied customers never leave reviews because it's too much friction. Our AI removes that barrier completely.
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
                  href="https://reviews.vyaptix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-[#050D1A] bg-white rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(6,206,255,0.25)] transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Try Platform Free', destination: 'https://reviews.vyaptix.ai', page: '/solutions/ai-review-generation', section: 'hero' })}
                >
                  Try Platform Free <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Schedule Demo', destination: '/demo', page: '/solutions/ai-review-generation', section: 'hero' })}
                >
                  Schedule Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-400" /> Free tier available
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-400" /> No credit card required
                </span>
              </div>
              {/* Mobile stat strip */}
              <div className="lg:hidden flex gap-3 flex-wrap mt-6">
                <HeroStatFloat icon="⭐" primary="4.9 / 5 Rating" secondary="847 reviews / month" floatSpeed="10s" />
                <HeroStatFloat icon="⚡" primary="Under 20 seconds" secondary="Average review time" floatSpeed="14s" animationDelay="2s" />
              </div>
            </div>

            {/* Demo panel */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(32px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '400ms',
              }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="bg-[#050D1A] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Customer Feedback</p>
                      <p className="text-sm text-slate-300">Quick rating + comments</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-8 h-8 text-warning-400 fill-current" />
                    ))}
                  </div>
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5 mb-4">
                    <p className="text-sm text-slate-200 italic">
                      "Great service, friendly staff, would recommend!"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <Sparkles className="w-4 h-4 text-secondary-400" />
                    <span className="text-xs font-medium text-secondary-400">AI Magic</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="p-4 rounded-lg bg-success-500/10 border border-success-500/20 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-success-400" />
                      <span className="text-sm font-medium text-success-400">Generated Review</span>
                    </div>
                    <p className="text-sm text-white/85">
                      "Had an absolutely wonderful experience! The staff was incredibly friendly
                      and attentive throughout my visit. The service exceeded my expectations,
                      and I would highly recommend this place to anyone looking for quality
                      and professionalism. Will definitely be coming back!"
                    </p>
                  </div>
                  <button className="w-full py-3 text-center text-white font-semibold rounded-lg bg-primary-500 hover:bg-primary-600 transition-all flex items-center justify-center gap-2 text-sm">
                    <Copy className="w-4 h-4" /> Copy & Post to Google
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Clock className="w-3.5 h-3.5 text-success-400" />
                    <span className="text-xs text-slate-300">Total time: <span className="text-success-400 font-bold">about 20 seconds</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-[#0A1628] section-grid-light">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3">Why Businesses Love It</p>
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
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
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 hover:border-primary-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-4 group-hover:shadow-[0_0_16px_rgba(26,82,224,0.3)] transition-all">
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
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
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
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
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
              <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
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
                  onClick={() => trackEvent('cta_clicked', { label: 'Go to Platform', destination: 'https://reviews.vyaptix.ai', page: '/solutions/ai-review-generation', section: 'platform_access' })}
                >
                  Go to Platform <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-secondary-400 border border-secondary-400/30 rounded-lg hover:bg-secondary-400/10 transition-all"
                  onClick={() => trackEvent('cta_clicked', { label: 'Talk to Sales', destination: '/contact', page: '/solutions/ai-review-generation', section: 'platform_access' })}
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
            <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
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
          <h2 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}>
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
              onClick={() => trackEvent('cta_clicked', { label: 'Get Started Free', destination: 'https://reviews.vyaptix.ai', page: '/solutions/ai-review-generation', section: 'final_cta' })}
            >
              Get Started Free <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => trackEvent('cta_clicked', { label: 'Schedule Demo', destination: '/demo', page: '/solutions/ai-review-generation', section: 'final_cta' })}
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
