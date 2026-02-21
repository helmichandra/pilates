"use client";

import { useState, useEffect, useCallback } from 'react';
import { bookingApi } from '@/services/bookingServices';
import BookingCard from '@/components/admin/booking/bookingcard';
import BookingModal from '@/components/admin/booking/bookingmodal';
import DeleteModal from '@/components/admin/users/deletemodal';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"; // ✅ shadcn skeleton
import Swal from 'sweetalert2';

export default function BookingPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookingApi.getAllBookings(page, search, LIMIT);
      
      if (res.code === 200) {
        setData(res.data?.data || []);
        const totalItems = res.data?.pagination?.total || 0;
        const calculatedPages = Math.ceil(totalItems / LIMIT);
        setTotalPages(calculatedPages || 1);
      } else {
        throw res;
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      const errorMsg = error.data?.error || error.message || "Gagal mengambil data booking";
      Swal.fire({ 
        title: 'Error', 
        text: errorMsg, 
        icon: 'error',
        confirmButtonColor: '#640D14'
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const delay = setTimeout(() => fetchBookings(), 500);
    return () => clearTimeout(delay);
  }, [fetchBookings]);

  const mapApiToCard = (item: any) => ({
    id: item.booking_code,
    memberName: item.username,
    className: `${item.pilates_name} (${item.class_type})`,
    date: item.start_time !== "0001-01-01T00:00:00Z" 
      ? new Date(item.start_time).toLocaleString('id-ID', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      : "Waktu tidak valid",
    status: item.status.toUpperCase() as any
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Action */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by code or member..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#640D14]/20 font-medium"
              onChange={(e) => { 
                setSearch(e.target.value); 
                setPage(1);
              }}
            />
          </div>
          <button 
            onClick={() => { setModalType('add'); setIsModalOpen(true); }}
            className="bg-gradient-to-r from-[#640D14] to-[#800E13] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" /> Manual Booking
          </button>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="space-y-3 w-full">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[260px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                  <div className="flex gap-2 ml-6">
                    <Skeleton className="h-9 w-20 rounded-lg" />
                    <Skeleton className="h-9 w-20 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {data.length > 0 ? (
              data.map((item) => (
                <BookingCard 
                  key={item.id} 
                  booking={mapApiToCard(item)} 
                  onEdit={() => { setSelectedBooking(item); setModalType('edit'); setIsModalOpen(true); }}
                  onDelete={() => { setSelectedBooking(item); setIsDeleteOpen(true); }}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest">No Bookings Found</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-3 bg-white rounded-xl shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="bg-[#640D14] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md">
              Page {page} of {totalPages}
            </div>

            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-3 bg-white rounded-xl shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      
      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={() => setIsDeleteOpen(false)} 
        userName={`${selectedBooking?.booking_code} (${selectedBooking?.username})`} 
      />
    </div>
  );
}