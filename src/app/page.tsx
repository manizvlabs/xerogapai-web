import Link from 'next/link';
import { SparklesIcon, DevicePhoneMobileIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { contentConfig } from '@/config/content';

export default function Home() {
  const { homepage } = contentConfig;
  
  // Map icon names to actual components
  const iconMap = {
    SparklesIcon,
    DevicePhoneMobileIcon,
    ChartBarIcon,
    CpuChipIcon,
  };

  const services = homepage.services.map(service => ({
    ...service,
    icon: iconMap[service.icon as keyof typeof iconMap],
  }));

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl animate-fade-in text-gradient">
              {homepage.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-slide-up animate-stagger-1">
              {homepage.hero.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up animate-stagger-2">
              <Link
                href="/contact"
                className="rounded-md bg-blue-600 dark:bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors hover-lift hover-glow"
              >
                {homepage.hero.cta.primary}
              </Link>
              <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale">
                {homepage.hero.cta.secondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {homepage.stats.map((stat, index) => (
              <div key={stat.name} className={`mx-auto flex max-w-xs flex-col gap-y-4 animate-bounce-in animate-stagger-${index + 1} hover-lift`}>
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Solutions for Every Business Size
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Whether you&apos;re a startup, small business, or enterprise in Hyderabad, we provide AI-powered
              digital solutions that scale with your growth and maximize your ROI.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {services.map((service, index) => (
                <div key={service.name} className={`flex flex-col animate-slide-up animate-stagger-${index + 1} hover-lift p-6 rounded-lg border border-gray-200 dark:border-gray-700`}>
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <service.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400 hover-scale" aria-hidden="true" />
                    {service.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{service.description}</p>
                    <p className="mt-6">
                      <Link href="/services" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors hover-scale">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-fade-in">
              {homepage.cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-200 dark:text-blue-100 animate-slide-up animate-stagger-1">
              {homepage.cta.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up animate-stagger-2">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors hover-lift hover-glow animate-bounce-in"
              >
                {homepage.cta.cta.primary}
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-gray-100 transition-colors hover-scale">
                {homepage.cta.cta.secondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}