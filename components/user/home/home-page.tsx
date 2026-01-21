import HeroBanner from "./herobanner";
import QuickActions from "./quickactions";
import UpcomingSessions from "./upcomingsessions";
import UserStatsCard from "./userstats";

export default function HomePage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <main>
          <HeroBanner />
          <UserStatsCard />
          <UpcomingSessions />
          <QuickActions />
        </main>
      </div>
    );
  }
