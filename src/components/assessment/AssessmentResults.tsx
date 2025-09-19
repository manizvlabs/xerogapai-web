'use client';
import Link from 'next/link';

import { useState } from 'react';
import { CheckCircleIcon, ArrowPathIcon, EnvelopeIcon, ChartBarIcon, LightBulbIcon, ExclamationTriangleIcon, RocketLaunchIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useAssessmentEngine } from '@/hooks/useAssessmentEngine';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { AssessmentResults as AssessmentResultsType } from '@/lib/assessment/assessmentEngine';

interface AssessmentResultsProps {
  data: {
    score: number;
    totalScore: number;
    maxScore: number;
    answers: Record<number, unknown>;
    insights: unknown[];
  };
  onComplete: (email: string) => void;
  onRestart: () => void;
}

export default function AssessmentResults({ data, onComplete, onRestart }: AssessmentResultsProps) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Use the enhanced assessment engine
  const { results: detailedResults, getReadinessDescription, getPriorityColor, getInsightIcon } = useAssessmentEngine(data.answers);

  // Use email capture hook
  const { captureLead, isSubmitting, error, success } = useEmailCapture();

  // Fallback to basic results if detailed results aren't available
  const results = detailedResults || {
    overallScore: data.score,
    readinessLevel: 'intermediate' as const,
    categoryScores: {
      technicalReadiness: Math.round(data.score * 0.8),
      businessReadiness: data.score,
      budgetReadiness: Math.round(data.score * 0.9),
      timelineReadiness: Math.round(data.score * 0.85)
    },
    recommendedServices: [],
    actionPlan: [],
    insights: []
  };

  const readinessInfo = getReadinessDescription(results.readinessLevel);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return {
        title: "You're AI-Ready!",
        description: "Your business is well-positioned for AI implementation. Focus on quick wins and scaling.",
        actions: [
          "Start with pilot projects in customer service",
          "Implement workflow automation tools",
          "Train team on AI best practices",
          "Set up governance and monitoring"
        ]
      };
    } else if (score >= 60) {
      return {
        title: "Good Foundation",
        description: "You have a solid base for AI adoption. Address key gaps to accelerate implementation.",
        actions: [
          "Assess current digital infrastructure",
          "Identify high-impact automation opportunities",
          "Build AI skills within your team",
          "Start with vendor evaluation and selection"
        ]
      };
    } else {
      return {
        title: "Building Readiness",
        description: "Focus on foundational improvements before full AI implementation.",
        actions: [
          "Digitize core business processes",
          "Implement basic automation tools",
          "Build data management capabilities",
          "Start with AI awareness training"
        ]
      };
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    const result = await captureLead({
      email,
      source: 'assessment',
      customFields: {
        assessmentScore: results.overallScore,
        readinessLevel: results.readinessLevel,
        categoryScores: results.categoryScores,
        recommendedServices: results.recommendedServices?.map(s => s.service),
        answers: data.answers
      }
    });

    if (result.success) {
      onComplete(email);
    }
  };

  const recommendations = getRecommendations(data.score);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Your AI Readiness Results</h1>
          <p className="text-blue-100">Assessment completed successfully!</p>
        </div>

          {/* Score Display */}
        <div className="px-6 py-8">
          <div className={`rounded-2xl p-8 text-center ${readinessInfo.bgColor}`}>
            <div className="relative mb-6">
              {/* Circular Progress */}
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-gray-600"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${results.overallScore}, 100`}
                    className={readinessInfo.color}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${readinessInfo.color}`}>
                      {results.overallScore}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {readinessInfo.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className={`text-2xl font-bold mb-2 ${readinessInfo.color}`}>
              {readinessInfo.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {readinessInfo.description}
            </p>

            {/* Category Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{results.categoryScores.technicalReadiness}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Technical</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{results.categoryScores.businessReadiness}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Business</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{results.categoryScores.budgetReadiness}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Budget</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{results.categoryScores.timelineReadiness}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Timeline</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {recommendations.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {recommendations.description}
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Recommended Next Steps:
              </h4>
              <ul className="space-y-3">
                {recommendations.actions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Services */}
          {results.recommendedServices && results.recommendedServices.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Recommended AI Solutions
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {results.recommendedServices.map((service, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${getPriorityColor(service.priority)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{service.service}</h4>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        service.priority === 'high' ? 'bg-red-100 text-red-800' :
                        service.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {service.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{service.reasoning}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">ROI: </span>
                        <span className="text-green-600">{service.estimatedROI}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Time: </span>
                        <span className="text-blue-600">{service.implementationTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Plan */}
          {results.actionPlan && results.actionPlan.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Your AI Implementation Roadmap
              </h3>
              <div className="space-y-6">
                {results.actionPlan.map((phase, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{phase.phase}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {phase.timeframe}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <RocketLaunchIcon className="w-4 h-4 mr-2 text-blue-600" />
                          Key Actions
                        </h5>
                        <ul className="space-y-1">
                          {phase.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <CheckCircleIcon className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <ChartBarIcon className="w-4 h-4 mr-2 text-purple-600" />
                          Success Metrics
                        </h5>
                        <ul className="space-y-1">
                          {phase.successMetrics.map((metric, metricIndex) => (
                            <li key={metricIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {results.insights && results.insights.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Key Insights & Recommendations
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {results.insights.map((insight, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{getInsightIcon(insight.type)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{insight.description}</p>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Capture Form */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start mb-4">
              <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Get Your Detailed Report
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Receive a comprehensive PDF report with detailed analysis, implementation roadmap, and ROI projections.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">✓ Report sent successfully! Check your email.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!isEmailValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isEmailValid && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Report...
                  </div>
                ) : (
                  'Send Me the Detailed Report'
                )}
              </button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRestart}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Retake Assessment
            </button>
            <Link
              href="/consultation"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
