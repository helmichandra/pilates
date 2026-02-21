"use client";

import { useEffect, useState, useCallback } from 'react';
import SearchBar from '@/components/admin/users/searchbar';
import UserCard from '@/components/admin/users/usercard';
import UserModal from '@/components/admin/users/usermodal';
import DeleteModal from '@/components/admin/users/deletemodal';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { adminApi } from '@/services/fixclubUsers';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton"; // Pastikan sudah install shadcn skeleton

export default function UsersPage() {
  // --- STATES ---
  const [users, setUsers] = useState<any[]>([]); // Default ke array kosong agar tidak null
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers(currentPage, search, LIMIT);
      
      if (res.code === 200) {
        const fetchedData = res.data?.data || [];
        const totalData = res.data?.total || 0;

        setUsers(fetchedData);
        
        // PERBAIKAN: Hitung total halaman di FE
        const calculatedPages = Math.ceil(totalData / LIMIT);
        setTotalPages(calculatedPages || 1);
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      toast.error("Gagal mengambil data user");
      setUsers([]); // Reset ke array kosong jika error
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  // --- SIDE EFFECTS ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  // --- RENDER HELPERS ---
  const UserSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4 bg-gray-200" />
        <Skeleton className="h-3 w-1/2 bg-gray-100" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-100" />
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-100" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-28">
        
        {/* Header: Search & Add Button */}
        <SearchBar onChange={(val: string) => { setSearch(val); setCurrentPage(1); }} />
        
        <button 
          onClick={() => { setModalType('add'); setIsModalOpen(true); }}
          className="w-full mt-4 mb-6 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Member
        </button>

        {/* List Content */}
        <div className="space-y-4">
          {loading ? (
            /* Loading State dengan Skeleton */
            Array.from({ length: 5 }).map((_, i) => <UserSkeleton key={i} />)
          ) : (users?.length ?? 0) > 0 ? (
            /* Data State - Menggunakan optional chaining agar tidak crash */
            users.map((user) => (
              <UserCard 
                key={user.id} 
                user={{
                  ...user,
                  status: user.status || 'Active', // Fallback status
                  credits: user.credits || { reformer: 0, chair: 0, private: 0 } 
                }} 
                onEdit={() => { setSelectedUser(user); setModalType('edit'); setIsModalOpen(true); }} 
                onDelete={() => { setSelectedUser(user); setIsDeleteOpen(true); }} 
              />
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">User tidak ditemukan</p>
            </div>
          )}
        </div>

        {/* Pagination bar */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl bg-white border border-gray-100 disabled:opacity-30 shadow-sm hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 text-[#640D14]" />
            </button>
            
            <div className="px-6 py-2 bg-[#640D14] text-white rounded-xl font-bold text-sm shadow-md">
              {currentPage} / {totalPages}
            </div>

            <button 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl bg-white border border-gray-100 disabled:opacity-30 shadow-sm hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5 text-[#640D14]" />
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType} 
        initialData={selectedUser}
        onSuccess={fetchUsers} 
      />
      
      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        userName={selectedUser?.username || selectedUser?.first_name || "User"} 
        onConfirm={() => {
          setIsDeleteOpen(false);
          fetchUsers();
        }} 
      />
    </div>
  );
}