"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Edit2 } from 'lucide-react';

// Update Interface agar tidak error lagi
interface UserProps {
  user: {
    name: string;
    email: string;
    status: string;
    credits: {
      reformer: number;
      chair: number;
      private: number;
    };
  };
  onEdit: () => void;    // Tambahkan ini
  onDelete: () => void;  // Tambahkan ini
}

export default function UserCard({ user, onEdit, onDelete }: UserProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#38040E]">
          {getInitials(user.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#38040E] mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {user.status}
        </span>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <span className="text-xs font-semibold text-gray-500 tracking-wide">CREDITS OVERVIEW</span>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 grid grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 mb-1 font-bold">REFORMER</p>
              <p className="text-xl font-bold text-blue-600">{user.credits.reformer}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 mb-1 font-bold">CHAIR</p>
              <p className="text-xl font-bold text-purple-600">{user.credits.chair}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 mb-1 font-bold">PRIVATE</p>
              <p className="text-xl font-bold text-orange-600">{user.credits.private}</p>
            </div>
          </div>

          <div className="p-4 pt-0 flex items-center justify-end gap-2">
            {/* Tombol Edit */}
            <button 
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#38040E] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 cursor-pointer"
            >
              <Edit2 className="w-4 h-4" /> Edit Details
            </button>
            
            {/* Tombol Delete */}
            <button 
              onClick={onDelete}
              className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors border border-red-100 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}