"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Dumbbell, Trophy, Coffee, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface FacilityCategory {
  id: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

const Facility: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityCategory | null>(null);

  const facilities: FacilityCategory[] = [
    {
      id: 'pilates',
      title: 'Fix Pilates',
      image: '/media/facility1.avif',
      icon: <Dumbbell className="text-white" size={24} />,
      description: 'Professional Reformer & Chair Studio with certified instructors.',
      details: [
        'Premium Allegro 2 Reformers',
        'Stability Chairs & Props',
        'Private & Group Session Areas',
        'Postural Analysis Corner'
      ]
    },
    {
      id: 'padel',
      title: 'Fix Padel',
      image: '/media/facility2.jpeg',
      icon: <Trophy className="text-white" size={24} />,
      description: 'Standard International Padel Courts for all skill levels.',
      details: [
        'Panoramic Glass Courts',
        'Premium Turf Surface',
        'Racket & Ball Rental',
        'Night Session Lighting'
      ]
    },
    {
      id: 'cafe',
      title: 'Fix Cafe',
      image: '/media/facility3.jpeg',
      icon: <Coffee className="text-white" size={24} />,
      description: 'A cozy spot to recharge after your intense workout.',
      details: [
        'Specialty Coffee Bar',
        'Protein Shakes & Smoothies',
        'Healthy Snack Selection',
        'High-Speed Wi-Fi Area'
      ]
    },
    {
      id: 'general',
      title: 'General Facility',
      image: '/media/facility4.jpeg',
      icon: <Sparkles className="text-white" size={24} />,
      description: 'Supporting amenities for your ultimate convenience.',
      details: [
        'Luxe Shower & Changing Rooms',
        'Secure Member Lockers',
        'Spacious Parking Area',
        'Lounge & Waiting Area'
      ]
    }
  ];

  return (
    <section id="facility" className="py-24 bg-[#FDF8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#38040E] uppercase tracking-tighter mb-4">
            Our Facilities
          </h2>
          <div className="h-1.5 w-24 bg-[#640D14] mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
            Explore the premium environment at FixClub. Every corner is designed to support your lifestyle and transformation.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedFacility(item)}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-[#640D14]/5"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38040E] via-[#38040E]/20 to-transparent opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-12 h-12 bg-[#640D14] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 italic">
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs font-medium mb-6 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest border-t border-white/10 pt-4">
                  View Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Detail */}
        <AnimatePresence>
          {selectedFacility && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFacility(null)}
                className="absolute inset-0 bg-[#38040E]/80 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]"
              >
                <button 
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-6 right-6 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                  <X size={24} className="text-[#38040E]" />
                </button>

                {/* Modal Left: Image */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                  <Image 
                    src={selectedFacility.image} 
                    alt={selectedFacility.title} 
                    fill 
                    className="object-cover"
                  />
                </div>

                {/* Modal Right: Content */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.2em] mb-4">
                    <span className="w-8 h-[2px] bg-[#640D14]"></span>
                    FixClub Facility
                  </div>
                  <h3 className="text-4xl font-black text-[#38040E] uppercase tracking-tighter mb-6 italic">
                    {selectedFacility.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    {selectedFacility.description}
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Included Amenities:</p>
                    <ul className="grid grid-cols-1 gap-3">
                      {selectedFacility.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm font-bold text-[#38040E]">
                          <div className="w-1.5 h-1.5 bg-[#640D14] rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => setSelectedFacility(null)}
                    className="mt-10 w-full bg-[#640D14] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-colors"
                  >
                    Close Details
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