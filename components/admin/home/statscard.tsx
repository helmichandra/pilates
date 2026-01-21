export default function StatsCard({ title, value, trend, trendValue }: { 
    title: string; 
    value: string | number; 
    trend?: 'up' | 'down'; 
    trendValue?: string;
  }) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-[#38040E]">{value}</h2>
          {trend && trendValue && (
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? '+' : '-'}{trendValue}
            </span>
          )}
        </div>
      </div>
    );
  }