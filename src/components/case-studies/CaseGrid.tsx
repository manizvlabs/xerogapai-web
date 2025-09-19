'use client';
import Link from 'next/link';

import { useState } from 'react';
import { ArrowRightIcon, CalendarIcon, UsersIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function CaseGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 9;

  const caseStudies = [
    {
      id: 'startup-automation',
      title: 'How a Startup Saved 20 Hours Weekly with AI Automation',
      company: 'InnovateLabs',
      industry: 'Technology',
      solution: 'XeroGap AI',
      companySize: 'Startup (1-50)',
      metrics: { efficiency: '+150%', timeSaved: '20 hrs/week', roi: '300%' },
      readTime: '4 min read',
      date: '2024-01-15',
      featured: false
    },
    {
      id: 'healthcare-compliance',
      title: 'Healthcare Provider Achieves 100% DPDP Compliance',
      company: 'MedCare Solutions',
      industry: 'Healthcare',
      solution: 'DPDP Compliance',
      companySize: 'Medium (201-1000)',
      metrics: { compliance: '100%', audits: '100%', risk: 'Eliminated' },
      readTime: '6 min read',
      date: '2024-01-10',
      featured: false
    },
    {
      id: 'sales-transformation',
      title: 'Sales Team Triples Pipeline with AI Automation',
      company: 'SalesForce Pro',
      industry: 'Sales',
      solution: 'Sales Automation',
      companySize: 'Small (51-200)',
      metrics: { leads: '+200%', conversion: '+150%', cycle: '-40%' },
      readTime: '5 min read',
      date: '2024-01-08',
      featured: false
    },
    {
      id: 'contact-center-excellence',
      title: 'Contact Center Improves QA Scores by 95%',
      company: 'SupportPlus',
      industry: 'Customer Service',
      solution: 'Contact Center QA',
      companySize: 'Medium (201-1000)',
      metrics: { qaScore: '95%', performance: '+40%', satisfaction: '+25%' },
      readTime: '7 min read',
      date: '2024-01-05',
      featured: false
    },
    {
      id: 'enterprise-knowledge',
      title: 'Enterprise Deploys Multi-Lingual AI Knowledge Base',
      company: 'GlobalTech Corp',
      industry: 'Technology',
      solution: 'Enterprise Copilots',
      companySize: 'Enterprise (5000+)',
      metrics: { languages: '20+', queries: '10M+', accuracy: '95%' },
      readTime: '8 min read',
      date: '2024-01-03',
      featured: false
    },
    {
      id: 'finance-compliance',
      title: 'Financial Services Firm Achieves Regulatory Compliance',
      company: 'SecureFinance',
      industry: 'Finance',
      solution: 'DPDP Compliance',
      companySize: 'Large (1000+)',
      metrics: { compliance: '100%', audits: '100%', fines: '₹0' },
      readTime: '6 min read',
      date: '2023-12-28',
      featured: false
    },
    {
      id: 'manufacturing-efficiency',
      title: 'Manufacturing Company Streamlines Operations',
      company: 'IndustrioMax',
      industry: 'Manufacturing',
      solution: 'XeroGap AI',
      companySize: 'Medium (201-1000)',
      metrics: { efficiency: '+120%', costs: '-30%', productivity: '+80%' },
      readTime: '5 min read',
      date: '2023-12-25',
      featured: false
    },
    {
      id: 'retail-automation',
      title: 'Retail Chain Automates Customer Service Workflows',
      company: 'RetailFlow',
      industry: 'Retail',
      solution: 'Contact Center QA',
      companySize: 'Large (1000+)',
      metrics: { satisfaction: '+35%', resolution: '+45%', efficiency: '+60%' },
      readTime: '6 min read',
      date: '2023-12-20',
      featured: false
    },
    {
      id: 'education-transformation',
      title: 'Educational Institution Modernizes Administration',
      company: 'EduTech Solutions',
      industry: 'Education',
      solution: 'XeroGap AI',
      companySize: 'Medium (201-1000)',
      metrics: { efficiency: '+90%', costs: '-40%', satisfaction: '+50%' },
      readTime: '4 min read',
      date: '2023-12-18',
      featured: false
    },
    {
      id: 'consulting-automation',
      title: 'Consulting Firm Automates Client Deliverables',
      company: 'StratEdge Consulting',
      industry: 'Consulting',
      solution: 'Sales Automation',
      companySize: 'Small (51-200)',
      metrics: { delivery: '+70%', clientSatisfaction: '+40%', revenue: '+25%' },
      readTime: '5 min read',
      date: '2023-12-15',
      featured: false
    },
    {
      id: 'nonprofit-efficiency',
      title: 'Non-Profit Organization Optimizes Operations',
      company: 'ImpactFirst',
      industry: 'Non-Profit',
      solution: 'XeroGap AI',
      companySize: 'Small (51-200)',
      metrics: { efficiency: '+200%', costs: '-50%', impact: '+150%' },
      readTime: '4 min read',
      date: '2023-12-12',
      featured: false
    },
    {
      id: 'real-estate-automation',
      title: 'Real Estate Agency Automates Lead Management',
      company: 'PropertyPro',
      industry: 'Real Estate',
      solution: 'Sales Automation',
      companySize: 'Small (51-200)',
      metrics: { leads: '+180%', conversion: '+120%', timeSaved: '15 hrs/week' },
      readTime: '5 min read',
      date: '2023-12-10',
      featured: false
    }
  ];

  const totalPages = Math.ceil(caseStudies.length / studiesPerPage);
  const startIndex = (currentPage - 1) * studiesPerPage;
  const endIndex = startIndex + studiesPerPage;
  const currentStudies = caseStudies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="all-studies" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            All Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse through our complete collection of customer success stories across industries and solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentStudies.map((study, index) => (
            <div key={study.id} className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                      {study.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {study.company}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {study.industry} • {study.companySize}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {study.readTime}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {study.title}
                </h4>

                {/* Solution Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {study.solution}
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Results
                  </h5>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(study.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {new Date(study.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link
                  href={`/case-studies/${study.id}`}
                  className="group/btn w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Read Case Study
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? 'text-white bg-blue-600 border-blue-600'
                    : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex + 1}-{Math.min(endIndex, caseStudies.length)}
            </span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {caseStudies.length}
            </span> case studies
          </p>
        </div>
      </div>
    </section>
  );
}
