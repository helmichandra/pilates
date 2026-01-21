import { Calendar, Clock } from 'lucide-react';

// Import Komponen
import RevenueCard from '@/components/admin/home/revenuecard';
import StatsCard from '@/components/admin/home/statscard';
import QuickStatCard from '@/components/admin/home/quickstatcard';
import RecentActivity from '@/components/admin/home/recentactivity';

export default function DashboardHome() {
    return (
      <div className="min-h-screen bg-gray-50">
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <RevenueCard month="JAN" amount="Rp 2.650.000" />
            </div>
            <StatsCard 
              title="ACTIVE MEMBERS" 
              value="2" 
              trend="up" 
              trendValue="12%" 
            />
          </div>
  
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            <QuickStatCard 
              icon={Calendar}
              count={3}
              label="Scheduled Classes"
              color="bg-purple-100"
            />
            <QuickStatCard 
              icon={Clock}
              count={1}
              label="Upcoming Bookings"
              color="bg-orange-100"
            />
          </div>
  
          {/* Recent Activity */}
          <RecentActivity />
        </main>
  
      </div>
    );
  }