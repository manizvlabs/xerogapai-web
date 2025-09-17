import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = `https://${siteConfig.domain}`;
  
  const staticPages = [
    '',
    '/services',
    '/about',
    '/contact',
    '/portfolio',
    '/blog'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      return `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
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
