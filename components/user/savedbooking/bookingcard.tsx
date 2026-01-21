import { Calendar, MapPin, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  id: string;
  date: string;
  time: string;
  duration: string;
  title: string;
  type: "reformer" | "chair" | "private";
  credit: number;
  level: string;
  coach: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function BookingCard({
  id,
  date,
  time,
  duration,
  title,
  type,
  credit,
  level,
  coach,
  location,
  status,
  onCancel,
  onViewDetails,
}: BookingCardProps) {
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

  const statusColors = {
    upcoming: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1e3a8a] transition-all">
      {/* Header with Date and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#1e3a8a]" />
          <div>
            <p className="font-bold text-[#1e3a8a]">{date}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{time} • {duration}</span>
            </div>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">{title}</h3>

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

      {/* Details */}
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

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          variant="outline"
          className="flex-1 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 cursor-pointer"
          onClick={() => onViewDetails?.(id)}
        >
          View Details
        </Button>
        {status === "upcoming" && (
          <Button
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50 cursor-pointer"
            onClick={() => onCancel?.(id)}
          >
            Cancel Booking
          </Button>
        )}
      </div>
    </div>
  );
}