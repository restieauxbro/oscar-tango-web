/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    domains: ["oscartango.digital"],
  },
};

module.exports = nextConfig;
