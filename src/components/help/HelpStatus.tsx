'use client';
import Link from 'next/link';

import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function HelpStatus() {
  const systemStatus = [
    {
      service: 'API Gateway',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '120ms'
    },
    {
      service: 'Workflow Engine',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '95ms'
    },
    {
      service: 'Database',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '15ms'
    },
    {
      service: 'Authentication',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '80ms'
    },
    {
      service: 'File Storage',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '45ms'
    },
    {
      service: 'Email Service',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '250ms',
      incident: 'High latency due to increased traffic'
    }
  ];

  const recentIncidents = [
    {
      id: 'INC-2024-001',
      title: 'API Gateway Performance Degradation',
      status: 'resolved',
      started: '2024-01-15 14:30 UTC',
      resolved: '2024-01-15 16:45 UTC',
      impact: 'Minor increase in response times',
      description: 'Temporary performance degradation due to unexpected traffic spike. All systems have been restored to normal operation.'
    },
    {
      id: 'INC-2024-002',
      title: 'Scheduled Database Maintenance',
      status: 'completed',
      started: '2024-01-10 02:00 UTC',
      resolved: '2024-01-10 04:30 UTC',
      impact: 'Scheduled maintenance window',
      description: 'Routine database maintenance completed successfully. No impact on service availability.'
    }
  ];

  const upcomingMaintenance = [
    {
      title: 'API Gateway Update',
      date: '2024-01-25',
      time: '02:00 - 04:00 UTC',
      impact: 'Brief service interruption',
      description: 'Security updates and performance improvements'
    },
    {
      title: 'Database Optimization',
      date: '2024-02-01',
      time: '01:00 - 03:00 UTC',
      impact: 'Read-only mode',
      description: 'Performance optimization and cleanup'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'down':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            System Status & Updates
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Real-time status of all XeroGap AI services and upcoming maintenance windows.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Service Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemStatus.map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {service.service}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(service.status)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {service.uptime}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Response:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {service.responseTime}
                    </div>
                  </div>
                </div>

                {service.incident && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      {service.incident}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents & Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Recent Incidents */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Incidents
            </h3>

            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.status === 'resolved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {incident.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Started: {incident.started} | Resolved: {incident.resolved}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Impact:</strong> {incident.impact}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {incident.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Maintenance */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Upcoming Maintenance
            </h3>

            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {maintenance.title}
                  </h4>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {maintenance.date} | {maintenance.time}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Expected Impact:</strong> {maintenance.impact}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {maintenance.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Page Links */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Stay Informed
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get real-time updates on system status, incidents, and maintenance through our status page and notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-sm mb-1">Public Status Page</div>
              <div className="text-xs text-indigo-100">Real-time system status</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-semibold text-sm mb-1">Email Notifications</div>
              <div className="text-xs text-indigo-100">Instant incident alerts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-semibold text-sm mb-1">RSS Feed</div>
              <div className="text-xs text-indigo-100">Subscribe to updates</div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/status"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Status Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
