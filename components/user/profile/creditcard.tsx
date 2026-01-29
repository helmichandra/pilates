"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function CreditCards({ reformerCount = 0, chairCount = 0, privateCount = 0 }) {
  const cardData = [
    { label: "Reformer", count: reformerCount, bg: "from-[#640D14] to-[#38040E]" },
    { label: "Chair", count: chairCount, bg: "from-[#800E13] to-[#640D14]" },
    { label: "Private", count: privateCount, bg: "from-[#2C3E50] to-[#000000]" },
  ];

  return (
    <div className="px-6 py-4 max-w-4xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cardData.slice(0, 2).map((card, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className={`bg-gradient-to-br ${card.bg} text-white p-8 rounded-[2.5rem] relative overflow-hidden border-none shadow-2xl`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-4">{card.label} Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">{card.count}</span>
                  <span className="text-sm font-bold opacity-60 uppercase">Credits</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className={`bg-gradient-to-br ${cardData[2].bg} text-white p-8 rounded-[2.5rem] relative overflow-hidden border-none shadow-2xl`}>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-4">Private Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter">{privateCount}</span>
                <span className="text-sm font-bold opacity-60 uppercase">Credits</span>
              </div>
            </div>
            <div className="text-[10px] font-black border border-white/20 px-4 py-2 rounded-full uppercase tracking-widest">Premium Member</div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}