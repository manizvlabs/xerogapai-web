/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'vyaptix.com' },
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
