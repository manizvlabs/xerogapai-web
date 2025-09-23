export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
  nofollow?: boolean;
}

export class SEOService {
  private static instance: SEOService;

  private constructor() {}

  static getInstance(): SEOService {
    if (!SEOService.instance) {
      SEOService.instance = new SEOService();
    }
    return SEOService.instance;
  }

  getPageSEO(pathname: string): SEOConfig {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xerogap.ai';

    const seoConfigs: Record<string, SEOConfig> = {
      '/': {
        title: 'XeroGap AI - Transform Your Business with Intelligent Automation',
        description: 'Leading AI automation solutions for businesses. From WhatsApp CX to Enterprise Copilots - discover how AI can transform your operations and boost efficiency.',
        keywords: ['AI automation', 'business automation', 'WhatsApp CX', 'enterprise AI', 'workflow automation', 'AI assessment'],
        canonical: `${baseUrl}/`,
        ogTitle: 'XeroGap AI - Intelligent Business Automation Solutions',
        ogDescription: 'Transform your business with cutting-edge AI automation. Get your free AI readiness assessment and discover the perfect solutions for your needs.',
        ogImage: `${baseUrl}/og-image-home.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        structuredData: this.getHomepageStructuredData()
      },

      '/assessment': {
        title: 'Free AI Readiness Assessment - XeroGap AI',
        description: 'Take our comprehensive AI readiness assessment ($500 value - FREE). Discover which automation solutions will drive the most impact for your business.',
        keywords: ['AI assessment', 'automation readiness', 'business AI', 'AI evaluation', 'automation assessment'],
        canonical: `${baseUrl}/assessment`,
        ogTitle: 'Free AI Readiness Assessment - Discover Your Automation Potential',
        ogDescription: 'Get a personalized AI readiness report and implementation roadmap. Identify automation opportunities and maximize ROI.',
        ogImage: `${baseUrl}/og-image-assessment.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        structuredData: this.getAssessmentStructuredData()
      },

      '/services': {
        title: 'AI Automation Services - WhatsApp CX, Enterprise Copilots & More',
        description: 'Comprehensive AI automation services including WhatsApp CX, Enterprise Copilots, Sales Automation, Contact Center AI, and DPDP Compliance solutions.',
        keywords: ['AI services', 'automation services', 'WhatsApp automation', 'enterprise AI', 'sales automation'],
        canonical: `${baseUrl}/services`,
        ogTitle: 'AI Automation Services - Transform Your Business Operations',
        ogDescription: 'Explore our comprehensive suite of AI automation solutions designed to boost efficiency and drive growth.',
        ogImage: `${baseUrl}/og-image-services.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        structuredData: this.getServicesStructuredData()
      },

      '/whatsapp-cx': {
        title: 'WhatsApp CX Automation - Transform Customer Communication',
        description: 'Automate WhatsApp customer service with AI. Handle 10,000+ inquiries monthly, reduce response time by 85%, and boost customer satisfaction.',
        keywords: ['WhatsApp automation', 'customer service AI', 'WhatsApp CX', 'business messaging', 'AI chatbot'],
        canonical: `${baseUrl}/whatsapp-cx`,
        ogTitle: 'WhatsApp CX Automation - Revolutionize Customer Service',
        ogDescription: 'Transform customer communication with AI-powered WhatsApp automation. 85% faster responses, 24/7 availability.',
        ogImage: `${baseUrl}/og-image-whatsapp.jpg`,
        ogType: 'product',
        twitterCard: 'summary_large_image',
        structuredData: this.getWhatsAppCXStructuredData()
      },

      '/xerogap-ai': {
        title: 'XeroGap AI - Intelligent Workflow Automation',
        description: 'Connect Notion, Slack, and business tools with intelligent workflow automation. Auto-summarize meetings, generate reports, and streamline operations.',
        keywords: ['workflow automation', 'Notion automation', 'Slack automation', 'business automation', 'AI workflow'],
        canonical: `${baseUrl}/xerogap-ai`,
        ogTitle: 'XeroGap AI - Smart Workflow Automation for Modern Teams',
        ogDescription: 'Automate repetitive tasks and boost productivity with AI-powered workflow solutions.',
        ogImage: `${baseUrl}/og-image-xerogap.jpg`,
        ogType: 'product',
        twitterCard: 'summary_large_image',
        structuredData: this.getXeroGapStructuredData()
      },

      '/enterprise-copilots': {
        title: 'Enterprise Knowledge Copilots - AI-Powered Internal Assistance',
        description: 'Multi-lingual knowledge copilots for enterprises. Instant access to company documentation with compliance and security built-in.',
        keywords: ['enterprise AI', 'knowledge management', 'AI assistant', 'enterprise copilot', 'internal AI'],
        canonical: `${baseUrl}/enterprise-copilots`,
        ogTitle: 'Enterprise Knowledge Copilots - Smart Internal AI Assistance',
        ogDescription: 'Transform internal knowledge access with AI-powered copilots. Multi-lingual, compliant, and secure.',
        ogImage: `${baseUrl}/og-image-enterprise.jpg`,
        ogType: 'product',
        twitterCard: 'summary_large_image',
        structuredData: this.getEnterpriseCopilotsStructuredData()
      },

      '/blog': {
        title: 'AI Insights & Automation Strategies - XeroGap AI Blog',
        description: 'Stay ahead of AI innovation with expert insights, implementation guides, and success stories from the world of intelligent automation.',
        keywords: ['AI blog', 'automation insights', 'AI trends', 'business automation', 'AI implementation'],
        canonical: `${baseUrl}/blog`,
        ogTitle: 'AI Insights & Automation Strategies - Expert Guidance',
        ogDescription: 'Weekly insights on AI automation trends, implementation strategies, and real-world success stories.',
        ogImage: `${baseUrl}/og-image-blog.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        structuredData: this.getBlogStructuredData()
      },

      '/case-studies': {
        title: 'AI Success Stories & Case Studies - Real Results',
        description: 'Discover how businesses across industries have transformed operations with AI automation. Real results, measurable ROI, and proven success.',
        keywords: ['AI case studies', 'automation success', 'business transformation', 'AI ROI', 'automation results'],
        canonical: `${baseUrl}/case-studies`,
        ogTitle: 'AI Success Stories - Real Business Transformations',
        ogDescription: 'See how companies like yours have achieved 75%+ efficiency gains with AI automation.',
        ogImage: `${baseUrl}/og-image-case-studies.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        structuredData: this.getCaseStudiesStructuredData()
      }
    };

    return seoConfigs[pathname] || this.getDefaultSEO(pathname);
  }

  private getDefaultSEO(pathname: string): SEOConfig {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xerogap.ai';

    return {
      title: 'XeroGap AI - Intelligent Business Automation',
      description: 'Transform your business with AI automation solutions. From WhatsApp CX to Enterprise Copilots - discover the power of intelligent automation.',
      keywords: ['AI automation', 'business automation', 'artificial intelligence', 'workflow automation'],
      canonical: `${baseUrl}${pathname}`,
      ogTitle: 'XeroGap AI - Intelligent Business Automation',
      ogDescription: 'Transform your business with AI automation solutions.',
      ogImage: `${baseUrl}/og-image-default.jpg`,
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
  }

  private getHomepageStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'XeroGap AI',
      url: 'https://xerogap.ai',
      logo: 'https://xerogap.ai/logo.png',
      description: 'Leading AI automation solutions for businesses worldwide',
      sameAs: [
        'https://linkedin.com/company/xerogap-ai',
        'https://twitter.com/xerogap_ai'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi']
      },
      serviceArea: {
        '@type': 'Country',
        name: ['Asia', 'Middle East', 'Africa', 'Europe', 'United States']
      }
    };
  }

  private getAssessmentStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI Readiness Assessment',
      description: 'Comprehensive AI readiness assessment to identify automation opportunities',
      url: 'https://xerogap.ai/assessment',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Business process analysis',
        'AI readiness scoring',
        'Implementation roadmap',
        'ROI projections',
        'Service recommendations'
      ]
    };
  }

  private getServicesStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Automation Services',
      description: 'Comprehensive AI automation solutions for businesses',
      provider: {
        '@type': 'Organization',
        name: 'XeroGap AI'
      },
      serviceType: 'AI Automation',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Automation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'WhatsApp CX Automation',
              description: 'AI-powered WhatsApp customer service automation'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'XeroGap AI Workflow Automation',
              description: 'Intelligent workflow automation platform'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Enterprise Knowledge Copilots',
              description: 'AI-powered internal knowledge assistance'
            }
          }
        ]
      }
    };
  }

  private getWhatsAppCXStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'WhatsApp CX Automation',
      description: 'AI-powered WhatsApp customer service automation',
      brand: {
        '@type': 'Brand',
        name: 'XeroGap AI'
      },
      offers: {
        '@type': 'Offer',
        priceRange: '$500-$2000',
        availability: 'https://schema.org/InStock'
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Response Time Reduction',
          value: '85%'
        },
        {
          '@type': 'PropertyValue',
          name: 'Customer Satisfaction',
          value: '92%'
        }
      ]
    };
  }

  private getXeroGapStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'XeroGap AI',
      description: 'Intelligent workflow automation platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        priceRange: '$300-$1000',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  private getEnterpriseCopilotsStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Enterprise Knowledge Copilots',
      description: 'AI-powered internal knowledge assistance for enterprises',
      brand: {
        '@type': 'Brand',
        name: 'XeroGap AI'
      },
      offers: {
        '@type': 'Offer',
        priceRange: '$800-$3000',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  private getBlogStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'XeroGap AI Blog',
      description: 'AI insights and automation strategies',
      url: 'https://xerogap.ai/blog',
      publisher: {
        '@type': 'Organization',
        name: 'XeroGap AI'
      }
    };
  }

  private getCaseStudiesStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI Success Stories',
      description: 'Case studies of successful AI implementations',
      url: 'https://xerogap.ai/case-studies'
    };
  }

  generateSitemap(pages: string[]): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xerogap.ai';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  }

  generateRobotsTxt(): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xerogap.ai';

    return `User-agent: *
Allow: /

# Block access to admin areas
Disallow: /admin/
Disallow: /api/admin/

# Allow access to sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;
  }
}

export const seoService = SEOService.getInstance();
