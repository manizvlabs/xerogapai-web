'use client';
import { ChatBubbleLeftRightIcon, CogIcon, DocumentTextIcon, ChartBarIcon, UserGroupIcon, ShieldCheckIcon, CheckIcon } from '@heroicons/react/24/outline';
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
      title: "AI Solutions for Every Business Need",
      subtitle: "Transform your business with intelligent AI automation. From WhatsApp CX to Enterprise Copilots, we have the perfect solution for your growth."
    },
    services: [
      {
        name: 'WhatsApp CX Copilot',
        description: 'Transform customer conversations into revenue opportunities with AI-powered WhatsApp automation.',
        icon: 'ChatBubbleLeftRightIcon',
        price: '$500/month',
        href: '/whatsapp-cx',
        features: [
          'Unified WhatsApp inbox management',
          'AI-powered responses for common queries',
          'Automated tagging and escalation',
          'Real-time analytics dashboard',
          'Multi-language support',
          '24/7 customer engagement'
        ],
        deliverables: [
          'WhatsApp Business API integration',
          'Custom AI conversation flows',
          'Analytics dashboard setup',
          'Team training and documentation',
          'Ongoing support and optimization'
        ]
      },
      {
        name: 'XeroGap AI Workflow Automation',
        description: 'Streamline operations with AI-powered workspace automation that connects Notion, Slack, and your business tools.',
        icon: 'CogIcon',
        price: '$300/month',
        href: '/xerogap-ai',
        features: [
          'Auto-summarize meeting transcripts',
          'Generate weekly reports from workspace data',
          'Intelligent notifications and status updates',
          'Connect Notion with your business tools',
          'Custom workflow automation',
          'Real-time data synchronization'
        ],
        deliverables: [
          'Complete workflow automation setup',
          'Custom integration development',
          'Process documentation',
          'Training and handover',
          '3 months of optimization support'
        ]
      },
      {
        name: 'Enterprise Knowledge Copilots',
        description: 'Multi-lingual Q&A over company documents with compliance-aware responses and audit trails.',
        icon: 'DocumentTextIcon',
        price: '$800/month',
        href: '/enterprise-copilots',
        features: [
          'Private knowledge base with AI search',
          'Compliance-aware responses',
          'Audit trails and access controls',
          'Multi-language support (20+ languages)',
          'Integration with existing systems',
          'Advanced security and encryption'
        ],
        deliverables: [
          'Knowledge base setup and training',
          'Custom AI model development',
          'Security and compliance configuration',
          'User training and documentation',
          'Performance monitoring and optimization'
        ]
      },
      {
        name: 'Sales Intelligence Automation',
        description: 'AI-powered prospect research and outreach that helps you close more deals faster.',
        icon: 'ChartBarIcon',
        price: '$600/month',
        href: '/sales-automation',
        features: [
          'Automated lead intelligence gathering',
          'Personalized outreach campaigns',
          'CRM integration and tracking',
          'Performance analytics and insights',
          'Multi-channel campaign management',
          'Lead scoring and qualification'
        ],
        deliverables: [
          'CRM integration and setup',
          'Lead intelligence system',
          'Automated campaign workflows',
          'Performance dashboards',
          'Sales team training'
        ]
      },
      {
        name: 'Contact Center QA & Coaching',
        description: 'AI-driven call quality analysis and agent development to improve customer service excellence.',
        icon: 'UserGroupIcon',
        price: '$700/month',
        href: '/contact-center-ai',
        features: [
          'Automated call scoring and analysis',
          'Compliance monitoring',
          'Personalized coaching recommendations',
          'Performance tracking and reporting',
          'Quality assurance workflows',
          'Agent development insights'
        ],
        deliverables: [
          'Call analysis system setup',
          'Quality scoring framework',
          'Coaching recommendation engine',
          'Performance dashboards',
          'Training materials and support'
        ]
      },
      {
        name: 'DPDP Compliance Solutions',
        description: 'Complete data protection and privacy compliance with automated assessment and reporting.',
        icon: 'ShieldCheckIcon',
        price: '$1,000/month',
        href: '/dpdp-compliance',
        features: [
          'GDPR & DPDP compliance assessment',
          'Data mapping and gap analysis',
          'Compliance automation tools',
          'Regular audit and reporting',
          'Risk assessment frameworks',
          'Compliance documentation'
        ],
        deliverables: [
          'Compliance assessment report',
          'Data mapping and documentation',
          'Automated compliance tools',
          'Regular audit reports',
          'Compliance training materials'
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
      title: "Ready to Transform Your Business with AI?",
      description: "Take our free AI Readiness Assessment and discover which solutions will drive the most impact for your business.",
      primaryButton: "Get Free AI Assessment",
      primaryHref: "/assessment",
      secondaryButton: "Book Demo",
      secondaryHref: "/demo"
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
    ChatBubbleLeftRightIcon,
    CogIcon,
    DocumentTextIcon,
    ChartBarIcon,
    UserGroupIcon,
    ShieldCheckIcon
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

      {/* Services Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {(pageContent.services as Record<string, unknown>).map((service: { name: string; description: string; icon: string; price: string; href?: string; features: string[]; deliverables: string[] }) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap] || ChatBubbleLeftRightIcon;
                return (
                  <div key={service.name} className="flex flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-300 dark:hover:ring-blue-600 transition-colors">
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
                      {service.href ? (
                        <a
                          href={service.href}
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                        >
                          Learn More
                        </a>
                      ) : (
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                          Get Started
                        </button>
                      )}
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
              {(pageContent.process as Record<string, unknown>).title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.process as Record<string, unknown>).subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {(pageContent.process as Record<string, unknown>).steps.map((item: { step: number; title: string; description: string }) => (
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
              {(pageContent.cta as Record<string, unknown>).title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              {(pageContent.cta as Record<string, unknown>).description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={(pageContent.cta as Record<string, unknown>).primaryHref as string || "/assessment"}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {(pageContent.cta as Record<string, unknown>).primaryButton}
              </a>
              <a
                href={(pageContent.cta as Record<string, unknown>).secondaryHref as string || "/demo"}
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors"
              >
                {(pageContent.cta as Record<string, unknown>).secondaryButton} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
