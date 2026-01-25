import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24 px-8 text-center"
    >
      <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-3 border border-gray-100">
        <Calendar className="w-12 h-12 text-gray-200" />
      </div>
      <h3 className="text-2xl font-black text-[#38040E] mb-3 uppercase tracking-tighter italic">
        No Bookings Found
      </h3>
      <p className="text-gray-400 text-xs mb-10 max-w-[240px] font-medium leading-relaxed uppercase tracking-widest">
        Your schedule looks light. Time to redefine your movement.
      </p>
      <Link href="/dashboard-user/booking" className="w-full max-w-xs">
        <Button className="w-full bg-[#640D14] hover:bg-[#38040E] text-white h-16 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-[#640D14]/20">
          Browse Classes
        </Button>
      </Link>
    </motion.div>
  );
}