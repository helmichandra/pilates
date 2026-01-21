"use client";

import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface BookingProps {
  booking: {
    id: string;
    memberName: string;
    className: string;
    date: string;
    status: 'UPCOMING' | 'CONFIRMED' | 'CANCELLED';
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function BookingCard({ booking, onEdit, onDelete }: BookingProps) {
  const statusColors = {
    UPCOMING: "bg-blue-100 text-blue-700",
    CONFIRMED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 flex justify-between items-center transition-all hover:shadow-md">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{booking.id}</p>
        <h3 className="text-lg font-bold text-[#38040E] leading-tight">{booking.memberName}</h3>
        <p className="text-sm font-semibold text-gray-500">{booking.className}</p>
        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mt-2 ${statusColors[booking.status]}`}>
          {booking.status}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full py-1">
        <p className="text-[11px] font-bold text-gray-400 mb-4">{booking.date}</p>
        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="p-2.5 bg-gray-50 text-gray-600 hover:text-[#640D14] hover:bg-gray-100 rounded-xl border border-gray-100 transition-all cursor-pointer"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl border border-red-100 transition-all cursor-pointer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}