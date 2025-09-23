'use client';

import { HeartIcon, BriefcaseIcon, AcademicCapIcon, HomeIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CareerBenefits() {
  const benefitCategories = [
    {
      icon: BanknotesIcon,
      title: 'Compensation & Rewards',
      description: 'Competitive salary packages with performance-based incentives',
      benefits: [
        {
          name: 'Competitive Salary',
          description: 'Market-leading compensation with regular reviews',
          icon: '💰'
        },
        {
          name: 'Stock Options',
          description: 'Equity participation in company growth',
          icon: '📈'
        },
        {
          name: 'Performance Bonuses',
          description: 'Quarterly bonuses based on individual and company performance',
          icon: '🎯'
        },
        {
          name: 'Annual Reviews',
          description: 'Comprehensive performance reviews with salary adjustments',
          icon: '📊'
        }
      ]
    },
    {
      icon: HeartIcon,
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage and wellness programs',
      benefits: [
        {
          name: 'Health Insurance',
          description: 'Premium health, dental, and vision coverage',
          icon: '🏥'
        },
        {
          name: 'Mental Health Support',
          description: 'Access to counseling and mental health resources',
          icon: '🧠'
        },
        {
          name: 'Fitness Benefits',
          description: 'Gym memberships and wellness program subsidies',
          icon: '💪'
        },
        {
          name: 'Wellness Days',
          description: 'Additional paid days for personal wellness',
          icon: '🌿'
        }
      ]
    },
    {
      icon: AcademicCapIcon,
      title: 'Learning & Development',
      description: 'Continuous learning opportunities and professional growth',
      benefits: [
        {
          name: 'Learning Budget',
          description: 'Annual budget for courses, books, and conferences',
          icon: '📚'
        },
        {
          name: 'Conference Attendance',
          description: 'Fully sponsored attendance at industry conferences',
          icon: '🎤'
        },
        {
          name: 'Internal Training',
          description: 'Regular workshops and training sessions',
          icon: '🎓'
        },
        {
          name: 'Career Coaching',
          description: 'One-on-one career development sessions',
          icon: '🚀'
        }
      ]
    },
    {
      icon: HomeIcon,
      title: 'Work-Life Balance',
      description: 'Flexible work arrangements and family support',
      benefits: [
        {
          name: 'Flexible Hours',
          description: 'Choose your working hours within core business times',
          icon: '🕐'
        },
        {
          name: 'Remote Work',
          description: 'Work from anywhere with our remote-first policy',
          icon: '🏠'
        },
        {
          name: 'Parental Leave',
          description: 'Generous paid parental leave for new parents',
          icon: '👨‍👩‍👧‍👦'
        },
        {
          name: 'Unlimited PTO',
          description: 'Take time off when you need it, with manager approval',
          icon: '🏖️'
        }
      ]
    },
    {
      icon: BriefcaseIcon,
      title: 'Office Perks',
      description: 'Modern workplace amenities and daily conveniences',
      benefits: [
        {
          name: 'Modern Office',
          description: 'State-of-the-art office with latest technology',
          icon: '🏢'
        },
        {
          name: 'Free Meals',
          description: 'Catered breakfast, lunch, and snacks daily',
          icon: '🍽️'
        },
        {
          name: 'Coffee & Beverages',
          description: 'Premium coffee, tea, and beverages all day',
          icon: '☕'
        },
        {
          name: 'Equipment Budget',
          description: 'Latest laptops, monitors, and accessories',
          icon: '💻'
        }
      ]
    },
    {
      icon: ClockIcon,
      title: 'Time Off & Leaves',
      description: 'Comprehensive leave policies and holiday schedules',
      benefits: [
        {
          name: 'Paid Time Off',
          description: '25 days of paid vacation annually',
          icon: '📅'
        },
        {
          name: 'Sick Leave',
          description: '10 days of paid sick leave per year',
          icon: '🤒'
        },
        {
          name: 'Public Holidays',
          description: 'All major public holidays observed',
          icon: '🇮🇳'
        },
        {
          name: 'Emergency Leave',
          description: 'Additional leave for personal emergencies',
          icon: '🚨'
        }
      ]
    }
  ];

  const testimonials = [
    {
      quote: "The benefits package here is incredible. The learning budget alone has helped me advance my career significantly.",
      author: "Priya Sharma",
      position: "Senior Developer",
      avatar: "PS"
    },
    {
      quote: "Work-life balance is taken seriously. Flexible hours and remote work options make it easy to manage family commitments.",
      author: "Rahul Verma",
      position: "Product Manager",
      avatar: "RV"
    },
    {
      quote: "The health benefits are comprehensive, and the wellness programs really show they care about employee wellbeing.",
      author: "Anjali Gupta",
      position: "UX Designer",
      avatar: "AG"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive Benefits Package
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            We offer industry-leading benefits designed to support your professional growth,
            health, and work-life balance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefitCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {category.description}
                </p>

                <div className="space-y-4">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start">
                      <span className="text-2xl mr-3">{benefit.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {benefit.name}
                        </h4>
                        <p className="text-gray-600 dark:text-white text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Employee Testimonials */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Team Says About Benefits
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Hear from our team members about how our benefits package supports their professional and personal growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">"</div>
                <blockquote className="text-gray-700 dark:text-white italic mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Comparison */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose XeroGap AI Benefits?
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              We designed our benefits package to be comprehensive, flexible, and focused on what matters most to our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-semibold text-sm mb-1">Tailored to You</div>
              <div className="text-xs text-purple-100">Flexible options that fit your lifestyle and career goals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🚀</div>
              <div className="font-semibold text-sm mb-1">Growth Focused</div>
              <div className="text-xs text-purple-100">Invest in your professional development and future success</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">❤️</div>
              <div className="font-semibold text-sm mb-1">People First</div>
              <div className="text-xs text-purple-100">Prioritize your health, family, and work-life balance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
