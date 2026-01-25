"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import TopUpHeader from "@/components/user/topup/header";
import CategoryTabs from "@/components/user/topup/category";
import CreditPackageList from "@/components/user/topup/creditlist";

export default function TopUpPage() {
  const [selectedCategory, setSelectedCategory] = useState("reformer");

  // Definisikan data paket di sini agar bisa dikirim sebagai props
  const packagesData = {
    reformer: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      {
        credits: 12,
        name: "Value Pack",
        price: "Rp 1.600.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
    chair: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      {
        credits: 12,
        name: "Value Pack",
        price: "Rp 1.600.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
    private: [
      { credits: 1, name: "Single Private", price: "Rp 850.000" },
      { credits: 5, name: "Private Pack", price: "Rp 4.100.000" },
      {
        credits: 12,
        name: "Pro Private",
        price: "Rp 9.000.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
  };

  const handlePackageSelect = (pkg: any) => {
    console.log("Selected package:", pkg);
    // Logika integrasi payment gateway (seperti Midtrans) bisa diletakkan di sini
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-32">
        <TopUpHeader />
        
        {/* Kontainer Utama dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CategoryTabs onCategoryChange={setSelectedCategory} />
          
          {/* Kirim packagesData ke komponen untuk memperbaiki error 'reformer' of undefined */}
          <CreditPackageList
            category={selectedCategory}
            onPackageSelect={handlePackageSelect}
            packages={packagesData} 
          />
          
          <div className="max-w-6xl mx-auto px-6 mt-12 mb-8">
            <Link
              href="/dashboard-user/home"
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#640D14] transition-colors group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}