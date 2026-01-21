"use client";

import { X, Plus } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  initialData?: any;
}

export default function UserModal({ isOpen, onClose, type, initialData }: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#38040E]">
            {type === 'add' ? 'Add New User' : 'Edit User'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter full name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter email address" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter phone number" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Credits Section */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#38040E]">Credits & Expiry</h3>
              <span className="text-[10px] text-gray-400">Top-up adds 30 days validity</span>
            </div>

            {['REFORMER', 'CHAIR', 'PRIVATE'].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="text-xs font-bold text-gray-700">{item} (0)</p>
                  <p className="text-[10px] text-gray-400 italic">No active credits.</p>
                </div>
                <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                  <Plus className="w-3 h-3" /> Top Up
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98] cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}