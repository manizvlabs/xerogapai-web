'use client';

export default function DemoTestimonials() {
  const testimonials = [
    {
      quote: "The demo was incredibly detailed and showed exactly how XeroGap AI would work for our specific use case. The ROI projections were realistic and data-driven.",
      author: "Sarah Chen",
      position: "Operations Director",
      company: "TechFlow Solutions",
      location: "Singapore",
      avatar: "SC",
      metrics: "85% time reduction in customer inquiries"
    },
    {
      quote: "I was skeptical about AI automation, but the live demo changed my mind completely. Seeing the WhatsApp bot handle complex customer queries was impressive.",
      author: "Ahmed Hassan",
      position: "Customer Success Manager",
      company: "MENA Commerce Hub",
      location: "Dubai, UAE",
      avatar: "AH",
      metrics: "60% faster response times"
    },
    {
      quote: "The demo team took the time to understand our unique challenges in healthcare compliance. The customized solution they showed was exactly what we needed.",
      author: "Dr. Maria Rodriguez",
      position: "Chief of Staff",
      company: "MediCare Plus",
      location: "Johannesburg, RSA",
      avatar: "MR",
      metrics: "90% compliance automation"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Demo Attendees Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Real feedback from businesses who've experienced our personalized demos and seen the potential of AI automation.
          </p>
        </div>

        <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-4xl mb-4 text-gray-400">"</div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                  </div>
                </div>

                {/* Demo result */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                    Demo Result:
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-400">
                    {testimonial.metrics}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Demo Impact Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Demo to Trial Conversion</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Report Implementation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">30min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Demo Length</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">2.5x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average ROI Multiple</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
