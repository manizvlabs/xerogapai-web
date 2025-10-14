export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // Percentage weight (0-100)
  content: Record<string, unknown>;
}

export interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  status: 'active' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
}

export interface ABTestResult {
  variantId: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
}

class ABTestingService {
  private static instance: ABTestingService;
  private tests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, Map<string, string>> = new Map(); // userId -> testId -> variantId

  private constructor() {
    this.initializeDefaultTests();
  }

  static getInstance(): ABTestingService {
    if (!ABTestingService.instance) {
      ABTestingService.instance = new ABTestingService();
    }
    return ABTestingService.instance;
  }

  private initializeDefaultTests() {
    // CTA Text A/B Test
    this.tests.set('cta_text_test', {
      id: 'cta_text_test',
      name: 'CTA Button Text Optimization',
      status: 'active',
      variants: [
        {
          id: 'variant_a',
          name: 'Get Free Assessment',
          weight: 50,
          content: {
            text: 'Get Free Assessment',
            href: '/assessment',
            variant: 'primary' as const
          }
        },
        {
          id: 'variant_b',
          name: 'Start AI Assessment',
          weight: 50,
          content: {
            text: 'Start AI Assessment',
            href: '/assessment',
            variant: 'primary' as const
          }
        }
      ]
    });

    // Hero Headline A/B Test
    this.tests.set('hero_headline_test', {
      id: 'hero_headline_test',
      name: 'Homepage Hero Headline Test',
      status: 'active',
      variants: [
        {
          id: 'variant_a',
          name: 'AI Automation Focus',
          weight: 50,
          content: {
            headline: 'Transform Your Business with AI Automation',
            subheadline: 'Intelligent AI agents that automate workflows, boost efficiency, and scale your business globally'
          }
        },
        {
          id: 'variant_b',
          name: 'Service Focus',
          weight: 50,
          content: {
            headline: 'Accelerate Your Business with AI Automation',
            subheadline: 'From AI Multi-Channel Support Copilot to AI Knowledge Management Assistant - discover which AI solutions will transform your operations'
          }
        }
      ]
    });
  }

  getVariantForUser(testId: string, userId?: string): ABTestVariant | null {
    const test = this.tests.get(testId);
    if (!test || test.status !== 'active') return null;

    // Use userId if provided, otherwise use session-based ID
    const effectiveUserId = userId || this.getSessionUserId();

    // Check if user already has a variant assigned
    const userTests = this.userVariants.get(effectiveUserId) || new Map();
    const existingVariantId = userTests.get(testId);

    if (existingVariantId) {
      return test.variants.find(v => v.id === existingVariantId) || null;
    }

    // Assign new variant based on weights
    const variant = this.selectVariantByWeight(test.variants);

    if (variant) {
      userTests.set(testId, variant.id);
      this.userVariants.set(effectiveUserId, userTests);

      // Track variant assignment
      this.trackVariantAssignment(testId, variant.id, effectiveUserId);
    }

    return variant;
  }

  private selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant | null {
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    let random = Math.random() * totalWeight;

    for (const variant of variants) {
      random -= variant.weight;
      if (random <= 0) {
        return variant;
      }
    }

    return variants[0]; // Fallback
  }

  private getSessionUserId(): string {
    if (typeof window === 'undefined') return 'server_user';

    let userId = sessionStorage.getItem('ab_test_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('ab_test_user_id', userId);
    }
    return userId;
  }

  private trackVariantAssignment(testId: string, variantId: string, userId: string) {
    // Track with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_variant_assigned', {
        event_category: 'ab_testing',
        event_label: `${testId}_${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId,
          user_id: userId
        }
      });
    }

    console.log(`A/B Test: Assigned variant ${variantId} for test ${testId} to user ${userId}`);
  }

  trackConversion(testId: string, variantId: string, userId?: string) {
    const effectiveUserId = userId || this.getSessionUserId();

    // Track conversion with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        event_category: 'ab_testing',
        event_label: `${testId}_${variantId}`,
        value: 1,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId,
          user_id: effectiveUserId
        }
      });
    }

    console.log(`A/B Test: Conversion for variant ${variantId} in test ${testId}`);
  }

  getTestResults(testId: string): ABTestResult[] {
    // In a real implementation, this would query stored A/B test results
    // For demo purposes, return mock data
    const test = this.tests.get(testId);
    if (!test) return [];

    return test.variants.map(variant => ({
      variantId: variant.id,
      impressions: Math.floor(Math.random() * 1000) + 100,
      conversions: Math.floor(Math.random() * 50) + 5,
      conversionRate: Math.random() * 10 + 2
    }));
  }

  getAllTests(): ABTest[] {
    return Array.from(this.tests.values());
  }

  createTest(test: Omit<ABTest, 'id'>): string {
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.tests.set(testId, { ...test, id: testId });
    return testId;
  }

  updateTestStatus(testId: string, status: ABTest['status']) {
    const test = this.tests.get(testId);
    if (test) {
      test.status = status;
    }
  }
}

export const abTestingService = ABTestingService.getInstance();
