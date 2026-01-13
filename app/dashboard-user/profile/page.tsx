
import ProfileHeader from "@/components/profile/header";
import CreditCards from "@/components/profile/creditcard";
import SettingsMenu from "@/components/profile/settingsmenu";
import TopUpHistory from "@/components/profile/topuphistory";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <ProfileHeader 
          name="Vira"
          email="vira@example.com"
          initial="V"
        />
        <CreditCards 
          reformerCount={5}
          chairCount={2}
          privateCount={0}
        />
        <SettingsMenu />
        <TopUpHistory />
      </main>
    </div>
  );
}