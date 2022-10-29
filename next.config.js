/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["imgix.cosmicjs.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
  async redirects() {
    return [
      {
        source: "/thoughts",
        destination: "/writing",
        permanent: true,
      },
    ];
  },
};
