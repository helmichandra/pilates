"use client";
import { motion } from "framer-motion";

export default function TopUpHeader() {
  return (
    <div className="bg-gradient-to-br from-[#640D14] to-[#38040E] text-white px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter italic">Top Up Credits</h1>
          <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
            Invest in your movement journey.
          </p>
        </motion.div>
      </div>
    </div>
  );
}