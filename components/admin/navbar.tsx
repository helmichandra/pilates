import React from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative overflow-hidden rounded-lg">
              {/* Menggunakan Image Next.js untuk optimasi logo */}
              <Image 
                src="/media/logo.jpeg" 
                alt="Fix Pilates Logo" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <button className="w-10 h-10 bg-gradient-to-br from-[#250902] to-[#38040E] rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}