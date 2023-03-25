/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {github_read_only: process.env.github_read_only},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
 },
}

module.exports = nextConfig
