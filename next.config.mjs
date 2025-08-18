/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['kenh14cdn.com', 'storage.googleapis.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  reactStrictMode: false
};

export default nextConfig;
