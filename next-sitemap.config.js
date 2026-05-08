/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://vyaptix.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/api/*', '/thank-you'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
  },
};

export default config;
