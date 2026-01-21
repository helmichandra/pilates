"use client";

import React from 'react';
import { Package, CreditCard, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuPopover({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuLinks = [
    { icon: Package, label: 'Packages', href: '/dashboard-admin/packages' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard-admin/payments' },
    { icon: Activity, label: 'Activity Logs', href: '/dashboard-admin/activity-logs', active: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur yang memudar halus */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[55]"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 w-60 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 py-2 z-[60] origin-bottom-right"
          >
            <div className="space-y-1 px-2">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                      link.active 
                        ? 'bg-[#640D14] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <link.icon className={`w-5 h-5 ${link.active ? 'text-white' : 'text-gray-400'}`} />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}