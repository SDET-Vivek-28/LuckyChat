/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Exclude mobile directory from build
  experimental: {
    excludeDefaultMomentLocales: true,
  },
}

module.exports = nextConfig 