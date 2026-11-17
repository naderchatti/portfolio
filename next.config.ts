import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // `/en/` → out/en/index.html, which Cloudflare Pages serves without redirects.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
