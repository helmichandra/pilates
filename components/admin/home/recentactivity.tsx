function ActivityItem({ title, timestamp, author }: { 
    title: string; 
    timestamp: string; 
    author: string;
  }) {
    return (
      <div className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="w-2 h-2 bg-[#640D14] rounded-full mt-2"></div>
        <div className="flex-1">
          <p className="text-[#38040E] font-medium">{title}</p>
          <p className="text-sm text-gray-500 mt-1">
            {timestamp} • by {author}
          </p>
        </div>
      </div>
    );
  }
  
  export default function RecentActivity() {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#38040E]">Recent Activity</h3>
          <button className="text-[#640D14] text-sm font-medium hover:text-[#800E13] transition-colors">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          <ActivityItem 
            title="System started"
            timestamp="20/1/2026, 22.55.55"
            author="Admin"
          />
        </div>
      </div>
    );
  }