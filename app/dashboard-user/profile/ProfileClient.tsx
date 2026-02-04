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
  const token = localStorage.getItem("token");
console.log(token);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Ambil data dari dua API berbeda secara paralel
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
    <div className="min-h-screen bg-white">
      {/* Sekarang menggunakan Username dan Email dari API Profile */}
      <ProfileHeader 
        name={userData?.username} 
        email={userData?.email} 
        initial={userData?.username?.charAt(0)} 
      />
      
      {/* Menggunakan Credit dari API Credit */}
      <CreditCards 
        reformerCount={userData?.reformerCredit || 0} 
        chairCount={0} 
        privateCount={0} 
      />
      
      <SettingsMenu onOpenModal={() => setIsPasswordModalOpen(true)} />
      
      <TopUpHistory />

      <ChangePasswordModal 
        open={isPasswordModalOpen} 
        onOpenChange={setIsPasswordModalOpen} 
      />
    </div>
  );
}