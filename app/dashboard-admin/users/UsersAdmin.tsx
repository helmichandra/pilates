"use client";

import { useEffect, useState, useCallback } from 'react';
import SearchBar from '@/components/admin/users/searchbar';
import UserCard from '@/components/admin/users/usercard';
import UserModal from '@/components/admin/users/usermodal';
import DeleteModal from '@/components/admin/users/deletemodal';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { adminApi } from '@/services/fixclubUsers';
import { toast } from 'sonner';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers(currentPage, search, 10);
      if (res.code === 200) {
        setUsers(res.data.data);
        setTotalPages(Math.ceil(res.data.total / 10));
      }
    } catch (error) {
      toast.error("Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    // Implementasi debounce sederhana untuk pencarian
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage, fetchUsers]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-28">
        {/* Oper setSearch ke SearchBar */}
        <SearchBar onChange={(val: string) => { setSearch(val); setCurrentPage(1); }} />
        
        <button 
          onClick={() => { setModalType('add'); setIsModalOpen(true); }}
          className="w-full mt-4 mb-6 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add New Member
        </button>

        <div className="space-y-4">
          {loading ? (
            // Skeleton Loader dengan Animasi Pulse
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="w-20 h-8 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserCard 
                key={user.id} 
                user={{
                  ...user,
                  status: 'Active',
                  credits: { reformer: 0, chair: 0, private: 0 } 
                }} 
                onEdit={() => { setSelectedUser(user); setModalType('edit'); setIsModalOpen(true); }} 
                onDelete={() => { setSelectedUser(user); setIsDeleteOpen(true); }} 
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-400">User tidak ditemukan.</div>
          )}
        </div>

        {/* Pagination bar */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-[#640D14]" />
            </button>
            <div className="px-4 py-2 bg-[#640D14] text-white rounded-lg font-bold text-xs">
              {currentPage} / {totalPages}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-[#640D14]" />
            </button>
          </div>
        )}
      </main>

      {/* Modals tetap sama */}
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} initialData={selectedUser} />
      <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} userName={selectedUser?.name || ""} onConfirm={() => setIsDeleteOpen(false)} />
    </div>
  );
}