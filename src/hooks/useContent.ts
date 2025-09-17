'use client';

import { useState, useEffect } from 'react';

interface ContentState {
  content: any;
  loading: boolean;
  error: string | null;
}

export function useContent(section?: string) {
  const [state, setState] = useState<ContentState>({
    content: null,
    loading: true,
    error: null
  });

  const fetchContent = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const url = section 
        ? `/api/admin/content?section=${encodeURIComponent(section)}`
        : '/api/admin/content';
        
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setState({
          content: section ? data.content : data.content,
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
      setState({
        content: null,
        loading: false,
        error: 'Network error'
      });
    }
  };

  const updateContent = async (section: string, content: any) => {
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
        setState(prev => ({
          ...prev,
          content: section === prev.content?.section ? data.content : prev.content,
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
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error'
      }));
      return { success: false, error: 'Network error' };
    }
  };

  useEffect(() => {
    fetchContent();
  }, [section]);

  return {
    ...state,
    refetch: fetchContent,
    updateContent
  };
}
