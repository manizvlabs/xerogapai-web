'use client';

export default function ContactTestimonials() {
  const testimonials = [
    {
      quote: "Contact Center AI has revolutionized our quality assurance process. We're now scoring 100% of our calls automatically with 95% accuracy, and our agents are improving faster than ever. The real-time coaching during calls has been a game-changer for our team performance.",
      author: "Sarah Mitchell",
      position: "VP of Customer Experience",
      company: "Telecom Solutions Inc",
      location: "Atlanta, GA",
      avatar: "SM",
      metrics: [
        { label: "QA Coverage", value: "100%" },
        { label: "Agent Improvement", value: "+40%" },
        { label: "Time Saved", value: "15hrs/week" }
      ],
      industry: "Telecommunications"
    },
    {
      quote: "The automated call scoring is incredibly accurate and consistent. We've eliminated human bias in our evaluations and now have objective, data-driven insights into every customer interaction. Our customer satisfaction scores have improved by 25% since implementation.",
      author: "Marcus Chen",
      position: "Operations Director",
      company: "Retail Banking Group",
      location: "Chicago, IL",
      avatar: "MC",
      metrics: [
        { label: "Consistency", value: "100%" },
        { label: "CSAT Score", value: "+25%" },
        { label: "QA Accuracy", value: "95%" }
      ],
      industry: "Financial Services"
    },
    {
      quote: "As a growing contact center, we couldn't afford extensive manual QA. This AI solution gives us enterprise-level quality assurance at a fraction of the cost. Our agents love the personalized coaching, and our customers notice the improved service quality.",
      author: "Emma Rodriguez",
      position: "Contact Center Manager",
      company: "E-commerce Plus",
      location: "Miami, FL",
      avatar: "ER",
      metrics: [
        { label: "Cost Reduction", value: "70%" },
        { label: "Service Quality", value: "+35%" },
        { label: "Agent Satisfaction", value: "+50%" }
      ],
      industry: "E-commerce"
    },
    {
      quote: "The analytics dashboard provides incredible insights into our contact center performance. We can now predict busy periods, identify training needs, and track improvement trends in real-time. This has helped us reduce average handle time by 20%.",
      author: "David Park",
      position: "Quality Assurance Director",
      company: "Healthcare Services Corp",
      location: "Denver, CO",
      avatar: "DP",
      metrics: [
        { label: "Handle Time", value: "-20%" },
        { label: "Predictive Accuracy", value: "85%" },
        { label: "Training ROI", value: "300%" }
      ],
      industry: "Healthcare"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Centers Love Our QA Solution
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            See how contact centers across different industries are achieving exceptional results with AI-powered quality assurance.
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
            <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Contact Centers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Calls Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">QA Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance Improvement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
