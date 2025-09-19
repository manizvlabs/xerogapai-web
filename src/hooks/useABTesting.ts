'use client';

import { useMemo } from 'react';
import { abTestingService, ABTestVariant } from '@/lib/ab-testing/abTesting';

export function useABTesting(testId: string, userId?: string) {
  const variant = useMemo(() => {
    return abTestingService.getVariantForUser(testId, userId);
  }, [testId, userId]);

  const trackConversion = (variantId?: string) => {
    const variantToTrack = variantId || variant?.id;
    if (variantToTrack) {
      abTestingService.trackConversion(testId, variantToTrack, userId);
    }
  };

  const getTestResults = () => {
    return abTestingService.getTestResults(testId);
  };

  return {
    variant,
    trackConversion,
    getTestResults,
    isTestActive: variant !== null,
  };
}

export function useABTestVariant(testId: string, fallbackContent: any, userId?: string) {
  const { variant, trackConversion } = useABTesting(testId, userId);

  const content = variant?.content || fallbackContent;

  const trackCTAConversion = () => {
    trackConversion(variant?.id);
  };

  return {
    content,
    variant: variant?.id,
    trackConversion: trackCTAConversion,
  };
}
