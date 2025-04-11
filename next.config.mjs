import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.artiversehub.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/:locale/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
      {
        source: '/:locale/docs/:path*',
        destination: '/docs/:path*',
      }
    ];
  },
};

export default withNextIntl(nextConfig);
