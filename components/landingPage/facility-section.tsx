"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Trophy, Coffee, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface FacilityCategory {
  id: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  details: { label: string; desc: string }[];
}

const Facility: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityCategory | null>(null);

  const facilities: FacilityCategory[] = [
    {
      id: 'padel',
      title: 'Fix Padel',
      image: '/media/landing-page/padel.png',
      icon: <Trophy className="text-white" size={24} />,
      description: 'A curated environment designed for comfort, performance, and ease.',
      details: [
        { label: '2 FIP Standard Courts', desc: 'Dua lapangan padel berstandar internasional (International Padel Federation) dengan kualitas presisi.' },
        { label: 'Night Lighting', desc: 'Sistem pencahayaan profesional untuk sesi permainan malam hari.' }
      ]
    },
    {
      id: 'cafe',
      title: 'Sky 7 Café',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2500&auto=format&fit=crop',
      icon: <Coffee className="text-white" size={24} />,
      description: 'Tempat ideal untuk bersantai dan bersosialisasi setelah beraktivitas.',
      details: [
        { label: 'Premium Coffee & Snacks', desc: 'Nikmati pilihan hidangan ringan hingga kopi pilihan berkualitas tinggi.' },
        { label: 'Modern Lounge', desc: 'Area café yang modern dan nyaman untuk recharge energi Anda.' }
      ]
    },
    {
      id: 'amenities',
      title: 'Premium Amenities',
      image: '/media/facility4.jpeg',
      icon: <Sparkles className="text-white" size={24} />,
      description: 'Fasilitas pendukung yang dirancang untuk kenyamanan maksimal Anda.',
      details: [
        { label: 'Changing Room', desc: 'Ruang ganti yang bersih, tenang, dan privat.' },
        { label: 'Restroom', desc: 'Fasilitas pria dan wanita dengan standar kebersihan yang terjaga ketat.' },
        { label: 'Mushola', desc: 'Ruang ibadah yang nyaman dan privat di dalam area klub.' }
      ]
    },
    {
      id: 'parking',
      title: 'Akses Effortless',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2000&auto=format&fit=crop',
      icon: <MapPin className="text-white" size={24} />,
      description: 'Akses mudah dan area parkir yang luas untuk setiap member.',
      details: [
        { label: 'Spacious Parking', desc: 'Area parkir yang luas memastikan kenyamanan sejak Anda tiba.' },
        { label: 'Secure Access', desc: 'Keamanan area parkir yang terpantau untuk ketenangan pikiran Anda.' }
      ]
    }
  ];

  return (
    <section id="facility" className="py-24 bg-[#FDF8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-4">
              <span className="w-10 h-[1px] bg-[#640D14]"></span>
              The Environment
            </div>
            <h3 className="text-4xl lg:text-6xl font-black text-[#38040E] tracking-tighter leading-[0.95] uppercase italic">
              Curated <br/>
              <span className="text-[#640D14] not-italic">Facilities.</span>
            </h3>
          </div>
          <p className="text-gray-500 font-medium max-w-sm text-sm leading-relaxed italic">
            "Setiap sudut dirancang untuk mendukung gaya hidup Anda dengan kenyamanan dan kualitas berkelas."
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedFacility(item)}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl shadow-[#640D14]/5"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38040E] via-[#38040E]/40 to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-14 h-14 bg-[#640D14] rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/10 rotate-3 group-hover:rotate-12 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 italic leading-none">
                  {item.title}
                </h3>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to explore details
                </p>
                <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em] border-t border-white/10 pt-5">
                  View Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Detail */}
        <AnimatePresence>
          {selectedFacility && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFacility(null)}
                className="fixed inset-0 bg-[#38040E]/90 backdrop-blur-xl"
              />
              
              <motion.div 
                layoutId={`card-${selectedFacility.id}`}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-white rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row min-h-[600px]"
              >
                <button 
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-8 right-8 z-20 p-3 bg-white/10 hover:bg-[#640D14] text-white rounded-full transition-all duration-300 backdrop-blur-md"
                >
                  <X size={24} />
                </button>

                {/* Modal Left: Image */}
                <div className="relative w-full lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                  <Image 
                    src={selectedFacility.image} 
                    alt={selectedFacility.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Modal Right: Content */}
                <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-6">
                    <span className="w-10 h-[2px] bg-[#640D14]"></span>
                    Premium Experience
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-[#38040E] uppercase tracking-tighter mb-6 italic leading-tight">
                    {selectedFacility.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg italic">
                    "{selectedFacility.description}"
                  </p>
                  
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Included Amenities:</p>
                    <div className="grid gap-6">
                      {selectedFacility.details.map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDF8F8] border border-gray-100"
                        >
                          <div className="mt-1">
                            <CheckCircle2 size={18} className="text-[#640D14]" />
                          </div>
                          <div>
                            <h5 className="font-black text-[#38040E] uppercase text-xs tracking-tight mb-1">{item.label}</h5>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedFacility(null)}
                    className="mt-12 w-full bg-[#640D14] text-white py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-black transition-all transform active:scale-95"
                  >
                    Back to Facilities
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Facility;