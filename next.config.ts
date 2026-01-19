import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_API_BASE;
if (!base) throw new Error("NEXT_PUBLIC_API_BASE is missing");



const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: false, 
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/api/login",                 destination: `${base}/auth/login` },     
    ];
  },
};

export default nextConfig;
