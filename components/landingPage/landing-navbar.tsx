"use client";
import { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Instagram, MapPin, Mail, 
  MessageCircle, ExternalLink, Dumbbell, Trophy, Coffee
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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- LOGO (Cormorant Garamond) --- */}
          <div 
            className="flex-shrink-0 flex items-center gap-4 cursor-pointer group" 
            onClick={() => { router.push('/'); closeMenu(); }}
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
              <Image src="/media/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tighter text-[#38040E] italic">
              Fix<span className="text-[#640D14] not-italic">club.</span>
            </span>
          </div>
          
          {/* --- DESKTOP MENU (Plus Jakarta Sans) --- */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-[#38040E]/70 hover:text-[#640D14] transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Facility Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setActiveDropdown('facility')} 
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 font-sans text-[11px] font-black uppercase tracking-[0.2em] text-[#38040E]/70 hover:text-[#640D14] transition-colors cursor-pointer">
                Facility <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'facility' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'facility' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    className="absolute left-0 mt-4 w-52 bg-white rounded-[2rem] shadow-2xl border border-gray-50 py-4 overflow-hidden"
                  >
                    {[
                      { name: 'Pilates', icon: Dumbbell, href: '#pilates' },
                      { name: 'Padel', icon: Trophy, href: '#padel' },
                      { name: 'Cafe', icon: Coffee, href: '#cafe' }
                    ].map((item) => (
                      <a key={item.name} href={item.href} className="flex items-center gap-4 px-6 py-3 hover:bg-[#FDF8F8] font-sans text-[10px] font-black text-[#38040E] uppercase tracking-widest transition-colors group">
                        <item.icon size={16} className="text-[#640D14] group-hover:scale-110 transition-transform"/> {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Booking Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setActiveDropdown('booking')} 
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 font-sans text-[11px] font-black uppercase tracking-[0.2em] text-[#38040E]/70 hover:text-[#640D14] transition-colors cursor-pointer">
                Booking <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'booking' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    className="absolute left-0 mt-4 w-60 bg-white rounded-[2rem] shadow-2xl border border-gray-50 py-4"
                  >
                    <button onClick={() => router.push('/dashboard-user/booking')} className="w-full text-left px-6 py-4 hover:bg-[#FDF8F8] group">
                      <div className="font-sans font-black text-[10px] text-[#38040E] uppercase tracking-widest group-hover:text-[#640D14]">Fix Pilates Studio</div>
                    </button>
                    <a href="https://ayo.co.id/v/fix-padel" target="_blank" className="flex justify-between items-center px-6 py-4 hover:bg-[#FDF8F8] group">
                      <div className="font-sans font-black text-[10px] text-[#38040E] uppercase tracking-widest group-hover:text-[#640D14]">Fix Padel Court</div>
                      <ExternalLink size={12} className="text-gray-300" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => router.push('/auth/login')} 
              className="font-sans bg-[#640D14] text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#38040E] transition-all shadow-lg shadow-[#640D14]/20 active:scale-95"
            >
              LOGIN / REGISTER
            </button>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-[#38040E] hover:bg-gray-50 rounded-xl transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (FULL OVERLAY) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 bg-white z-[99] lg:hidden flex flex-col pt-24"
          >
            <div className="p-8 space-y-10 overflow-y-auto">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={closeMenu} 
                    className="font-serif text-4xl font-bold text-[#38040E] italic tracking-tighter"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Facilities</p>
                <div className="grid gap-3">
                  {['Pilates Studio', 'Padel Court', 'Fix Cafe'].map((name) => (
                    <a key={name} href="#" onClick={closeMenu} className="p-5 bg-[#FDF8F8] rounded-[1.5rem] font-sans font-black text-xs uppercase tracking-widest text-[#38040E]">
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {router.push('/auth/login'); closeMenu();}} 
                className="w-full bg-[#640D14] text-white py-6 rounded-3xl font-sans font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#640D14]/20"
              >
                Access Member Area
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}