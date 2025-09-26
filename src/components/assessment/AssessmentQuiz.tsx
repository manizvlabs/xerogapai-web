'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface AssessmentQuizProps {
  onComplete: (data: {
    score: number;
    totalScore: number;
    maxScore: number;
    answers: Record<number, unknown>;
    insights: unknown[];
  }) => void;
}

const questions = [
  {
    id: 1,
    question: "What's your company size?",
    type: "single",
    options: [
      { value: "startup", label: "1-10 employees", score: 85 },
      { value: "small", label: "11-50 employees", score: 78 },
      { value: "medium", label: "51-200 employees", score: 72 },
      { value: "large", label: "200+ employees", score: 65 }
    ]
  },
  {
    id: 2,
    question: "What's your current level of digital transformation?",
    type: "single",
    options: [
      { value: "advanced", label: "Fully digitized with modern tools", score: 90 },
      { value: "moderate", label: "Partially digitized with some automation", score: 75 },
      { value: "basic", label: "Basic digitization, mostly manual processes", score: 60 },
      { value: "minimal", label: "Minimal digitization, paper-based processes", score: 45 }
    ]
  },
  {
    id: 3,
    question: "Which areas of your business could benefit most from AI automation?",
    type: "multiple",
    options: [
      { value: "customer_service", label: "Customer Service & Support", score: 20 },
      { value: "sales", label: "Sales & Lead Generation", score: 18 },
      { value: "operations", label: "Operations & Workflow", score: 22 },
      { value: "marketing", label: "Marketing & Content", score: 15 },
      { value: "finance", label: "Finance & Reporting", score: 25 },
      { value: "hr", label: "HR & Recruitment", score: 12 }
    ]
  },
  {
    id: 4,
    question: "What's your monthly budget range for AI solutions?",
    type: "single",
    options: [
      { value: "high", label: "$2,000+", score: 85 },
      { value: "medium", label: "$500 - $2,000", score: 75 },
      { value: "low", label: "$100 - $500", score: 65 },
      { value: "minimal", label: "Under $100", score: 55 }
    ]
  },
  {
    id: 5,
    question: "How familiar is your team with AI technologies?",
    type: "single",
    options: [
      { value: "expert", label: "Very familiar, actively using AI tools", score: 95 },
      { value: "intermediate", label: "Some experience with AI/ML", score: 80 },
      { value: "basic", label: "Basic understanding, limited experience", score: 65 },
      { value: "novice", label: "Limited understanding, new to AI", score: 50 }
    ]
  },
  {
    id: 6,
    question: "What's your biggest operational challenge?",
    type: "single",
    options: [
      { value: "efficiency", label: "Operational efficiency and productivity", score: 20 },
      { value: "customer", label: "Customer experience and satisfaction", score: 18 },
      { value: "growth", label: "Business growth and scalability", score: 22 },
      { value: "costs", label: "Cost reduction and optimization", score: 25 },
      { value: "compliance", label: "Compliance and regulatory requirements", score: 15 }
    ]
  },
  {
    id: 7,
    question: "Which tools/platforms do you currently use?",
    type: "multiple",
    options: [
      { value: "crm", label: "CRM (Salesforce, HubSpot, Zoho)", score: 15 },
      { value: "communication", label: "Communication (Slack, Teams, WhatsApp)", score: 12 },
      { value: "productivity", label: "Productivity (Notion, Google Workspace)", score: 18 },
      { value: "accounting", label: "Accounting (QuickBooks, Xero)", score: 20 },
      { value: "custom", label: "Custom/internal software", score: 25 },
      { value: "none", label: "Mostly manual processes", score: 5 }
    ]
  },
  {
    id: 8,
    question: "What's your timeline for AI implementation?",
    type: "single",
    options: [
      { value: "immediate", label: "ASAP - within 1 month", score: 90 },
      { value: "soon", label: "Within 3 months", score: 80 },
      { value: "quarter", label: "Within 6 months", score: 70 },
      { value: "year", label: "Within 1 year", score: 60 }
    ]
  },
  {
    id: 9,
    question: "Which AI use case interests you most?",
    type: "single",
    options: [
      { value: "chatbots", label: "Customer service chatbots", score: 20 },
      { value: "automation", label: "Workflow automation", score: 25 },
      { value: "analytics", label: "Data analytics and insights", score: 22 },
      { value: "content", label: "Content generation and marketing", score: 15 },
      { value: "sales", label: "Sales intelligence and prospecting", score: 18 }
    ]
  },
  {
    id: 10,
    question: "Do you have any specific compliance requirements?",
    type: "multiple",
    options: [
      { value: "gdpr", label: "GDPR compliance", score: 15 },
      { value: "dpdp", label: "DPDP compliance", score: 12 },
      { value: "hipaa", label: "HIPAA compliance", score: 18 },
      { value: "iso", label: "ISO standards", score: 10 },
      { value: "none", label: "No specific compliance needs", score: 20 }
    ]
  }
];

export default function AssessmentQuiz({ onComplete }: AssessmentQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const insights: any[] = [];

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        if (question.type === 'single' && typeof answer === 'string') {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            totalScore += option.score;
            maxScore += Math.max(...question.options.map(opt => opt.score));
          }
        } else if (question.type === 'multiple' && Array.isArray(answer)) {
          answer.forEach((value: string) => {
            const option = question.options.find(opt => opt.value === value);
            if (option) {
              totalScore += option.score;
              maxScore += Math.max(...question.options.map(opt => opt.score));
            }
          });
        }
      }
    });

    const percentageScore = Math.round((totalScore / maxScore) * 100);

    return {
      score: percentageScore,
      totalScore,
      maxScore,
      answers,
      insights
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = calculateScore();
    onComplete(results);
    setIsSubmitting(false);
  };

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = question.type === 'single'
                ? currentAnswer === option.value
                : Array.isArray(currentAnswer) && currentAnswer.includes(option.value);

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (question.type === 'single') {
                      handleAnswer(question.id, option.value);
                    } else {
                      const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                      const updated = current.includes(option.value)
                        ? current.filter(v => v !== option.value)
                        : [...current, option.value];
                      handleAnswer(question.id, updated);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                      isSelected
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {question.type === 'multiple' && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              Select all that apply
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </div>

          <button
            onClick={handleNext}
            disabled={
              !currentAnswer ||
              (Array.isArray(currentAnswer) && currentAnswer.length === 0)
            }
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              !currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {currentQuestion === questions.length - 1 ? (
              isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                  Calculating...
                </>
              ) : (
                'Get Results'
              )
            ) : (
              <>
                Next
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
