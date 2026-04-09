import { Edit, Trash2, Clock, Users, Calendar } from "lucide-react";

export const ClassCard = ({ item, onEdit, onDelete }: any) => {
  // Format waktu dari ISO string (2026-01-30T08:00:00Z) ke 08:00
  const formatTime = (isoString: string) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Format tanggal dari ISO string ke 30 Januari 2026
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? dateString 
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  // Ambil label hari (Sen, Sel, Rab, dst)
  const dayLabel = item.date 
    ? new Date(item.date).toLocaleDateString("id-ID", { weekday: "short" }) 
    : "-";

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header: Level & Type */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#640D14]/10 text-[#640D14] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
              {item.class_level}
            </span>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
              {item.class_type}
            </span>
          </div>
          <h3 className="text-lg font-black text-[#38040E] leading-tight uppercase truncate">
            {item.pilates_name}
          </h3>
        </div>
        <div className="bg-[#640D14] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs uppercase shadow-lg shadow-[#640D14]/20">
          {dayLabel}
        </div>
      </div>

      {/* Time & Duration */}
      <div className="flex items-center gap-4 mb-6 text-gray-500">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Clock size={14} className="text-[#640D14]" />
          {formatTime(item.start_time)} - {formatTime(item.end_time)}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
          {item.duration_minutes} Mins
        </div>
      </div>

      {/* Coach & Room Info */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Coach</p>
          <p className="text-xs font-bold text-[#38040E] truncate">{item.coach_name}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Room</p>
          <p className="text-xs font-bold text-[#38040E] truncate">{item.class_room}</p>
        </div>
      </div>

      {/* Full Date Info */}
      <div className="mb-6">
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#640D14] shadow-sm">
            <Calendar size={14} />
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule Date</p>
            <p className="text-xs font-bold text-[#38040E]">{formatDate(item.date)}</p>
          </div>
        </div>
      </div>

      {/* Footer: Quota & Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
            <Users size={12} />
            Quota: <span className="text-[#38040E]">{item.quota}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
            <Users size={12} className="text-[#640D14]" />
            Remaining: <span className="text-[#640D14]">{item.remaining}</span>
          </div>
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={onEdit} 
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
            title="Edit Class"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={onDelete} 
            className="p-2 hover:bg-red-50 rounded-xl text-red-400 transition-colors"
            title="Delete Class"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};