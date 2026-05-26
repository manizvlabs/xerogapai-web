/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'vyaptix.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.launchuicomponents.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
