'use client';
import { useContent } from '@/hooks/useContent';

export default function PortfolioPage() {
  const { content, loading, error } = useContent('portfolio');

  if (loading) {
    return (
      <div className="bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading portfolio page content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
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
      title: "Our Portfolio",
      subtitle: "Explore our successful projects and see how we've helped businesses transform through technology."
    },
    projects: [
      {
        name: 'E-commerce Mobile App',
        description: 'Cross-platform mobile app for a retail business with AI-powered product recommendations.',
        category: 'Mobile App Development',
        image: '/api/placeholder/400/300',
        technologies: ['React Native', 'Node.js', 'AI/ML'],
        results: '40% increase in mobile sales'
      },
      {
        name: 'AI Content Automation System',
        description: 'Automated content generation system for a digital marketing agency.',
        category: 'AI Automation',
        image: '/api/placeholder/400/300',
        technologies: ['Python', 'OpenAI API', 'Automation'],
        results: '80% reduction in content creation time'
      },
      {
        name: 'Digital Marketing Dashboard',
        description: 'Comprehensive analytics dashboard for multi-channel marketing campaigns.',
        category: 'Digital Marketing',
        image: '/api/placeholder/400/300',
        technologies: ['React', 'Google Analytics', 'Data Visualization'],
        results: '60% improvement in campaign ROI'
      }
    ],
    cta: {
      title: "Ready to start your project?",
      description: "Let's discuss your requirements and create a solution that delivers similar results for your business.",
      primaryButton: "Start Your Project",
      secondaryButton: "View Services"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    projects: content?.projects || defaultContent.projects,
    cta: content?.cta || defaultContent.cta
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {pageContent.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {pageContent.hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {pageContent.projects.map((project: { category: string; name: string; description: string; technologies: string[]; link?: string; results: string }, index: number) => (
                <div key={`project-${index}-${project.name}`} className="flex flex-col rounded-2xl bg-gray-50 ring-1 ring-gray-200">
                  <div className="h-48 bg-gray-200 rounded-t-2xl flex items-center justify-center">
                    <span className="text-gray-500">Project Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="relative z-10 rounded-full bg-blue-600 px-3 py-1.5 font-medium text-white">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Technologies:</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={`tech-${techIndex}-${tech}`}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Results:</h4>
                      <p className="mt-1 text-sm text-green-600 font-semibold">{project.results}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {pageContent.cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              {pageContent.cta.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {pageContent.cta.primaryButton}
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors">
                {pageContent.cta.secondaryButton} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
