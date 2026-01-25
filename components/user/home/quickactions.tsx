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
    <div className="px-4 grid grid-cols-2 gap-4 mb-8">      
      {actions.map((action, i) => (
        <motion.div key={i} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(action.path)}
            variant="outline"
            className="w-full flex flex-col items-center gap-3 h-auto py-8 rounded-[2rem] border-2 border-gray-100 bg-white hover:border-[#640D14] hover:bg-[#640D14]/5 transition-all duration-300 shadow-sm"
          >
            <div className="w-12 h-12 bg-[#640D14]/10 rounded-full flex items-center justify-center">
              <action.icon className="w-6 h-6 text-[#640D14]" />
            </div>
            <span className="text-[#38040E] font-black uppercase text-[10px] tracking-widest">
              {action.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}