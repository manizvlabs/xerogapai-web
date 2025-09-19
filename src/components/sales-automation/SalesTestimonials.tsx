'use client';

export default function SalesTestimonials() {
  const testimonials = [
    {
      quote: "Sales automation has transformed our entire sales process. We're generating 3x more qualified leads while our sales team focuses on closing deals. The AI-powered lead scoring is incredibly accurate - our conversion rates have improved by 85%.",
      author: "Sarah Mitchell",
      position: "VP of Sales",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      avatar: "SM",
      metrics: [
        { label: "Lead Generation", value: "+300%" },
        { label: "Conversion Rate", value: "+85%" },
        { label: "Sales Cycle", value: "-40%" }
      ],
      industry: "SaaS"
    },
    {
      quote: "The sales intelligence features are game-changing. We now know everything about our prospects before we even pick up the phone. The automated email sequences and follow-ups have increased our response rates by 200%.",
      author: "Marcus Chen",
      position: "Sales Director",
      company: "GrowthMax Inc",
      location: "Austin, TX",
      avatar: "MC",
      metrics: [
        { label: "Response Rate", value: "+200%" },
        { label: "Deal Size", value: "+35%" },
        { label: "Sales Productivity", value: "+150%" }
      ],
      industry: "B2B Services"
    },
    {
      quote: "As a growing startup, we couldn't afford a large sales team. This AI sales automation has given us the capabilities of a Fortune 500 sales organization. Our pipeline has never been stronger.",
      author: "Emma Rodriguez",
      position: "CEO & Co-founder",
      company: "InnovateLabs",
      location: "Los Angeles, CA",
      avatar: "ER",
      metrics: [
        { label: "Pipeline Growth", value: "+250%" },
        { label: "Lead Quality", value: "+90%" },
        { label: "Cost Per Acquisition", value: "-65%" }
      ],
      industry: "Technology Startup"
    },
    {
      quote: "The ROI was evident within the first month. We're saving 20 hours per week on administrative tasks while closing more deals. The predictive analytics help us prioritize the right opportunities.",
      author: "David Park",
      position: "Head of Business Development",
      company: "Enterprise Solutions Ltd",
      location: "New York, NY",
      avatar: "DP",
      metrics: [
        { label: "Time Saved", value: "20hrs/week" },
        { label: "Deal Win Rate", value: "+60%" },
        { label: "Revenue Growth", value: "+180%" }
      ],
      industry: "Enterprise Software"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Sales Teams Love Our Automation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            See how sales professionals and teams are achieving unprecedented growth with AI-powered automation.
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

        {/* Aggregate Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">300+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sales Teams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$50M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lead Quality Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pipeline Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
}
