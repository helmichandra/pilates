"use client";
import { Lock, ChevronRight } from "lucide-react";

export default function SettingsMenu({ onOpenModal }: any) {
  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <button 
        onClick={onOpenModal}
        className="w-full bg-white border-2 border-gray-50 rounded-[2rem] p-5 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#640D14]/5 rounded-2xl flex items-center justify-center group-hover:bg-[#640D14] transition-colors duration-500">
            <Lock className="w-5 h-5 text-[#640D14] group-hover:text-white" />
          </div>
          <span className="text-[#38040E] font-black uppercase text-xs tracking-widest">Security & Password</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
}