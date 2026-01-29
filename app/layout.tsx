import "./globals.css";
import { Toaster } from "sonner"; // Tambahkan toaster agar toast bekerja

export const metadata = {
  title: "fixclub.id", // Mengganti nama tab browser menjadi fixclub.id
  description: "Fixing your lifestyle with Fix Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Tambahkan ini agar notifikasi toast dari Sonner muncul di aplikasi */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}