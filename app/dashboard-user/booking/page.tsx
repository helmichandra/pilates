"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/user/booking/dateselector";
import FilterSection from "@/components/user/booking/filtersection";
import ClassList from "@/components/user/booking/classlist";
import { useDebounce } from "use-debounce";
import { scheduleApi } from "@/services/pilatesSchedules";

export default function BookingPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classType, setClassType] = useState("all");
  const [classLevel, setClassLevel] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

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
        class_type: classType === "all" ? "" : classType, // Pastikan mengirim string kosong jika "all"
        class_level: classLevel === "all" ? "" : classLevel, // Pastikan mengirim string kosong jika "all"
        search: debouncedSearch
      });

      // Validasi struktur data sesuai dengan Preview Network (result.data.data)
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

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Reset ke halaman 1 saat filter berubah agar tidak "terjebak" di page besar yang kosong
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, classType, classLevel, debouncedSearch]);

  const handleBookClass = (id: string) => console.log("Booking class:", id);

  return (
    <div className="min-h-screen bg-white">
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
          isLoading={loading} // Pastikan state loading dikirim ke sini
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
              className="rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#640D14]/5 text-[#640D14] cursor-pointer"
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
              className="rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#640D14]/5 text-[#640D14] cursor-pointer"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}