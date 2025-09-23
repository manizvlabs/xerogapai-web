'use client';

import { CheckCircleIcon, UserGroupIcon, LightBulbIcon, ChartBarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function ConsultationBenefits() {
  const benefits = [
    {
      icon: UserGroupIcon,
      title: 'Expert AI Guidance',
      description: 'Get advice from AI specialists with 10+ years of experience in enterprise AI implementation.',
      stats: '500+ Consultations Completed'
    },
    {
      icon: LightBulbIcon,
      title: 'Tailored Recommendations',
      description: 'Receive personalized AI strategy recommendations based on your industry and business needs.',
      stats: '95% Implementation Success Rate'
    },
    {
      icon: ChartBarIcon,
      title: 'ROI-Focused Analysis',
      description: 'Understand the financial impact of AI adoption with detailed cost-benefit analysis.',
      stats: 'Average 300% ROI Identified'
    },
    {
      icon: ClockIcon,
      title: 'Accelerated Implementation',
      description: 'Get a clear roadmap and timeline to implement AI solutions quickly and efficiently.',
      stats: '60% Faster Time to Value'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Risk-Free Exploration',
      description: 'Explore AI possibilities without commitment. No sales pressure, just expert guidance.',
      stats: '100% Free Consultation'
    },
    {
      icon: CheckCircleIcon,
      title: 'Proven Track Record',
      description: 'Join hundreds of businesses that have successfully transformed their operations with our guidance.',
      stats: '50+ Industries Served'
    }
  ];

  const testimonials = [
    {
      quote: "The consultation gave us crystal clear direction on our AI strategy. We saved 6 months of research and implementation time.",
      author: "Sarah Mitchell",
      position: "VP of Operations",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      result: "Implemented AI in 3 months vs 9 months projected"
    },
    {
      quote: "The ROI analysis was incredibly detailed and accurate. We've already seen 250% ROI in the first 6 months.",
      author: "Ahmed Al-Rashid",
      position: "CEO",
      company: "MENA Digital Group",
      location: "Dubai, UAE",
      result: "$500K cost savings identified"
    },
    {
      quote: "The consultation team understood our compliance requirements perfectly. The implementation was seamless.",
      author: "Dr. Maria Santos",
      position: "Chief Digital Officer",
      company: "MediCare International",
      location: "Johannesburg, RSA",
      result: "HIPAA compliant AI system"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Benefits Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Why Book a Consultation?
          </h2>
          <p className="text-lg leading-8 text-gray-600 dark:text-white max-w-2xl mx-auto">
            Get expert AI guidance that transforms your business. Our consultations deliver actionable insights and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-4">
                  {benefit.description}
                </p>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    {benefit.stats}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Happens During Your Consultation?
            </h3>
            <p className="text-gray-600 dark:text-white">
              A structured 30-45 minute session designed to maximize value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Discovery (10 min)</h4>
              <p className="text-sm text-gray-600 dark:text-white">
                We learn about your business, challenges, and goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Assessment (10 min)</h4>
              <p className="text-sm text-gray-600 dark:text-white">
                Quick evaluation of your AI readiness and opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recommendations (10 min)</h4>
              <p className="text-sm text-gray-600 dark:text-white">
                Customized AI strategy and implementation roadmap
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Next Steps (5-10 min)</h4>
              <p className="text-sm text-gray-600 dark:text-white">
                Action plan and timeline for moving forward
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h3>
          <p className="text-gray-600 dark:text-white">
            Real results from businesses that booked consultations with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-4 text-gray-400">"</div>
              <blockquote className="text-gray-700 dark:text-white mb-6 italic">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white">
                    {testimonial.position}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white">
                    {testimonial.company}, {testimonial.location}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="text-xs font-medium text-green-800 dark:text-green-300">
                  Result: {testimonial.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Expert AI Guidance?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Book your free consultation today and get personalized AI recommendations that drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Book Free Consultation
              </button>
              <span className="text-green-100 text-sm self-center">
                30 minutes • Expert guidance • No cost
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
