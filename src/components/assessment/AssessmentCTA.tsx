'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, CalendarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface AssessmentData {
  score?: number;
  recommendations?: string[];
  category?: string;
  priority?: string;
  timeline?: string;
}

interface AssessmentCTAProps {
  assessmentData: AssessmentData;
  userEmail: string;
  onRestart: () => void;
}

export default function AssessmentCTA({ assessmentData, userEmail, onRestart }: AssessmentCTAProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleSendReport = async () => {
    setIsSendingReport(true);
    setReportError(null);

    try {
      const response = await fetch('/api/assessment/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentData,
          userEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setReportSent(true);
      } else {
        setReportError(result.details || 'Failed to send report');
      }
    } catch (error) {
      console.error('Error sending report:', error);
      setReportError('Network error. Please try again.');
    } finally {
      setIsSendingReport(false);
    }
  };

  const handleBookConsultation = async () => {
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    // In a real app, this would redirect to Calendly or a booking system
    window.location.href = '/consultation';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-600 px-6 py-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
          {reportSent ? (
            <p className="text-green-100">Your detailed report has been sent to {userEmail}</p>
          ) : (
            <p className="text-green-100">Ready to send your detailed report to {userEmail}</p>
          )}
        </div>

        {/* Next Steps */}
        <div className="px-6 py-8">
          {/* Send Report Section */}
          {!reportSent && (
            <div className="text-center mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Get Your Detailed Report
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Receive a comprehensive AI readiness report with personalized recommendations and implementation roadmap.
              </p>
              <button
                onClick={handleSendReport}
                disabled={isSendingReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingReport ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Report...
                  </div>
                ) : (
                  'Send Detailed Report to My Email'
                )}
              </button>
              {reportError && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                  {reportError}
                </p>
              )}
            </div>
          )}

          {/* Success Message */}
          {reportSent && (
            <div className="text-center mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Report Sent Successfully! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Check your email for your detailed AI readiness report with personalized recommendations.
              </p>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Book a free 30-minute consultation with our AI experts to discuss your results and create a custom implementation plan.
            </p>
          </div>

          {/* Consultation Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <CalendarIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Strategy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Custom AI implementation roadmap based on your assessment results
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <PhoneIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Expert Guidance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Direct consultation with AI specialists and industry experts
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <EnvelopeIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Implementation Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ongoing support and resources for successful AI adoption
              </p>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              What to Expect in Your Consultation:
            </h3>
            <div className="space-y-3">
              {[
                "Review of your AI readiness assessment results",
                "Discussion of your specific business challenges and goals",
                "Custom AI implementation recommendations",
                "ROI projections and timeline planning",
                "Q&A session with our AI experts"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBookConsultation}
              disabled={isBooking}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBooking ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking Consultation...
                </div>
              ) : (
                'Book Free Consultation Now'
              )}
            </button>

            <Link
              href="/demo"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg text-center transition-colors"
            >
              Schedule Product Demo
            </Link>
          </div>

          {/* Alternative Actions */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Prefer to explore on your own?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/whatsapp-cx"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View WhatsApp CX Solution
              </Link>
              <Link
                href="/xerogap-ai"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Explore XeroGap AI
              </Link>
              <button
                onClick={onRestart}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Join 500+ businesses who&apos;ve transformed their operations with AI
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">30min</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Consultation</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">Free</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">No Obligations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
