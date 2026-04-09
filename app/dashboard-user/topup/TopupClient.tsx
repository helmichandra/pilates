"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, XCircle, Loader2, Star } from "lucide-react";
import { topupApi } from "@/services/topupServices"; 
import { packageService } from "@/services/packageService"; 
import TopUpHeader from "@/components/user/topup/header";
import CategoryTabs from "@/components/user/topup/category";
import CreditPackageList from "@/components/user/topup/creditlist";
import { Button } from "@/components/ui/button";

export default function TopUpPage() {
  // States
  const [selectedCategory, setSelectedCategory] = useState("reformer");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [rawPackages, setRawPackages] = useState<any[]>([]);
  
  // State untuk konfirmasi popup
  const [pendingPackage, setPendingPackage] = useState<any>(null);

  // 1. Fetch Data dari endpoint /all saat mount
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await packageService.getAllPackages(); 
        if (res.code === 200 || res.status === "OK") {
          // Menangani kemungkinan perbedaan struktur array (res.data atau res.data.data)
          const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
          const validData = items.filter((item: any) => item.class_type && item.amount > 0);
          setRawPackages(validData);
        }
      } catch (error) {
        console.error("Failed to load packages", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  // 2. Transformasi & Grouping data API ke format UI
  const groupedPackages = useMemo(() => {
    const groups: any = { reformer: [], chair: [], private: [] };

    rawPackages.forEach((pkg) => {
      const type = pkg.class_type.toLowerCase();
      if (groups[type]) {
        groups[type].push({
          id: pkg.id,
          credits: pkg.credit_unit,
          name: pkg.description || "Package",
          price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(Number(pkg.amount)),
          badge: pkg.credit_unit >= 10 ? "BEST VALUE" : null,
          promotion: pkg.credit_unit >= 12 ? "Special Offer Applied" : null,
        });
      }
    });

    // Urutkan berdasarkan jumlah credit terkecil ke terbesar
    Object.keys(groups).forEach(key => {
      groups[key].sort((a: any, b: any) => a.credits - b.credits);
    });

    return groups;
  }, [rawPackages]);

  // 3. Handler saat kartu paket diklik (Buka Konfirmasi)
  const handlePackageSelect = (pkg: any) => {
    setPendingPackage(pkg);
  };

  // 4. Handler saat User Konfirmasi "IYA"
  const confirmPayment = async () => {
    if (!pendingPackage) return;
    
    const pkgId = pendingPackage.id;
    setPendingPackage(null); // Tutup dialog konfirmasi
    setIsLoading(true);
    setStatus("idle");

    try {
      const result = await topupApi.postTopup(pkgId);

      if (result.code === 200 || result.status === "OK") {
        setStatus("success");
        setMessage("Order created successfully. Redirecting to payment...");

        const paymentUrl = result.data?.midtrans_webhook_url;
        if (paymentUrl) {
          setTimeout(() => {
            window.location.replace(paymentUrl);
          }, 1500);
        } else {
          throw new Error("Payment link missing");
        }
      } else {
        throw new Error(result.message || "Transaction failed");
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      if (status === "error") setIsLoading(false);
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
          
          {isFetching ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
              <p className="font-black text-[10px] text-gray-400 uppercase tracking-[0.3em]">Synchronizing Packages</p>
            </div>
          ) : (
            <CreditPackageList
              category={selectedCategory}
              onPackageSelect={handlePackageSelect}
              packages={groupedPackages} 
            />
          )}
          
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

      {/* --- POPUP 1: KONFIRMASI PEMBELIAN (IYA/TIDAK) --- */}
      <AnimatePresence>
        {pendingPackage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center px-6 bg-[#38040E]/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-[#640D14]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-[#640D14]" fill="currentColor" />
              </div>
              <h3 className="text-xl font-black text-[#38040E] uppercase mb-2">Confirm Order?</h3>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-8 leading-relaxed px-2">
                You are purchasing <span className="text-[#640D14]">{pendingPackage.credits} Credits</span> for <span className="text-[#38040E]">{pendingPackage.price}</span>. Proceed to secure payment?
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={confirmPayment}
                  className="bg-[#640D14] text-white rounded-2xl h-14 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#4d0a0f] transition-all cursor-pointer"
                >
                  Yes, Checkout Now
                </Button>
                <button 
                  onClick={() => setPendingPackage(null)}
                  className="text-gray-400 font-black uppercase text-[9px] tracking-[0.2em] h-10 hover:text-[#38040E] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- POPUP 2: PROCESSING / SUCCESS / ERROR --- */}
      <AnimatePresence>
        {(isLoading || status !== "idle") && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              {isLoading && status === "idle" ? (
                <div className="flex flex-col items-center py-4">
                  <Loader2 className="w-12 h-12 text-[#640D14] animate-spin mb-4" />
                  <p className="font-black uppercase tracking-widest text-[10px] text-gray-500">Connecting to Midtrans...</p>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center py-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#38040E] uppercase mb-2">Order Created</h3>
                  <p className="text-gray-500 text-xs font-bold mb-6">{message}</p>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Redirecting to Secure Page</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#38040E] uppercase mb-2">Payment Failed</h3>
                  <p className="text-gray-500 text-xs font-bold mb-6 leading-relaxed">{message}</p>
                  <Button 
                    onClick={() => {
                      setStatus("idle");
                      setIsLoading(false);
                    }} 
                    className="bg-[#640D14] text-white rounded-xl px-8 uppercase font-black text-[10px] tracking-widest h-12 w-full cursor-pointer"
                  >
                    Close & Try Again
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