"use client";
import { useState, useEffect } from "react";
import { userApi } from "@/services/userServices";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import ChangePasswordModal from "@/components/user/profile/changepasswordmodal";
import ProfileHeader from "@/components/user/profile/header";
import CreditCards from "@/components/user/profile/creditcard";
import SettingsMenu from "@/components/user/profile/settingsmenu";
import TopUpHistory from "@/components/user/profile/topuphistory";

export default function ProfilePage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileRes, creditRes] = await Promise.all([
          userApi.getProfile(),
          userApi.getMyCredit()
        ]);

        if (profileRes.code === 200 && creditRes.code === 200) {
          setUserData({
            username: profileRes.data.username,
            email: profileRes.data.email,
            reformerCredit: creditRes.data.credit,
          });
        }
      } catch (error) {
        toast.error("Gagal memuat data profil.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#640D14]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      <ProfileHeader 
        name={userData?.username} 
        email={userData?.email} 
        initial={userData?.username?.charAt(0)} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <section className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-[#38040E] mb-8 uppercase italic tracking-tighter">
                Your Balances
              </h3>
              <CreditCards 
                reformerCount={userData?.reformerCredit || 0} 
                chairCount={0} 
                privateCount={0} 
              />
            </div>
          </section>

          {/* Kolom Kanan: Settings & History (5/12 bagian) */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Box Settings */}
            <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-[#38040E] mb-6 uppercase italic tracking-tighter">
                Account Settings
              </h3>
              <SettingsMenu onOpenModal={() => setIsPasswordModalOpen(true)} />
            </div>

            {/* Box History */}
            <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-sm border border-gray-100">
              <TopUpHistory />
            </div>
          </aside>
          
        </div>
      </main>

      <ChangePasswordModal 
        open={isPasswordModalOpen} 
        onOpenChange={setIsPasswordModalOpen} 
      />
    </div>
  );
}