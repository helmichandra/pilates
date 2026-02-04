"use client";

import { useState } from 'react';
import BookingCard from '@/components/admin/booking/bookingcard';
import BookingModal from '@/components/admin/booking/bookingmodal';
import DeleteModal from '@/components/admin/users/deletemodal';
import { Plus } from 'lucide-react';

export default function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const bookings = [
    { id: 'BK-001', memberName: 'Vira', className: 'WUNDA CHAIR INT', date: 'Kamis, 15 Jan 2026 • 10:00', status: 'UPCOMING' as const },
    { id: 'BK-002', memberName: 'Jane Doe', className: 'REFORMER BASICS', date: 'Sabtu, 17 Jan 2026 • 11:00', status: 'CONFIRMED' as const },
    { id: 'BK-003', memberName: 'Budi Santoso', className: 'WUNDA CHAIR INT', date: 'Senin, 12 Jan 2026 • 10:00', status: 'CANCELLED' as const },
  ];

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (booking: any) => {
    setSelectedBooking(booking);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button 
          onClick={() => { setModalType('add'); setIsModalOpen(true); }}
          className="w-full mb-6 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Manual Booking
        </button>

        <div className="space-y-2">
          {bookings.map((item) => (
            <BookingCard 
              key={item.id} 
              booking={item} 
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      </main>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      
      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={() => setIsDeleteOpen(false)} 
        userName={`${selectedBooking?.id} (${selectedBooking?.memberName})`} 
      />

    </div>
  );
}