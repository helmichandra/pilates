"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/user/booking/dateselector";
import FilterSection from "@/components/user/booking/filtersection";
import ClassList from "@/components/user/booking/classlist";
import { useDebounce } from "use-debounce";
import { scheduleApi } from "@/services/pilatesSchedules";
import { bookingApi } from "@/services/bookingServices"; // Pastikan service ini sudah dibuat
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function BookingPage() {
  // State Data & Loading
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // State Filters
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classType, setClassType] = useState("all");
  const [classLevel, setClassLevel] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

  // Fungsi Fetching Data Jadwal
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      const result = await scheduleApi.getAll({
        page: currentPage,
        limit: 10,
        date: formattedDate,
        class_type: classType === "all" ? "" : classType,
        class_level: classLevel === "all" ? "" : classLevel,
        search: debouncedSearch
      });

      if (result.code === 200 && result.data && Array.isArray(result.data.data)) {
        const mappedClasses = result.data.data.map((item: any) => {
          const startTime = new Date(item.start_time);
          const now = new Date();
  
          return {
            id: item.id.toString(),
            time: startTime.toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            duration: `${item.duration_minutes} MIN`,
            title: item.pilates_name,
            type: item.class_type,
            credit: item.credit_required,
            coach: item.coach_name,
            location: item.pilates_address,
            spotsLeft: item.quota,
            status: startTime < now ? "passed" : "available"
          };
        });
        setClasses(mappedClasses);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Failed to fetch schedules. Please try again.");
      setClasses([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, classType, classLevel, debouncedSearch, currentPage]);

  // Effect untuk Fetching
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Reset page ke 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, classType, classLevel, debouncedSearch]);

  // Fungsi Handler Booking
  const handleBookClass = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      
      // Cek apakah token ada
      if (!token) {
        Swal.fire("Sesi Berakhir", "Silakan login kembali.", "error");
        return;
      }
  
      const decoded: any = jwtDecode(token);
      
      // Cek apakah token sudah expired secara manual (Opsional tapi disarankan)
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        Swal.fire("Sesi Habis", "Sesi Anda telah berakhir, silakan login ulang.", "warning");
        return;
      }
  
      const confirm = await Swal.fire({
        title: 'Konfirmasi Booking',
        text: "Gunakan kredit untuk kelas ini?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#640D14',
      });
  
      if (!confirm.isConfirmed) return;
  
      setIsBooking(true);
  
      // Ambil detail schedule
      const scheduleDetail = await scheduleApi.getById(Number(id));
      if (!scheduleDetail || scheduleDetail.code !== 200) {
        throw new Error("Gagal mengambil detail kelas.");
      }
  
      const res = await bookingApi.createBooking({
        user_id: Number(decoded.id || decoded.user_id),
        schedule_id: Number(id),
        credit_used: scheduleDetail.data.credit_required,
        created_by: decoded.name || "User"
      });
  
      if (res.code === 200 || res.status === "OK") {
        Swal.fire("Berhasil!", "Booking berhasil dibuat.", "success");
        fetchSchedules();
      } else {
        throw new Error(res.message || "Booking gagal.");
      }
  
    } catch (error: any) {
      console.error("Booking Error:", error);
      Swal.fire({
        title: 'Error',
        text: error.message, // Ini akan menampilkan pesan error yang lebih manusiawi
        icon: 'error',
        confirmButtonColor: '#640D14'
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Overlay Loading saat Booking */}
      <AnimatePresence>
        {isBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-white p-8 rounded-[2rem] flex flex-col items-center max-w-xs w-full">
              <Loader2 className="w-10 h-10 animate-spin text-[#640D14] mb-4" />
              <p className="font-black uppercase tracking-widest text-[10px] text-center">Processing Your Booking...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DateSelector onDateChange={(date) => setSelectedDate(date)} />

      <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search classes or coaches..." 
            className="pl-12 h-14 rounded-[1.5rem] border-2 border-gray-50 bg-gray-50 font-bold focus:border-[#640D14]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterSection 
          onTypeChange={(t: string) => setClassType(t)} 
          onLevelChange={(l: string) => setClassLevel(l)} 
        />
      </div>

      <div className="relative min-h-[400px]">
        {errorMsg && (
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm">
              <AlertCircle size={20} /> {errorMsg}
            </div>
          </div>
        )}

        <ClassList 
          classes={classes} 
          onBookClass={handleBookClass} 
          isLoading={loading} 
        />

        {!loading && classes.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-32 flex items-center justify-between border-t border-gray-100 pt-8 mt-10">
            <Button 
              variant="ghost" 
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(prev => prev - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#640D14]/5 text-[#640D14]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Page {currentPage}
            </span>

            <Button 
              variant="ghost" 
              disabled={classes.length < 10} 
              onClick={() => {
                setCurrentPage(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#640D14]/5 text-[#640D14]"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}