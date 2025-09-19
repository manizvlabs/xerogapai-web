'use client';

import { useState } from 'react';
import { MapPinIcon, CurrencyDollarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CareerOpenings() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = [
    'All',
    'Engineering',
    'Product',
    'Sales',
    'Marketing',
    'Operations',
    'Design'
  ];

  const jobOpenings = [
    {
      id: 'senior-ai-engineer',
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹25-35LPA',
      posted: '2 days ago',
      urgent: true,
      description: 'Lead development of cutting-edge AI models and machine learning solutions for enterprise clients.',
      requirements: [
        '5+ years of AI/ML experience',
        'Python, TensorFlow, PyTorch expertise',
        'Experience with large-scale ML systems',
        'PhD in CS/AI preferred'
      ],
      benefits: [
        'Stock options',
        'Learning budget',
        'Flexible hours',
        'Health insurance'
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager - AI Solutions',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹20-30LPA',
      posted: '1 week ago',
      urgent: false,
      description: 'Drive product strategy and roadmap for our AI-powered business automation platform.',
      requirements: [
        '3+ years of product management experience',
        'Technical background in AI/ML',
        'Experience with B2B SaaS products',
        'Strong analytical skills'
      ],
      benefits: [
        'Stock options',
        'Conference budget',
        'Remote work',
        'Health benefits'
      ]
    },
    {
      id: 'frontend-developer',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹18-25LPA',
      posted: '3 days ago',
      urgent: false,
      description: 'Build beautiful, responsive user interfaces for our AI-powered platform using modern web technologies.',
      requirements: [
        '4+ years of frontend development',
        'React, TypeScript, Next.js expertise',
        'Experience with design systems',
        'Strong UI/UX understanding'
      ],
      benefits: [
        'Stock options',
        'Latest tech stack',
        'Flexible hours',
        'Learning stipend'
      ]
    },
    {
      id: 'sales-engineer',
      title: 'Sales Engineer - Enterprise',
      department: 'Sales',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹15-22LPA + Commission',
      posted: '5 days ago',
      urgent: true,
      description: 'Technical sales role focused on enterprise clients. Combine technical expertise with sales skills.',
      requirements: [
        '3+ years of technical sales experience',
        'Strong technical background',
        'Experience with enterprise sales cycles',
        'Excellent communication skills'
      ],
      benefits: [
        'Uncapped commission',
        'Stock options',
        'Travel opportunities',
        'Professional development'
      ]
    },
    {
      id: 'ux-designer',
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹12-18LPA',
      posted: '1 week ago',
      urgent: false,
      description: 'Design intuitive user experiences for our AI platform, focusing on usability and user satisfaction.',
      requirements: [
        '3+ years of UX/UI design experience',
        'Proficiency in Figma/Sketch',
        'Experience with design systems',
        'Portfolio showcasing AI/ML products'
      ],
      benefits: [
        'Stock options',
        'Design tools budget',
        'Flexible hours',
        'Creative freedom'
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹22-30LPA',
      posted: '4 days ago',
      urgent: false,
      description: 'Develop and deploy machine learning models to solve complex business problems.',
      requirements: [
        '3+ years of data science experience',
        'Python, R, SQL expertise',
        'Experience with ML frameworks',
        'Strong statistical background'
      ],
      benefits: [
        'Stock options',
        'Research budget',
        'Conference attendance',
        'Publication opportunities'
      ]
    },
    {
      id: 'marketing-specialist',
      title: 'Growth Marketing Specialist',
      department: 'Marketing',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹10-15LPA',
      posted: '6 days ago',
      urgent: false,
      description: 'Drive user acquisition and engagement through data-driven marketing campaigns.',
      requirements: [
        '2+ years of marketing experience',
        'Experience with SaaS marketing',
        'Strong analytical skills',
        'Content creation experience'
      ],
      benefits: [
        'Stock options',
        'Marketing tools budget',
        'Flexible hours',
        'Professional growth'
      ]
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹20-28LPA',
      posted: '1 week ago',
      urgent: false,
      description: 'Build and maintain our cloud infrastructure and CI/CD pipelines for scalable AI applications.',
      requirements: [
        '4+ years of DevOps experience',
        'AWS/Azure/GCP expertise',
        'Kubernetes and Docker',
        'Infrastructure as Code'
      ],
      benefits: [
        'Stock options',
        'Cloud certifications',
        'Latest tools',
        'Flexible hours'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'All'
    ? jobOpenings
    : jobOpenings.filter(job => job.department === selectedDepartment);

  return (
    <section id="openings" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Open Positions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Join our growing team of innovators and help shape the future of AI-powered business automation.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {departments.map((department) => (
            <button
              key={department}
              onClick={() => setSelectedDepartment(department)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDepartment === department
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {department}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mr-3">
                      {job.title}
                    </h3>
                    {job.urgent && (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {job.description}
              </p>

              {/* Requirements Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Key Requirements:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {job.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                      {req}
                    </li>
                  ))}
                  {job.requirements.length > 2 && (
                    <li className="text-purple-600 dark:text-purple-400 font-medium">
                      +{job.requirements.length - 2} more requirements
                    </li>
                  )}
                </ul>
              </div>

              {/* Benefits Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Benefits:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {job.type}
                </span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center">
                  Apply Now
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No positions found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We don't have any open positions in {selectedDepartment} right now.
            </p>
            <button
              onClick={() => setSelectedDepartment('All')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Positions
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Don't See Your Perfect Role?
            </h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Send General Application
              </button>
              <a
                href="#apply"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Learn About Our Hiring Process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
