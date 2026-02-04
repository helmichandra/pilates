"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/components/user/navbar";
import BottomBar from "@/components/user/bottombar";

export default function UserDashboardClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.replace("/auth/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#640D14] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Verifikasi Sesi...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      {/* Spacing agar konten tidak tertutup bottom bar mobile */}
      <div className="pb-24 md:pb-0" />
      <BottomBar />
    </div>
  );
}