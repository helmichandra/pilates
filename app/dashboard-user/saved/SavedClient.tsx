"use client";

import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import BookingCard from "@/components/user/savedbooking/bookingcard";
import { BookingCardSkeleton } from "@/components/user/savedbooking/bookingcardskeleton";
import EmptyState from "@/components/user/savedbooking/emptystate";
import BookingTabs from "@/components/user/savedbooking/bookingtabs";
import { bookingApi } from "@/services/bookingServices";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isLoading, setIsLoading] = useState(true); // Loading awal (skeleton)
  const [isProcessing, setIsProcessing] = useState(false); // Loading untuk Loader2 (overlay)
  const [bookings, setBookings] = useState<any[]>([]);

  // Fungsi Fetch Data dari API
  const fetchUserBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded: any = jwtDecode(token);
      const userId = decoded.id || decoded.user_id;

      const res = await bookingApi.getUserBookings(userId);

      if (res.code === 200 && res.data?.data) {
        const mappedData = res.data.data.map((b: any) => {
          const bDate = new Date(b.booking_date);
          return {
            id: b.id,
            date: bDate.toLocaleDateString('en-GB', { 
              weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' 
            }),
            time: new Date(b.created_date).toLocaleTimeString('en-GB', { 
              hour: '2-digit', minute: '2-digit' 
            }),
            duration: b.duration_minutes+" MIN", 
            title: b.pilates_name, 
            type: b.pilates_description, 
            credit: b.credit_used,
            coach: b.coach_name || "Staff",
            location: b.pilates_address,
            status: b.status.toLowerCase() === "booked" ? "upcoming" : "cancelled"
          };
        });
        setBookings(mappedData);
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Fungsi Cancel Booking dengan Loader2 Overlay
  const handleCancelBooking = async (id: number) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: "Apakah Anda yakin ingin membatalkan jadwal ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#640D14',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    });

    if (result.isConfirmed) {
      setIsProcessing(true); // Memunculkan Loader2
      try {
        const res = await bookingApi.cancelBooking(id);
        
        if (res.code === 200 || res.status === "OK") {
          await Swal.fire('Cancelled!', 'Booking telah dibatalkan.', 'success');
          fetchUserBookings(); 
        } else {
          throw new Error(res.message || "Gagal membatalkan");
        }
      } catch (error: any) {
        Swal.fire('Error', error.message, 'error');
      } finally {
        setIsProcessing(false); // Menyembunyikan Loader2
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return booking.status === "upcoming";
    } else {
      return booking.status === "cancelled" || booking.status === "completed";
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Loader2 Overlay - Muncul saat proses hit API Cancel */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Processing...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                onCancel={() => handleCancelBooking(booking.id)}
                onViewDetails={(id: string) => console.log("Details:", id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}