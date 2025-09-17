import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = `https://${siteConfig.domain}`;
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow important pages
Allow: /
Allow: /services
Allow: /about
Allow: /contact
Allow: /portfolio
Allow: /blog`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
