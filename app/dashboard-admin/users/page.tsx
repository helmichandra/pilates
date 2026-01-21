"use client";

import { useState } from 'react';
import SearchBar from '@/components/admin/users/searchbar';
import UserCard from '@/components/admin/users/usercard';
import UserModal from '@/components/admin/users/usermodal';
import DeleteModal from '@/components/admin/users/deletemodal';
import { Plus } from 'lucide-react';

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { name: 'Vira', email: 'vira@example.com', status: 'Active', credits: { reformer: 5, chair: 2, private: 0 } },
    // ... data lainnya
  ];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-28">
        <SearchBar />
        
        {/* Trigger Add Modal */}
        <button 
          onClick={() => { setModalType('add'); setIsModalOpen(true); }}
          className="w-full mt-4 mb-6 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Add New Member
        </button>

        <div className="space-y-4">
          {users.map((user, index) => (
            <UserCard 
              key={index} 
              user={user} 
              onEdit={() => handleEdit(user)} 
              onDelete={() => handleDelete(user)} 
            />
          ))}
        </div>
      </main>

      {/* Modals */}
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType} 
        initialData={selectedUser} 
      />

      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={() => { /* Logika delete API */ setIsDeleteOpen(false); }} 
        userName={selectedUser?.name || ""} 
      />

    </div>
  );
}