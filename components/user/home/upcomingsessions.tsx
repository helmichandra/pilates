"use client";
import { useState, useEffect } from "react";
import { CalendarPlus, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { bookingApi } from "@/services/bookingServices";

export default function UpcomingSessions({ sessions: initialSessions = [] }: { sessions?: any[] }) {
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>(initialSessions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const decoded: any = jwtDecode(token);
        const userId = decoded.id || decoded.user_id;

        const result = await bookingApi.getUserBookings(userId);


        if (result.code === 200 && result.data?.data) {
          // Filter hanya status "Booked" untuk sesi mendatang
          const activeSessions = result.data.data.filter((b: any) => b.status === "Booked");
          setSessions(activeSessions);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const hasUpcoming = sessions.length > 0;

  return (
    <div className="px-0 py-4 w-full">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-black text-[#38040E] tracking-tight">Your Session</h3>
        <Button 
           onClick={() => router.push("/dashboard-user/saved")}
           variant="link" 
           className="text-[#640D14] font-black text-xs uppercase p-0 tracking-widest cursor-pointer hover:no-underline opacity-80 hover:opacity-100"
        >
          See All ({sessions.length})
        </Button>
      </div>

      {!hasUpcoming ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          className="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-sm"
        >
          <div className="w-24 h-24 bg-[#640D14]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
             <CalendarPlus className="w-12 h-12 text-[#640D14]" />
          </div>
          <h4 className="text-xl font-black text-[#38040E] mb-2 uppercase tracking-tight">No Upcoming Classes</h4>
          <p className="text-gray-400 text-sm mb-6">You haven't booked any sessions yet.</p>
          <Button 
            className="bg-[#640D14] hover:bg-[#38040E] text-white px-10 py-7 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-[#640D14]/20" 
            onClick={() => router.push("/dashboard-user/booking")}
          >
            Book Now
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <motion.div 
              key={session.id || index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-[#640D14]/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-[#640D14] rounded-2xl flex flex-col items-center justify-center text-white shrink-0">
                  <span className="text-[10px] font-bold uppercase leading-none">
                    {new Date(session.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-black leading-none mt-1">
                    {new Date(session.date).getDate()}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#640D14]/10 text-[#640D14] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {session.class_type}
                    </span>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      {session.class_level}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#38040E] uppercase leading-tight">
                    {session.pilates_name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock size={12} className="text-[#640D14]" />
                      <span className="text-[11px] font-bold tracking-tight">
                        {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(session.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <MapPin size={12} className="text-[#640D14]" />
                      <span className="text-[11px] font-bold tracking-tight uppercase">
                        {session.pilates_address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => router.push(`/dashboard-user/saved`)}
                className="w-full md:w-auto bg-gray-50 hover:bg-gray-100 text-[#38040E] font-black text-[10px] px-8 py-6 rounded-2xl transition-all border border-gray-100 uppercase tracking-widest"
              >
                View Ticket
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}