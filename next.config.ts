import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_API_BASE;
if (!base) throw new Error("NEXT_PUBLIC_API_BASE is missing");

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      { source: "/api/bookings", destination: `${base}/bookings` },
      { source: "/api/bookings/id/:id/cancel", destination: `${base}/bookings/id/:id/cancel` },
      { source: "/api/users/credits/my_credit", destination: `${base}/users/credits/my_credit` },
      { source: "/api/users/profile", destination: `${base}/users/profile` },
      { source: "/api/users", destination: `${base}/users` },

    ];
  },
};

export default nextConfig;