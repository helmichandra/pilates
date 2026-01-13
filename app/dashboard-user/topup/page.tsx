"use client";

import { useState } from "react";
import Link from "next/link";
import TopUpHeader from "@/components/topup/header";
import CategoryTabs from "@/components/topup/category";
import CreditPackageList from "@/components/topup/creditlist";

export default function TopUpPage() {
    const [selectedCategory, setSelectedCategory] = useState("reformer");
  
    const handlePackageSelect = (pkg: any) => {
      console.log("Selected package:", pkg);
      // Add your purchase logic here
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pb-32 md:pb-8">
          <TopUpHeader />
          <CategoryTabs onCategoryChange={setSelectedCategory} />
          <CreditPackageList
            category={selectedCategory}
            onPackageSelect={handlePackageSelect}
          />
          
          <div className="max-w-6xl mx-auto px-4 mt-8 mb-8">
            <Link
              href="/dashboard-user/home"
              className="block text-center text-gray-600 hover:text-[#1e3a8a] font-semibold transition-colors py-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }