import HeroBanner from "./herobanner";
import QuickActions from "./quickactions";
import UpcomingSessions from "./upcomingsessions";
import UserStatsCard from "./userstats";

export default function HomePage({ userName, reformerCount, upcomingSessions, isLoading }: any) {
  if (isLoading) return <div className="p-10 text-center font-black">LOADING...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroBanner />
        <UserStatsCard userName={userName} reformerCount={reformerCount} />
        <UpcomingSessions sessions={upcomingSessions} />
        <QuickActions />
      </main>
    </div>
  );
}