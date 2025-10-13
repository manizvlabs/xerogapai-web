'use client';

import { useState } from 'react';
import { LeadData } from '@/lib/email/emailService';

export function useEmailCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const captureLead = async (leadData: LeadData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        return { success: true, leadId: result.leadId };
      } else {
        const errorMessage = result.error || 'Failed to capture lead';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  };

  return {
    captureLead,
    isSubmitting,
    error,
    success,
    reset,
  };
}
