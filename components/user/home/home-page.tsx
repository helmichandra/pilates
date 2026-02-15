import HeroBanner from "./herobanner";
import QuickActions from "./quickactions";
import UpcomingSessions from "./upcomingsessions";
import UserStatsCard from "./userstats";

export default function HomePage({ userName, reformerCount, upcomingSessions, isLoading }: any) {
  if (isLoading) return <div className="p-10 text-center font-black">LOADING...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeroBanner />
      
      {/* Container Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Gunakan items-start agar keduanya mulai dari garis atas yang sama */}
        {/* Margin negatif diletakkan di container flex agar kedua kolom naik bersamaan */}
        <div className="flex flex-col lg:flex-row gap-8 -mt-20 md:-mt-24 items-start">
          
          {/* Sisi Kiri: Profil & Sesi */}
          <div className="flex-[1.8] w-full space-y-8">
            <UserStatsCard userName={userName} reformerCount={reformerCount} />
            <UpcomingSessions sessions={upcomingSessions} />
          </div>

          {/* Sisi Kanan: Quick Access */}
          <div className="flex-1 w-full lg:sticky lg:top-28">
            {/* Ubah warna teks menjadi putih jika area ini masih menimpa banner yang gelap */}
            <h3 className="hidden lg:block text-xl font-black text-white lg:text-[#38040E] mb-6 italic uppercase tracking-wider">
              Quick Access
            </h3>
            <QuickActions />
          </div>

        </div>
      </div>
    </div>
  );
}