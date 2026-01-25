"use client";
import { motion } from "framer-motion";

export default function ProfileHeader({ name = "Vira", email = "vira@example.com", initial = "V" }) {
  return (
    <div className="px-6 py-10 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br from-[#640D14] to-[#38040E] text-white flex items-center justify-center font-black text-3xl md:text-4xl shadow-xl shadow-[#640D14]/20 ring-4 ring-[#640D14]/5">
            {initial}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#38040E] tracking-tighter uppercase italic">{name}</h2>
            <p className="text-gray-400 font-bold text-xs md:text-sm tracking-widest uppercase mt-1">{email}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}