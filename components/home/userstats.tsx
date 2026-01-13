import { Button } from "@/components/ui/button";

interface UserStatsCardProps {
  userName?: string;
  greeting?: string;
  reformerCount?: number;
  chairCount?: number;
  privateCount?: number;
}

export default function UserStats({
  userName = "Vira",
  greeting = "GOOD MORNING",
  reformerCount = 5,
  chairCount = 2,
  privateCount = 0,
}: UserStatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 -mt-8 mx-4 relative z-20">
      {/* User Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-xl">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {greeting}
            </p>
            <p className="text-lg font-bold text-[#1e3a8a]">{userName}</p>
          </div>
        </div>
        <Button
          variant="link"
          className="text-[#1e3a8a] font-semibold text-sm"
        >
          + Top Up
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Reformer
          </p>
          <p className="text-2xl font-bold text-[#1e3a8a]">{reformerCount}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Chair
          </p>
          <p className="text-2xl font-bold text-[#1e3a8a]">{chairCount}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Private
          </p>
          <p className="text-2xl font-bold text-[#1e3a8a]">{privateCount}</p>
        </div>
      </div>
    </div>
  );
}