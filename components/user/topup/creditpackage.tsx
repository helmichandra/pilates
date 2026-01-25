"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

export default function CreditPackage({ credits, name, price, badge, promotion, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group w-full bg-white border-2 border-gray-50 rounded-[2rem] p-6 hover:border-[#640D14]/20 hover:shadow-xl hover:shadow-[#640D14]/5 transition-all text-left relative overflow-hidden cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl md:text-3xl font-black text-[#38040E] tracking-tighter italic uppercase">
              {credits} Credits
            </h3>
            {badge && (
              <div className="bg-[#640D14] text-white text-[8px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest animate-pulse">
                <Star size={10} fill="currentColor" /> {badge}
              </div>
            )}
          </div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{name}</p>
          
          {promotion && (
            <div className="flex items-center gap-2 mt-4 bg-emerald-50 w-fit px-3 py-1.5 rounded-xl border border-emerald-100">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span className="text-emerald-700 text-[9px] font-black uppercase tracking-widest">
                {promotion}
              </span>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-xl md:text-2xl font-black text-[#640D14] tracking-tighter">
            {price}
          </p>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">IDR TOTAL</span>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-[#640D14]/5 transition-colors" />
    </motion.button>
  );
}