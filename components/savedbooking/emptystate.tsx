import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <Calendar className="w-12 h-12 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-400 mb-2">No bookings found</h3>
      <p className="text-gray-400 mb-6 text-center max-w-sm">
        You haven't booked any classes yet. Start your fitness journey today!
      </p>
      <Link href="/dashboard-user/booking">
        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8 cursor-pointer">
          Browse Classes
        </Button>
      </Link>
    </div>
  );
}