/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['eu-west-2.cdn.hygraph.com', 'eu-west-2.graphassets.com'], // Permitidos Hygraph y Graphassets
  },

};

module.exports = nextConfig;
