"use client";

import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';

interface ClassProps {
  schedule: {
    title: string;
    time: string;
    duration: string;
    days: string[];
    coach: string;
    room: string;
    status: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassCard({ schedule, onEdit, onDelete }: ClassProps) {
  const allDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        {/* Menggunakan warna teks gelap yang sama dengan Users Page */}
        <h3 className="text-xl font-bold text-[#38040E] uppercase tracking-tight">{schedule.title}</h3>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
          {schedule.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 font-medium">
        <Clock className="w-4 h-4 text-[#640D14]" />
        <span>{schedule.time} ({schedule.duration})</span>
      </div>

      {/* Days Row - Warna Biru Muda diganti ke Merah Muda/Netral agar selaras */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allDays.map((day) => (
          <div
            key={day}
            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
              schedule.days.includes(day)
                ? "bg-[#640D14] border-[#640D14] text-white" // Hari aktif mengikuti warna brand
                : "bg-gray-50 border-gray-200 text-gray-300"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Details Box */}
      <div className="bg-gray-50 rounded-xl p-4 flex justify-between mb-4 border border-gray-100">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Coach</p>
          <p className="text-sm font-bold text-[#38040E]">{schedule.coach}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Room</p>
          <p className="text-sm font-bold text-[#38040E]">{schedule.room}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-[#38040E] hover:bg-gray-50 transition-all cursor-pointer"
        >
          <Edit2 className="w-4 h-4" /> Edit Details
        </button>
        <button 
          onClick={onDelete}
          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-100 transition-colors cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}