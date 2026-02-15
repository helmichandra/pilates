"use client";
import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function QuickActions() {
  const router = useRouter();
  const actions = [
    { label: "Find Class", icon: Search, path: "/dashboard-user/booking" },
    { label: "Settings", icon: Settings, path: "/dashboard-user/profile" },
  ];

  return (
    <div className="flex flex-col gap-4">      
      {actions.map((action, i) => (
        <motion.div key={i} whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => router.push(action.path)}
            /* Gunakan h-24 sampai h-28 agar seimbang dengan tinggi area profil user di kiri */
            className="w-full flex items-center justify-start gap-5 h-28 px-8 rounded-[2.5rem] border-2 border-white/20 bg-white/90 backdrop-blur-md hover:bg-white hover:border-[#640D14] transition-all shadow-xl shadow-[#640D14]/5 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-[#640D14] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <action.icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[#38040E] font-black uppercase text-sm tracking-widest">
                {action.label}
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                Click to open
              </span>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}