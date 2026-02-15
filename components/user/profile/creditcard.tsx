"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";


export default function CreditCards({ reformerCount = 0, chairCount = 0, privateCount = 0 }) {
  const cardData = [
    { label: "Reformer", count: reformerCount, bg: "from-[#640D14] to-[#38040E]" },
    { label: "Chair", count: chairCount, bg: "from-[#800E13] to-[#640D14]" },
    { label: "Private", count: privateCount, bg: "from-[#1a1a1a] to-[#000000]" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cardData.slice(0, 2).map((card, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className={`bg-gradient-to-br ${card.bg} text-white p-8 rounded-[2.5rem] relative overflow-hidden border-none shadow-xl h-48 md:h-56 flex flex-col justify-center`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">{card.label} Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black tracking-tighter">{card.count}</span>
                  <span className="text-xs font-bold opacity-60 uppercase">Credits</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div whileHover={{ y: -5 }}>
        <Card className={`bg-gradient-to-br ${cardData[2].bg} text-white p-8 rounded-[2.5rem] relative overflow-hidden border-none shadow-xl h-48 md:h-52 flex flex-col justify-center`}>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Private Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black tracking-tighter">{privateCount}</span>
                <span className="text-xs font-bold opacity-60 uppercase">Credits</span>
              </div>
            </div>
            <div className="inline-flex text-[9px] font-black border border-white/20 px-4 py-2 rounded-full uppercase tracking-widest self-start md:self-auto">
              Premium Member
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}