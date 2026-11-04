/** @type {import('next').NextConfig} */
const isExport = process.env.OUTPUT_MODE === 'export';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: isExport,
  },
  reactStrictMode: true,
};

export default nextConfig;
