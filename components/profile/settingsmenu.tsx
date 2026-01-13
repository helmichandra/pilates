import { Lock, ChevronRight } from "lucide-react";

export default function SettingsMenu() {
  return (
    <div className="px-4 pb-6 max-w-4xl mx-auto">
      <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#1e3a8a]" />
          </div>
          <span className="text-[#1e3a8a] font-semibold">Change Password</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
}