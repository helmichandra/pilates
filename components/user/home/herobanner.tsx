"use client";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-56 md:h-80 overflow-hidden bg-[#38040E]">
      <motion.img
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        src="/media/banner/banner-home.png"
        alt="Fix Pilates Class"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      {/* Gradient Overlay - Maroon/Dark Red tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#640D14]/80 via-[#38040E]/60 to-transparent"></div>
      
      {/* Bottom Blur Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50"></div>
      
      <div className="relative z-10 px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white italic mb-2 tracking-tighter">
            FIX PILATES
          </h2>
          <div className="h-1 w-12 bg-white mb-4 rounded-full" />
          <p className="text-white/90 text-sm font-medium leading-tight">
            Redefine your movement.<br />
            Strengthen your core. Align your life.
          </p>
        </motion.div>
      </div>
    </div>
  );
}