'use client';

import { useState } from 'react';
import { emailService, LeadData } from '@/lib/email/emailService';

export function useEmailCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const captureLead = async (leadData: LeadData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await emailService.captureLead(leadData);

      if (result.success) {
        setSuccess(true);
        return { success: true, leadId: result.leadId };
      } else {
        setError(result.error || 'Failed to capture lead');
        return { success: false, error: result.error };
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
