"use client";

import React, { useState } from 'react';
import { Calendar, Clock, Users, Grid3x3, Menu as MenuIcon } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"; // Import framer-motion
import MenuPopover from './menupopover';

export default function BottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Grid3x3, label: 'Home', href: "/dashboard-admin/home" },
    { icon: Users, label: 'Users', href: "/dashboard-admin/users" },
    { icon: Calendar, label: 'Classes', href: "/dashboard-admin/classes" },
    { icon: Clock, label: 'Booking', href: "/dashboard-admin/booking" },
  ];

  return (
    <>
      <MenuPopover isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-around py-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href} className="relative group">
                <motion.div
                  whileTap={{ scale: 0.9 }} // Efek tekan
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
                    isActive ? "text-[#640D14]" : "text-gray-400"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute -bottom-2 w-1 h-1 bg-[#640D14] rounded-full" 
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Tombol Menu dengan Animasi Rotasi Ikon */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                isMenuOpen ? "text-[#640D14]" : "text-gray-400"
              }`}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }} // Ikon berputar saat terbuka
                transition={{ type: "spring", stiffness: 200 }}
              >
                <MenuIcon className="w-5 h-5" />
              </motion.div>
              <span className="text-[10px] font-medium">Menu</span>
            </motion.div>
          </button>
        </div>
      </div>
    </>
  );
}