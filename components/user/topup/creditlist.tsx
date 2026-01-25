"use client";
import { motion } from "framer-motion";
import CreditPackage from "./creditpackage";

export default function CreditPackageList({ category, onPackageSelect, packages }: any) {
  const currentPackages = packages?.[category] || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.div 
        key={category}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {currentPackages.map((pkg: any) => (
          // Bungkus dengan div yang memiliki KEY unik
          <div key={`${category}-${pkg.id}`}> 
            <CreditPackage
              {...pkg}
              onClick={() => onPackageSelect(pkg)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}