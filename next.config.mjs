/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
    ],
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
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
