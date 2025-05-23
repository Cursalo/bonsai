/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'loremflickr.com', 'picsum.photos', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  env: {
    UNSPLASH_ACCESS_KEY: 'vo59dpiajrAk0loiCYdMels7dswYHB_VsF-oFbsYn6M',
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3002'],
    },
  },
  // Add these for better Netlify compatibility
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
}

module.exports = nextConfig 