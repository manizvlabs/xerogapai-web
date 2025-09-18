'use client';
import { SparklesIcon, DevicePhoneMobileIcon, ChartBarIcon, CpuChipIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useContent } from '@/hooks/useContent';

export default function ServicesPage() {
  const { content, loading, error } = useContent('services');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading services page content...</p>
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
      title: "Our Services",
      subtitle: "Comprehensive digital transformation solutions designed to accelerate your business growth. From AI automation to mobile apps, we've got you covered."
    },
    services: [
      {
        name: 'AI Content Automation',
        description: 'Transform your content marketing with AI-powered automation that creates, schedules, and optimizes your social media presence.',
        icon: 'SparklesIcon',
        price: '₹25,000/month',
        features: [
          'Daily LinkedIn posts with engagement optimization',
          'Instagram content creation and scheduling',
          'Blog articles (4-8 per month)',
          'Social media calendar management',
          'Content performance analytics',
          'Brand voice consistency across platforms'
        ],
        deliverables: [
          'Content calendar for 3 months',
          'AI-generated posts (30+ per month)',
          'Visual content templates',
          'Performance reports',
          'Content strategy consultation'
        ]
      },
      {
        name: 'Mobile App Development',
        description: 'From concept to App Store, we build native and cross-platform mobile applications that drive business growth.',
        icon: 'DevicePhoneMobileIcon',
        price: '₹50,000 - ₹2,00,000',
        features: [
          'Native iOS and Android development',
          'Cross-platform solutions (React Native/Flutter)',
          'Custom UI/UX design',
          'Backend API integration',
          'App Store and Play Store deployment',
          'Post-launch maintenance and updates'
        ],
        deliverables: [
          'Fully functional mobile application',
          'Source code and documentation',
          'App store listings and assets',
          'User testing and feedback integration',
          '6 months of maintenance support'
        ]
      },
      {
        name: 'Digital Marketing Automation',
        description: 'Complete digital marketing setup with automated campaigns, lead generation, and performance tracking.',
        icon: 'ChartBarIcon',
        price: '₹15,000/month',
        features: [
          'Google Ads campaign setup and optimization',
          'Facebook and Instagram advertising',
          'Email marketing automation',
          'Lead generation and nurturing',
          'SEO optimization',
          'Analytics and reporting dashboard'
        ],
        deliverables: [
          'Marketing campaign setup',
          'Lead generation system',
          'Email automation sequences',
          'Monthly performance reports',
          'ROI tracking and optimization'
        ]
      },
      {
        name: 'AI Agent Development',
        description: 'Custom AI agents that automate business processes, enhance customer service, and optimize operations.',
        icon: 'CpuChipIcon',
        price: '₹75,000 - ₹3,00,000',
        features: [
          'Custom AI solution development',
          'Process automation and optimization',
          'Integration with existing systems',
          'Natural language processing',
          'Machine learning model training',
          'API development and documentation'
        ],
        deliverables: [
          'Custom AI agent solution',
          'Integration with your systems',
          'Training and documentation',
          'API endpoints and documentation',
          '3 months of support and optimization'
        ]
      }
    ],
    process: {
      title: "Our Process",
      subtitle: "A proven methodology that ensures successful project delivery and maximum business impact",
      steps: [
        {
          step: '01',
          title: 'Discovery & Strategy',
          description: 'We analyze your business needs, goals, and current challenges to create a tailored digital transformation strategy.'
        },
        {
          step: '02',
          title: 'Proposal & Planning',
          description: 'Detailed project proposal with timeline, deliverables, and pricing. We ensure complete transparency.'
        },
        {
          step: '03',
          title: 'Development & Implementation',
          description: 'Agile development process with regular updates, testing, and feedback integration.'
        },
        {
          step: '04',
          title: 'Launch & Optimization',
          description: 'Deployment, training, and ongoing optimization to ensure maximum ROI and business impact.'
        }
      ]
    },
    cta: {
      title: "Ready to get started?",
      description: "Let's discuss your project requirements and create a custom solution that drives real business results.",
      primaryButton: "Schedule Free Consultation",
      secondaryButton: "Download Brochure"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    services: content?.services || defaultContent.services,
    process: content?.process || defaultContent.process,
    cta: content?.cta || defaultContent.cta
  };

  // Icon mapping
  const iconMap = {
    SparklesIcon,
    DevicePhoneMobileIcon,
    ChartBarIcon,
    CpuChipIcon
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {(pageContent.hero as any).title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.hero as any).subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {(pageContent.services as any).map((service: { name: string; description: string; icon: string; price: string; features: string[]; deliverables: string[] }) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || SparklesIcon;
                return (
                  <div key={service.name} className="flex flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 ring-1 ring-gray-200 dark:ring-gray-700">
                    <div>
                      <div className="flex items-center gap-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                          <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-semibold leading-8 text-gray-900 dark:text-white">{service.name}</h3>
                      </div>
                      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">{service.description}</p>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">What&apos;s included:</h4>
                        <ul className="mt-3 space-y-2">
                      {service.features?.map((feature) => (
                        <li key={feature} className="flex items-center gap-x-3 text-sm text-gray-600 dark:text-gray-300">
                              <CheckIcon className="h-4 w-4 flex-none text-blue-600" />
                              {feature}
                            </li>
                          )) || []}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Deliverables:</h4>
                        <ul className="mt-3 space-y-2">
                        {service.deliverables?.map((deliverable) => (
                          <li key={deliverable} className="flex items-center gap-x-3 text-sm text-gray-600 dark:text-gray-300">
                              <div className="h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
                              {deliverable}
                            </li>
                          )) || []}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                        Get Started
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {(pageContent.process as any).title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.process as any).subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {(pageContent.process as any).steps.map((item: { step: number; title: string; description: string }) => (
                <div key={item.step} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <span className="text-sm font-bold text-white">{item.step}</span>
                    </div>
                    {item.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{item.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {(pageContent.cta as any).title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              {(pageContent.cta as any).description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">
                {(pageContent.cta as any).primaryButton}
              </button>
              <button className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors">
                {(pageContent.cta as any).secondaryButton} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
