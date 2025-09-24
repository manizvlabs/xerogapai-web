// RegionSwitcher.tsx - Header Component with Geographic Switcher
// Place this in your components folder

'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRegion } from '@/contexts/RegionContext';

interface RegionSwitcherProps {
  // Optional override props for testing
  currentRegion?: 'global' | 'india';
  onRegionChange?: (region: 'global' | 'india') => void;
}

export default function RegionSwitcher({ currentRegion: propCurrentRegion, onRegionChange: propOnRegionChange }: RegionSwitcherProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoDetected, setAutoDetected] = useState<string | null>(null);

  // Use context if no props provided
  const context = useRegion();
  const currentRegion = propCurrentRegion || context.currentRegion;
  const onRegionChange = propOnRegionChange || context.setRegion;

  // Auto-detect user location on component mount (disabled to prevent console errors)
  useEffect(() => {
    // Disable auto-detection to prevent CORS and network errors
    // Users can manually select their region instead
    if (!autoDetected) {
      setAutoDetected('Global');
      if (currentRegion !== 'global') {
        onRegionChange('global');
      }
    }
  }, [currentRegion, onRegionChange, autoDetected]);

  const regions = [
    {
      id: 'global' as const,
      name: 'Global',
      flag: '🌍',
      currency: 'USD',
      description: 'Middle East, Africa, US'
    },
    {
      id: 'india' as const,
      name: 'India',
      flag: '🇮🇳',
      currency: 'INR',
      description: 'India-specific services'
    }
  ];

  const currentRegionData = regions.find(r => r.id === currentRegion);

  return (
    <div className="relative">
      {/* Region Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        style={{ minWidth: '100px', width: '100px' }}
      >
        <span>{currentRegionData?.flag}</span>
        <span className="hidden md:inline">{currentRegionData?.name}</span>
        <span className="md:hidden">Region</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
            <div className="p-3 border-b border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium dark:text-white">
                Choose Your Region
              </p>
              {autoDetected && (
                <p className="text-xs text-gray-400 mt-1 dark:text-white">
                  Auto-detected: {autoDetected}
                </p>
              )}
            </div>

            <div className="py-1">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => {
                    onRegionChange(region.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 dark:hover:bg-gray-700 ${
                    currentRegion === region.id ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400' : 'text-gray-700 dark:text-gray-100'
                  }`}
                >
                  <span className="text-lg">{region.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{region.name}</span>
                      {currentRegion === region.id && (
                        <div className="w-2 h-2 bg-green-600 rounded-full dark:bg-green-400"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-white">{region.description}</p>
                    <p className="text-xs text-gray-400 dark:text-white">{region.currency} pricing</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
              <p className="text-xs text-gray-500 dark:text-white">
                💡 Content and pricing will update automatically
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

