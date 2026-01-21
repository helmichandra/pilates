"use client";

import React from 'react';
import { X } from 'lucide-react';

export default function ClassModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: 'add' | 'edit' }) {
  if (!isOpen) return null;

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#38040E]">
            {type === 'add' ? 'New Class Schedule' : 'Edit Class Schedule'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Class Title</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#640D14]/20 focus:border-[#640D14]" placeholder="e.g. WUNDA CHAIR INT" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Weekly Schedule</label>
            <div className="flex gap-1.5">
              {days.map(day => (
                <button key={day} className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:border-[#640D14] hover:text-[#640D14] transition-all cursor-pointer">
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
              <input type="time" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Duration (mins)</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" placeholder="50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Coach</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" placeholder="Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Room</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" placeholder="Room name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Capacity</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" placeholder="10" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14] appearance-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Button - Warna Gradasi Marun */}
        <div className="p-6 bg-white border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer">
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
}