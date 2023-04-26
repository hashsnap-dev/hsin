/** @type {import('next').NextConfig} */

const config = {
  excludeFile: (str) => /\*.{spec,test}.js/.test(str),
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'health-functional-food.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  redirects() {
    return [
      {
        source: '/information',
        destination: '/information/health-functional-food',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/search/product',
        permanent: true,
      },
      {
        source: '/riskinformation',
        destination: '/riskinformation/domestic_food_danger',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/calculator/intake',
        permanent: true,
      },
      {
        source: '/hsin',
        destination: '/hsin/introduce',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.DATA_API}/:path*`,
        },
        {
          source: '/board/:path*',
          destination: `${process.env.BOARD_API}/:path*`,
        },
      ],
    };
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const withTM = require('next-transpile-modules')(['markdown-it'], {
  unstable_webpack5: true,
}); // pass the modules you would like to see transpiled

module.exports = withTM(config);
module.exports = config;
