import { MapPin, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassCardProps {
  time: string;
  duration: string;
  title: string;
  type: "reformer" | "chair" | "private";
  credit: number;
  level: string;
  coach: string;
  location: string;
  spotsLeft: number;
  status?: "passed" | "available";
  onBook?: () => void;
}

export default function ClassCard({
  time,
  duration,
  title,
  type,
  credit,
  level,
  coach,
  location,
  spotsLeft,
  status = "available",
  onBook,
}: ClassCardProps) {
  const typeColors = {
    reformer: "bg-blue-100 text-blue-700",
    chair: "bg-orange-100 text-orange-700",
    private: "bg-purple-100 text-purple-700",
  };

  const typeLabels = {
    reformer: "REFORMER CLASS",
    chair: "CHAIR CLASS",
    private: "PRIVATE CLASS",
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1e3a8a] transition-all">
      {/* Time and Duration */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-bold text-[#1e3a8a]">{time}</span>
        <span className="text-gray-400">|</span>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>

      {/* Title and Info Icon */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
          {title}
          <Info className="w-4 h-4 text-gray-400" />
        </h3>
        {status === "passed" && (
          <span className="text-sm text-gray-400 font-semibold">PASSED</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeColors[type]}`}>
          {typeLabels[type]}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
          💳 {credit} CREDIT
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          {level.toUpperCase()}
        </span>
      </div>

      {/* Coach and Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>Coach {coach}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <button className="text-[#1e3a8a] font-semibold text-sm hover:underline">
            View Booking Details
          </button>
          <p className="text-sm text-gray-500 mt-1">{spotsLeft} left</p>
        </div>
        {status === "available" && (
          <Button
            onClick={onBook}
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8 h-10 rounded-full font-semibold cursor-pointer"
          >
            BOOK
          </Button>
        )}
      </div>
    </div>
  );
}