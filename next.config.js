/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  // 其他配置...
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig); 