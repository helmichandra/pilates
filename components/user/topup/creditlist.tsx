"use client";
import { motion } from "framer-motion";
import CreditPackage from "./creditpackage";

export default function CreditPackageList({ category, onPackageSelect, packages }: any) {
  // Tambahkan data fallback jika prop 'packages' kosong atau undefined
  const defaultPackages: Record<string, any[]> = {
    reformer: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      { credits: 12, name: "Value Pack", price: "Rp 1.600.000", badge: "BEST VALUE", promotion: "Buy 10 + 2 Free" },
    ],
    chair: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
    ],
    private: [
      { credits: 1, name: "Single Private", price: "Rp 850.000" },
    ],
  };

  // Gunakan optional chaining agar tidak crash jika packages undefined
  const currentPackages = packages?.[category] || defaultPackages[category] || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px bg-gray-100 flex-1" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Purchase <span className="text-[#640D14]">{category}</span> Pack
        </h2>
        <div className="h-px bg-gray-100 flex-1" />
      </div>

      <motion.div 
        key={category}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {currentPackages.map((pkg: any, index: number) => (
          <CreditPackage
            key={index}
            {...pkg}
            onClick={() => onPackageSelect(pkg)}
          />
        ))}
      </motion.div>
    </div>
  );
}