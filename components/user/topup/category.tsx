"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CategoryTabs({ onCategoryChange }: any) {
  const [activeCategory, setActiveCategory] = useState("reformer");
  const categories = [
    { id: "reformer", label: "Reformer" },
    { id: "chair", label: "Chair" },
    { id: "private", label: "Private" },
  ];

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    onCategoryChange(id);
  };

  return (
    <div className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`relative py-5 text-xs md:text-sm font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeCategory === cat.id ? "text-[#640D14]" : "text-gray-400"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#640D14] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}