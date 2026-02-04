/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://server:3001/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
