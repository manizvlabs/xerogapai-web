'use client';
import Link from 'next/link';

import { HeartIcon, UsersIcon, LightBulbIcon, TrophyIcon, GlobeAltIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function CareerCulture() {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technology to solve complex problems.',
      color: 'text-purple-600'
    },
    {
      icon: UsersIcon,
      title: 'Collaboration',
      description: 'We believe great things happen when diverse minds work together towards common goals.',
      color: 'text-green-600'
    },
    {
      icon: HeartIcon,
      title: 'Customer Obsession',
      description: 'Our customers\' success is our success. We go above and beyond to exceed expectations.',
      color: 'text-pink-600'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to customer service.',
      color: 'text-yellow-600'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Mindset',
      description: 'We operate globally, embracing different cultures and perspectives in our work.',
      color: 'text-green-600'
    },
    {
      icon: CpuChipIcon,
      title: 'Continuous Learning',
      description: 'We invest in our people\'s growth through learning, training, and development opportunities.',
      color: 'text-orange-600'
    }
  ];

  const perks = [
    {
      category: 'Work Environment',
      items: [
        'Flexible work hours and remote work options',
        'Modern office with state-of-the-art equipment',
        'Collaborative workspaces and quiet zones',
        'Free snacks, coffee, and catered meals'
      ]
    },
    {
      category: 'Health & Wellness',
      items: [
        'Comprehensive health insurance',
        'Mental health support and counseling',
        'Fitness center membership subsidy',
        'Paid time off and wellness days'
      ]
    },
    {
      category: 'Learning & Development',
      items: [
        'Annual learning budget',
        'Conference and workshop attendance',
        'Online course subscriptions',
        'Internal knowledge sharing sessions'
      ]
    },
    {
      category: 'Compensation & Benefits',
      items: [
        'Competitive salary and equity options',
        'Performance-based bonuses',
        'Retirement savings plan',
        'Parental leave and family support'
      ]
    }
  ];

  const cultureHighlights = [
    {
      title: 'Innovation Days',
      description: 'Monthly dedicated time for exploring new technologies and creative projects',
      icon: '💡'
    },
    {
      title: 'Team Building',
      description: 'Regular offsite activities, virtual game nights, and cultural celebrations',
      icon: '🎉'
    },
    {
      title: 'Hackathons',
      description: 'Internal hackathons to solve real business challenges and learn new skills',
      icon: '🚀'
    },
    {
      title: 'Open Communication',
      description: 'Transparent decision-making with regular all-hands meetings and feedback sessions',
      icon: '💬'
    },
    {
      title: 'Diversity & Inclusion',
      description: 'Inclusive workplace with employee resource groups and diversity initiatives',
      icon: '🌈'
    },
    {
      title: 'Community Impact',
      description: 'Volunteer programs and partnerships with local organizations',
      icon: '🤝'
    }
  ];

  return (
    <section id="culture" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Our Culture & Values
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            We're more than just a workplace. We're a community of innovators, problem-solvers, and dreamers
            who believe in the power of AI to transform businesses and improve lives.
          </p>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What Drives Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-white">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Culture Highlights */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Life at XeroGap AI
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              We foster a vibrant, inclusive culture that celebrates creativity, collaboration, and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureHighlights.map((highlight, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{highlight.icon}</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {highlight.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-white text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">
              What Our Team Says
            </h3>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-purple-100 mb-3 italic">
                  "The culture here is incredible. Everyone is genuinely passionate about solving real problems with AI."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-purple-200">Senior AI Engineer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-purple-100 mb-3 italic">
                  "I've grown more in my first year here than in my previous 3 years combined. The learning opportunities are endless."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">MK</span>
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Kim</div>
                    <div className="text-sm text-purple-200">Product Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Employee Benefits
            </h3>

            <div className="space-y-6">
              {perks.map((category, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Team?
            </h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Become part of a team that's shaping the future of AI automation and making a real impact on businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#openings"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Open Positions
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
