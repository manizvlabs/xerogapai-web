'use client';

import { useMemo } from 'react';
import { AssessmentEngine, AssessmentResults } from '@/lib/assessment/assessmentEngine';

export function useAssessmentEngine(answers: Record<number, any>) {
  const results = useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) {
      return null;
    }
    return AssessmentEngine.calculateDetailedResults(answers);
  }, [answers]);

  const getReadinessDescription = (readinessLevel: AssessmentResults['readinessLevel']) => {
    switch (readinessLevel) {
      case 'expert':
        return {
          title: 'AI Expert',
          description: 'Your organization is exceptionally well-prepared for advanced AI implementation.',
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          status: 'Ready for Enterprise AI'
        };
      case 'advanced':
        return {
          title: 'AI Advanced',
          description: 'You have strong foundations and are ready for comprehensive AI solutions.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          status: 'Ready for Advanced AI'
        };
      case 'intermediate':
        return {
          title: 'AI Ready',
          description: 'You have good potential for AI adoption with some preparation needed.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          status: 'Good Foundation'
        };
      case 'beginner':
        return {
          title: 'Building Readiness',
          description: 'Focus on building foundational capabilities before full AI implementation.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          status: 'Foundation Building'
        };
      default:
        return {
          title: 'Unknown',
          description: 'Assessment in progress.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          status: 'Assessing'
        };
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200';
    }
  };

  const getInsightIcon = (type: 'strength' | 'opportunity' | 'risk') => {
    switch (type) {
      case 'strength':
        return '✅';
      case 'opportunity':
        return '🚀';
      case 'risk':
        return '⚠️';
      default:
        return '💡';
    }
  };

  return {
    results,
    getReadinessDescription,
    getPriorityColor,
    getInsightIcon,
  };
}
