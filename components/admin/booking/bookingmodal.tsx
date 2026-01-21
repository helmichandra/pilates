"use client";

import React from 'react';
import { X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: 'add' | 'edit' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#38040E]">
            {type === 'add' ? 'Manual Booking' : 'Update Booking'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Member</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14] appearance-none">
              <option>Select Member</option>
              <option>Vira</option>
              <option>Jane Doe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Class</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14] appearance-none">
              <option>Select Class</option>
              <option>Wunda Chair Int (10:00)</option>
              <option>Reformer Basics (11:00)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Select Date</label>
            <input type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14]" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#640D14] appearance-none">
              <option>Upcoming</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <button className="w-full bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer">
            Save Booking
          </button>
        </div>
      </div>
    </div>
  );
}