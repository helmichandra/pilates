"use client";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UpcomingSessions({ sessions = [] }) {
  const router = useRouter();
  const hasUpcoming = sessions.length > 0;

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-[#38040E] tracking-tight">Your Next Session</h3>
        <Button 
           onClick={() => router.push("/dashboard-user/saved")}
           variant="link" 
           className="text-[#640D14] font-black text-xs uppercase p-0 tracking-widest"
        >
          See All ({sessions.length})
        </Button>
      </div>

      {!hasUpcoming ? (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center py-10 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-[#640D14]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
             <CalendarPlus className="w-10 h-10 text-[#640D14]" />
          </div>
          <h4 className="text-lg font-black text-[#38040E] mb-2 uppercase tracking-tight">No Upcoming Classes</h4>
          <Button className="mt-4 bg-[#640D14] text-white px-8 py-6 rounded-2xl font-black uppercase text-xs" onClick={() => router.push("/dashboard-user/booking")}>
            Book Now
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {/* Anda bisa memetakan session di sini jika ingin menampilkan list singkat */}
          <p className="text-sm font-bold text-gray-500 italic">You have {sessions.length} sessions booked.</p>
        </div>
      )}
    </div>
  );
}