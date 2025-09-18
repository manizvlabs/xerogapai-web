'use client';
import React from 'react';
import { useContent } from '@/hooks/useContent';

export default function BlogPage() {
  const { content, loading, error } = useContent('blog');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading blog page content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <p className="text-red-800">Error loading content: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Our Blog",
      subtitle: "Insights, tips, and strategies for digital transformation, AI automation, and business growth."
    },
    posts: [
      {
        title: 'The Future of AI in Business: 5 Trends to Watch in 2024',
        excerpt: 'Explore the latest AI trends that are reshaping how businesses operate and compete in the digital landscape.',
        date: 'December 15, 2024',
        category: 'AI & Automation',
        readTime: '5 min read'
      },
      {
        title: 'How to Choose the Right Mobile App Development Approach',
        excerpt: 'Native vs Cross-platform: A comprehensive guide to help you make the best decision for your mobile app project.',
        date: 'December 10, 2024',
        category: 'Mobile Development',
        readTime: '7 min read'
      },
      {
        title: 'Digital Marketing Automation: A Complete Guide for Indian Businesses',
        excerpt: 'Learn how to automate your digital marketing efforts and scale your business growth with proven strategies.',
        date: 'December 5, 2024',
        category: 'Digital Marketing',
        readTime: '6 min read'
      },
      {
        title: 'Building AI Agents: From Concept to Deployment',
        excerpt: 'A step-by-step guide to creating custom AI agents that can automate your business processes effectively.',
        date: 'November 28, 2024',
        category: 'AI & Automation',
        readTime: '8 min read'
      }
    ],
    categories: ['All', 'AI & Automation', 'Mobile Development', 'Digital Marketing', 'Business Strategy'],
    newsletter: {
      title: "Stay Updated",
      description: "Get the latest insights on AI automation, digital marketing, and business growth delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    posts: content?.posts || defaultContent.posts,
    categories: content?.categories || defaultContent.categories,
    newsletter: content?.newsletter || defaultContent.newsletter
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {(pageContent.hero as any).title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.hero as any).subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {(pageContent.categories as any)?.map((category: string) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {(pageContent.posts as any)?.map((post: { title: string; category: string; date: string; readTime: string; excerpt: string; author: string }) => (
                <article key={post.title} className="flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200">
                  <div className="p-8">
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="relative z-10 rounded-full bg-blue-600 px-3 py-1.5 font-medium text-white">
                        {post.category}
                      </span>
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-blue-600">
                        <a href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex items-center gap-x-4">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">MK</span>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900 dark:text-white">Manish Kumar</p>
                          <p className="text-gray-600 dark:text-gray-300">Founder, Zero Digital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {(pageContent.newsletter as any).title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              {(pageContent.newsletter as any).description}
            </p>
            <form className="mt-10 flex max-w-md gap-x-4 mx-auto">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white dark:bg-gray-900/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/70 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder={(pageContent.newsletter as any).placeholder}
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {(pageContent.newsletter as any).buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
