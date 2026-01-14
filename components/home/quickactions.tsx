"use client";

import { Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();
  const handleBooking = () => {
    router.push("/dashboard-user/booking");
  };
  const handleProfile = () => {
    router.push("/dashboard-user/profile");
  };
  return (
    <div className="px-4 py-6 grid grid-cols-2 gap-4 mb-12">      
      <Button
        onClick={handleBooking}
        variant="outline"
        className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 cursor-pointer"
      >
        <Search className="w-6 h-6 text-[#1e3a8a]" />
        <span className="text-[#1e3a8a] font-semibold">Find Class</span>
      </Button>

      <Button
        onClick={handleProfile}
        variant="outline"
        className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a]/5 cursor-pointer"
      >
        <Settings className="w-6 h-6 text-[#1e3a8a]" />
        <span className="text-[#1e3a8a] font-semibold">Settings</span>
      </Button>
    </div>
  );
}