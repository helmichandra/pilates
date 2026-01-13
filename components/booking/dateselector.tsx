"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
}

export default function DateSelector({ onDateChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(new Date()));

  function getWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function getWeekDates(startDate: Date) {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  const weekDates = getWeekDates(currentWeekStart);

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevWeek}
            className="h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h2 className="text-xl font-bold text-[#1e3a8a]">
            {formatMonth(currentWeekStart)}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextWeek}
            className="h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Week Dates */}
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`flex flex-col items-center justify-center py-4 rounded-2xl transition-all cursor-pointer ${
                isSelected(date)
                  ? "bg-[#1e3a8a] text-white shadow-lg transform scale-105"
                  : isToday(date)
                  ? "bg-[#1e3a8a]/10 text-[#1e3a8a]"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span className={`text-xs mb-2 font-medium ${
                isSelected(date) ? "text-white/80" : "text-gray-500"
              }`}>
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-2xl font-bold">
                {date.getDate()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}