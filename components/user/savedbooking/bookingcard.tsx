"use client";
import { Calendar, MapPin, User, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BookingCard({
  id, date, time, duration, title, type, credit, level, coach, location, status, onCancel, onViewDetails,
}: any) {
  const statusStyles = {
    upcoming: "bg-emerald-50 text-emerald-700 border-emerald-100",
    completed: "bg-gray-50 text-gray-500 border-gray-100",
    cancelled: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-2 border-gray-50 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#640D14]/5 rounded-2xl flex flex-col items-center justify-center text-[#640D14]">
            <Calendar size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-black text-[#38040E] uppercase text-xs tracking-widest">{date}</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
              <Clock size={12} /> {time} • {duration}
            </div>
          </div>
        </div>
        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${statusStyles[status as keyof typeof statusStyles]}`}>
          {status}
        </span>
      </div>

      <h3 className="text-xl font-black text-[#38040E] mb-4 tracking-tight uppercase">{title}</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[9px] font-black px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 uppercase tracking-widest">
          {type}
        </span>
        <span className="text-[9px] font-black px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 uppercase tracking-widest border border-yellow-100">
          💳 {credit} CREDITS
        </span>
      </div>

      <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-2xl">
        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
          <User size={14} className="text-[#640D14]" />
          <span>Coach {coach}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
          <MapPin size={14} className="text-[#640D14]" />
          <span className="truncate">{location}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => onViewDetails?.(id)}
          className="flex-1 bg-[#38040E] hover:bg-black text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all"
        >
          Details
        </Button>
        {status === "upcoming" && (
          <Button
            variant="ghost"
            className="flex-1 text-red-600 hover:bg-red-50 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest"
            onClick={() => onCancel?.(id)}
          >
            Cancel
          </Button>
        )}
      </div>
    </motion.div>
  );
}