"use client";

import { useEffect, useState, useCallback } from 'react';
import { coachApi } from '@/services/coachService';
import { Search, Plus, UserCheck, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2';

import { CoachCard } from '@/components/admin/coaches/CoachCard';
import CoachModal from '@/components/admin/coaches/CoachModal';

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCoaches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await coachApi.getAll(currentPage, debouncedSearch, 10);
      if (res.code === 200) {
        setCoaches(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

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

        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Cari nama coach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-sm font-bold text-sm focus:ring-4 focus:ring-[#640D14]/5 outline-none"
          />
        </div>

        {loading && coaches.length === 0 ? (
          <div className="flex justify-center py-24"><Loader2 className="animate-spin text-[#640D14]" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
              {coaches.map((coach) => (
                <CoachCard 
                  key={coach.id} 
                  coach={coach} 
                  onEdit={(id: number) => { setSelectedId(id); setIsModalOpen(true); }}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Sederhanakan pagination untuk testing */}
        <div className="flex justify-center mt-10 gap-4">
           <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-4 bg-white rounded-2xl shadow-sm"><ChevronLeft /></button>
           <button onClick={() => setCurrentPage(p => p + 1)} className="p-4 bg-white rounded-2xl shadow-sm"><ChevronRight /></button>
        </div>

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