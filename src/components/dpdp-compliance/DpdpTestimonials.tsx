'use client';

export default function DpdpTestimonials() {
  const testimonials = [
    {
      quote: "The DPDP assessment was incredibly thorough and gave us exactly what we needed to understand our compliance gaps. The 30-day timeline was perfect, and the implementation roadmap has been invaluable. We're now fully compliant and avoided potential penalties.",
      author: "Priya Sharma",
      position: "Chief Compliance Officer",
      company: "TechCorp India",
      location: "Bangalore, Karnataka",
      avatar: "PS",
      metrics: [
        { label: "Assessment Score", value: "95%" },
        { label: "Implementation Time", value: "60 days" },
        { label: "Penalty Risk", value: "Eliminated" }
      ],
      industry: "Technology"
    },
    {
      quote: "As a healthcare provider, data privacy is critical. The DPDP compliance solution helped us implement robust privacy measures while ensuring we meet all regulatory requirements. The ongoing monitoring has given us peace of mind.",
      author: "Dr. Rajesh Kumar",
      position: "Chief Information Officer",
      company: "MedCare Hospitals",
      location: "Mumbai, Maharashtra",
      avatar: "RK",
      metrics: [
        { label: "Patient Data Protected", value: "100%" },
        { label: "Compliance Rate", value: "99.9%" },
        { label: "Audit Success", value: "100%" }
      ],
      industry: "Healthcare"
    },
    {
      quote: "The implementation was smooth and the team was incredibly knowledgeable about Indian data protection laws. We went from zero compliance to full DPDP readiness in just 75 days. The ROI was evident within the first quarter.",
      author: "Anita Patel",
      position: "Data Protection Officer",
      company: "FinServe Solutions",
      location: "Delhi, NCR",
      avatar: "AP",
      metrics: [
        { label: "Implementation Cost", value: "₹2.5L" },
        { label: "Penalty Avoidance", value: "₹50Cr" },
        { label: "ROI", value: "2000%" }
      ],
      industry: "Financial Services"
    },
    {
      quote: "The assessment revealed gaps we didn't even know existed. The detailed roadmap and expert guidance helped us not just achieve compliance, but actually improve our data practices. This has become a competitive advantage.",
      author: "Vikram Singh",
      position: "CEO",
      company: "E-commerce Plus",
      location: "",
      avatar: "VS",
      metrics: [
        { label: "Data Practices", value: "Improved 80%" },
        { label: "Customer Trust", value: "+45%" },
        { label: "Competitive Advantage", value: "Achieved" }
      ],
      industry: "E-commerce"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Indian Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            See how companies across India have achieved DPDP compliance and avoided penalties.
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
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
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
            <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Companies Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">₹500Cr</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Penalties Avoided</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Assessment Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
