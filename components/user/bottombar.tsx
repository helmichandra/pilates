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
                    ? "text-red-600 bg-red-600/10"
                    : "text-gray-500 hover:text-red-600 hover:bg-red-600/5"
                } cursor-pointer`}
                >
                <Icon className="h-5 w-5" />
                </Button>

                <span
                className={`text-xs ${
                    isActive
                    ? "text-red-600 font-medium"
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
