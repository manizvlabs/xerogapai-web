'use client';

export default function VyaptIXTestimonials() {
  const testimonials = [
    {
      quote: "VyaptIX AI has transformed how our agency operates. We're saving 25 hours per week on reporting and client updates alone. The AI automatically generates client reports from our Notion workspace and syncs everything with HubSpot. Our clients love the timely, professional updates.",
      author: "Sarah Mitchell",
      position: "CEO",
      company: "DigitalCraft Agency",
      location: "San Francisco, CA",
      avatar: "SM",
      metrics: [
        { label: "Time Saved", value: "25hrs/week" },
        { label: "Client Satisfaction", value: "+90%" },
        { label: "ROI", value: "350%" }
      ],
      industry: "Digital Marketing Agency"
    },
    {
      quote: "As a growing startup, we couldn't afford complex automation solutions. VyaptIX AI was perfect - easy to set up, powerful features, and affordable pricing. Our team went from manual reporting to automated insights overnight.",
      author: "Marcus Chen",
      position: "Operations Director",
      company: "TechStart Solutions",
      location: "Austin, TX",
      avatar: "MC",
      metrics: [
        { label: "Setup Time", value: "2 hours" },
        { label: "Reporting Time", value: "-85%" },
        { label: "Team Productivity", value: "+150%" }
      ],
      industry: "SaaS Startup"
    },
    {
      quote: "The Notion integration is flawless. Every project update, meeting note, and deliverable automatically syncs to our client dashboards. Our clients now have real-time visibility into their projects, and we spend zero time on status updates.",
      author: "Emma Rodriguez",
      position: "Project Manager",
      company: "CreativeStudio Pro",
      location: "Los Angeles, CA",
      avatar: "ER",
      metrics: [
        { label: "Client Updates", value: "Automated" },
        { label: "Project Visibility", value: "Real-time" },
        { label: "Client Retention", value: "+95%" }
      ],
      industry: "Creative Agency"
    },
    {
      quote: "We evaluated 5 automation platforms before choosing VyaptIX AI. The AI-powered insights and seamless integrations won us over. Our consulting practice is now 3x more efficient, and our clients get better results.",
      author: "David Park",
      position: "Managing Partner",
      company: "StrategyPlus Consulting",
      location: "New York, NY",
      avatar: "DP",
      metrics: [
        { label: "Efficiency", value: "3x increase" },
        { label: "Client Results", value: "+60%" },
        { label: "Revenue Growth", value: "+120%" }
      ],
      industry: "Management Consulting"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Teams Love VyaptIX AI
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            See how businesses across different industries are transforming their workflows with AI-powered automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4 text-gray-400">"</div>
              <blockquote className="text-gray-700 dark:text-white mb-6 italic leading-relaxed">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center mb-6">
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
                  <div className="text-sm text-gray-500 dark:text-white">
                    {testimonial.company}, {testimonial.location}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
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
                    <div className="text-xs text-gray-600 dark:text-white leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-sm text-gray-600 dark:text-white">Teams Using VyaptIX AI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-white">Integrations Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-white">Business Tools Connected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">99.5%</div>
            <div className="text-sm text-gray-600 dark:text-white">Automation Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
