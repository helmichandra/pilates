"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DateSelector({ onDateChange }: { onDateChange: (date: Date) => void }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(new Date()));

  function getWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => {
             const d = new Date(currentWeekStart); d.setDate(d.getDate() - 7); setCurrentWeekStart(d);
          }} className="rounded-full hover:bg-gray-100 cursor-pointer">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h2 className="text-xl font-black text-[#38040E] uppercase tracking-tighter italic">
            {currentWeekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => {
             const d = new Date(currentWeekStart); d.setDate(d.getDate() + 7); setCurrentWeekStart(d);
          }} className="rounded-full hover:bg-gray-100 cursor-pointer">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={index}
                onClick={() => { setSelectedDate(date); onDateChange(date); }}
                className={`relative flex flex-col items-center justify-center py-4 rounded-2xl transition-all cursor-pointer ${
                  isSelected ? "bg-[#640D14] text-white shadow-lg scale-105" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className={`text-[10px] font-black uppercase mb-1 tracking-widest ${isSelected ? "text-white/70" : "text-gray-400"}`}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-xl font-black">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}