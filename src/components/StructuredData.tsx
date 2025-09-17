import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'product' | 'service';
  data?: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerodigital.ai';
    
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Zero Digital',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'AI-Powered Digital Transformation services for businesses of all sizes',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+917702661991',
            contactType: 'customer service',
            email: 'info@zerodigital.ai',
          },
          sameAs: [
            'https://linkedin.com/company/zerodigital',
            'https://twitter.com/zerodigital',
            'https://instagram.com/zerodigital',
          ],
        };
      
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Zero Digital',
          url: baseUrl,
          description: 'AI-Powered Digital Transformation services',
          publisher: {
            '@type': 'Organization',
            name: 'Zero Digital',
          },
        };
      
      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI-Powered Digital Transformation',
          provider: {
            '@type': 'Organization',
            name: 'Zero Digital',
          },
          description: 'Comprehensive digital transformation services including AI automation, mobile app development, and digital marketing',
          serviceType: 'Digital Marketing Services',
          areaServed: 'India',
        };
      
      default:
        return data || {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
