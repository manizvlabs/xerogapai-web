'use client';
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading about page content...</p>
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
      title: "About Zero Digital",
      subtitle: "We're passionate about helping businesses transform through AI automation, digital solutions, and innovative technology. Based in Hyderabad, serving clients across India and globally."
    },
    mission: {
      title: "Our Mission",
      description: "To democratize AI and digital transformation for businesses of all sizes. We believe that every company, regardless of size or budget, should have access to cutting-edge technology that can accelerate their growth and success.",
      additionalDescription: "Our approach combines deep technical expertise with business acumen, ensuring that every solution we deliver not only works technically but also drives real business value."
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      features: [
        "Proven track record with 50+ successful projects",
        "Transparent pricing with no hidden costs",
        "Agile development process with regular updates",
        "Post-delivery support and maintenance",
        "Free consultation and project planning"
      ]
    },
    values: {
      title: "Our Values",
      subtitle: "The principles that guide everything we do",
      items: [
        {
          name: 'Innovation First',
          description: 'We stay at the forefront of technology, always exploring new ways to solve business challenges with cutting-edge solutions.'
        },
        {
          name: 'Client Success',
          description: 'Your success is our success. We measure our achievements by the growth and satisfaction of our clients.'
        },
        {
          name: 'Transparency',
          description: 'Complete transparency in pricing, timelines, and processes. No hidden costs or surprises.'
        },
        {
          name: 'Quality Delivery',
          description: 'We deliver high-quality solutions that exceed expectations and provide long-term value.'
        }
      ]
    },
    team: {
      title: "Meet the Team",
      subtitle: "The passionate individuals behind Zero Digital",
      members: [
        {
          name: 'Manish Kumar',
          title: 'Founder & Solutions Architect',
          description: '5+ years experience in enterprise solutions, AI automation, and digital transformation. Based in Hyderabad.',
          initials: 'MK'
        }
      ]
    },
    stats: {
      title: "Our Impact",
      subtitle: "Numbers that speak to our commitment and success",
      items: [
        { label: 'Years of Experience', value: '5+' },
        { label: 'Projects Delivered', value: '50+' },
        { label: 'Happy Clients', value: '25+' },
        { label: 'AI Agents Deployed', value: '15+' }
      ]
    },
    cta: {
      title: "Ready to work with us?",
      description: "Let's discuss your project and see how we can help transform your business with AI and digital solutions.",
      primaryButton: "Get Started",
      secondaryButton: "View Services"
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
        <div className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {(pageContent.hero as Record<string, unknown>).title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
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
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {(pageContent.mission as Record<string, unknown>).description}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {(pageContent.mission as Record<string, unknown>).additionalDescription}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{(pageContent.whyChooseUs as Record<string, unknown>).title}</h3>
                <ul className="space-y-4">
                  {(pageContent.whyChooseUs as Record<string, unknown>).features && Array.isArray((pageContent.whyChooseUs as Record<string, unknown>).features) && (pageContent.whyChooseUs as Record<string, unknown>).features.map((feature: string, index: number) => (
                    <li key={`feature-${index}-${feature.slice(0, 20)}`} className="flex items-start gap-x-3">
                      <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
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
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
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
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
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
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.team as Record<string, unknown>).subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-1">
              {(pageContent.team as Record<string, unknown>).members && Array.isArray((pageContent.team as Record<string, unknown>).members) && (pageContent.team as Record<string, unknown>).members.map((person: { initials: string; name: string; title: string; description: string }, index: number) => (
                <div key={`member-${index}-${person.name}`} className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">{person.initials}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="mt-2 text-base text-blue-600">{person.title}</p>
                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-md">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {(pageContent.stats as Record<string, unknown>).title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                {(pageContent.stats as Record<string, unknown>).subtitle}
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {(pageContent.stats as Record<string, unknown>).items && Array.isArray((pageContent.stats as Record<string, unknown>).items) && (pageContent.stats as Record<string, unknown>).items.map((stat: { label: string; value: string }, index: number) => (
                <div key={`stat-${index}-${stat.label}`} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-blue-100">{stat.label}</dt>
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
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.cta as Record<string, unknown>).description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                {(pageContent.cta as Record<string, unknown>).primaryButton}
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                {(pageContent.cta as Record<string, unknown>).secondaryButton} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
