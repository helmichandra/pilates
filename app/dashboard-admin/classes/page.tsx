"use client";

import { useState } from 'react';
import ClassCard from '@/components/admin/classes/classcard';
import ClassModal from '@/components/admin/classes/classmodal';
import DeleteModal from '@/components/admin/users/deletemodal'; // Reuse DeleteModal
import { Plus } from 'lucide-react';

export default function ClassesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const schedules = [
    { title: 'Wunda Chair Int', time: '10:00', duration: '50m', days: ['Sen', 'Rab'], coach: 'Michael', room: 'Chair Room', status: 'ACTIVE' },
    { title: 'Reformer Basics', time: '11:00', duration: '50m', days: ['Rab', 'Sab'], coach: 'Sarah', room: 'Reformer Studio', status: 'ACTIVE' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button 
          onClick={() => { setModalType('add'); setIsModalOpen(true); }}
          className="w-full mt-4 mb-6 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5" /> New Class Schedule
        </button>

        {schedules.map((item, idx) => (
          <ClassCard 
            key={idx} 
            schedule={item} 
            onEdit={() => { setSelectedClass(item); setModalType('edit'); setIsModalOpen(true); }}
            onDelete={() => { setSelectedClass(item); setIsDeleteOpen(true); }}
          />
        ))}
      </main>

      <ClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      
      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={() => setIsDeleteOpen(false)} 
        userName={selectedClass?.title || ""} 
      />

    </div>
  );
}