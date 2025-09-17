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
    title: string;
    description: string;
    icon: string;
  }>;
}

export function useHomepageContent() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch('/api/admin/content?section=homepage');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.content) {
            console.log('Loaded content from API:', data.content);
            setContent(data.content);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log('API not available, using default content:', error);
      }
      
      // Fallback to default content
      console.log('Using default content from config');
      setContent(contentConfig.homepage as HomepageContent);
      setLoading(false);
    };

    fetchContent();
  }, []);

  return { content, loading };
}
