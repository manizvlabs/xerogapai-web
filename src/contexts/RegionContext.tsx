'use client';

import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type Region = 'global' | 'india';

interface RegionContextType {
  currentRegion: Region;
  setRegion: (region: Region) => void;
  autoDetected: boolean;
  isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<Region>('global');
  const [autoDetected, setAutoDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has manually set a region preference
    const savedRegion = localStorage.getItem('userRegion') as Region;
    if (savedRegion && (savedRegion === 'global' || savedRegion === 'india')) {
      setCurrentRegion(savedRegion);
      setAutoDetected(false);
    } else {
      // Default to global region immediately
      setCurrentRegion('global');
      setAutoDetected(false);
    }

    // Always set loading to false after a short delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Very short delay to ensure smooth transition

    return () => clearTimeout(timeout);
  }, []);

  const setRegion = (region: Region) => {
    setCurrentRegion(region);
    setAutoDetected(false);
    localStorage.setItem('userRegion', region);
  };

  return (
    <RegionContext.Provider value={{
      currentRegion,
      setRegion,
      autoDetected,
      isLoading
    }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
