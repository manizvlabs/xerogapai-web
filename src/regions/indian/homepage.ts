// Indian Homepage Content - XeroGap AI
// INR Pricing - India Focus

export const indianHomepageContent = {
  // Header
  header: {
    logo: "XeroGap AI",
    navigation: [
      { name: "Services", href: "/services" },
      { name: "Solutions", href: "/solutions" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" }
    ],
    cta: "Get Free AI Assessment"
  },

  // Hero Section (Localized)
  hero: {
    headline: "Transform Your Business with AI Automation",
    subheadline: "Intelligent AI agents designed for Indian businesses - from startups to enterprises",
    localizedMessage: "🇮🇳 Serving businesses across India with localized AI solutions",
    valueProps: [
      {
        icon: "⚡",
        title: "Quick Implementation",
        description: "Deploy in days, not months"
      },
      {
        icon: "📊",
        title: "Measurable ROI",
        description: "Track performance with clear metrics"
      },
      {
        icon: "🛡️",
        title: "Human-in-the-Loop Safety",
        description: "AI assistance with human oversight"
      }
    ],
    primaryCTA: {
      text: "Get Free AI Consultation",
      subtext: "(₹500 value - No credit card required)",
      href: "/assessment"
    },
    secondaryCTA: {
      text: "Book WhatsApp Demo",
      href: "/demo"
    }
  },

  // Services Section (Localized with INR pricing)
  services: {
    sectionTitle: "AI Solutions for Indian Businesses",
    localizedNote: "All pricing in INR • GST compliant • Local support",
    services: [
      {
        id: "whatsapp-cx",
        title: "WhatsApp CX Copilot",
        subtitle: "Transform customer conversations into revenue opportunities",
        features: [
          "Unified WhatsApp inbox management",
          "AI-powered responses in Hindi & English",
          "Automated tagging and escalation",
          "Real-time analytics dashboard"
        ],
        pricing: {
          starting: "₹40,000/month",
          popular: true
        },
        cta: "Get Started"
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
          starting: "₹25,000/month",
          popular: false
        },
        cta: "Get Started"
      },
      {
        id: "ai-content-services",
        title: "AI-Powered Content Services",
        subtitle: "Professional content creation for Indian businesses",
        features: [
          "Social media posts & reels scripts",
          "Blog writing & SEO content",
          "Email marketing campaigns",
          "Website content optimization"
        ],
        pricing: {
          starting: "₹10,000/month",
          popular: true,
          note: "Perfect for SMBs"
        },
        cta: "View Packages"
      },
      {
        id: "digital-consulting",
        title: "Digital Consulting for Offline Businesses",
        subtitle: "Go digital with expert guidance",
        features: [
          "Website development",
          "WhatsApp automation setup",
          "Social media marketing strategy",
          "Online reputation management"
        ],
        pricing: {
          starting: "₹30,000/starter",
          popular: false,
          note: "One-time setup"
        },
        cta: "Book Consultation"
      },
      {
        id: "linkedin-branding",
        title: "LinkedIn Branding Service",
        subtitle: "Build your professional brand on LinkedIn",
        features: [
          "Content strategy & planning",
          "Post creation & ghostwriting",
          "Profile optimization",
          "Networking strategy"
        ],
        pricing: {
          starting: "₹5,000/month",
          popular: false,
          note: "For professionals"
        },
        cta: "Learn More"
      },
      {
        id: "ai-consulting",
        title: "AI Implementation Consulting",
        subtitle: "Expert guidance to implement AI in your Indian business",
        features: [
          "AI readiness assessment",
          "Custom implementation roadmap",
          "Team training in Hindi/English",
          "Ongoing support & optimization"
        ],
        pricing: {
          starting: "₹1,50,000/project",
          popular: false
        },
        cta: "Book Consultation"
      }
    ]
  },

  // Social Proof Section (Indian testimonials)
  socialProof: {
    sectionTitle: "Trusted by Indian Businesses",
    localizedMessage: "Join 500+ Indian businesses using XeroGap AI",
    testimonials: [
      {
        quote: "XeroGap AI's WhatsApp automation helped us handle 300% more customer inquiries during Diwali season without adding staff.",
        author: "Fatima Al-Zadjali",
        position: "Operations Director, Oman Investments LLC",
        location: "Muscat, Oman",
        metrics: {
          inquiries: "+300%",
          satisfaction: "+40%",
          costSavings: "60%"
        }
      },
      {
        quote: "The AI accurately detects urgent technical issues and escalates them immediately. Our customer satisfaction scores have never been higher.",
        author: "Emeka Okafor",
        position: "Customer Experience Director, Nigeria Telecom Solutions",
        location: "Lagos, Nigeria",
        metrics: {
          accuracy: "95%",
          satisfaction: "+70%",
          resolution: "-60%"
        }
      },
      {
        quote: "From 6-hour delays to instant responses - our customers can't believe the transformation!",
        author: "Ahmed Al-Rashid",
        position: "CEO, Al-Mansoori Retail Group",
        location: "Dubai, UAE",
        metrics: {
          responseTime: "6h → 2min",
          satisfaction: "+85%",
          conversion: "+200%"
        }
      }
    ]
  },

  // Partners Section (India-focused)
  partners: {
    sectionTitle: "Trusted by Indian Businesses & Integrated with Popular Tools",
    partners: [
      { name: "WhatsApp Business", logo: "/logos/whatsapp.svg" },
      { name: "Notion", logo: "/logos/notion.svg" },
      { name: "Razorpay", logo: "/logos/razorpay.svg" },
      { name: "Zoho CRM", logo: "/logos/zoho.svg" },
      { name: "Google Workspace", logo: "/logos/google.svg" },
      { name: "Microsoft Teams", logo: "/logos/microsoft.svg" }
    ],
    localizedPartners: [
      "🏪 Local Retail Chains",
      "🏥 Healthcare Providers",
      "🏢 Real Estate Companies",
      "💼 Professional Services",
      "🏫 Educational Institutions"
    ]
  },

  // Compliance Section (India-focused)
  compliance: {
    sectionTitle: "Indian Business Compliance & Security",
    badges: [
      { name: "ISO 27001 Certified", icon: "🔒" },
      { name: "SOC 2 Compliant", icon: "🛡️" },
      { name: "GDPR Ready", icon: "🌐" },
      { name: "DPDP Compliant", icon: "🇮🇳" },
      { name: "GST Registered", icon: "📄" }
    ],
    message: "Your data is protected with bank-level security and full Indian regulatory compliance.",
    indianFeatures: [
      "🇮🇳 DPDP Act compliance for data protection",
      "📄 GST-compliant invoicing",
      "🏦 Integration with Indian payment gateways",
      "📞 Local language support (Hindi, Tamil, Telugu)",
      "⏰ Indian timezone support (IST)"
    ]
  },

  // Localized Features Section
  localizedFeatures: {
    sectionTitle: "Designed for Indian Business Culture",
    features: [
      {
        icon: "🇮🇳",
        title: "Multi-Language Support",
        description: "Content and support in Hindi, English, and regional languages"
      },
      {
        icon: "💰",
        title: "Local Payment Methods",
        description: "UPI, Paytm, Google Pay, and bank transfers"
      },
      {
        icon: "📱",
        title: "WhatsApp Integration",
        description: "Native WhatsApp Business API for customer communication"
      },
      {
        icon: "🏪",
        title: "Festival-Ready Automation",
        description: "Special campaign automation for Diwali, Holi, and other festivals"
      },
      {
        icon: "📊",
        title: "GST-Compliant Reporting",
        description: "Automatic GST calculations and compliance reporting"
      }
    ]
  },

  // Final CTA Section (Localized)
  finalCTA: {
    sectionTitle: "Ready to Transform Your Indian Business with AI?",
    content: "Join 500+ Indian businesses using XeroGap AI to automate operations and accelerate growth.",
    localizedContent: "🇮🇳 Trusted by businesses in Mumbai, Delhi, Bangalore, Hyderabad, and across India",
    offers: [
      "Free AI Consultation (₹500 value)",
      "No long-term commitments",
      "Local language support",
      "Indian timezone support"
    ],
    primaryCTA: {
      text: "Get Free Consultation",
      href: "/assessment"
    },
    secondaryCTA: {
      text: "Book WhatsApp Demo",
      href: "/demo"
    }
  },

  // Footer (Localized)
  footer: {
    company: {
      name: "XeroGap AI",
      tagline: "AI Solutions for Indian Businesses",
      subtitle: "Serving India with localized AI automation"
    },
    contact: {
      email: "hello@xerogap.ai",
      phone: "+91 XXXXX XXXXX", // Replace with actual number
      address: "India Operations"
    },
    links: {
      services: [
        { name: "WhatsApp CX Copilot", href: "/services/whatsapp-cx" },
        { name: "XeroGap AI", href: "/services/xerogap-ai" },
        { name: "Content Services", href: "/services/content-services" },
        { name: "Digital Consulting", href: "/services/digital-consulting" }
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Indian Case Studies", href: "/case-studies/india" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
      ],
      support: [
        { name: "Contact", href: "/contact" },
        { name: "Help Center", href: "/help" },
        { name: "API Docs", href: "/docs" },
        { name: "Status", href: "/status" }
      ]
    },
    newsletter: {
      title: "Stay Ahead of AI Trends in India",
      subtitle: "Get weekly insights on AI automation for Indian businesses.",
      placeholder: "Enter your email",
      button: "Subscribe"
    },
    social: [
      { name: "LinkedIn", href: "https://linkedin.com/company/xerogap-ai", icon: "linkedin" },
      { name: "Twitter", href: "https://twitter.com/xerogap_ai", icon: "twitter" },
      { name: "YouTube", href: "https://youtube.com/@xerogap-ai", icon: "youtube" },
      { name: "Instagram", href: "https://instagram.com/xerogap_ai", icon: "instagram" }
    ],
    copyright: "© 2025 XeroGap AI. All rights reserved.",
    localizedFooter: {
      gst: "GST Number: [Your GST Number]",
      support: "Indian Customer Support: Available 9 AM - 9 PM IST",
      languages: "Available in: English | हिंदी | தமிழ் | తెలుగు"
    }
  }
};

export default indianHomepageContent;
