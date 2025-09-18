'use client';

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
    // Auto-detect user location
    const detectLocation = async () => {
      try {
        // Using a free IP geolocation service
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code === 'IN') {
          setCurrentRegion('india');
          setAutoDetected(true);
        } else {
          setCurrentRegion('global');
          setAutoDetected(true);
        }
      } catch (error) {
        console.log('Auto-detection failed, using default');
        // Default to global if auto-detection fails
        setCurrentRegion('global');
        setAutoDetected(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if user has manually set a region preference
    const savedRegion = localStorage.getItem('userRegion') as Region;
    if (savedRegion && (savedRegion === 'global' || savedRegion === 'india')) {
      setCurrentRegion(savedRegion);
      setAutoDetected(false);
      setIsLoading(false);
    } else {
      detectLocation();
    }
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
