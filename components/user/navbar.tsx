"use client";
import { useState, useEffect } from 'react';
import { CreditCard, User, LogOut, Loader2, Sparkles, Home, Calendar, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/dashboard-user/home", icon: Home },
    { name: "Schedule", href: "/dashboard-user/booking", icon: Calendar },
    { name: "My Bookings", href: "/dashboard-user/saved", icon: Bookmark },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'LOGOUT?',
      text: "End your session?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#640D14',
      confirmButtonText: 'YES',
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      setIsLoggingOut(true);
      localStorage.clear();
      setTimeout(() => router.push("/landing-page"), 1500);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div className="fixed inset-0 z-[110] bg-[#38040E] flex flex-col items-center justify-center text-white">
            <Loader2 className="w-12 h-12 animate-spin text-[#640D14] mb-4" />
            <h2 className="font-black tracking-widest uppercase">Fix Pilates</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard-user/home')}>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md">
                <Image src="/media/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => router.push(link.href)}
                    className={`px-5 py-2 rounded-full text-[10px] cursor-pointer font-black uppercase tracking-widest transition-all cursor-pointer ${
                      isActive ? 'bg-[#640D14] text-white shadow-lg shadow-[#640D14]/20' : 'text-gray-400 hover:text-[#640D14]'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-all">
                  <div className="bg-[#640D14] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                    <User size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black text-[#38040E] uppercase tracking-widest hidden md:block">Account</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 rounded-[2rem] p-2 shadow-2xl border-none mt-2">
                <DropdownMenuLabel className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] p-4">Settings</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/dashboard-user/profile")} className="rounded-xl p-3 font-bold text-[#38040E] cursor-pointer">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard-user/topup")} className="rounded-xl p-3 font-bold text-[#38040E] cursor-pointer">Billing & Credits</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="rounded-xl p-3 font-black text-red-600 cursor-pointer uppercase text-[10px] tracking-widest">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </nav>
      <div className="h-24" />
    </>
  );
}