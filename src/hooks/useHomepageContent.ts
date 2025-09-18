'use client';

import { useState, useEffect } from 'react';
import { contentConfig } from '@/config/content';

interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  stats: Array<{
    name: string;
    value: string;
  }>;
  services: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
}

export function useHomepageContent() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      // Try to fetch from API first
      const response = await fetch('/api/content?section=homepage');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.content) {
          setContent(data.content);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log('API not available, using default content:', error);
    }

    // Fallback to default content
    setContent(contentConfig.homepage as unknown as HomepageContent);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();

            // Listen for storage events to detect content updates
            const handleStorageChange = (e: StorageEvent) => {
              if (e.key === 'content-updated') {
                fetchContent();
              }
            };

            // Listen for custom events for content updates
            const handleContentUpdate = () => {
              fetchContent();
            };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  return { content, loading, refetch: fetchContent };
}
