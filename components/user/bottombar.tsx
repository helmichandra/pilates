"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomBar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Home", icon: Home, href: "/dashboard-user/home" },
    { name: "Schedule", icon: Calendar, href: "/dashboard-user/booking" },
    { name: "My Bookings", icon: Bookmark, href: "/dashboard-user/saved" },
  ];

  return (
    // Tambahkan lg:hidden agar bar ini hilang di layar desktop
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-20 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center flex-1 group">
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute -inset-x-4 -inset-y-2 bg-[#640D14]/5 rounded-full" 
                  />
                )}
                <Icon className={`h-6 w-6 mb-1 ${isActive ? "text-[#640D14]" : "text-gray-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? "text-[#38040E]" : "text-gray-400"}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}