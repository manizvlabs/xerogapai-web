'use client';

import { useState, useEffect, useCallback } from 'react';

interface ContentState {
  content: Record<string, unknown> | null;
  loading: boolean;
  error: string | null;
}

export function useContent(section?: string) {
  const [state, setState] = useState<ContentState>({
    content: null,
    loading: true,
    error: null
  });

  const fetchContent = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const url = section
        ? `/api/content?section=${encodeURIComponent(section)}`
        : '/api/content';

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setState({
          content: data.content,
          loading: false,
          error: null
        });
      } else {
        setState({
          content: null,
          loading: false,
          error: data.error || 'Failed to fetch content'
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setState({
        content: null,
        loading: false,
        error: 'Network error'
      });
    }
  }, [section]);

  const updateContent = async (section: string, content: Record<string, unknown>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, content }),
      });

      const data = await response.json();

      if (data.success) {
        // For the general useContent hook, we need to handle different sections
        // If this hook is used for a specific section, update it
        // If it's used for all content, update the specific section
        setState(prev => ({
          ...prev,
          content: data.section ? { ...prev.content, [data.section]: data.content } : data.content,
          loading: false,
          error: null
        }));
        return { success: true, data };
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: data.error || 'Failed to update content'
        }));
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error'
      }));
      return { success: false, error: 'Network error' };
    }
  };

  useEffect(() => {
    // Add a shorter delay to ensure client-side hydration is complete
    // Reduced from 500ms to 100ms to improve test performance
    const timer = setTimeout(() => {
      fetchContent();
    }, 100);

    return () => clearTimeout(timer);
  }, [fetchContent]);

  return {
    ...state,
    refetch: fetchContent,
    updateContent
  };
}
