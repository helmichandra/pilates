import Header from "@/components/navbar";
import BottomBar from "@/components/bottombar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* Tambahkan padding bottom untuk konten agar tidak tertutup bottom bar */}
        <div className="pb-16 md:pb-0" />
        <BottomBar />
      </body>
    </html>
  );
}