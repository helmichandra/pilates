"use client";

interface BookingTabsProps {
  activeTab: "upcoming" | "past";
  onTabChange: (tab: "upcoming" | "past") => void;
}

export default function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-8">
          <button
            onClick={() => onTabChange("upcoming")}
            className={`py-4 font-semibold text-base transition-all relative cursor-pointer ${
              activeTab === "upcoming"
                ? "text-[#1e3a8a]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Upcoming
            {activeTab === "upcoming" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e3a8a]"></div>
            )}
          </button>
          <button
            onClick={() => onTabChange("past")}
            className={`py-4 font-semibold text-base transition-all relative cursor-pointer ${
              activeTab === "past"
                ? "text-[#1e3a8a]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Past Bookings
            {activeTab === "past" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e3a8a]"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}