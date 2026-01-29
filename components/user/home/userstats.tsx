"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UserStats({
  userName = "User",
  reformerCount = 0,
}) {
  const router = useRouter();
  const chairCount = 0;   // Sementara 0
  const privateCount = 0; // Sementara 0

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: -32 }}
      className="bg-white rounded-[2rem] shadow-xl shadow-[#640D14]/10 p-6 mx-4 relative z-20 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#640D14] to-[#38040E] text-white flex items-center justify-center font-black text-2xl shadow-lg uppercase">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">GOOD MORNING</p>
            <p className="text-xl font-black text-[#38040E] uppercase">{userName}</p>
          </div>
        </div>
        <Button onClick={() => router.push("/dashboard-user/topup")} variant="ghost" className="text-[#640D14] font-black text-xs bg-[#640D14]/5 rounded-full px-4">
          + TOP UP
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-2xl">
        {[
          { label: "Reformer", count: reformerCount },
          { label: "Chair", count: chairCount },
          { label: "Private", count: privateCount },
        ].map((item, i) => (
          <div key={i} className="text-center border-r last:border-0 border-gray-200">
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-2xl font-black text-[#38040E]">{item.count}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}