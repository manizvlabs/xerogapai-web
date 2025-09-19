'use client';

import { useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function CaseFilters() {
  const [activeFilters, setActiveFilters] = useState({
    industry: '',
    solution: '',
    companySize: '',
    search: ''
  });

  const filters = {
    industry: [
      'All Industries', 'Technology', 'Healthcare', 'Finance', 'Manufacturing',
      'Retail', 'Consulting', 'Education', 'Real Estate', 'Non-Profit'
    ],
    solution: [
      'All Solutions', 'XeroGap AI', 'Enterprise Copilots', 'Sales Automation',
      'Contact Center QA', 'DPDP Compliance', 'Workflow Automation', 'AI Integration'
    ],
    companySize: [
      'All Sizes', 'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)',
      'Large (1000+)', 'Enterprise (5000+)'
    ]
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value === 'All' + filterType.charAt(0).toUpperCase() + filterType.slice(1) ? '' : value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      industry: '',
      solution: '',
      companySize: '',
      search: ''
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(value => value !== '').length;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={activeFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Industry Filter */}
            <div className="relative">
              <select
                value={activeFilters.industry || 'All Industries'}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filters.industry.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Solution Filter */}
            <div className="relative">
              <select
                value={activeFilters.solution || 'All Solutions'}
                onChange={(e) => handleFilterChange('solution', e.target.value)}
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filters.solution.map((solution) => (
                  <option key={solution} value={solution}>
                    {solution}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Company Size Filter */}
            <div className="relative">
              <select
                value={activeFilters.companySize || 'All Sizes'}
                onChange={(e) => handleFilterChange('companySize', e.target.value)}
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filters.companySize.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active filters:</span>
            {Object.entries(activeFilters).map(([key, value]) => {
              if (value) {
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  >
                    {key === 'companySize' ? 'Company Size' :
                     key === 'search' ? 'Search' :
                     key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">24 case studies</span>
            {activeFilterCount > 0 && (
              <span> matching your filters</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
