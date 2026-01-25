"use client";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UpcomingSessions({ hasUpcomingSessions = false }) {
  const router = useRouter();

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-[#38040E] tracking-tight">Your Next Session</h3>
        <Button variant="link" className="text-[#640D14] font-black text-xs uppercase p-0 tracking-widest">
          See All
        </Button>
      </div>

      {!hasUpcomingSessions && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-10 bg-white rounded-[2.5rem] border border-dashed border-gray-200"
        >
          <div className="w-20 h-20 bg-[#640D14]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <CalendarPlus className="w-10 h-10 text-[#640D14]" />
          </div>
          <h4 className="text-lg font-black text-[#38040E] mb-2 uppercase tracking-tight">
            No Upcoming Classes
          </h4>
          <p className="text-gray-400 text-xs mb-8 px-10 leading-relaxed">
            You haven't booked any sessions yet. Ready to strengthen your core?
          </p>
          <div className="px-10">
            <Button 
              className="w-full bg-[#640D14] hover:bg-[#38040E] text-white py-7 rounded-2xl text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-[#640D14]/20" 
              onClick={() => router.push("/dashboard-user/booking")}
            >
              Book Now
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}