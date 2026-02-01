"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#640D14] transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search by name, email, or username..."
        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#640D14]/20 focus:ring-4 focus:ring-[#640D14]/5 transition-all shadow-sm"
        onChange={(e) => onChange(e.target.value)} // Mengirim nilai input ke parent
      />
    </div>
  );
}