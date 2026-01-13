import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="px-4 py-6 grid grid-cols-2 gap-4 mb-12">
      <Button
        variant="outline"
        className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 cursor-pointer"
      >
        <Search className="w-6 h-6 text-[#1e3a8a]" />
        <span className="text-[#1e3a8a] font-semibold">Find Class</span>
      </Button>

      <Button
        variant="outline"
        className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 cursor-pointer"
      >
        <Settings className="w-6 h-6 text-[#1e3a8a]" />
        <span className="text-[#1e3a8a] font-semibold">Settings</span>
      </Button>
    </div>
  );
}