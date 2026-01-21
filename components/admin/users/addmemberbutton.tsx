import { Plus } from 'lucide-react';

export default function AddMemberButton() {
  return (
    <button className="w-full bg-gradient-to-r from-[#640D14] to-[#800E13] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg cursor-pointer">
      <Plus className="w-5 h-5" />
      Add New Member
    </button>
  );
}