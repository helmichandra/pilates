"use client";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const handleBooking = () => {
    router.push("/auth/login");
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
            <span className="text-2xl font-black text-gray-900">Fixclub.</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-red-600 transition text-sm font-medium">HOME</a>
            <a href="#services" className="text-gray-700 hover:text-red-600 transition text-sm font-medium">SERVICES</a>
            <a href="#about" className="text-gray-700 hover:text-red-600 transition text-sm font-medium">ABOUT</a>
            <a href="#facility" className="text-gray-700 hover:text-red-600 transition text-sm font-medium">FACILITY</a>
            <a href="#booking" className="text-gray-700 hover:text-red-600 transition text-sm font-medium">BOOKING</a>
            <button 
              onClick={handleBooking}
              className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition transform hover:scale-105 font-semibold text-sm shadow-lg hover:shadow-xl cursor-pointer"
            >
              Book Session
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-gray-700 hover:text-red-600 font-medium">HOME</a>
            <a href="#services" className="block text-gray-700 hover:text-red-600 font-medium">SERVICES</a>
            <a href="#about" className="block text-gray-700 hover:text-red-600 font-medium">ABOUT</a>
            <a href="#facility" className="block text-gray-700 hover:text-red-600 font-medium">FACILITY</a>
            <a href="#booking" className="block text-gray-700 hover:text-red-600 font-medium">BOOKING</a>
            <button className="w-full bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold">
              Book Session
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};