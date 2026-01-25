"use client";
import { useState } from "react";
import ChangePasswordModal from "@/components/user/profile/changepasswordmodal";

import ProfileHeader from "@/components/user/profile/header";
import CreditCards from "@/components/user/profile/creditcard";
import SettingsMenu from "@/components/user/profile/settingsmenu";
import TopUpHistory from "@/components/user/profile/topuphistory";

export default function ProfilePage() {
  // 1. Buat state di level parent (halaman ini)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <ProfileHeader />
      <CreditCards />
      
      {/* 2. Oper fungsi pembuka modal ke SettingsMenu */}
      <SettingsMenu onOpenModal={() => setIsPasswordModalOpen(true)} />
      
      <TopUpHistory />

      {/* 3. Letakkan modal di sini dan sambungkan state-nya */}
      <ChangePasswordModal 
        open={isPasswordModalOpen} 
        onOpenChange={setIsPasswordModalOpen} 
      />
    </div>
  );
}