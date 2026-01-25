export default function FilterSection({ onTypeChange, onLevelChange }: any) {
  return (
    <div className="bg-white border-b sticky top-[175px] z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="absolute left-4 top-2 text-[9px] font-black text-[#640D14] uppercase tracking-widest">Type</label>
          <select onChange={(e) => onTypeChange(e.target.value)} className="w-full pt-6 pb-2 px-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#640D14] text-sm font-bold text-[#38040E] appearance-none">
            <option value="all">All Types</option>
            <option value="reformer">Reformer</option>
            <option value="chair">Chair</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="relative">
          <label className="absolute left-4 top-2 text-[9px] font-black text-[#640D14] uppercase tracking-widest">Level</label>
          <select onChange={(e) => onLevelChange(e.target.value)} className="w-full pt-6 pb-2 px-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#640D14] text-sm font-bold text-[#38040E] appearance-none">
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}