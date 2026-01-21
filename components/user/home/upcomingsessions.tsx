"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UpcomingSessionsProps {
  hasUpcomingSessions?: boolean;
}


export default function UpcomingSessions({
  hasUpcomingSessions = false,
}: UpcomingSessionsProps) {
  const router = useRouter();
  const handleSchedule = () => {
    router.push("/dashboard-user/booking");
  };
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#1e3a8a]">Your Next Session</h3>
        <Button
          variant="link"
          className="text-[#1e3a8a] font-semibold text-sm p-0"
        >
          See All
        </Button>
      </div>

      {/* Empty State */}
      {!hasUpcomingSessions && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarPlus className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-lg font-bold text-[#1e3a8a] mb-2">
            No Upcoming Classes
          </h4>
          <p className="text-gray-500 text-sm mb-6">
            You haven't booked any sessions yet. Let's get moving!
          </p>
          <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white py-6 rounded-2xl text-base font-semibold cursor-pointer" onClick={handleSchedule}>
            Book Now
          </Button>
        </div>
      )}

      {/* TODO: Add session cards when hasUpcomingSessions is true */}
    </div>
  );
}