import Header from "@/components/admin/navbar";
import BottomBar from '@/components/admin/bottomnav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}

      {/* padding agar konten tidak ketutup bottom bar */}
      <div className="pb-16 md:pb-0" />

      <BottomBar />
    </>
  );
}
