// Content Management System
// This file contains all editable content for the website
// Edit this file to update content without breaking the build

export const contentConfig = {
  // Homepage Content
  homepage: {
    hero: {
      title: "AI-Powered Digital Transformation for Businesses",
      subtitle: "Transform your business with cutting-edge AI automation, custom mobile apps, and digital solutions. From startups to enterprises, we help you scale efficiently with AI-driven innovation.",
      cta: {
        primary: "Get Started",
        secondary: "Learn more"
      }
    },
    stats: [
      { name: 'Projects Completed', value: '50+' },
      { name: 'Hours Saved Weekly', value: '500+' },
      { name: 'Client Satisfaction', value: '98%' },
      { name: 'AI Agents Deployed', value: '25+' }
    ],
    services: [
      {
        name: 'AI Content Automation',
        description: 'Automated LinkedIn, Instagram, Facebook, and blog content generation using AI agents. Save 20+ hours per week with personalized content for your brand.',
        icon: 'SparklesIcon'
      },
      {
        name: 'Mobile App Development',
        description: 'Custom mobile applications for iOS and Android. From concept to App Store deployment with modern UI/UX design.',
        icon: 'DevicePhoneMobileIcon'
      },
      {
        name: 'Digital Transformation',
        description: 'Complete digital overhaul of your business processes, systems, and customer experience. Tailored solutions for businesses.',
        icon: 'ChartBarIcon'
      },
      {
        name: 'AI Agent Development',
        description: 'Custom AI agents for specific business needs. Automation that works 24/7 for your business, from chatbots to workflow automation.',
        icon: 'CpuChipIcon'
      }
    ],
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Join 50+ businesses that have already transformed their operations with our AI-powered solutions. Let's discuss your project and see how we can help you achieve your digital transformation goals.",
      cta: {
        primary: "Get started today",
        secondary: "Learn more about us"
      }
    }
  },

  // About Page Content
  about: {
    hero: {
      title: "About VyaptIX AI",
      subtitle: "We're a team of passionate technologists dedicated to transforming businesses through AI-powered solutions."
    },
    values: [
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
    ],
    team: [
      {
        name: 'Manish Kumar',
        title: 'Founder & Solutions Architect',
        description: '5+ years experience in enterprise solutions, AI automation, and digital transformation.',
        image: '/api/placeholder/150/150'
      }
    ],
    stats: [
      { label: 'Years of Experience', value: '5+' },
      { label: 'Projects Delivered', value: '50+' },
      { label: 'Happy Clients', value: '25+' },
      { label: 'AI Agents Deployed', value: '15+' }
    ]
  },

  // Services Page Content
  services: {
    hero: {
      title: "Our Services",
      subtitle: "Comprehensive digital transformation solutions designed to accelerate your business growth. From AI automation to mobile apps, we've got you covered."
    },
    services: [
      {
        name: 'AI Content Automation',
        description: 'Automated LinkedIn, Instagram, Facebook, and blog content generation using AI agents. Save 20+ hours per week with personalized content for your brand.',
        icon: 'SparklesIcon',
        features: [
          'Automated content generation for all social platforms',
          'Brand voice consistency across all channels',
          'SEO-optimized content creation',
          'Analytics and performance tracking'
        ],
        deliverables: [
          'Content calendar for 3 months',
          'AI-generated posts (30+ per month)',
          'Visual content templates',
          'Performance reports',
          'Content strategy consultation'
        ],
        price: '₹25,000/month',
        pricing: 'Starting from ₹25,000/month'
      },
      {
        name: 'Mobile App Development',
        description: 'Custom mobile applications for iOS and Android. From concept to App Store deployment with modern UI/UX design.',
        icon: 'DevicePhoneMobileIcon',
        features: [
          'Native iOS and Android development',
          'Cross-platform solutions with React Native',
          'App Store optimization and deployment',
          'Ongoing maintenance and updates'
        ],
        deliverables: [
          'Fully functional mobile application',
          'Source code and documentation',
          'App store listings and assets',
          'User testing and feedback integration',
          '6 months of maintenance support'
        ],
        price: '₹50,000 - ₹2,00,000',
        pricing: 'Starting from ₹1,50,000'
      },
      {
        name: 'Digital Transformation',
        description: 'Complete digital overhaul of your business processes, systems, and customer experience. Tailored solutions for businesses.',
        icon: 'ChartBarIcon',
        features: [
          'Business process automation',
          'Legacy system modernization',
          'Cloud migration and optimization',
          'Change management and training'
        ],
        deliverables: [
          'Digital transformation roadmap',
          'Modernized business processes',
          'Cloud infrastructure setup',
          'Staff training and documentation',
          'Ongoing support and optimization'
        ],
        price: 'Custom pricing',
        pricing: 'Custom pricing based on scope'
      },
      {
        name: 'AI Agent Development',
        description: 'Custom AI agents for specific business needs. Automation that works 24/7 for your business, from chatbots to workflow automation.',
        icon: 'CpuChipIcon',
        features: [
          'Custom AI agent development',
          'Integration with existing systems',
          '24/7 monitoring and maintenance',
          'Performance optimization'
        ],
        deliverables: [
          'Custom AI agent solution',
          'Integration with your systems',
          'Training and documentation',
          'API endpoints and documentation',
          '3 months of support and optimization'
        ],
        price: '₹75,000 - ₹3,00,000',
        pricing: 'Starting from ₹50,000'
      }
    ]
  },

  // Portfolio Content
  portfolio: {
    hero: {
      title: "Our Portfolio",
      subtitle: "Explore our successful projects and see how we've helped businesses transform through technology."
    },
    projects: [
      {
        name: 'E-commerce Mobile App',
        description: 'Cross-platform mobile app for a retail business with AI-powered product recommendations.',
        category: 'Mobile App Development',
        image: '/api/placeholder/400/300',
        technologies: ['React Native', 'Node.js', 'AI/ML'],
        results: '40% increase in mobile sales',
        client: 'Retail Chain (Confidential)',
        duration: '3 months'
      },
      {
        name: 'AI Content Automation System',
        description: 'Automated content generation system for a digital marketing agency.',
        category: 'AI Automation',
        image: '/api/placeholder/400/300',
        technologies: ['Python', 'OpenAI API', 'Automation'],
        results: '80% reduction in content creation time',
        client: 'Digital Marketing Agency',
        duration: '2 months'
      },
      {
        name: 'Digital Marketing Dashboard',
        description: 'Comprehensive analytics dashboard for multi-channel marketing campaigns.',
        category: 'Digital Marketing',
        image: '/api/placeholder/400/300',
        technologies: ['React', 'Google Analytics', 'Data Visualization'],
        results: '60% improvement in campaign ROI',
        client: 'E-commerce Company',
        duration: '4 months'
      }
    ]
  },

  // Blog Content
  blog: {
    hero: {
      title: "Our Blog",
      subtitle: "Insights, tips, and trends in AI automation, mobile development, and digital transformation."
    },
    posts: [
      {
        title: 'The Future of AI in Business: 5 Trends to Watch in 2024',
        excerpt: 'Explore the latest AI trends that are reshaping how businesses operate and compete in the digital landscape.',
        date: 'December 15, 2024',
        category: 'AI & Automation',
        readTime: '5 min read',
        slug: 'future-ai-business-trends-2024'
      },
      {
        title: 'How to Choose the Right Mobile App Development Approach',
        excerpt: 'Native vs Cross-platform: A comprehensive guide to help you make the best decision for your mobile app project.',
        date: 'December 10, 2024',
        category: 'Mobile Development',
        readTime: '7 min read',
        slug: 'mobile-app-development-approach-guide'
      },
      {
        title: 'Digital Marketing Automation: A Complete Guide for Businesses',
        excerpt: 'Learn how to automate your digital marketing efforts and scale your business growth with proven strategies.',
        date: 'December 5, 2024',
        category: 'Digital Marketing',
        readTime: '6 min read',
        slug: 'digital-marketing-automation-indian-businesses'
      },
      {
        title: 'Building AI Agents: From Concept to Deployment',
        excerpt: 'A step-by-step guide to creating custom AI agents that can automate your business processes effectively.',
        date: 'November 28, 2024',
        category: 'AI & Automation',
        readTime: '8 min read',
        slug: 'building-ai-agents-concept-deployment'
      }
    ],
    categories: ['All', 'AI & Automation', 'Mobile Development', 'Digital Marketing', 'Business Strategy']
  },

  // Contact Page Content
  contact: {
    hero: {
      title: "Contact Sales",
      subtitle: "Ready to transform your business? Get in touch with our team to discuss your project and see how we can help you achieve your digital transformation goals."
    },
    form: {
      title: "Let's Start Your Digital Transformation Journey",
      subtitle: "Fill out the form below and we'll get back to you within 24 hours to discuss your project requirements."
    },
    info: {
      title: "Get in Touch",
      subtitle: "We're here to help you succeed. Reach out to us through any of these channels."
    }
  },

  // Documentation Content
  docs: {
    hero: {
      title: "Documentation",
      subtitle: "Everything you need to know about our products and services."
    },
    sections: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        icon: '🚀',
        items: [
          {
            title: 'Quick Start Guide',
            description: 'Get up and running with our platform in minutes',
            slug: 'quick-start',
            readTime: '5 min'
          },
          {
            title: 'Installation',
            description: 'Step-by-step installation instructions',
            slug: 'installation',
            readTime: '3 min'
          },
          {
            title: 'Authentication',
            description: 'Learn about our authentication methods',
            slug: 'authentication',
            readTime: '4 min'
          },
          {
            title: 'First API Call',
            description: 'Make your first API call',
            slug: 'first-api-call',
            readTime: '2 min'
          }
        ]
      },
      {
        id: 'api-reference',
        title: 'API Reference',
        icon: '🔌',
        items: [
          {
            title: 'REST API Overview',
            description: 'Overview of our REST API',
            slug: 'api/overview',
            readTime: '8 min'
          },
          {
            title: 'Authentication Endpoints',
            description: 'API endpoints for authentication',
            slug: 'api/auth',
            readTime: '6 min'
          },
          {
            title: 'Workflow Endpoints',
            description: 'API endpoints for workflow management',
            slug: 'api/workflows',
            readTime: '10 min'
          },
          {
            title: 'Analytics Endpoints',
            description: 'API endpoints for analytics',
            slug: 'api/analytics',
            readTime: '7 min'
          }
        ]
      },
      {
        id: 'integrations',
        title: 'Integrations',
        icon: '🔗',
        items: [
          {
            title: 'Notion Integration',
            description: 'Connect with Notion',
            slug: 'integrations/notion',
            readTime: '12 min'
          },
          {
            title: 'CRM Connectors',
            description: 'Connect with popular CRM systems',
            slug: 'integrations/crm',
            readTime: '15 min'
          },
          {
            title: 'Email Platforms',
            description: 'Integrate with email services',
            slug: 'integrations/email',
            readTime: '8 min'
          }
        ]
      },
      {
        id: 'solutions',
        title: 'Solution Guides',
        icon: '💡',
        items: [
          {
            title: 'VyaptIX AI Implementation',
            description: 'Implement VyaptIX AI in your workflow',
            slug: 'solutions/VyaptIX-ai',
            readTime: '20 min'
          },
          {
            title: 'Sales Automation Setup',
            description: 'Set up sales automation',
            slug: 'solutions/sales-automation',
            readTime: '18 min'
          },
          {
            title: 'Contact Center QA',
            description: 'Quality assurance for contact centers',
            slug: 'solutions/contact-center',
            readTime: '16 min'
          }
        ]
      }
    ]
  }
};

// Content validation function
export function validateContent(content: Record<string, unknown>): boolean {
  try {
    // Basic validation - check if required fields exist
    if (!content.homepage || !content.about || !content.services) {
      return false;
    }
    
    // Add more specific validations as needed
    return true;
  } catch (error) {
    console.error('Content validation failed:', error);
    return false;
  }
}

// Content update helper
export function updateContent(section: string, key: string, value: unknown): void {
  console.log(`Updating content: ${section}.${key} = ${value}`);
  // In a real implementation, this would update the content file
  // For now, it's just a placeholder for documentation
}
