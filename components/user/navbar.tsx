"use client";
import { useState, useEffect } from 'react';
import { CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);


  const handleProfile = () => {
    router.push("/dashboard-user/profile");
  };

  const handleBilling = () => {
    router.push("/dashboard-user/topup");
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
          <Image
            src="/media/logo.jpeg"
            alt="Pilates Exercise"
            width={60}
            height={20}
            className="object-contain"
            priority
          />
          </div>
          <div className="flex items-center gap-2">
         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition transform hover:scale-105 font-semibold text-sm shadow-lg hover:shadow-xl cursor-pointer"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBilling} className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
         
        </div>
      </div>
  
    </nav>
  );
}