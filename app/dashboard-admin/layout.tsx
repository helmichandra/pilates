"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/components/admin/navbar";
import BottomBar from '@/components/admin/bottomnav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Cek keberadaan token di localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      // Jika tidak ada token, tendang ke halaman login
      router.replace("/auth/login");
    } else {
      try {
        // Opsional: Cek juga apakah role-nya benar Admin (role_id === "1")
        const user = JSON.parse(userData);
        if (user.role_id !== "1" && user.role !== "Admin") {
          router.replace("/dashboard-user/home"); // Jika bukan admin, lempar ke user home
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        router.replace("/auth/login");
      }
    }
  }, [router]);

  // Tampilkan loading screen sederhana saat mengecek auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#640D14] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Securing Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Container utama untuk children agar layout tetap rapi */}
      <main className="relative">
        {children}
      </main>

      {/* Padding agar konten tidak tertutup bottom bar di mobile */}
      <div className="pb-24 md:pb-8" />

      <BottomBar />
    </div>
  );
}