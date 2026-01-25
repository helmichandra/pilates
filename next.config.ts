import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_API_BASE;
if (!base) throw new Error("NEXT_PUBLIC_API_BASE is missing");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing-page',
        permanent: false, 
      },
    ];
  },
  async rewrites() {
    return [
      // Auth Endpoints
      { source: "/api/login", destination: `${base}/auth/login` },  
      { source: "/api/register", destination: `${base}/auth/register` },
            
      { source: "/api/pilates/masters", destination: `${base}/pilates/masters` },            
      { source: "/api/pilates/masters/id/:id", destination: `${base}/pilates/masters/id/:id` },

      { source: "/api/pilates/schedules", destination: `${base}/pilates/schedules` },
      { source: "/api/pilates/schedules/id/:id", destination: `${base}/pilates/schedules/id/:id` },
      // master
      { source: "/api/pilates/masters/all", destination: `${base}/pilates/masters/all` },
      { source: "/api/coaches/all", destination: `${base}/coaches/all` },

      { source: "/api/users/transaction/topup", destination: `${base}/users/transaction/topup` },

    ];
  },
};

export default nextConfig;