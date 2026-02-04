"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/components/admin/navbar";
import BottomBar from '@/components/admin/bottomnav';

export default function AdminDashboardClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.replace("/auth/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      // Proteksi Ketat
      if (user.role_id === "1" || user.role === "Admin") {
        setIsAuthenticated(true);
      } else {
        router.replace("/dashboard-user/home");
      }
    } catch (error) {
      router.replace("/auth/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#640D14] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Verifikasi Admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">{children}</main>
      <div className="pb-24 md:pb-8" />
      <BottomBar />
    </div>
  );
}