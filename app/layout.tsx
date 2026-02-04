import "./globals.css";
import { Inter } from "next/font/google"; // Import font dari Google
import { Toaster } from "sonner";
import { Metadata } from "next";

// Konfigurasi font Inter
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap" 
});

export const metadata: Metadata = {
  title: {
    default: "Fixclub",
    template: "%s - Fixclub",
  },
  description: "Fixing your lifestyle with Fix Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}