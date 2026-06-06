/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/k1",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
