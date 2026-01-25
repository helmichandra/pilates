"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomBar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Home",
      icon: Home,
      href: "/dashboard-user/home",
    },
    {
      name: "Schedule",
      icon: Calendar,
      href: "/dashboard-user/booking",
    },
    {
      name: "Saved",
      icon: Bookmark,
      href: "/dashboard-user/saved",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-20 px-4 max-w-lg mx-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 py-2 group"
            >
              <div className="relative flex flex-col items-center justify-center">
                {/* Background Active Indicator (Animated Pill) */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute -inset-x-6 -inset-y-1 bg-[#640D14]/5 rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon dengan Animasi Bounce saat Tap */}
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="relative z-10"
                >
                  <Icon
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isActive ? "text-[#640D14]" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>

                {/* Label Text */}
                <span
                  className={`text-[10px] mt-1 relative z-10 font-black uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-[#38040E]" : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>

                {/* Dot Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-2 w-1 h-1 bg-[#640D14] rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}