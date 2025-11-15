import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = `https://${siteConfig.domain}`;
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.9', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.7', changefreq: 'daily' },
    { url: '/case-studies', priority: '0.8', changefreq: 'weekly' },
    { url: '/careers', priority: '0.6', changefreq: 'weekly' },
    { url: '/assessment', priority: '0.7', changefreq: 'monthly' },
    { url: '/consultation', priority: '0.8', changefreq: 'monthly' },
    { url: '/demo', priority: '0.8', changefreq: 'monthly' },
    { url: '/docs', priority: '0.6', changefreq: 'monthly' },
    { url: '/help', priority: '0.5', changefreq: 'monthly' },
    // Service pages
    { url: '/contact-center-ai', priority: '0.8', changefreq: 'monthly' },
    { url: '/dpdp-compliance', priority: '0.8', changefreq: 'monthly' },
    { url: '/enterprise-copilots', priority: '0.8', changefreq: 'monthly' },
    { url: '/sales-automation', priority: '0.8', changefreq: 'monthly' },
    { url: '/whatsapp-cx', priority: '0.8', changefreq: 'monthly' },
    { url: '/VyaptIX-ai', priority: '0.9', changefreq: 'weekly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      return `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
