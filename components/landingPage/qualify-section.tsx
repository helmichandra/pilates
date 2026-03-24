"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Star, ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FDF8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT CONTENT: STORY & MISSION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              <span className="w-10 h-[2px] bg-[#640D14]"></span>
              Discover FixClub
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-[#38040E] mb-8 tracking-tighter leading-[0.95] uppercase italic">
              Elevate Your <br/>
              <span className="text-[#640D14] not-italic">Lifestyle.</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
              <p>
                FixClub bukan sekadar tempat olahraga. Kami adalah <strong>Premier Wellness Hub</strong> di area Kreo & Larangan yang menggabungkan kekuatan fisik, komunitas, dan kenyamanan dalam satu ekosistem.
              </p>
              <p>
                Dari presisi <strong>Reformer Pilates</strong>, intensitas <strong>Padel Court</strong>, hingga relaksasi di <strong>Fix Cafe</strong>, setiap layanan kami dirancang untuk mendukung transformasi hidup Anda secara menyeluruh.
              </p>
            </div>
            
            {/* USP GRID */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-gray-100 text-[#640D14]">
                    <Users size={20} />
                  </div>
                  <div>
                    <h5 className="font-black text-[#38040E] uppercase text-sm tracking-tight mb-1">Community Driven</h5>
                    <p className="text-xs text-gray-500 font-medium italic">Bertemu dengan individu yang memiliki goals yang sama.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 border border-gray-100 text-[#640D14]">
                    <Star size={20} />
                  </div>
                  <div>
                    <h5 className="font-black text-[#38040E] uppercase text-sm tracking-tight mb-1">Expert Guidance</h5>
                    <p className="text-xs text-gray-500 font-medium italic">Dipandu oleh instruktur dan staf profesional tersertifikasi.</p>
                  </div>
               </div>
            </div>

            <button className="mt-12 group flex items-center gap-3 text-[#640D14] font-black uppercase text-[10px] tracking-widest hover:gap-5 transition-all">
              Learn Our Culture <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* RIGHT CONTENT: VISUAL GRID */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
            <div className="space-y-4 lg:space-y-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
              >
                <img src="/media/qualify1.avif" alt="FixClub Energy" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/60 to-transparent"></div>
              </motion.div>
              
              <div className="bg-[#640D14] rounded-[2rem] p-8 text-white shadow-xl">
                <h4 className="text-3xl font-black mb-1 italic">100%</h4>
                <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] leading-tight">Dedicated to Your Transformation</p>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6 pt-12">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl flex flex-col items-center text-center">
                <CheckCircle2 size={32} className="text-[#640D14] mb-4" />
                <h4 className="font-black text-[#38040E] uppercase text-xs tracking-widest mb-2">Certified Club</h4>
                <p className="text-gray-400 text-[10px] font-medium leading-relaxed">Standard keamanan & kenyamanan internasional.</p>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
              >
                <img src="/media/facility5.jpeg" alt="FixClub Ambience" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/60 to-transparent"></div>
              </motion.div>
            </div>

            {/* Floating Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-2xl border border-gray-50 flex items-center gap-3 whitespace-nowrap hidden sm:flex">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-[#38040E] uppercase tracking-widest">Active Community</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;