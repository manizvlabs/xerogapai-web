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
  Clock,
  Users,
  MessageSquare,
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
import { GoogleG } from '../components/ui/GoogleG';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Written Review Drafts',
    description: 'Your customer answers a few quick questions and AI writes a natural, detailed review draft they can post as-is or edit.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Google Review Inbox',
    description: "Reply to Google reviews with AI — on-brand drafts in your customer's language, and you approve every one before it goes out.",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'Branded QR Codes',
    description: 'Custom branded QR codes and shareable links you can place wherever happy moments happen — counters, tables, receipts.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Finished in 20 Seconds',
    description: 'From QR scan to posted Google review in about 20 seconds — with an 84% completion rate.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Actionable Analytics',
    description: 'Track scans, completions, ratings, and review growth in your dashboard, with CSV exports for reporting.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-Store Teams',
    description: 'Manage up to 5 stores from one account with owner and manager access levels for your team.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Create Your Store',
    description: 'Add your brand and Google Business Profile, and let AI prepare the questions your customers will answer.',
  },
  {
    step: '02',
    title: 'Share the QR',
    description: 'Place your branded QR code wherever happy moments happen — counters, tables, receipts, or follow-up messages.',
  },
  {
    step: '03',
    title: 'Customer Answers',
    description: 'A quick, branded conversation captures the details of their experience. Takes about 20 seconds.',
  },
  {
    step: '04',
    title: 'AI Writes, Customer Posts',
    description: 'The AI-drafted review is copied and Google opens instantly — your customer posts it in one tap.',
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
    question: 'Can it reply to my existing Google reviews too?',
    answer: "Yes. The Google Review Inbox drafts on-brand replies to your Google reviews — in your customer's language — and you approve every reply before it's posted. More reviews and faster replies lift how your business shows up on Google.",
  },
  {
    question: 'Can I customize the experience with my branding?',
    answer: 'Yes. Custom branding, custom questions, and branded QR codes are included in the plan. Each store gets its own branded experience, so the review flow feels like part of your brand — not another form.',
  },
  {
    question: "What's the average feedback-to-review time?",
    answer: 'Most customers complete the entire flow in about 20 seconds, with an 84% completion rate. From scanning the QR code to posting on Google, the process is designed to be frictionless.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Launch pricing is ₹1,299/month (incl. 18% GST), down from ₹1,999 — cancel anytime. It includes self-serve setup, up to 5 stores, unlimited review drafts, custom branding and QR codes, analytics with CSV exports, team access, and email support with guided onboarding.',
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
    'Get more Google reviews on autopilot. Customers answer a quick branded conversation, AI writes the review draft, and they post it straight to Google in about 20 seconds. Includes an AI-powered Google Review Inbox for replies.',
  offers: {
    '@type': 'Offer',
    price: '1299',
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
        badge={{ text: 'Google Reviews, Made Effortless', icon: <GoogleG className="w-4 h-4" /> }}
        title={
          <>
            Get More <span style={{ color: '#4285F4' }}>Google Reviews</span> — On Autopilot
          </>
        }
        description="Turn great experiences into five-star stories. Every happy customer gets a fast, branded way to share their experience — they answer a quick conversation, AI writes the draft, and they post it straight to Google in about 20 seconds."
        actions={[
          { text: 'Create Your Account', href: 'https://reviews.vyaptix.ai', variant: 'primary', external: true },
          { text: 'Schedule Demo', href: '/demo', variant: 'secondary' },
        ]}
      />

      {/* ── Google trust row ── */}
      <section className="pb-12 bg-transparent">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-1" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-warning-400" fill="currentColor" />
              ))}
            </span>
            <span className="flex items-center gap-2">
              <GoogleG className="w-4 h-4" />
              Reviews synced straight from Google
            </span>
            <span className="text-slate-400">50+ growing businesses collecting better reviews</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 md:py-28 bg-[#0A1628] section-grid-light">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="label-mono-cyan mb-3 flex items-center justify-center gap-2">
              <GoogleG className="w-4 h-4" /> Everything for Your Google Reviews
            </p>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Collect Reviews, Reply with AI, Grow Your Rating
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              A complete platform to collect Google reviews, reply to them with AI, and lift how your business shows up on Google.
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

      {/* ── Google Business Profile banner ── */}
      <section className="py-10 bg-[#0A1628] border-y border-white/10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <GoogleG className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-white">Works directly with your Google Business Profile</p>
                <p className="text-sm text-slate-300">
                  Reviews sync from Google and your replies post straight back — no copy-paste.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse" />
                Live Google review sync
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-success-400" />
                You approve every reply
              </span>
            </div>
          </div>
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
              A simple four-step process that turns happy customers into five-star Google reviews.
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
                Our AI Review Generator is available as a standalone web application
                at <strong className="text-white">reviews.vyaptix.ai</strong>. Join 50+ growing
                businesses collecting better reviews — launch pricing at ₹1,299/month
                (incl. GST), down from ₹1,999. Cancel anytime.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Self-serve setup with guided onboarding',
                  'Up to 5 stores and unlimited review drafts',
                  'Custom branding, questions and QR codes',
                  'Analytics, CSV exports and team access',
                  'Google Review Inbox with AI-drafted replies',
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
                    <TrendingUp className="w-5 h-5 text-primary-400 mb-2" />
                    <p className="text-2xl font-bold text-white">
                      +<CountUp value={38} duration={1500} />
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Reviews This Month</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <Star className="w-5 h-5 text-warning-400 mb-2" />
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-xs text-slate-300 mt-0.5">Avg Rating</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <BarChart3 className="w-5 h-5 text-success-400 mb-2" />
                  <p className="text-2xl font-bold text-white">
                    <CountUp value={84} suffix="%" duration={1800} />
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">Completion Rate</p>
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
            Join 50+ growing businesses collecting better reviews.
            Launch pricing at ₹1,299/month (incl. GST), down from ₹1,999 — cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://reviews.vyaptix.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#050D1A] bg-white rounded-lg hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(6,206,255,0.3)] transition-all"
            >
              Create Your Account <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-10 max-w-2xl mx-auto">
            Google, Google Business Profile, and the Google logo are trademarks of Google LLC.
            VyaptIX is not affiliated with, endorsed by, or sponsored by Google.
          </p>
        </div>
      </section>
    </>
  );
}
