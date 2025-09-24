import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = `https://${siteConfig.domain}`;
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow admin and system areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /login/
Disallow: /*.json$

# Allow all important content pages
Allow: /services
Allow: /about
Allow: /contact
Allow: /portfolio
Allow: /blog
Allow: /case-studies
Allow: /contact-center-ai
Allow: /dpdp-compliance
Allow: /enterprise-copilots
Allow: /sales-automation
Allow: /whatsapp-cx
Allow: /xerogap-ai
Allow: /assessment
Allow: /consultation
Allow: /demo
Allow: /docs
Allow: /help

# Block search parameters and fragments
Disallow: /*?
Disallow: /*#

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Disallow problematic bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
