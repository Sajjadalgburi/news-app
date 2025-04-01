import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  allowedDevOrigins: ["http://localhost:5000", "http://localhost:5000/graphql"],

  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },

  ignoreBuildErrors: true, // Ignore build errors

  // by default, Next.js will block any external image domains. We need to disable this behavior.
  images: {
    remotePatterns: [], // No remote images allowed
    domains: [], // Blocks external image domains
    unoptimized: true, // (Optional) Disables Next.js image optimization
  },
};

export default nextConfig;
