"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/components/user/navbar";
import BottomBar from "@/components/user/bottombar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Cek token di localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // 2. Jika tidak ada, tendang ke login page
      router.replace("/auth/login");
    } else {
      // 3. Jika ada, izinkan render konten
      setIsAuthorized(true);
    }
  }, [router]);

  // Tampilkan loading state agar user tidak melihat "flash" konten dashboard sebelum ditendang
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#640D14] mb-4" />
        <p className="text-sm font-medium text-gray-400 animate-pulse">Memverifikasi sesi...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      {/* Konten Dashboard */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* padding agar konten tidak ketutup bottom bar */}
      <div className="pb-20 md:pb-0" />

      <BottomBar />
    </>
  );
}