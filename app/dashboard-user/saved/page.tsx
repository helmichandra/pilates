"use client";

import { useState, useEffect } from "react";
import BookingCard from "@/components/user/savedbooking/bookingcard";
import { BookingCardSkeleton } from "@/components/user/savedbooking/bookingcardskeleton";
import EmptyState from "@/components/user/savedbooking/emptystate";
import BookingTabs from "@/components/user/savedbooking/bookingtabs";

// Mock data
const mockBookings = [
  {
    id: "1",
    date: "Wednesday, Jan 15, 2026",
    time: "10:00",
    duration: "50 mins",
    title: "WUNDA CHAIR INT",
    type: "chair" as const,
    credit: 1,
    level: "all levels",
    coach: "Michael",
    location: "ALPHA PILATES, Chair room",
    status: "upcoming" as const,
  },
  {
    id: "2",
    date: "Friday, Jan 17, 2026",
    time: "14:00",
    duration: "60 mins",
    title: "CHAIR FLOW",
    type: "chair" as const,
    credit: 1,
    level: "all levels",
    coach: "Elena",
    location: "ALPHA PILATES, Chair Room",
    status: "upcoming" as const,
  },
  {
    id: "3",
    date: "Monday, Jan 13, 2026",
    time: "08:00",
    duration: "55 mins",
    title: "BASIC REFORMER",
    type: "reformer" as const,
    credit: 1,
    level: "all levels",
    coach: "Vira",
    location: "ALPHA PILATES, Reformer room",
    status: "completed" as const,
  },
  {
    id: "4",
    date: "Saturday, Jan 11, 2026",
    time: "11:00",
    duration: "60 mins",
    title: "PRIVATE SESSION",
    type: "private" as const,
    credit: 1,
    level: "all levels",
    coach: "Sarah",
    location: "ALPHA PILATES, Private Room 1",
    status: "completed" as const,
  },
];

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState(mockBookings);

  // Simulate API call
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [activeTab]);

  const handleCancelBooking = (id: string) => {
    console.log("Cancelling booking:", id);
    // Add cancel logic here
  };

  const handleViewDetails = (id: string) => {
    console.log("Viewing details for:", id);
    // Add view details logic here
  };

  const filteredBookings = bookings.filter((booking) =>
    activeTab === "upcoming"
      ? booking.status === "upcoming"
      : ["completed", "cancelled"].includes(booking.status)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#640D14] italic flex items-center gap-2">
            <div className="w-1 h-8 bg-[#640D14] rounded-full"></div>
            My Bookings
          </h1>
        </div>
      </div>

      <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-32 md:pb-8">
        {isLoading ? (
          <div className="space-y-4">
            <BookingCardSkeleton />
            <BookingCardSkeleton />
            <BookingCardSkeleton />
          </div>
        ) : filteredBookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4 mb-10">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
                onCancel={handleCancelBooking}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}