import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '0.academia-photos.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
