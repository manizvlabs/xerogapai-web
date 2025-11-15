'use client';
import Link from 'next/link';

import { ArrowRightIcon, ArrowTrendingUpIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function CaseFeatured() {
  const featuredCases = [
    {
      id: 'techflow-automation',
      company: 'TechFlow Solutions',
      industry: 'Technology',
      logo: '🚀',
      challenge: 'Manual workflow inefficiencies costing 20+ hours weekly',
      solution: 'VyaptIX AI workflow automation with 25+ tool integrations',
      results: [
        { metric: 'Time Saved', value: '25 hrs/week', icon: ClockIcon },
        { metric: 'Efficiency Increase', value: '150%', icon: ArrowTrendingUpIcon },
        { metric: 'ROI', value: '350%', icon: ArrowTrendingUpIcon }
      ],
      quote: 'VyaptIX AI transformed our entire operation. We went from drowning in manual tasks to having intelligent automation that just works.',
      author: 'Sarah Mitchell',
      position: 'VP of Operations',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 'global-bank-compliance',
      company: 'Global Financial Services',
      industry: 'Finance',
      logo: '🏦',
      challenge: 'Complex DPDP compliance requirements across multiple jurisdictions',
      solution: 'Complete DPDP compliance assessment and implementation',
      results: [
        { metric: 'Compliance Rate', value: '100%', icon: ArrowTrendingUpIcon },
        { metric: 'Audit Success', value: '100%', icon: ArrowTrendingUpIcon },
        { metric: 'Penalty Risk', value: 'Eliminated', icon: ArrowTrendingUpIcon }
      ],
      quote: 'The DPDP assessment was incredibly thorough and saved us from potential penalties worth crores.',
      author: 'Rajesh Kumar',
      position: 'Chief Compliance Officer',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 'salesforce-automation',
      company: 'SalesForce Pro',
      industry: 'Sales',
      logo: '🎯',
      challenge: 'Sales team struggling with lead generation and follow-ups',
      solution: 'AI-powered sales automation with predictive lead scoring',
      results: [
        { metric: 'Lead Quality', value: '+200%', icon: ArrowTrendingUpIcon },
        { metric: 'Conversion Rate', value: '+150%', icon: UsersIcon },
        { metric: 'Sales Cycle', value: '-40%', icon: ClockIcon }
      ],
      quote: 'Our sales pipeline has never been stronger. The AI automation handles the heavy lifting so our team can focus on closing deals.',
      author: 'Michael Chen',
      position: 'Sales Director',
      readTime: '6 min read',
      featured: true
    }
  ];

  return (
    <section id="featured" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Discover how leading companies achieved extraordinary results with VyaptIX AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCases.map((caseStudy, index) => (
            <div key={caseStudy.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl mr-4">
                      {caseStudy.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {caseStudy.company}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {caseStudy.industry}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white">
                    {caseStudy.readTime}
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                    Challenge
                  </h4>
                  <p className="text-gray-600 dark:text-white text-sm">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                    Solution
                  </h4>
                  <p className="text-gray-600 dark:text-white text-sm">
                    {caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                    Key Results
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {caseStudy.results.map((result, resultIndex) => {
                      const IconComponent = result.icon;
                      return (
                        <div key={resultIndex} className="text-center">
                          <IconComponent className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-white">
                            {result.metric}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="px-8 pb-6">
                <blockquote className="text-gray-700 dark:text-white italic text-sm leading-relaxed">
                  "{caseStudy.quote}"
                </blockquote>
                <div className="mt-3">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {caseStudy.author}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white">
                    {caseStudy.position}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <Link
                  href={`/case-studies/${caseStudy.id}`}
                  className="group/btn w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Read Full Case Study
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want Similar Results?
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              See how VyaptIX AI can transform your business with a free consultation and custom solution assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Free Consultation
              </Link>
              <Link
                href="#all-studies"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
