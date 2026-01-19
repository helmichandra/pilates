import Header from "@/components/navbar";
import BottomBar from "@/components/bottombar";

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
