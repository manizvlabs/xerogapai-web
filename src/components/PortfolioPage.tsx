'use client';
import Link from 'next/link';
import { useContent } from '@/hooks/useContent';

export default function PortfolioPage() {
  const { content, loading, error } = useContent('portfolio');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-white">Loading portfolio page content...</p>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <p className="text-red-800">Error loading content: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default content structure
  const defaultContent = {
    hero: {
      title: "AI Success Stories",
      subtitle: "Discover how we've transformed businesses with intelligent automation across industries and regions."
    },
    projects: [
      {
        name: 'WhatsApp CX Automation - Retail Chain',
        description: 'Implemented AI-powered WhatsApp automation for a major retail chain, handling 10,000+ customer inquiries monthly with intelligent routing and instant responses.',
        category: 'WhatsApp CX',
        image: '/api/placeholder/400/300',
        technologies: ['WhatsApp Business API', 'AI/ML', 'Natural Language Processing', 'AutoML'],
        results: '85% faster response time, 92% customer satisfaction',
        client: 'Major Retail Chain',
        industry: 'Retail',
        duration: '3 months'
      },
      {
        name: 'Enterprise Knowledge Copilot - Manufacturing',
        description: 'Built a multi-lingual knowledge copilot for a manufacturing enterprise, enabling instant access to technical documentation and compliance information across 25 languages.',
        category: 'Enterprise AI',
        image: '/api/placeholder/400/300',
        technologies: ['Large Language Models', 'RAG Architecture', 'Multi-language Support', 'Vector Databases'],
        results: '75% reduction in support queries, 40% faster knowledge access',
        client: 'Global Manufacturing Corp',
        industry: 'Manufacturing',
        duration: '4 months'
      },
      {
        name: 'Sales Intelligence Automation - Tech Startup',
        description: 'Developed AI-powered sales intelligence system that automates prospect research, personalized outreach, and lead scoring for a rapidly growing tech startup.',
        category: 'Sales Automation',
        image: '/api/placeholder/400/300',
        technologies: ['Machine Learning', 'CRM Integration', 'Lead Scoring', 'Predictive Analytics'],
        results: '150% increase in qualified leads, 60% improvement in conversion rate',
        client: 'Tech Startup',
        industry: 'Technology',
        duration: '2 months'
      },
      {
        name: 'Contact Center AI - Telecom Provider',
        description: 'Implemented AI-driven call quality analysis and coaching system for a telecom provider\'s contact center, improving agent performance and customer satisfaction.',
        category: 'Contact Center AI',
        image: '/api/placeholder/400/300',
        technologies: ['Speech Analytics', 'Natural Language Understanding', 'Sentiment Analysis', 'Performance Analytics'],
        results: '35% improvement in call quality scores, 50% reduction in training time',
        client: 'Major Telecom Provider',
        industry: 'Telecommunications',
        duration: '5 months'
      },
      {
        name: 'XeroGap AI Workflow Automation - Consulting Firm',
        description: 'Created intelligent workflow automation connecting Notion, Slack, and business tools for a consulting firm, streamlining project management and client communication.',
        category: 'Workflow Automation',
        image: '/api/placeholder/400/300',
        technologies: ['XeroGap AI', 'Notion API', 'Slack Integration', 'Workflow Engine'],
        results: '20 hours/week saved, 90% reduction in manual data entry',
        client: 'Consulting Firm',
        industry: 'Professional Services',
        duration: '6 weeks'
      },
      {
        name: 'DPDP Compliance Automation - Healthcare',
        description: 'Developed automated DPDP compliance system for a healthcare provider, including data mapping, gap analysis, and continuous compliance monitoring.',
        category: 'Compliance',
        image: '/api/placeholder/400/300',
        technologies: ['Compliance Automation', 'Data Mapping Tools', 'Risk Assessment', 'Audit Reporting'],
        results: '100% compliance achievement, 80% reduction in compliance overhead',
        client: 'Healthcare Provider',
        industry: 'Healthcare',
        duration: '4 months'
      }
    ],
    cta: {
      title: "Ready to Transform Your Business with AI?",
      description: "See how our AI solutions can deliver similar results for your business. Start with our free AI Readiness Assessment.",
      primaryButton: "Get Free AI Assessment",
      primaryHref: "/assessment",
      secondaryButton: "Book Demo",
      secondaryHref: "/demo"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    projects: content?.projects || defaultContent.projects,
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
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              {(pageContent.hero as Record<string, unknown>).subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {(pageContent.projects as Record<string, unknown>)?.map((project: { category: string; name: string; description: string; technologies: string[]; link?: string; results: string; client?: string; industry?: string; duration?: string }, index: number) => (
                <div key={`project-${index}-${project.name}`} className="flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 hover:ring-blue-300 dark:hover:ring-blue-600 transition-colors">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-t-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold text-xl">AI</span>
                      </div>
                      <span className="text-gray-600 dark:text-white text-sm font-medium">{project.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-x-4 text-xs mb-4">
                      <span className="relative z-10 rounded-full bg-green-600 px-3 py-1.5 font-medium text-white">
                        {project.category}
                      </span>
                      {project.industry && (
                        <span className="text-gray-500 dark:text-white">
                          {project.industry}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white">
                      {project.description}
                    </p>

                    {project.client && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Client:</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-white">{project.client}</p>
                      </div>
                    )}

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Technologies:</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={`tech-${techIndex}-${tech}`}
                            className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-green-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Results:</h4>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400 font-semibold">{project.results}</p>
                    </div>

                    {project.duration && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Duration:</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-white">{project.duration}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {(pageContent.cta as Record<string, unknown>).title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              {(pageContent.cta as Record<string, unknown>).description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={(pageContent.cta as any)?.primaryHref || "/assessment"}
                className="rounded-md bg-white dark:bg-gray-900 px-6 py-3 text-sm font-semibold text-green-600 shadow-sm hover:bg-gray-50 dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {(pageContent.cta as any)?.primaryButton}
              </Link>
              <Link href={(pageContent.cta as any)?.secondaryHref || "/demo"} className="text-sm font-semibold leading-6 text-white hover:text-green-100 transition-colors">
                {(pageContent.cta as any)?.secondaryButton} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
