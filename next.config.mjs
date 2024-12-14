/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.microlink.io'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value:
              'private-state-token-redemption=(), private-state-token-issuance=(), browsing-topics=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
