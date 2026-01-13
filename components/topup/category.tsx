"use client";

import { useState } from "react";

interface CategoryTabsProps {
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState("reformer");

  const categories = [
    { id: "reformer", label: "Reformer" },
    { id: "chair", label: "Chair" },
    { id: "private", label: "Private" },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-4 -mb-px">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`py-4 text-sm md:text-base font-semibold transition-all ${
                activeCategory === category.id
                  ? "text-[#1e3a8a] border-b-2 border-[#1e3a8a]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}