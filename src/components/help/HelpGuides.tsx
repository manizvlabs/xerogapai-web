'use client';

import { BookOpenIcon, PlayIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function HelpGuides() {
  const guides = [
    {
      title: 'Complete API Integration Guide',
      description: 'Step-by-step guide to integrate XeroGap AI with your application',
      type: 'Tutorial',
      duration: '45 min',
      difficulty: 'Intermediate',
      category: 'Development',
      featured: true
    },
    {
      title: 'Notion Workflow Automation',
      description: 'Build powerful automations between Notion and your business tools',
      type: 'Guide',
      duration: '30 min',
      difficulty: 'Beginner',
      category: 'Integration',
      featured: true
    },
    {
      title: 'Sales Team Onboarding',
      description: 'Complete setup guide for sales teams new to AI automation',
      type: 'Tutorial',
      duration: '25 min',
      difficulty: 'Beginner',
      category: 'Sales',
      featured: false
    },
    {
      title: 'Contact Center QA Setup',
      description: 'Implement AI-powered quality assurance for your contact center',
      type: 'Guide',
      duration: '40 min',
      difficulty: 'Intermediate',
      category: 'Customer Service',
      featured: false
    },
    {
      title: 'DPDP Compliance Implementation',
      description: 'Complete guide to achieving DPDP Act compliance',
      type: 'Guide',
      duration: '60 min',
      difficulty: 'Advanced',
      category: 'Compliance',
      featured: true
    },
    {
      title: 'Custom AI Model Training',
      description: 'Train custom AI models for your specific business needs',
      type: 'Tutorial',
      duration: '50 min',
      difficulty: 'Advanced',
      category: 'AI/ML',
      featured: false
    }
  ];

  const videoTutorials = [
    {
      title: 'Getting Started with XeroGap AI',
      description: '5-minute overview of the platform',
      duration: '5:23',
      views: '12K',
      thumbnail: '🎬'
    },
    {
      title: 'Building Your First Workflow',
      description: 'Step-by-step workflow creation',
      duration: '8:45',
      views: '8.5K',
      thumbnail: '⚙️'
    },
    {
      title: 'Notion Integration Walkthrough',
      description: 'Complete integration setup',
      duration: '12:30',
      views: '15K',
      thumbnail: '📝'
    },
    {
      title: 'API Authentication Explained',
      description: 'Understanding authentication methods',
      duration: '6:15',
      views: '9K',
      thumbnail: '🔐'
    }
  ];

  const learningPaths = [
    {
      title: 'Beginner\'s Path',
      description: 'Start your journey with XeroGap AI fundamentals',
      courses: 8,
      duration: '4 hours',
      skills: ['Basic Setup', 'Simple Workflows', 'Core Features'],
      icon: BookOpenIcon
    },
    {
      title: 'Developer Path',
      description: 'Build advanced integrations and custom solutions',
      courses: 12,
      duration: '12 hours',
      skills: ['API Integration', 'Custom Development', 'Advanced Features'],
      icon: PlayIcon
    },
    {
      title: 'Business User Path',
      description: 'Maximize productivity with automation workflows',
      courses: 10,
      duration: '8 hours',
      skills: ['Workflow Design', 'Process Automation', 'Analytics'],
      icon: UsersIcon
    },
    {
      title: 'Enterprise Path',
      description: 'Scale automation across your entire organization',
      courses: 15,
      duration: '16 hours',
      skills: ['Enterprise Integration', 'Security', 'Compliance', 'Scaling'],
      icon: LightBulbIcon
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Detailed Guides & Tutorials
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Comprehensive guides and tutorials to help you master XeroGap AI.
          </p>
        </div>

        {/* Featured Guides */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.filter(guide => guide.featured).map((guide, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {guide.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                        {guide.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{guide.category}</span>
                      <span>{guide.duration}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  Start Guide
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* All Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Guides List */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              All Guides & Tutorials
            </h3>
            <div className="space-y-4">
              {guides.map((guide, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {guide.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {guide.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">{guide.category}</span>
                        <span className="text-gray-500 dark:text-gray-400">{guide.duration}</span>
                        <span className={`px-2 py-1 rounded ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Tutorials */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Video Tutorials
              </h4>
              <div className="space-y-3">
                {videoTutorials.map((video, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{video.thumbnail}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                        {video.title}
                      </h5>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/help/videos"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm mt-4"
              >
                View all videos →
              </a>
            </div>

            {/* Learning Paths */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Learning Paths
              </h4>
              <div className="space-y-3">
                {learningPaths.map((path, index) => {
                  const IconComponent = path.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <IconComponent className="w-8 h-8 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                          {path.title}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300 text-xs mb-1">
                          {path.description}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{path.courses} courses</span>
                          <span>•</span>
                          <span>{path.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Master XeroGap AI?
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Our comprehensive guides and tutorials will help you unlock the full potential of AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse Documentation
              </a>
              <a
                href="/academy"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Join Learning Academy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
