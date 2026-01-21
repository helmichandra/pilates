import { LucideIcon } from 'lucide-react';

export default function QuickStatCard({ icon: Icon, count, label, color }: { 
  icon: LucideIcon; 
  count: number; 
  label: string; 
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-[#38040E] mb-1">{count}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}