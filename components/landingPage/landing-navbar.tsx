"use client";
import { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Instagram, MapPin, Mail, 
  MessageCircle, ExternalLink, Dumbbell, Trophy, Coffee, Phone
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menutup menu saat navigasi (mobile)
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/'); closeMenu(); }}>
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              <Image src="/media/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-black text-[#38040E] tracking-tighter text-lg">FIX CLUB</span>
          </div>
          
          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[#38040E] hover:text-red-600 transition text-[11px] font-black uppercase tracking-widest">
                {link.name}
              </a>
            ))}

            {/* Dropdown Facility */}
            <div className="relative group" onMouseEnter={() => setActiveDropdown('facility')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1 text-[#38040E] group-hover:text-red-600 transition text-[11px] font-black uppercase tracking-widest cursor-pointer">
                Facility <ChevronDown size={14} className={activeDropdown === 'facility' ? 'rotate-180 transition-transform' : ''} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'facility' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-50 py-3 overflow-hidden">
                    <a href="#pilates" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-700 uppercase tracking-tight"><Dumbbell size={16} className="text-red-600"/> Pilates</a>
                    <a href="#padel" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-700 uppercase tracking-tight"><Trophy size={16} className="text-red-600"/> Padel</a>
                    <a href="#cafe" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-700 uppercase tracking-tight"><Coffee size={16} className="text-red-600"/> Cafe</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Booking */}
            <div className="relative group" onMouseEnter={() => setActiveDropdown('booking')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1 text-[#38040E] group-hover:text-red-600 transition text-[11px] font-black uppercase tracking-widest cursor-pointer">
                Booking <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'booking' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-50 py-3">
                    <button onClick={() => router.push('/dashboard-user/booking')} className="w-full text-left px-5 py-3 hover:bg-red-50 group/item">
                      <div className="font-black text-[11px] text-[#38040E] uppercase tracking-wider group-hover/item:text-red-600">Fix Pilates</div>
                    </button>
                    <a href="https://ayo.co.id/v/fix-padel" target="_blank" className="flex justify-between items-center px-5 py-3 hover:bg-red-50 group/item">
                      <div>
                        <div className="font-black text-[11px] text-[#38040E] uppercase tracking-wider group-hover/item:text-red-600">Fix Padel</div>
                      </div>
                      <ExternalLink size={12} className="text-gray-300" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Contact (Socials) */}
            <div className="relative group" onMouseEnter={() => setActiveDropdown('contact')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1 text-[#38040E] group-hover:text-red-600 transition text-[11px] font-black uppercase tracking-widest cursor-pointer">
                Contact <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'contact' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-50 py-3">
                    <a href="https://wa.me/628123456789" target="_blank" className="flex items-center gap-4 px-5 py-3 hover:bg-green-50 text-[11px] font-bold text-gray-700 uppercase"><MessageCircle size={16} className="text-green-500"/> WhatsApp</a>
                    <a href="https://instagram.com/fixclub" target="_blank" className="flex items-center gap-4 px-5 py-3 hover:bg-pink-50 text-[11px] font-bold text-gray-700 uppercase"><Instagram size={16} className="text-pink-600"/> Instagram</a>
                    <a href="https://goo.gl/maps/..." target="_blank" className="flex items-center gap-4 px-5 py-3 hover:bg-blue-50 text-[11px] font-bold text-gray-700 uppercase"><MapPin size={16} className="text-blue-500"/> Location</a>
                    <a href="mailto:info@fixclub.id" className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 text-[11px] font-bold text-gray-700 uppercase"><Mail size={16} className="text-red-600"/> Email</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => router.push('/auth/login')} className="bg-[#640D14] text-white px-7 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-black transition-all shadow-md cursor-pointer">
            Login / Register
            </button>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-[#38040E]">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (FULL OVERLAY) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="fixed inset-0 top-20 bg-white z-[99] lg:hidden overflow-y-auto">
            <div className="p-8 space-y-8 flex flex-col min-h-full">
              
              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={closeMenu} className="text-2xl font-black text-[#38040E] uppercase tracking-tighter">{link.name}</a>
                ))}
              </div>

              {/* Mobile Facility Accordion */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facilities</p>
                <div className="grid grid-cols-1 gap-3">
                  <a href="#pilates" onClick={closeMenu} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl font-bold text-sm"><Dumbbell className="text-red-600" size={18}/> Pilates Studio</a>
                  <a href="#padel" onClick={closeMenu} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl font-bold text-sm"><Trophy className="text-red-600" size={18}/> Padel Court</a>
                  <a href="#cafe" onClick={closeMenu} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl font-bold text-sm"><Coffee className="text-red-600" size={18}/> Fix Cafe</a>
                </div>
              </div>

              {/* Mobile Booking & Contact */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking</p>
                    <button onClick={() => {router.push('/dashboard-user/booking'); closeMenu();}} className="block font-bold text-sm text-red-600">Fix Pilates</button>
                    <a href="https://ayo.co.id/v/fix-padel" className="block font-bold text-sm text-red-600">Fix Padel</a>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
                    <div className="flex gap-4">
                      <a href="#" className="text-gray-400 hover:text-red-600"><MessageCircle size={20}/></a>
                      <a href="#" className="text-gray-400 hover:text-red-600"><Instagram size={20}/></a>
                      <a href="#" className="text-gray-400 hover:text-red-600"><MapPin size={20}/></a>
                    </div>
                 </div>
              </div>

              <button onClick={() => {router.push('/auth/login'); closeMenu();}} className="w-full bg-[#640D14] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl">
                Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}