"use client";
import { useState, useEffect } from 'react';
import { CreditCard, User, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import Swal secara dinamis untuk menghindari error SSR
import Swal from 'sweetalert2';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfile = () => router.push("/dashboard-user/profile");
  const handleBilling = () => router.push("/dashboard-user/topup");

  const handleLogout = async () => {
    // Pastikan Swal hanya dipanggil di browser
    if (typeof window !== 'undefined') {
      const result = await Swal.fire({
        title: 'Ingin keluar?',
        text: "Anda akan diarahkan kembali ke landing page.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#640D14',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-[1.5rem]',
          title: 'font-bold text-[#38040E]',
        }
      });

      if (result.isConfirmed) {
        setIsLoggingOut(true);
        
        // Membersihkan data
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.clear();

        // Delay sedikit untuk efek animasi yang smooth
        setTimeout(() => {
          router.push("/landing-page");
        }, 1500);
      }
    }
  };

  // Jangan render jika belum mounted (mencegah hydration error)
  if (!mounted) return null;

  return (
    <>
      {/* ANIMASI OVERLAY LOGOUT */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#640D14] to-[#38040E] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-white/70" />
              <h2 className="text-xl font-bold">Signing Out</h2>
              <p className="text-white/50 text-xs mt-1">Safely clearing your session...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
              <Image src="/media/logo.jpeg" alt="Logo" width={45} height={45} className="rounded-lg shadow-sm" />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#640D14] text-white w-10 h-10 rounded-full hover:bg-[#800E13] transition transform hover:scale-105 shadow-md cursor-pointer"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-2xl border-none p-1.5">
                  <DropdownMenuLabel className="font-bold text-[#38040E] px-4 py-2">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleProfile} className="cursor-pointer py-3 rounded-xl focus:bg-gray-50">
                    <User className="mr-2 h-4 w-4 text-gray-400" />
                    Profile
                  </DropdownMenuItem>

                  {/* BILLING TETAP ADA DI SINI */}
                  <DropdownMenuItem onClick={handleBilling} className="cursor-pointer py-3 rounded-xl focus:bg-gray-50">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                    Billing
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer py-3 text-red-600 focus:bg-red-50 focus:text-red-700 font-bold rounded-xl"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}