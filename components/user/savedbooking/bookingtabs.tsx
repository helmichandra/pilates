"use client";
import { motion } from "framer-motion";

export default function BookingTabs({ activeTab, onTabChange }: any) {
  const tabs = [
    { id: "upcoming", label: "Booked" },
    { id: "past", label: "Cancelled" }
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-5 text-sm font-black uppercase tracking-[0.15em] transition-all relative cursor-pointer ${
                activeTab === tab.id ? "text-[#640D14]" : "text-gray-400"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabUnderline"
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