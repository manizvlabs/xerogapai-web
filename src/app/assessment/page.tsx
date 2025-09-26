'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import AssessmentQuiz from '@/components/assessment/AssessmentQuiz';
import AssessmentResults from '@/components/assessment/AssessmentResults';
import AssessmentHero from '@/components/assessment/AssessmentHero';
import AssessmentCTA from '@/components/assessment/AssessmentCTA';

type AssessmentStep = 'intro' | 'quiz' | 'results' | 'consultation';

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [assessmentData, setAssessmentData] = useState<Linkny>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  // Progress calculation based on current step
  const getProgress = () => {
    switch (currentStep) {
      case 'intro': return 0;
      case 'quiz': return 25;
      case 'results': return 75;
      case 'consultation': return 100;
      default: return 0;
    }
  };

  const handleStartAssessment = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (data: {
    score: number;
    totalScore: number;
    maxScore: number;
    answers: Record<number, unknown>;
    insights: unknown[];
  }) => {
    setAssessmentData(data);
    setCurrentStep('results');
  };

  const handleResultsComplete = (email: string) => {
    setUserEmail(email);
    setCurrentStep('consultation');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setAssessmentData(null);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Progress Bar */}
      {currentStep !== 'intro' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                AI Readiness Assessment
              </span>
              <span className="text-sm text-gray-500 dark:text-white">
                Step {currentStep === 'quiz' ? '2' : currentStep === 'results' ? '3' : '4'} of 4
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${currentStep !== 'intro' ? 'pt-20' : ''}`}>
        {currentStep === 'intro' && (
          <AssessmentHero onStart={handleStartAssessment} />
        )}

        {currentStep === 'quiz' && (
          <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
            {/* Logo Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" aria-hidden="true">
              <div className="absolute top-12 right-12 transform rotate-6">
                <Logo variant="hero" size="sm" className="w-20 h-auto" />
              </div>
              <div className="absolute bottom-12 left-12 transform -rotate-6">
                <Logo variant="hero" size="sm" className="w-20 h-auto" />
              </div>
            </div>
            <AssessmentQuiz onComplete={handleQuizComplete} />
          </section>
        )}

        {currentStep === 'results' && assessmentData && (
          <section className="relative py-24 sm:py-32 bg-white dark:bg-gray-900">
            {/* Logo Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" aria-hidden="true">
              <div className="absolute top-16 left-1/4 transform -translate-x-1/2 -rotate-12">
                <Logo variant="hero" size="sm" className="w-16 h-auto" />
              </div>
              <div className="absolute bottom-16 right-1/4 transform translate-x-1/2 rotate-12">
                <Logo variant="hero" size="sm" className="w-16 h-auto" />
              </div>
            </div>
            <AssessmentResults
              data={assessmentData}
              onComplete={handleResultsComplete}
              onRestart={handleRestart}
            />
          </section>
        )}

        {currentStep === 'consultation' && assessmentData && (
          <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
            {/* Logo Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                <Logo variant="hero" size="sm" className="w-16 h-auto" />
              </div>
            </div>
            <AssessmentCTA
              assessmentData={assessmentData}
              userEmail={userEmail}
              onRestart={handleRestart}
            />
          </section>
        )}
      </div>

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
