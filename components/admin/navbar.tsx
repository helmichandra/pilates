"use client";
import { useState, useEffect } from 'react';
import { User, LogOut, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const result = await Swal.fire({
        title: 'LOGOUT ADMIN?',
        text: "Pastikan semua pekerjaan Anda telah tersimpan.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#640D14',
        cancelButtonColor: '#F3F4F6',
        confirmButtonText: 'YA, KELUAR',
        cancelButtonText: 'BATAL',
        reverseButtons: true,
        background: '#ffffff',
        customClass: {
          popup: 'rounded-[2.5rem] p-8',
          title: 'font-black text-[#38040E] tracking-tighter text-2xl',
          confirmButton: 'rounded-2xl font-black px-8 py-4',
          cancelButton: 'rounded-2xl font-black text-gray-500 px-8 py-4',
        }
      });

      if (result.isConfirmed) {
        setIsLoggingOut(true);
        
        // Membersihkan sesi admin
        localStorage.clear();

        // Delay untuk efek animasi sign-out
        setTimeout(() => {
          router.push("/auth/login"); // Mengarah kembali ke login page
        }, 1500);
      }
    }
  };

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
            className="fixed inset-0 z-[110] bg-[#38040E] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6">
                <Loader2 className="w-16 h-16 animate-spin text-[#640D14]" strokeWidth={3} />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black tracking-[0.2em] uppercase">Fix Admin</h2>
              <p className="text-white/40 text-[10px] font-bold tracking-widest mt-2 uppercase">Ending secure session...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative overflow-hidden rounded-2xl shadow-lg shadow-[#640D14]/10 border border-gray-50">
              <Image 
                src="/media/logo.jpeg" 
                alt="Fix Pilates Logo" 
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-[#38040E] tracking-tighter text-lg block leading-none">FIX PILATES</span>
              <span className="text-[9px] font-black text-[#640D14] uppercase tracking-[0.3em]">Administrator</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-br from-[#250902] to-[#38040E] rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-[#640D14]/20 border border-white/10"
                >
                  <User className="w-5 h-5 text-white" />
                </motion.button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-64 mt-4 rounded-[2rem] shadow-2xl border-none p-3 bg-white/95 backdrop-blur-md">
                <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 px-4 py-4">
                  Admin Panel
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="mx-2 bg-gray-100" />
                
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer py-4 px-4 text-red-600 focus:bg-red-50 focus:text-red-700 font-black rounded-2xl transition-all"
                >
                  <div className="flex items-center uppercase text-[10px] tracking-widest">
                    <LogOut className="mr-3 h-4 w-4" strokeWidth={3} />
                    Log Out Admin
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}