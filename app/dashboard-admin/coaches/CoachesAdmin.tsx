"use client";

import { useEffect, useState, useCallback } from 'react';
import { coachApi } from '@/services/coachService';
import { Search, Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2';

import { CoachCard } from '@/components/admin/coaches/CoachCard';
import CoachModal from '@/components/admin/coaches/CoachModal';
import { Skeleton } from "@/components/ui/skeleton"; // Asumsi menggunakan shadcn

// Komponen Skeleton yang disesuaikan dengan desain CoachCard kamu
const CoachSkeleton = () => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-5 border border-gray-50">
    <Skeleton className="w-20 h-20 rounded-2xl bg-gray-200" />
    <div className="flex-1 space-y-3">
      <Skeleton className="h-5 w-1/2 bg-gray-200" />
      <Skeleton className="h-4 w-1/3 bg-gray-100" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-lg bg-gray-100" />
        <Skeleton className="h-8 w-20 rounded-lg bg-gray-100" />
      </div>
    </div>
  </div>
);

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  const fetchCoaches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await coachApi.getAll(currentPage, debouncedSearch, LIMIT);
      if (res.code === 200) {
        // Ambil data dan pastikan fallback ke array kosong jika null
        setCoaches(res.data?.data || []);
        
        // HITUNG TOTAL HALAMAN DI FRONTEND
        const totalItems = res.data?.pagination?.total || 0;
        const calculatedPages = Math.ceil(totalItems / LIMIT);
        setTotalPages(calculatedPages || 1);
      }
    } catch (error) {
      console.error(error);
      setCoaches([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

  // Reset ke halaman 1 saat user mencari sesuatu
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus Coach?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#640D14",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      try {
        const res = await coachApi.delete(id);
        if (res.code === 200) {
          Swal.fire({ icon: "success", title: "Terhapus!", showConfirmButton: false, timer: 1500 });
          fetchCoaches();
        }
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#38040E] uppercase tracking-tighter">Coaches</h1>
            <p className="text-gray-400 font-medium">Manajemen instruktur pilates</p>
          </div>
          <button 
            onClick={() => { setSelectedId(null); setIsModalOpen(true); }}
            className="w-full md:w-auto bg-[#640D14] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-xl shadow-[#640D14]/20 hover:scale-105 transition-all"
          >
            <Plus size={18} /> Add New Coach
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Cari nama coach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-sm font-bold text-sm focus:ring-4 focus:ring-[#640D14]/5 outline-none transition-all"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[400px]">
          {loading ? (
            /* Tampilkan 6 Skeleton saat loading */
            Array.from({ length: 6 }).map((_, i) => <CoachSkeleton key={i} />)
          ) : (coaches?.length ?? 0) > 0 ? (
            <AnimatePresence mode="popLayout">
              {coaches.map((coach) => (
                <motion.div
                  key={coach.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <CoachCard 
                    coach={coach} 
                    onEdit={(id: number) => { setSelectedId(id); setIsModalOpen(true); }}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="font-bold uppercase tracking-widest text-xs">No Coaches Found</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1}
              className="p-4 bg-white rounded-2xl shadow-sm disabled:opacity-20 hover:bg-gray-50 transition-all border border-gray-100"
            >
              <ChevronLeft className="text-[#640D14]" />
            </button>
            
            <div className="bg-[#640D14] text-white px-8 py-3 rounded-2xl font-black text-xs tracking-tighter shadow-lg">
              PAGE {currentPage} / {totalPages}
            </div>

            <button 
              onClick={() => setCurrentPage(p => p + 1)} 
              disabled={currentPage >= totalPages}
              className="p-4 bg-white rounded-2xl shadow-sm disabled:opacity-20 hover:bg-gray-50 transition-all border border-gray-100"
            >
              <ChevronRight className="text-[#640D14]" />
            </button>
          </div>
        )}

        <CoachModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          editId={selectedId}
          onSuccess={fetchCoaches} 
        />
      </div>
    </div>
  );
}