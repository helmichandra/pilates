"use client";

import { useState } from "react";
import DateSelector from "@/components/booking/dateselector";
import FilterSection from "@/components/booking/filtersection";
import ClassList from "@/components/booking/classlist";

// Mock data
const mockClasses = [
  {
    id: "1",
    time: "08:00",
    duration: "55 mins",
    title: "BASIC REFORMER",
    type: "reformer" as const,
    credit: 1,
    level: "all levels",
    coach: "Vira",
    location: "ALPHA PILATES, Reformer room",
    spotsLeft: 8,
    status: "passed" as const,
  },
  {
    id: "2",
    time: "10:00",
    duration: "50 mins",
    title: "WUNDA CHAIR INT",
    type: "chair" as const,
    credit: 1,
    level: "all levels",
    coach: "Michael",
    location: "ALPHA PILATES, Chair room",
    spotsLeft: 6,
    status: "available" as const,
  },
  {
    id: "3",
    time: "11:00",
    duration: "60 mins",
    title: "PRIVATE SESSION",
    type: "private" as const,
    credit: 1,
    level: "all levels",
    coach: "Sarah",
    location: "ALPHA PILATES, Private Room 1",
    spotsLeft: 1,
    status: "available" as const,
  },
  {
    id: "4",
    time: "14:00",
    duration: "60 mins",
    title: "CHAIR FLOW",
    type: "chair" as const,
    credit: 1,
    level: "all levels",
    coach: "Elena",
    location: "ALPHA PILATES, Chair Room",
    spotsLeft: 5,
    status: "available" as const,
  },
  {
    id: "5",
    time: "16:00",
    duration: "60 mins",
    title: "ADVANCED REFORMER",
    type: "reformer" as const,
    credit: 1,
    level: "all levels",
    coach: "Sarah",
    location: "ALPHA PILATES, Reformer Room",
    spotsLeft: 10,
    status: "available" as const,
  },
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    console.log("Selected type:", type);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    console.log("Selected level:", level);
  };

  const handleBookClass = (classId: string) => {
    console.log("Booking class:", classId);
    // Add booking logic here
  };

  // Filter classes based on selections
  const filteredClasses = mockClasses.filter((classItem) => {
    if (selectedType !== "all" && classItem.type !== selectedType) return false;
    if (selectedLevel !== "all" && classItem.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <DateSelector onDateChange={handleDateChange} />
        <FilterSection
          onTypeChange={handleTypeChange}
          onLevelChange={handleLevelChange}
        />
        <ClassList classes={filteredClasses} onBookClass={handleBookClass} />
      </main>
    </div>
  );
}