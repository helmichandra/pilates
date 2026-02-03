import { Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export function CoachCard({ coach, onEdit, onDelete }: any) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center justify-between group"
    >
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-[#640D14] text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl">
          {coach.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-black text-[#38040E] text-xl tracking-tight">{coach.name}</h3>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 inline-block ${
            coach.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {coach.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(coach.id)} className="p-4 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-[#640D14] transition-all">
          <Edit2 size={20} />
        </button>
        <button onClick={() => onDelete(coach.id)} className="p-4 hover:bg-red-50 rounded-2xl text-gray-400 hover:text-red-600 transition-all">
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
}