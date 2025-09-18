import { siteConfig } from '@/config/site';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'article';
  pageData?: Record<string, unknown>;
}

export default function StructuredData({ type = 'website', pageData }: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : type === 'organization' ? 'Organization' : 'Article',
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}` : `http://localhost:4010`,
    logo: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}/logo.png` : '/logo.png',
    sameAs: [
      `https://linkedin.com/company/zerodigital`,
      `https://twitter.com/zerodigital`,
    ],
  };

  if (type === 'organization') {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...baseData,
            '@type': 'Organization',
            foundingDate: '2024',
            address: {
              '@type': 'PostalAddress',
              addressLocality: siteConfig.location,
              addressRegion: 'Telangana',
              addressCountry: 'India',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: siteConfig.phone,
              contactType: 'customer service',
              email: siteConfig.email,
            },
            serviceArea: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: '17.3850',
                longitude: '78.4867',
              },
              geoRadius: '50000', // 50km radius from Hyderabad
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Digital Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'AI Content Automation',
                    description: 'Automated LinkedIn, Instagram, and blog content generation using AI agents',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Mobile App Development',
                    description: 'Custom mobile applications for iOS and Android',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Digital Transformation',
                    description: 'Complete digital overhaul of business processes and systems',
                  },
                },
              ],
            },
          }),
        }}
      />
    );
  }

  if (type === 'article' && pageData) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageData.title,
            description: pageData.description,
            image: pageData.image,
            datePublished: pageData.datePublished,
            dateModified: pageData.dateModified,
            author: {
              '@type': 'Person',
              name: pageData.author,
            },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.name,
              logo: {
                '@type': 'ImageObject',
                url: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}/logo.png` : '/logo.png',
              },
            },
          }),
        }}
      />
    );
  }

  // Default website structured data
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          ...baseData,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}/search?q={search_term_string}` : `http://localhost:4010/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  );
}
