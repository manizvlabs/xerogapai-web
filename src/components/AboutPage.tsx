'use client';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useContent } from '@/hooks/useContent';

export default function AboutPage() {
  const { content, loading, error } = useContent('about');

  console.log('AboutPage - State:', { content, loading, error });
  console.log('AboutPage - Component rendered');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-white">Loading about page content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <p className="text-red-800 dark:text-red-200">Error loading content: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default content structure
  const defaultContent = {
    hero: {
      title: "About XeroGap AI",
      subtitle: "We're on a mission to democratize AI automation for businesses worldwide. From AI Multi-Channel Support Copilot to AI Knowledge Management Assistant, we make cutting-edge AI accessible and practical for growing companies."
    },
    mission: {
      title: "Our Mission",
      description: "To bridge the gap between advanced AI technology and business implementation. We believe every business deserves access to intelligent automation that drives real ROI and competitive advantage.",
      additionalDescription: "Founded by AI experts with deep industry experience, we combine technical excellence with business pragmatism to deliver AI solutions that actually work and deliver measurable results."
    },
    whyChooseUs: {
      title: "Why Choose XeroGap AI?",
      features: [
        "AI-First Approach: Every solution built with AI at the core",
        "Proven Track Record: 200+ AI implementations across industries",
        "End-to-End Service: From assessment to deployment and optimization",
        "Enterprise-Grade Security: SOC 2 compliant with GDPR & DPDP compliance",
        "Global Reach: Serving businesses in MEA, US, and international markets",
        "Transparent Pricing: No hidden costs, clear ROI metrics"
      ]
    },
    values: {
      title: "Our AI-First Values",
      subtitle: "The principles that guide our AI innovation journey",
      items: [
        {
          name: 'AI Democratization',
          description: 'Making advanced AI accessible to businesses of all sizes, from startups to enterprises, without the complexity and high costs.'
        },
        {
          name: 'Practical Implementation',
          description: 'Focus on real-world applications that drive measurable business outcomes, not just technical demonstrations.'
        },
        {
          name: 'Ethical AI Development',
          description: 'Building responsible AI solutions with transparency, fairness, and compliance at the forefront of every decision.'
        },
        {
          name: 'Continuous Innovation',
          description: 'Staying ahead of AI trends while maintaining backward compatibility and seamless integration with existing systems.'
        },
        {
          name: 'Data Privacy & Security',
          description: 'Zero compromise on data protection, with enterprise-grade security and global compliance standards.'
        },
        {
          name: 'Measurable ROI',
          description: 'Every AI solution designed to deliver clear, quantifiable business value and competitive advantage.'
        }
      ]
    },
    team: {
      title: "Our AI Leadership Team",
      subtitle: "Industry veterans with deep AI and enterprise expertise",
      members: [
        {
          name: 'Manish Kumar',
          title: 'Founder & Chief AI Architect',
          description: 'AI/ML expert with 8+ years in enterprise automation, large language models, and scalable AI solutions. Former tech lead at major enterprises.',
          initials: 'MK'
        },
        {
          name: 'AI Development Team',
          title: 'Senior AI Engineers & ML Specialists',
          description: 'Our team includes PhD-level AI researchers, ML engineers, and full-stack developers specializing in production AI systems.',
          initials: 'AI'
        }
      ]
    },
    stats: {
      title: "AI Impact by Numbers",
      subtitle: "Transforming businesses through intelligent automation",
      items: [
        { label: 'AI Solutions Deployed', value: '200+' },
        { label: 'Average Response Time Reduction', value: '85%' },
        { label: 'Customer Satisfaction Increase', value: '94%' },
        { label: 'Cost Savings Generated', value: '$2M+' },
        { label: 'Languages Supported', value: '25+' },
        { label: 'Industries Served', value: '12+' }
      ]
    },
    cta: {
      title: "Ready to Transform Your Business with AI?",
      description: "Take our free AI Readiness Assessment and discover which automation solutions will drive the most impact for your business.",
      primaryButton: "Get Free AI Assessment",
      primaryHref: "/assessment",
      secondaryButton: "Book Demo",
      secondaryHref: "/demo"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    mission: content?.mission || defaultContent.mission,
    whyChooseUs: {
      ...defaultContent.whyChooseUs,
      ...(content?.whyChooseUs || {}),
      features: ((content?.whyChooseUs as Record<string, unknown>)?.features || defaultContent.whyChooseUs.features) || []
    },
    team: {
      ...defaultContent.team,
      ...(content?.team || {}),
      members: ((content?.team as Record<string, unknown>)?.members || defaultContent.team.members) || []
    },
    values: {
      ...defaultContent.values,
      ...(content?.values || {}),
      items: ((content?.values as Record<string, unknown>)?.items || defaultContent.values.items) || []
    },
    stats: {
      ...defaultContent.stats,
      ...(content?.stats || {}),
      items: ((content?.stats as Record<string, unknown>)?.items || defaultContent.stats.items) || []
    },
    cta: content?.cta || defaultContent.cta
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-purple-700 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
            <svg>
              <defs>
                <pattern id="about-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#about-pattern)" />
            </svg>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-800/30 text-purple-200 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Our Story
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {(pageContent.hero as Record<string, unknown>).title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
                {" "}& Mission
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-300">
              {(pageContent.hero as Record<string, unknown>).subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {(pageContent.mission as Record<string, unknown>).title}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                  {(pageContent.mission as Record<string, unknown>).description}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                  {(pageContent.mission as Record<string, unknown>).additionalDescription}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{(pageContent.whyChooseUs as Record<string, unknown>).title}</h3>
                <ul className="space-y-4">
                  {(pageContent.whyChooseUs as Record<string, unknown>).features && Array.isArray((pageContent.whyChooseUs as Record<string, unknown>).features) && (pageContent.whyChooseUs as Record<string, unknown>).features.map((feature: string, index: number) => (
                    <li key={`feature-${index}-${feature.slice(0, 20)}`} className="flex items-start gap-x-3">
                      <CheckIcon className="h-6 w-6 flex-none text-purple-600 mt-0.5" />
                      <span className="text-gray-600 dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {(pageContent.values as Record<string, unknown>).title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              {(pageContent.values as Record<string, unknown>).subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {(pageContent.values as Record<string, unknown>).items && Array.isArray((pageContent.values as Record<string, unknown>).items) && (pageContent.values as Record<string, unknown>).items.map((value: { name: string; description: string }, index: number) => (
                <div key={`value-${index}-${value.name}`} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-white">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {(pageContent.team as Record<string, unknown>).title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              {(pageContent.team as Record<string, unknown>).subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-1">
              {(pageContent.team as Record<string, unknown>).members && Array.isArray((pageContent.team as Record<string, unknown>).members) && (pageContent.team as Record<string, unknown>).members.map((person: { initials: string; name: string; title: string; description: string }, index: number) => (
                <div key={`member-${index}-${person.name}`} className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600 dark:text-white">{person.initials}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="mt-2 text-base text-purple-600">{person.title}</p>
                  <p className="mt-4 text-base text-gray-600 dark:text-white max-w-md">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {(pageContent.stats as Record<string, unknown>).title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-purple-100">
                {(pageContent.stats as Record<string, unknown>).subtitle}
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {(pageContent.stats as Record<string, unknown>).items && Array.isArray((pageContent.stats as Record<string, unknown>).items) && (pageContent.stats as Record<string, unknown>).items.map((stat: { label: string; value: string }, index: number) => (
                <div key={`stat-${index}-${stat.label}`} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-purple-100">{stat.label}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {(pageContent.cta as Record<string, unknown>).title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              {(pageContent.cta as Record<string, unknown>).description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={(pageContent.cta as Record<string, unknown>).primaryHref as string || "/assessment"}
                className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
              >
                {(pageContent.cta as Record<string, unknown>).primaryButton}
              </Link>
              <Link
                href={(pageContent.cta as Record<string, unknown>).secondaryHref as string || "/demo"}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-purple-600 transition-colors"
              >
                {(pageContent.cta as Record<string, unknown>).secondaryButton} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
