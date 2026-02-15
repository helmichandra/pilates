"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UserStats({ userName = "User", reformerCount = 0 }) {
  const router = useRouter();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      /* Hilangkan y: 20 agar alignment tetap presisi sejak awal render */
      className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#640D14]/10 p-8 md:p-10 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#640D14] to-[#38040E] text-white flex items-center justify-center font-black text-3xl shadow-lg">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Welcome Back</p>
            <p className="text-2xl font-black text-[#38040E] uppercase">{userName}</p>
          </div>
        </div>
        <Button 
          onClick={() => router.push("/dashboard-user/topup")}
          className="bg-[#640D14]/5 text-[#640D14] hover:bg-[#640D14] hover:text-white font-black px-6 rounded-full transition-all cursor-pointer">
          + TOP UP
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
        {[
          { label: "Reformer", count: reformerCount },
          { label: "Chair", count: 0 },
          { label: "Private", count: 0 },
        ].map((item, i) => (
          <div key={i} className="text-center border-r last:border-0 border-gray-200">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">{item.label}</p>
            <p className="text-3xl font-black text-[#38040E]">{item.count}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}