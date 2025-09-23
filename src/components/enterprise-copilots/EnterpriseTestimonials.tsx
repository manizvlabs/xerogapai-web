'use client';

export default function EnterpriseTestimonials() {
  const testimonials = [
    {
      quote: "Enterprise Copilots has transformed how our global team of 15,000 employees access knowledge. With 12 languages supported, our international offices can finally get instant answers in their native language. The ROI has been incredible - we've reduced support tickets by 85% while improving employee satisfaction scores to 95%.",
      author: "Dr. Sarah Chen",
      position: "Chief Knowledge Officer",
      company: "Global Tech Solutions",
      location: "Singapore",
      avatar: "SC",
      metrics: [
        { label: "Support Reduction", value: "85%" },
        { label: "Employee Satisfaction", value: "95%" },
        { label: "Languages Supported", value: "12" }
      ],
      industry: "Technology"
    },
    {
      quote: "In healthcare compliance, accuracy and speed are critical. Enterprise Copilots gives our medical staff instant access to treatment protocols, drug information, and regulatory guidelines in multiple languages. The system is HIPAA compliant and has reduced our compliance query response time from hours to seconds.",
      author: "Dr. Ahmed Hassan",
      position: "Chief Medical Officer",
      company: "International Health Network",
      location: "Dubai, UAE",
      avatar: "AH",
      metrics: [
        { label: "Response Time", value: "< 5 seconds" },
        { label: "Compliance Accuracy", value: "100%" },
        { label: "Languages", value: "8" }
      ],
      industry: "Healthcare"
    },
    {
      quote: "Our manufacturing operations span 50 countries with complex regulatory requirements. Enterprise Copilots provides our global teams with instant access to safety protocols, compliance documents, and operational procedures in their local languages. This has improved our operational efficiency by 60% worldwide.",
      author: "Marcus van der Berg",
      position: "VP Global Operations",
      company: "Industrial Manufacturing Corp",
      location: "Amsterdam, Netherlands",
      avatar: "MvB",
      metrics: [
        { label: "Operational Efficiency", value: "+60%" },
        { label: "Compliance Rate", value: "100%" },
        { label: "Countries Supported", value: "50+" }
      ],
      industry: "Manufacturing"
    },
    {
      quote: "As a financial services provider, we must comply with regulations across multiple jurisdictions. Enterprise Copilots helps our compliance team instantly access regulatory information, risk assessments, and policy documents in the required languages. This has reduced our compliance costs by 70%.",
      author: "Fatima Al-Zahra",
      position: "Head of Compliance",
      company: "Global Financial Services",
      location: "London, UK",
      avatar: "FA",
      metrics: [
        { label: "Compliance Cost Reduction", value: "70%" },
        { label: "Query Resolution Time", value: "< 10 seconds" },
        { label: "Regulatory Coverage", value: "25+ jurisdictions" }
      ],
      industry: "Financial Services"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Global Enterprises
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            See how Fortune 500 companies and government agencies are transforming their knowledge management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4 text-gray-400">"</div>
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {testimonial.company}, {testimonial.location}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                    {testimonial.industry}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {testimonial.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-center">
                    <div className="text-lg font-bold text-green-600 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Daily Queries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">User Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
