"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { topupApi } from "@/services/topupServices"; 
import TopUpHeader from "@/components/user/topup/header";
import CategoryTabs from "@/components/user/topup/category";
import CreditPackageList from "@/components/user/topup/creditlist";
import { Button } from "@/components/ui/button";

export default function TopUpPage() {
  const [selectedCategory, setSelectedCategory] = useState("reformer");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token"); // Pastikan token disimpan di localStorage

  console.log(token);
  const packagesData = {
    reformer: [
      { id: 1, credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { id: 2, credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      { id: 3, credits: 12, name: "Value Pack", price: "Rp 1.600.000", badge: "BEST VALUE", promotion: "Buy 10 + 2 Free" },
    ],
    chair: [
      { id: 4, credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { id: 5, credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      { id: 6, credits: 12, name: "Value Pack", price: "Rp 1.600.000", badge: "BEST VALUE", promotion: "Buy 10 + 2 Free" },
    ],
    private: [
      { id: 7, credits: 1, name: "Single Private", price: "Rp 850.000" },
      { id: 8, credits: 5, name: "Private Pack", price: "Rp 4.100.000" },
      { id: 9, credits: 12, name: "Pro Private", price: "Rp 9.000.000", badge: "BEST VALUE", promotion: "Buy 10 + 2 Free" },
    ],
  };
  const handlePackageSelect = async (pkg: any) => {
    setIsLoading(true);
    setStatus("idle");

    try {
      const result = await topupApi.postTopup(pkg.id);

      // Jika sukses (Code 200)
      if (result.code === 200 || result.status === "success") {
        setStatus("success");
        setMessage(`Berhasil memilih paket ${pkg.name}. Transaksi sedang diproses.`);
        
        // DURASI LAMA (8 detik) agar user sempat membaca
        setTimeout(() => setStatus("idle"), 8000);
      } else {
        throw new Error(result.message || "Terjadi kesalahan pada server");
      }
    } catch (error: any) {
      console.error("Topup error:", error);
      setStatus("error");
      
      // Pesan error spesifik dari catch
      setMessage(error.message || "Terjadi kesalahan koneksi ke server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <main className="pb-32">
        <TopUpHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CategoryTabs onCategoryChange={setSelectedCategory} />
          
          <CreditPackageList
            category={selectedCategory}
            onPackageSelect={handlePackageSelect}
            packages={packagesData} 
          />
          
          <div className="max-w-6xl mx-auto px-6 mt-12 mb-8 text-center">
            <Link
              href="/dashboard-user/home"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#640D14] transition-colors group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {(isLoading || status !== "idle") && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              {isLoading ? (
                <div className="flex flex-col items-center py-4">
                  <Loader2 className="w-12 h-12 text-[#640D14] animate-spin mb-4" />
                  <p className="font-black uppercase tracking-widest text-[10px] text-gray-500">Processing...</p>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center py-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#38040E] uppercase mb-2">Success!</h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed mb-6">{message}</p>
                  <Button onClick={() => setStatus("idle")} className="bg-emerald-500 text-white rounded-xl px-8 uppercase font-black text-[10px] tracking-widest h-12">
                    Understood
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#38040E] uppercase mb-2">Failed</h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed mb-6">{message}</p>
                  <Button onClick={() => setStatus("idle")} className="bg-[#640D14] text-white rounded-xl px-8 uppercase font-black text-[10px] tracking-widest h-12 w-full transition-all">
                    Try Again
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}