"use client";
import { useState, useEffect } from 'react';
import { CreditCard, User, LogOut, Loader2, Sparkles } from "lucide-react";
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
import Swal from 'sweetalert2';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfile = () => router.push("/dashboard-user/profile");
  const handleBilling = () => router.push("/dashboard-user/topup");

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const result = await Swal.fire({
        title: 'LOGOUT?',
        text: "Are you sure you want to end your session?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#640D14',
        cancelButtonColor: '#F3F4F6',
        confirmButtonText: 'YES, LOGOUT',
        cancelButtonText: 'CANCEL',
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
        localStorage.clear();
        setTimeout(() => {
          router.push("/landing-page");
        }, 1500);
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
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
              <h2 className="text-2xl font-black tracking-[0.2em] uppercase">Fix Pilates</h2>
              <p className="text-white/40 text-[10px] font-bold tracking-widest mt-2 uppercase">Safely clearing session...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2' 
        : 'bg-white py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer flex items-center gap-3" 
              onClick={() => router.push('/')}
            >
              <div className="relative w-11 h-11 overflow-hidden rounded-2xl shadow-lg shadow-[#640D14]/10 border border-gray-100">
                <Image src="/media/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-black text-[#38040E] tracking-tighter text-lg hidden sm:block">FIX PILATES</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 p-1 pr-4 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer group"
                  >
                    <div className="bg-[#640D14] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#640D14]/20 group-hover:bg-[#38040E] transition-colors">
                      <User size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-black text-[#38040E] uppercase tracking-widest hidden xs:block">Menu</span>
                  </motion.button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-64 mt-4 rounded-[2rem] shadow-2xl border-none p-3 bg-white/95 backdrop-blur-md">
                  <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 px-4 py-4">
                    Account Overview
                  </DropdownMenuLabel>
                  
                  <div className="space-y-1">
                    <DropdownMenuItem onClick={handleProfile} className="cursor-pointer py-4 px-4 rounded-2xl focus:bg-[#640D14]/5 group transition-all">
                      <div className="flex items-center">
                        <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#640D14]" strokeWidth={2.5} />
                        <span className="font-bold text-sm text-[#38040E]">Profile Settings</span>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleBilling} className="cursor-pointer py-4 px-4 rounded-2xl focus:bg-[#640D14]/5 group transition-all">
                      <div className="flex items-center">
                        <CreditCard className="mr-3 h-4 w-4 text-gray-400 group-hover:text-[#640D14]" strokeWidth={2.5} />
                        <span className="font-bold text-sm text-[#38040E]">Billing & Credits</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator className="my-3 bg-gray-100 h-[2px]" />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer py-4 px-4 text-red-600 focus:bg-red-50 focus:text-red-700 font-black rounded-2xl transition-all"
                  >
                    <div className="flex items-center uppercase text-[10px] tracking-widest">
                      <LogOut className="mr-3 h-4 w-4" strokeWidth={3} />
                      Log Out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer agar konten tidak tertutup navbar fixed */}
      <div className="h-20 w-full" />
    </>
  );
}