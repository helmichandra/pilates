"use client";
import { MapPin, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ClassCard({ time, duration, title, type, credit, coach, location, spotsLeft, status, onBook }: any) {
  const typeBadge: Record<string, string> = {
    reformer: "bg-[#640D14]/10 text-[#640D14]",
    chair: "bg-orange-50 text-orange-700",
    private: "bg-purple-50 text-purple-700",
  };

  const currentType = type?.toLowerCase() || "reformer";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 shadow-sm group hover:border-[#640D14]/20 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#640D14]/5 p-3 rounded-2xl group-hover:bg-[#640D14] transition-colors duration-500">
            <Clock className="w-5 h-5 text-[#640D14] group-hover:text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-[#38040E] block">{time}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{duration}</span>
          </div>
        </div>
        {status === "passed" && (
          <span className="text-[10px] font-black text-gray-300 border border-gray-200 px-3 py-1 rounded-full uppercase">Passed</span>
        )}
      </div>

      <h3 className="text-xl font-black text-[#38040E] mb-4 uppercase">{title}</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${typeBadge[currentType] || "bg-gray-100 text-gray-600"}`}>
          {type} CLASS
        </span>
        <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 uppercase tracking-widest">💳 {credit} CREDITS</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <User size={14} className="text-[#640D14]" /> Coach {coach}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <MapPin size={14} className="text-[#640D14]" /> {location}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className={`text-xs font-black uppercase tracking-widest ${spotsLeft <= 2 ? "text-red-500" : "text-[#640D14]"}`}>
          {spotsLeft} Spots Left
        </p>
        {status !== "passed" && (
          <Button onClick={onBook} className="bg-[#640D14] hover:bg-[#38040E] text-white px-8 h-12 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-transform">
            BOOK NOW
          </Button>
        )}
      </div>
    </motion.div>
  );
}