"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const handleBooking = () => {
    router.push("/dashboard-user/booking");
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#191A1E] shadow-lg"
          : "bg-[#191A1E]/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#E7E5DB] italic animate-fade-in">
            FIX Padel
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-[#AD9E89] hover:text-[#E7E5DB] transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#courts"
              className="text-[#AD9E89] hover:text-[#E7E5DB] transition-colors duration-300"
            >
              Courts
            </a>
            <a
              href="#pricing"
              className="text-[#AD9E89] hover:text-[#E7E5DB] transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-[#AD9E89] hover:text-[#E7E5DB] transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button                 
                onClick={handleBooking}
                className="hidden md:block bg-[#491108] hover:bg-[#491108]/90 text-white transition-transform hover:scale-105 duration-300 cursor-pointer">
              Book Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#E7E5DB]"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 animate-slide-down">
            <a
              href="#about"
              className="block text-[#AD9E89] hover:text-[#E7E5DB] transition-colors"
            >
              About
            </a>
            <a
              href="#courts"
              className="block text-[#AD9E89] hover:text-[#E7E5DB] transition-colors"
            >
              Courts
            </a>
            <a
              href="#pricing"
              className="block text-[#AD9E89] hover:text-[#E7E5DB] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="block text-[#AD9E89] hover:text-[#E7E5DB] transition-colors"
            >
              Contact
            </a>
            <Button 
                onClick={handleBooking}
                className="w-full bg-[#491108] hover:bg-[#491108]/90 text-white">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}