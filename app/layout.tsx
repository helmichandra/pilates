import "./globals.css";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google"; 
import { Toaster } from "sonner";
import { Metadata } from "next";

// Konfigurasi Plus Jakarta Sans untuk Body & UI
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Konfigurasi Cormorant Garamond untuk Headings & Italic
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
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
    <html lang="en" className={`${plusJakarta.variable} ${cormorantGaramond.variable}`}>
      {/* - font-sans akan menggunakan Plus Jakarta Sans
          - font-serif akan menggunakan Cormorant Garamond 
      */}
      <body className="font-sans antialiased text-[#38040E]">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}