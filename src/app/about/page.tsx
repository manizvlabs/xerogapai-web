import { CheckIcon } from '@heroicons/react/24/outline';

export default function About() {
  const values = [
    {
      name: 'Innovation First',
      description: 'We stay at the forefront of technology, always exploring new ways to solve business challenges with cutting-edge solutions.'
    },
    {
      name: 'Client Success',
      description: 'Your success is our success. We measure our achievements by the growth and satisfaction of our clients.'
    },
    {
      name: 'Transparency',
      description: 'Complete transparency in pricing, timelines, and processes. No hidden costs or surprises.'
    },
    {
      name: 'Quality Delivery',
      description: 'We deliver high-quality solutions that exceed expectations and provide long-term value.'
    }
  ];

  const team = [
    {
      name: 'Manish Kumar',
      title: 'Founder & Solutions Architect',
      description: '5+ years experience in enterprise solutions, AI automation, and digital transformation. Based in Hyderabad.',
      image: '/api/placeholder/150/150'
    }
  ];

  const stats = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Delivered', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'AI Agents Deployed', value: '15+' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Zero Digital
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're passionate about helping businesses transform through AI automation, digital solutions, 
              and innovative technology. Based in Hyderabad, serving clients across India and globally.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  To democratize AI and digital transformation for businesses of all sizes. We believe that 
                  every company, regardless of size or budget, should have access to cutting-edge technology 
                  that can accelerate their growth and success.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our approach combines deep technical expertise with business acumen, ensuring that every 
                  solution we deliver not only works technically but also drives real business value.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-x-3">
                    <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Proven track record with 50+ successful projects</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Transparent pricing with no hidden costs</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Agile development process with regular updates</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Post-delivery support and maintenance</span>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <CheckIcon className="h-6 w-6 flex-none text-blue-600 mt-0.5" />
                    <span className="text-gray-600">Free consultation and project planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The passionate individuals behind Zero Digital
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-1">
              {team.map((person) => (
                <div key={person.name} className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">MK</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">{person.name}</h3>
                  <p className="mt-2 text-base text-blue-600">{person.title}</p>
                  <p className="mt-4 text-base text-gray-600 max-w-md">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Impact
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Numbers that speak to our commitment and success
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-blue-100">{stat.label}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to work with us?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Let's discuss your project and see how we can help transform your business with AI and digital solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Get Started
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                View Services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
