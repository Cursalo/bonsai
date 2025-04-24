/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensures static output suitable for Netlify
  distDir: '.next',
  images: {
    unoptimized: true, // Required for static export
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
};

export default nextConfig; 