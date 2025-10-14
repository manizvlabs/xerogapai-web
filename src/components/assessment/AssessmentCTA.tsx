'use client';

import { useState, useEffect } from 'react';
import { CheckCircleIcon, CalendarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import CalendarBooking from '@/components/shared/CalendarBooking';

interface AssessmentData {
  score: number;
  totalScore: number;
  maxScore: number;
  answers: Record<number, unknown>;
  insights: unknown[];
}

interface AssessmentCTAProps {
  assessmentData: AssessmentData;
  userEmail: string;
  onRestart: () => void;
}

export default function AssessmentCTA({ assessmentData, userEmail, onRestart }: Readonly<AssessmentCTAProps>) {
  const [showCalendarBooking, setShowCalendarBooking] = useState(false);
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [isSendingReport, setIsSendingReport] = useState(false);

  // Auto-send report when component mounts
  useEffect(() => {
    const sendReport = async () => {
      setIsSendingReport(true);
      try {
        // Format answers from Record<number, unknown> to Record<string, any>
        const formattedAnswers: Record<string, any> = {};
        Object.entries(assessmentData.answers).forEach(([key, value]) => {
          formattedAnswers[`q${key}`] = value;
        });

        const formattedAssessmentData = {
          score: assessmentData.score,
          totalScore: assessmentData.totalScore,
          maxScore: assessmentData.maxScore,
          answers: formattedAnswers,
          insights: assessmentData.insights
        };

        const response = await fetch('/api/assessment/send-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assessmentData: formattedAssessmentData,
            userEmail,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setReportSent(true);
        }
      } catch (error) {
        console.error('Error sending report:', error);
        // Continue with the flow even if report sending fails
      } finally {
        setIsSendingReport(false);
      }
    };

    sendReport();
  }, [assessmentData, userEmail]);

  const handleBookConsultation = () => {
    setShowCalendarBooking(true);
  };

  const handleConsultationBookingComplete = (bookingData: any) => {
    setConsultationBooked(true);
    setShowCalendarBooking(false);
  };

  const handleBackFromCalendar = () => {
    setShowCalendarBooking(false);
  };

  // Show calendar booking if requested
  if (showCalendarBooking) {
    return (
      <CalendarBooking
        bookingType="consultation"
        onBookingComplete={handleConsultationBookingComplete}
        onBack={handleBackFromCalendar}
        initialData={{
          email: userEmail,
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-600 px-6 py-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
          {(() => {
            if (isSendingReport) return <p className="text-cyan-100">Sending your detailed report...</p>;
            if (reportSent) return <p className="text-cyan-100">Your detailed report has been sent to {userEmail}</p>;
            return <p className="text-cyan-100">Preparing your personalized AI readiness report...</p>;
          })()}
        </div>

        {/* Next Steps */}
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Free AI Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a 30-minute call with our AI experts to review your personalized results and get a custom implementation roadmap. Completely free, no obligation.
            </p>
          </div>

          {/* Consultation Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CalendarIcon className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Strategy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Custom AI implementation roadmap based on your assessment results
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <PhoneIcon className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Expert Guidance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Direct consultation with AI specialists and industry experts
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <EnvelopeIcon className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Implementation Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ongoing support and resources for successful AI adoption
              </p>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-black dark:text-black mb-4">
              What to Expect in Your Consultation:
            </h3>
            <div className="space-y-3">
              {[
                "Review of your AI readiness assessment results",
                "Discussion of your specific business challenges and goals",
                "Custom AI implementation recommendations",
                "ROI projections and timeline planning",
                "Q&A session with our AI experts"
              ].map((item) => (
                <div key={item} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-cyan-600 mr-3 flex-shrink-0" />
                  <span className="text-black dark:text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            {consultationBooked ? (
              <div className="bg-cyan-50 dark:bg-cyan-900/20 border-2 border-cyan-500 text-cyan-800 dark:text-cyan-300 px-8 py-8 rounded-lg">
                <CheckCircleIcon className="h-10 w-10 inline mb-4 text-cyan-600" />
                <h3 className="text-2xl font-bold mb-2 text-black dark:text-black">Consultation Booked Successfully!</h3>
                <p className="text-lg font-medium text-black dark:text-black">Check your email for confirmation details and join instructions.</p>
              </div>
            ) : (
              <button
                onClick={handleBookConsultation}
                className="bg-green-600 hover:bg-green-700 text-white px-16 py-5 rounded-lg font-bold text-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📅 Book Your Free Consultation
              </button>
            )}
          </div>

          {/* Retake Option - Small and subtle */}
          <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              onClick={onRestart}
              className="text-gray-500 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400 font-medium transition-colors text-sm"
            >
              ← Take Assessment Again
            </button>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-white mb-4">
                Join 500+ businesses who&apos;ve transformed their operations with AI
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">30min</div>
                  <div className="text-xs text-gray-500 dark:text-white">Consultation</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">Free</div>
                  <div className="text-xs text-gray-500 dark:text-white">No Obligations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">100%</div>
                  <div className="text-xs text-gray-500 dark:text-white">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
