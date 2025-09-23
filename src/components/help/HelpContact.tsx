'use client';
import Link from 'next/link';

import { ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function HelpContact() {
  const contactMethods = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 for paid plans',
      responseTime: '< 5 minutes',
      bestFor: 'Technical questions, urgent issues',
      action: 'Start Chat',
      primary: true
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send detailed questions and complex issues',
      availability: 'Business hours',
      responseTime: '< 24 hours',
      bestFor: 'Detailed questions, feature requests',
      action: 'Send Email',
      primary: false
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      availability: '9 AM - 6 PM IST',
      responseTime: 'Immediate',
      bestFor: 'Complex issues, urgent support',
      action: 'Call Now',
      primary: false
    }
  ];

  const supportHours = [
    {
      region: 'India',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM',
      days: 'Monday - Friday',
      phone: '+91-XXXX-XXXXXX'
    },
    {
      region: 'United States',
      timezone: 'PST (UTC-8)',
      hours: '9:00 AM - 5:00 PM',
      days: 'Monday - Friday',
      phone: '+1-XXX-XXX-XXXX'
    },
    {
      region: 'Europe',
      timezone: 'CET (UTC+1)',
      hours: '9:00 AM - 5:00 PM',
      days: 'Monday - Friday',
      phone: '+44-XXXX-XXXXXX'
    }
  ];

  const emergencyContacts = [
    {
      type: 'System Outage',
      description: 'Report critical system outages or downtime',
      contact: 'outage@xerogap.ai',
      priority: 'Critical'
    },
    {
      type: 'Security Incident',
      description: 'Report security vulnerabilities or breaches',
      contact: 'security@xerogap.ai',
      priority: 'Critical'
    },
    {
      type: 'Data Breach',
      description: 'Report potential data breaches or leaks',
      contact: 'breach@xerogap.ai',
      priority: 'Critical'
    }
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Support
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Get the help you need with multiple support channels and expert assistance.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {method.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-indigo-600 dark:text-indigo-400">
                        {method.availability}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-white">
                        {method.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {method.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Best for:
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {method.bestFor}
                  </p>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    method.primary
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                  }`}
                >
                  {method.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* Support Hours & Regions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Support Hours */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <ClockIcon className="w-8 h-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Support Hours
              </h3>
            </div>

            <div className="space-y-4">
              {supportHours.map((region, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {region.region}
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-white">
                      {region.timezone}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-white">Hours:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {region.hours}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-white">Phone:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {region.phone}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-white">
                    {region.days}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 text-lg">🚨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Emergency Contacts
              </h3>
            </div>

            <div className="space-y-4">
              {emergencyContacts.map((emergency, index) => (
                <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-900 dark:text-red-100">
                      {emergency.type}
                    </h4>
                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      {emergency.priority}
                    </span>
                  </div>
                  <p className="text-red-800 dark:text-red-200 text-sm mb-3">
                    {emergency.description}
                  </p>
                  <div className="text-sm font-mono bg-red-100 dark:bg-red-800 p-2 rounded text-red-900 dark:text-red-100">
                    {emergency.contact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Portal */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Customer Support Portal
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Access your personalized support dashboard with ticket history, knowledge base, and direct support line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎫</div>
              <div className="font-semibold text-sm mb-1">Support Tickets</div>
              <div className="text-xs text-indigo-100">Track and manage all your support requests</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-sm mb-1">Service Status</div>
              <div className="text-xs text-indigo-100">Real-time system status and incident updates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-sm mb-1">Knowledge Base</div>
              <div className="text-xs text-indigo-100">Personalized help articles and tutorials</div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/support/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Access Support Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
