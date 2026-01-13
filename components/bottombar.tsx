"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-16 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 gap-1"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 transition-colors ${
                  isActive
                    ? "text-[#1e3a8a] bg-[#1e3a8a]/10"
                    : "text-gray-500 hover:text-[#1e3a8a] hover:bg-[#1e3a8a]/5"
                } cursor-pointer`}
              >
                <Icon className="h-5 w-5" />
              </Button>

              <span
                className={`text-xs ${
                  isActive
                    ? "text-[#1e3a8a] font-medium"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
