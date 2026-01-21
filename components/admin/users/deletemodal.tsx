"use client";

import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, userName }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-[#38040E] mb-2">Delete Member?</h3>
        <p className="text-gray-500 text-sm mb-6">
          Are you sure you want to delete <span className="font-bold text-gray-800">{userName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}