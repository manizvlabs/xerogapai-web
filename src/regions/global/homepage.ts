// Global Homepage Content - XeroGap AI
// USD Pricing - MEA/US Focus

export const globalHomepageContent = {
  // Header
  header: {
    logo: "XeroGap AI",
    navigation: [
      { name: "Services", href: "/services" },
      { name: "WhatsApp CX", href: "/whatsapp-cx" },
      { name: "XeroGap AI", href: "/xerogap-ai" },
      { name: "Enterprise Copilots", href: "/enterprise-copilots" },
      { name: "Sales Automation", href: "/sales-automation" },
      { name: "Contact Center AI", href: "/contact-center-ai" },
      { name: "DPDP Compliance", href: "/dpdp-compliance" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Docs", href: "/docs" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" }
    ],
    cta: "Get Free AI Assessment"
  },

  // Hero Section
  hero: {
    headline: "Accelerate Your Business with AI Automation",
    subheadline: "From WhatsApp CX to Enterprise Copilots - discover which AI solutions will transform your operations",
    valueProps: [
      {
        icon: "🎯",
        title: "AI Readiness Assessment",
        description: "Free $500 assessment to identify your automation opportunities"
      },
      {
        icon: "⚡",
        title: "Quick Implementation",
        description: "Deploy in days, not months with our expert team"
      },
      {
        icon: "📈",
        title: "Measurable ROI",
        description: "Track performance with comprehensive analytics"
      }
    ],
    primaryCTA: {
      text: "Get Free AI Readiness Assessment",
      subtext: "($500 value - No credit card required)",
      href: "/assessment"
    },
    secondaryCTA: {
      text: "Book Personalized Demo",
      href: "/demo"
    }
  },

  // Services Section
  services: {
    sectionTitle: "Comprehensive AI Solutions for Every Business Need",
    services: [
      {
        id: "whatsapp-cx",
        title: "WhatsApp CX Copilot",
        subtitle: "Transform customer conversations into revenue opportunities",
        features: [
          "Unified WhatsApp inbox management",
          "AI-powered responses for common queries",
          "Automated tagging and escalation",
          "Real-time analytics dashboard"
        ],
        pricing: {
          starting: "$500/month",
          popular: true
        },
        cta: "Learn More",
        href: "/whatsapp-cx"
      },
      {
        id: "xerogap-ai",
        title: "XeroGap AI Workflow Automation",
        subtitle: "Streamline operations with AI-powered workspace automation",
        features: [
          "Auto-summarize meeting transcripts",
          "Generate weekly reports from workspace data",
          "Intelligent notifications and status updates",
          "Connect Notion with your business tools"
        ],
        pricing: {
          starting: "$300/month",
          popular: false
        },
        cta: "Learn More",
        href: "/xerogap-ai"
      },
      {
        id: "enterprise-copilots",
        title: "Enterprise Knowledge Copilots",
        subtitle: "Multi-lingual Q&A over company documents",
        features: [
          "Private knowledge base with AI search",
          "Compliance-aware responses",
          "Audit trails and access controls",
          "Multi-language support"
        ],
        pricing: {
          starting: "$800/month",
          popular: false
        },
        cta: "Learn More",
        href: "/enterprise-copilots"
      },
      {
        id: "sales-automation",
        title: "Sales Intelligence Automation",
        subtitle: "AI-powered prospect research and outreach",
        features: [
          "Automated lead intelligence gathering",
          "Personalized outreach campaigns",
          "CRM integration and tracking",
          "Performance analytics"
        ],
        pricing: {
          starting: "$600/month",
          popular: false
        },
        cta: "Learn More",
        href: "/sales-automation"
      },
      {
        id: "contact-center-ai",
        title: "Contact Center QA & Coaching",
        subtitle: "AI-driven call quality and agent development",
        features: [
          "Automated call scoring and analysis",
          "Compliance monitoring",
          "Personalized coaching recommendations",
          "Performance tracking"
        ],
        pricing: {
          starting: "$700/month",
          popular: false
        },
        cta: "Learn More",
        href: "/contact-center-ai"
      },
      {
        id: "dpdp-compliance",
        title: "DPDP Compliance Solutions",
        subtitle: "Complete data protection and privacy compliance",
        features: [
          "GDPR & DPDP compliance assessment",
          "Data mapping and gap analysis",
          "Compliance automation tools",
          "Regular audit and reporting"
        ],
        pricing: {
          starting: "$1,000/month",
          popular: false
        },
        cta: "Learn More",
        href: "/dpdp-compliance"
      }
    ]
  },

  // Social Proof Section
  socialProof: {
    sectionTitle: "Trusted by Growing Businesses Worldwide",
    testimonials: [
      {
        quote: "XeroGap AI's WhatsApp automation cut our response time from 6 hours to 2 minutes. Customer satisfaction jumped 85% in just 3 weeks.",
        author: "Ahmed Al-Rashid",
        position: "CEO, Al-Mansoori Retail Group",
        location: "Dubai, UAE",
        metrics: {
          responseTime: "6h → 2min",
          satisfaction: "+85%",
          conversion: "+200%"
        }
      },
      {
        quote: "The Notion automation saved our team 20 hours per week. Now we focus on growth, not manual tasks.",
        author: "Grace Wanjiku",
        position: "Founder, TechSavvy Solutions",
        location: "Nairobi, Kenya",
        metrics: {
          timeSaved: "20h/week",
          productivity: "+40%",
          focus: "+60%"
        }
      },
      {
        quote: "Sales intelligence automation increased our qualified leads by 150%. The ROI was clear from day one.",
        author: "Marcus van der Merwe",
        position: "Sales Director, Industrial Solutions SA",
        location: "Johannesburg, South Africa",
        metrics: {
          leads: "+150%",
          cycle: "-40%",
          conversion: "+90%"
        }
      }
    ]
  },

  // Partners Section
  partners: {
    sectionTitle: "Integrated with Leading Business Tools",
    partners: [
      { name: "WhatsApp Business", logo: "/logos/whatsapp.svg" },
      { name: "Notion", logo: "/logos/notion.png" },
      { name: "Zoho CRM", logo: "/logos/zoho.png" },
      { name: "Google Workspace", logo: "/logos/google.svg" },
      { name: "Microsoft Teams", logo: "/logos/microsoft.png" }
    ]
  },

  // Compliance Section
  compliance: {
    sectionTitle: "Enterprise-Grade Security & Compliance",
    badges: [
      { name: "ISO 27001 Certified", icon: "🔒" },
      { name: "SOC 2 Compliant", icon: "🛡️" },
      { name: "GDPR Ready", icon: "🌐" },
      { name: "DPDP Compliant", icon: "🇮🇳" }
    ],
    message: "Your data is protected with bank-level security and global compliance standards."
  },

  // Final CTA Section
  finalCTA: {
    sectionTitle: "Ready to Transform Your Business with AI?",
    content: "Join hundreds of businesses worldwide using XeroGap AI to automate operations and accelerate growth.",
    offers: [
      "Free AI Readiness Assessment ($500 value)",
      "No long-term commitments",
      "Cancel anytime"
    ],
    primaryCTA: {
      text: "Get Free Assessment Now",
      href: "/assessment"
    },
    secondaryCTA: {
      text: "Book Personalized Demo",
      href: "/demo"
    }
  },

  // Footer
  footer: {
    company: {
      name: "XeroGap AI",
      tagline: "Global AI Solutions for Growing Businesses",
      subtitle: "Specializing in Middle East, Africa, and US Markets"
    },
    contact: {
      email: "hello@xerogap.ai",
      phone: "+1 (555) 123-4567",
      address: "Global Headquarters"
    },
    links: {
      services: [
        { name: "WhatsApp CX Copilot", href: "/whatsapp-cx" },
        { name: "XeroGap AI", href: "/xerogap-ai" },
        { name: "Enterprise Copilots", href: "/enterprise-copilots" },
        { name: "Sales Automation", href: "/sales-automation" },
        { name: "Contact Center AI", href: "/contact-center-ai" },
        { name: "DPDP Compliance", href: "/dpdp-compliance" }
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Careers", href: "/careers" },
        { name: "Consultation", href: "/consultation" }
      ],
      support: [
        { name: "Contact", href: "/contact" },
        { name: "Help Center", href: "/help" },
        { name: "API Docs", href: "/docs" },
        { name: "Assessment", href: "/assessment" },
        { name: "Demo", href: "/demo" }
      ]
    },
    newsletter: {
      title: "Stay Ahead of AI Trends",
      subtitle: "Get weekly insights on AI automation for business growth.",
      placeholder: "Enter your email",
      button: "Subscribe"
    },
    social: [
      { name: "LinkedIn", href: "https://linkedin.com/company/xerogap-ai", icon: "linkedin" },
      { name: "Twitter", href: "https://twitter.com/xerogap_ai", icon: "twitter" },
      { name: "YouTube", href: "https://youtube.com/@xerogap-ai", icon: "youtube" }
    ],
    copyright: "© 2025 XeroGap AI. All rights reserved."
  }
};

export default globalHomepageContent;
