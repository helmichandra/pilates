import { Edit, Trash2, MapPin, Clock, Users } from "lucide-react";

export const ClassCard = ({ item, onEdit, onDelete }: any) => {
  // Format waktu dari ISO string (08:00:00Z) ke 08:00
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const dayLabel = new Date(item.date).toLocaleDateString("id-ID", { weekday: "short" });

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#640D14]/10 text-[#640D14] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {item.class_level}
            </span>
            <span className="text-gray-400 text-[10px] font-bold uppercase">{item.class_type}</span>
          </div>
          <h3 className="text-lg font-black text-[#38040E] leading-tight uppercase truncate">
            {item.pilates_name}
          </h3>
        </div>
        <div className="bg-[#640D14] text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs">
          {dayLabel}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 text-gray-500">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Clock size={14} className="text-[#640D14]" />
          {formatTime(item.start_time)}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          {item.duration_minutes} Mins
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Coach</p>
          <p className="text-xs font-bold text-[#38040E] truncate">{item.coach_name}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Room</p>
          <p className="text-xs font-bold text-[#38040E] truncate">{item.class_room}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
          <Users size={14} className="text-gray-400" />
          Quota: <span className="text-[#38040E]">{item.quota}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"><Edit size={18} /></button>
          <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-xl text-red-400"><Trash2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};