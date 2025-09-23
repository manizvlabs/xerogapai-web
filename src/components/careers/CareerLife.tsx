'use client';

import { UsersIcon, SparklesIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function CareerLife() {
  const lifeAspects = [
    {
      icon: UsersIcon,
      title: 'Collaborative Environment',
      description: 'Work with a diverse team of talented individuals who share your passion for innovation.',
      highlights: [
        'Cross-functional teams',
        'Open communication culture',
        'Knowledge sharing sessions',
        'Team-building activities'
      ]
    },
    {
      icon: SparklesIcon,
      title: 'Innovation Culture',
      description: 'Be part of a company that encourages creativity, experimentation, and pushing boundaries.',
      highlights: [
        'Innovation time allocation',
        'Hackathons and challenges',
        'Creative problem-solving',
        'Cutting-edge technology access'
      ]
    },
    {
      icon: TrophyIcon,
      title: 'Achievement Recognition',
      description: 'Your contributions are valued and celebrated through various recognition programs.',
      highlights: [
        'Employee of the month',
        'Innovation awards',
        'Performance bonuses',
        'Public recognition'
      ]
    },
    {
      icon: HeartIcon,
      title: 'Inclusive Community',
      description: 'Join a supportive community that values diversity, equity, and inclusion.',
      highlights: [
        'Diversity initiatives',
        'Employee resource groups',
        'Inclusive policies',
        'Equal opportunities'
      ]
    }
  ];

  const officeLife = [
    {
      title: 'Modern Bangalore Office',
      description: 'Our headquarters in the heart of Bangalore\'s tech district',
      features: [
        'Open floor plan with collaborative spaces',
        'State-of-the-art technology equipment',
        'Multiple cafeterias and relaxation areas',
        'Green spaces and recreational facilities'
      ],
      image: '🏢'
    },
    {
      title: 'Remote-First Culture',
      description: 'Work from anywhere with our flexible remote work policies',
      features: [
        'Full remote work options',
        'Flexible working hours',
        'Global team collaboration tools',
        'Regular virtual team events'
      ],
      image: '🏠'
    },
    {
      title: 'Learning Spaces',
      description: 'Dedicated areas for continuous learning and skill development',
      features: [
        'Library with technical books',
        'Online learning platforms',
        'Internal training sessions',
        'Conference room for workshops'
      ],
      image: '📚'
    }
  ];

  const events = [
    {
      title: 'Monthly Team Meetups',
      description: 'Virtual and in-person gatherings to connect and share updates',
      attendees: 'All team members',
      frequency: 'Monthly'
    },
    {
      title: 'Innovation Hackathons',
      description: '48-hour coding challenges to solve real business problems',
      attendees: 'Voluntary participation',
      frequency: 'Quarterly'
    },
    {
      title: 'Learning Sessions',
      description: 'Internal workshops and guest speaker sessions',
      attendees: 'All interested employees',
      frequency: 'Weekly'
    },
    {
      title: 'Team Building Activities',
      description: 'Offsite activities, games, and cultural celebrations',
      attendees: 'Department or company-wide',
      frequency: 'Monthly'
    },
    {
      title: 'Conference Attendance',
      description: 'Sponsored attendance at industry conferences and events',
      attendees: 'Selected employees',
      frequency: 'As opportunities arise'
    },
    {
      title: 'Volunteer Days',
      description: 'Company-sponsored community service activities',
      attendees: 'Voluntary participation',
      frequency: 'Quarterly'
    }
  ];

  const diversity = [
    {
      metric: '15+ Nationalities',
      description: 'Team members from around the world',
      icon: '🌍'
    },
    {
      metric: '50/50 Gender Balance',
      description: 'Equal representation across all roles',
      icon: '⚖️'
    },
    {
      metric: '30+ Years Experience Range',
      description: 'From fresh graduates to industry veterans',
      icon: '🎓'
    },
    {
      metric: '100% Inclusive Hiring',
      description: 'Bias-free recruitment process',
      icon: '🤝'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Life at XeroGap AI
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Experience a workplace that combines innovation, collaboration, and work-life balance
            in a supportive and inclusive environment.
          </p>
        </div>

        {/* Life Aspects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {lifeAspects.map((aspect, index) => {
            const IconComponent = aspect.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {aspect.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {aspect.description}
                </p>

                <div className="space-y-2">
                  {aspect.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Life */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Work Environment
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Whether you work from our office or remotely, we provide the tools and environment you need to thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLife.map((office, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{office.image}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {office.title}
                  </h4>
                  <p className="text-gray-600 dark:text-white text-sm">
                    {office.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {office.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Company Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Company Events & Activities
            </h3>

            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                      {event.frequency}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-white text-sm mb-2">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white">
                    Attendees: {event.attendees}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">
              Diversity & Inclusion
            </h3>

            <div className="space-y-6">
              {diversity.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{item.icon}</span>
                    <div>
                      <div className="font-bold text-lg">{item.metric}</div>
                      <div className="text-sm text-purple-100">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <h4 className="font-semibold mb-2">Our Commitment</h4>
              <p className="text-sm text-purple-100">
                We are committed to fostering an inclusive workplace where everyone feels valued,
                respected, and empowered to do their best work.
              </p>
            </div>
          </div>
        </div>

        {/* Career Growth */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Career Growth Opportunities
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              We invest in your professional development and provide clear paths for advancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">📈</div>
              <div className="font-semibold text-sm mb-1">Clear Career Paths</div>
              <div className="text-xs text-purple-100">Defined progression tracks for every role</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-semibold text-sm mb-1">Mentorship Program</div>
              <div className="text-xs text-purple-100">One-on-one guidance from senior leaders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🚀</div>
              <div className="font-semibold text-sm mb-1">Fast Growth</div>
              <div className="text-xs text-purple-100">Rapid advancement opportunities in a growing company</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
