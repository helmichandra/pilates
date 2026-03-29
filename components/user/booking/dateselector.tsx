"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DateSelector({ onDateChange }: { onDateChange: (date: Date) => void }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(new Date()));
  const scrollRef = useRef<HTMLDivElement>(null);

  function getWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    // Start from Monday
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  const changeWeek = (offset: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentWeekStart(newDate);
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto py-6">
        
        {/* HEADER: Navigasi Minggu */}
        <div className="flex items-center justify-between mb-6 px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => changeWeek(-7)} 
            className="rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          
          <div className="text-center mx-2">
            <h2 className="text-lg sm:text-xl font-black text-[#38040E] uppercase tracking-tighter italic whitespace-nowrap">
              {currentWeekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
              Select Your Practice Date
            </p>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => changeWeek(7)} 
            className="rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* DATE LIST: Responsive Wrapper */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-7 overflow-x-auto lg:overflow-x-visible gap-3 px-4 pb-4 no-scrollbar snap-x snap-mandatory"
          >
            {weekDates.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={index}
                  onClick={() => { 
                    setSelectedDate(date); 
                    onDateChange(date); 
                  }}
                  className={`
                    /* Base Styles */
                    relative flex flex-col items-center justify-center py-4 rounded-2xl transition-all duration-300 cursor-pointer shrink-0 snap-center
                    /* Mobile Size */
                    w-[70px] sm:w-[85px] 
                    /* Desktop Size (Reset width for Grid) */
                    lg:w-full
                    /* Selection Colors */
                    ${isSelected 
                      ? "bg-[#640D14] text-white shadow-xl shadow-[#640D14]/20 scale-105 z-10" 
                      : "text-gray-500 hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 bg-gray-50/50"
                    }
                  `}
                >
                  <span className={`text-[9px] sm:text-[10px] font-black uppercase mb-1 tracking-widest ${
                    isSelected ? "text-white/70" : "text-gray-400"
                  }`}>
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  
                  <span className="text-lg sm:text-xl font-black">{date.getDate()}</span>
                  
                  {isToday && !isSelected && (
                    <div className="absolute bottom-2 w-1.5 h-1.5 bg-[#640D14] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}