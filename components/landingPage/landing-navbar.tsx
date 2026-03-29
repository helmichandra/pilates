"use client";
import { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, ExternalLink, Dumbbell, Trophy, Coffee,
  Instagram, Phone, Mail, MapPin
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
    // Top Bar menghilang saat scroll > 10px
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    { name: 'Beranda', href: '#home', active: true },
    { name: 'Fasilitas', type: 'dropdown', id: 'facility' },
    { name: 'Reservasi', type: 'dropdown', id: 'booking' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[110] transition-all duration-500 ${
        scrolled || isOpen ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'
      }`}>
        
        {/* --- TOP BAR (Instagram, WA, dll) --- */}
        <div 
          className={`hidden lg:block border-b border-gray-100/50 overflow-hidden transition-all duration-500 ease-in-out ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-end items-center gap-8">
            <a href="https://instagram.com/fixclub.id" target="_blank" className="flex items-center gap-2 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#38040E]/60 hover:text-[#640D14] transition-colors">
              <Instagram size={14} /> INSTAGRAM
            </a>
            <a href="https://wa.me/6282298088866" target="_blank" className="flex items-center gap-2 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#38040E]/60 hover:text-[#640D14] transition-colors">
              <Phone size={14} /> WHATSAPP
            </a>
            <a href="mailto:hello@fixclub.id" className="flex items-center gap-2 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#38040E]/60 hover:text-[#640D14] transition-colors">
              <Mail size={14} /> EMAIL
            </a>
            <a href="https://maps.app.goo.gl/tVZBrYnF2FAwngCt8" className="flex items-center gap-2 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#38040E]/60 hover:text-[#640D14] transition-colors">
              <MapPin size={14} /> LOCATION
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* --- LOGO --- */}
            <div 
              className="flex-shrink-0 flex items-center gap-3 sm:gap-4 cursor-pointer group z-[120]" 
              onClick={() => { router.push('/'); closeMenu(); }}
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                <Image src="/media/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tighter text-[#38040E] italic">
                FIX<span className="text-[#640D14] not-italic">CLUB</span>
              </span>
            </div>
            
            {/* --- DESKTOP MENU --- */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => {
                if (link.type === 'dropdown') {
                  return (
                    <div 
                      key={link.name}
                      className="relative py-2" 
                      onMouseEnter={() => setActiveDropdown(link.id || null)} 
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center gap-1 font-sans text-[11px] font-black uppercase tracking-[0.25em] text-[#38040E]/70 hover:text-[#640D14] transition-colors cursor-pointer group">
                        {link.name} 
                        <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180 text-[#640D14]' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === link.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 10 }} 
                            className="absolute left-0 mt-4 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-50 py-4 overflow-hidden"
                          >
                            {link.id === 'facility' ? (
                              <>
                                {[
                                  { name: 'Pilates Studio', icon: Dumbbell, href: '#pilates' },
                                  { name: 'Padel Court', icon: Trophy, href: '#padel' },
                                  { name: 'Fix Cafe', icon: Coffee, href: '#cafe' }
                                ].map((item) => (
                                  <a key={item.name} href={item.href} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FDF8F8] font-sans text-[10px] font-black text-[#38040E] uppercase tracking-widest transition-colors group">
                                    <item.icon size={16} className="text-[#640D14] group-hover:scale-110 transition-transform"/> {item.name}
                                  </a>
                                ))}
                              </>
                            ) : (
                              <>
                                <button onClick={() => router.push('/dashboard-user/booking')} className="w-full text-left px-6 py-4 hover:bg-[#FDF8F8] group">
                                  <div className="font-sans font-black text-[10px] text-[#38040E] uppercase tracking-widest group-hover:text-[#640D14] cursor-pointer">Fix Pilates Studio</div>
                                </button>
                                <a href="https://ayo.co.id/v/fix-padel" target="_blank" className="flex justify-between items-center px-6 py-4 hover:bg-[#FDF8F8] group">
                                  <div className="font-sans font-black text-[10px] text-[#38040E] uppercase tracking-widest group-hover:text-[#640D14] cursor-pointer">Fix Padel Court</div>
                                  <ExternalLink size={12} className="text-gray-300" />
                                </a>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`relative font-sans text-[11px] font-black uppercase tracking-[0.25em] transition-colors py-2 ${
                      link.active ? 'text-[#640D14]' : 'text-[#38040E]/70 hover:text-[#640D14]'
                    }`}
                  >
                    {link.name}
                    {link.active && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-[-10px] left-0 w-full h-[2.5px] bg-[#640D14]"
                      />
                    )}
                  </a>
                );
              })}

              <button 
                onClick={() => router.push('/auth/login')} 
                className="font-sans bg-[#640D14] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#640D14]/20 active:scale-95 ml-4 cursor-pointer"
              >
                LOGIN / REGISTER
              </button>
            </div>

            {/* --- MOBILE TOGGLE --- */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 text-[#38040E] hover:bg-gray-50 rounded-xl transition-colors z-[120]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: '100%' }} 
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-white z-[100] lg:hidden flex flex-col"
            >
              <div className="flex flex-col h-full pt-28 px-8 pb-10 overflow-y-auto">
                <div className="space-y-8 mb-12">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href || '#'} 
                      onClick={closeMenu} 
                      className={`block font-serif text-4xl font-bold italic tracking-tighter transition-all ${
                        link.active ? 'text-[#640D14] translate-x-2' : 'text-[#38040E]'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="space-y-6 mt-auto">
                  <div className="pt-6 border-t border-gray-100">
                    <p className="font-sans text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Services & Facilities</p>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: 'Pilates Studio', href: '#pilates' },
                        { name: 'Padel Court', href: '#padel' },
                        { name: 'Fix Cafe', href: '#cafe' }
                      ].map((item) => (
                        <a key={item.name} href={item.href} onClick={closeMenu} className="flex items-center justify-between p-5 bg-[#FDF8F8] rounded-[1.5rem] font-sans font-black text-[11px] uppercase tracking-widest text-[#38040E] hover:bg-[#640D14] hover:text-white transition-all group">
                          {item.name}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {router.push('/auth/login'); closeMenu();}} 
                    className="w-full bg-[#640D14] text-white py-6 rounded-3xl font-sans font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#640D14]/20 active:scale-95"
                  >
                    Access Member Area
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}