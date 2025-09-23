'use client';
import Link from 'next/link';

export default function WhatsAppTestimonials() {
  const testimonials = [
    {
      quote: "WhatsApp CX Copilot transformed our customer service overnight. Response time went from 6 hours to 2 minutes, and our customer satisfaction scores jumped 85%. The AI handles 90% of routine inquiries, freeing our team for complex issues.",
      author: "Ahmed Al-Rashid",
      position: "CEO",
      company: "Al-Mansoori Retail Group",
      location: "Dubai, UAE",
      avatar: "AA",
      metrics: [
        { label: "Response Time", value: "6h → 2min" },
        { label: "Customer Satisfaction", value: "+85%" },
        { label: "Cost Savings", value: "$50K/month" }
      ],
      industry: "Retail"
    },
    {
      quote: "The ROI was clear from day one. We automated 300% more customer interactions while reducing our support costs by 75%. The multi-language support was perfect for our international customer base.",
      author: "Grace Wanjiku",
      position: "Customer Success Director",
      company: "East African Commerce Hub",
      location: "Nairobi, Kenya",
      avatar: "GW",
      metrics: [
        { label: "Automation Rate", value: "85%" },
        { label: "Cost Reduction", value: "75%" },
        { label: "Languages Supported", value: "12+" }
      ],
      industry: "E-commerce"
    },
    {
      quote: "In healthcare, trust and accuracy are everything. WhatsApp CX Copilot handles patient inquiries with HIPAA compliance while our staff focuses on critical medical cases. Patient satisfaction improved dramatically.",
      author: "Dr. Maria Santos",
      position: "Chief Digital Officer",
      company: "MediCare Plus",
      location: "Johannesburg, RSA",
      avatar: "MS",
      metrics: [
        { label: "Patient Satisfaction", value: "+90%" },
        { label: "Query Resolution", value: "95%" },
        { label: "Staff Efficiency", value: "+60%" }
      ],
      industry: "Healthcare"
    },
    {
      quote: "Our logistics business operates 24/7, and so does our customer service now. WhatsApp automation handles tracking inquiries, delivery updates, and rescheduling while maintaining our professional standards.",
      author: "Omar Al-Farsi",
      position: "Operations Director",
      company: "Gulf Logistics Network",
      location: "Muscat, Oman",
      avatar: "OA",
      metrics: [
        { label: "24/7 Coverage", value: "100%" },
        { label: "Query Accuracy", value: "98%" },
        { label: "Customer Retention", value: "+40%" }
      ],
      industry: "Logistics"
    },
    {
      quote: "As a property developer, timely communication is crucial. WhatsApp CX Copilot manages property inquiries, booking requests, and client updates automatically, improving our conversion rates significantly.",
      author: "Fatima Al-Zahra",
      position: "Sales & Marketing Director",
      company: "Desert Properties Development",
      location: "Riyadh, KSA",
      avatar: "FA",
      metrics: [
        { label: "Lead Conversion", value: "+150%" },
        { label: "Response Time", value: "< 5 min" },
        { label: "Client Satisfaction", value: "4.9/5" }
      ],
      industry: "Real Estate"
    },
    {
      quote: "For our consulting firm, maintaining client relationships is everything. The AI handles routine communications while ensuring complex matters reach the right consultant immediately.",
      author: "James Mitchell",
      position: "Managing Partner",
      company: "Strategic Consulting Partners",
      location: "Cape Town, RSA",
      avatar: "JM",
      metrics: [
        { label: "Client Retention", value: "+95%" },
        { label: "Response Quality", value: "4.8/5" },
        { label: "Team Productivity", value: "+70%" }
      ],
      industry: "Professional Services"
    }
  ];

  const stats = [
    { label: "Active Customers", value: "200+", change: "+40% this quarter" },
    { label: "Messages Handled", value: "1M+", change: "Monthly volume" },
    { label: "Average Response Time", value: "2 min", change: "Industry leading" },
    { label: "Customer Satisfaction", value: "95%", change: "NPS Score" },
    { label: "Cost Reduction", value: "75%", change: "Average savings" },
    { label: "ROI Timeline", value: "3 months", change: "Typical payback" }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Real Results from Real Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Join hundreds of businesses across MEA and globally that are transforming their customer experience with WhatsApp automation.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Success Stories CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              See how WhatsApp CX Copilot can transform your business with a personalized demo and ROI analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Your Demo
              </Link>
              <Link
                href="/case-studies"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
