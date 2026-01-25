"use client";
import { MapPin, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ClassCard({ time, duration, title, type, credit, level, coach, location, spotsLeft, status = "available", onBook }: any) {
  const typeBadge = {
    reformer: "bg-[#640D14]/10 text-[#640D14]",
    chair: "bg-orange-50 text-orange-700",
    private: "bg-purple-50 text-purple-700",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 hover:border-[#640D14]/20 transition-all shadow-sm group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#640D14]/5 p-3 rounded-2xl group-hover:bg-[#640D14] transition-colors duration-500">
            <Clock className="w-5 h-5 text-[#640D14] group-hover:text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-[#38040E] block tracking-tighter">{time}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{duration}</span>
          </div>
        </div>
        {status === "passed" && <span className="text-[10px] font-black text-gray-300 border border-gray-200 px-3 py-1 rounded-full">PASSED</span>}
      </div>

      <h3 className="text-xl font-black text-[#38040E] mb-4 uppercase tracking-tight">{title}</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${typeBadge[type as keyof typeof typeBadge]}`}>
          {type} CLASS
        </span>
        <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 uppercase tracking-widest">
          💳 {credit} CREDITS
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <User size={14} className="text-[#640D14]" /> <span>Coach {coach}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <MapPin size={14} className="text-[#640D14]" /> <span className="truncate">{location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-black text-[#640D14] uppercase tracking-widest">{spotsLeft} Spots Left</p>
        {status === "available" && (
          <Button onClick={onBook} className="bg-[#640D14] hover:bg-[#38040E] text-white px-8 h-12 rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            BOOK NOW
          </Button>
        )}
      </div>
    </motion.div>
  );
}