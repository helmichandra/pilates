"use client";
import { History } from "lucide-react";


export default function TopUpHistory({ transactions = [] }: any) {
  return (
    <div className="px-6 pb-32 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6 ml-2">
        <History size={18} className="text-[#640D14]" />
        <h3 className="text-lg font-black text-[#38040E] uppercase tracking-tighter italic">Topup History</h3>
      </div>
      
      {transactions.length === 0 ? (
        <div className="bg-gray-50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">No history found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((t: any) => (
            <div key={t.id} className="bg-white border-2 border-gray-50 rounded-[1.5rem] p-5 flex items-center justify-between hover:border-[#640D14]/10 transition-all">
              <div>
                <p className="font-black text-[#38040E] text-sm uppercase tracking-tight">{t.type}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.date}</p>
              </div>
              <p className="font-black text-[#640D14] text-lg tracking-tighter">+{t.amount} <span className="text-[10px] opacity-50 uppercase">Credits</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}