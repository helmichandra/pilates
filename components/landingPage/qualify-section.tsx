"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Star, ArrowUpRight, Heart, Zap, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FDF8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT CONTENT: THE STORY (Storytelling Section) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              <span className="w-10 h-[2px] bg-[#640D14]"></span>
              About FixClub
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-[#38040E] mb-6 tracking-tighter leading-[0.95] uppercase italic">
              Balance Your Body.<br/>
              <span className="text-[#640D14] not-italic text-3xl lg:text-5xl">Elevate Your Life.</span>
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
              <p className="text-[#38040E] font-bold italic border-l-4 border-[#640D14] pl-4">
                "FixClub lahir dari pemahaman sederhana — bahwa hidup modern membutuhkan ruang untuk kembali seimbang."
              </p>
              <p>
                Di tengah ritme yang cepat, kami hadir sebagai <strong>One-Stop Sport & Lifestyle Club</strong>. Bukan sekadar tempat olahraga, FIXCLUB adalah destinasi terkurasi yang menggabungkan Padel, Pilates, dan gaya hidup sosial dalam satu ruang modern.
              </p>
              <p>
                Kami percaya hidup aktif adalah tentang menikmati setiap momen — bergerak dengan energi, merawat diri dengan kesadaran, dan tetap terhubung dengan komunitas yang positif.
              </p>
            </div>
            
            {/* VISION & MISSION PREVIEW */}
            <div className="mt-12 space-y-8">
              <div>
                <h4 className="font-black text-[#38040E] uppercase text-sm tracking-widest mb-3 flex items-center gap-2">
                  <Star size={18} className="text-[#640D14]" /> Our Vision
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Menjadi destinasi sport & lifestyle terdepan di Indonesia yang memberikan pengalaman olahraga lengkap, nyaman, dan menyenangkan bagi semua kalangan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Seamless & Premium Experience",
                  "Terpadu untuk Semua Usia",
                  "Fun Lifestyle Concept",
                  "Supportive Active Community"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#640D14]" />
                    <span className="text-[11px] font-black text-[#38040E] uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-12 group flex items-center gap-3 text-[#640D14] font-black uppercase text-[10px] tracking-widest hover:gap-5 transition-all">
              Join The Community <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* RIGHT CONTENT: VISUAL GRID & FEATURES */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
              <div className="space-y-4 lg:space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
                >
                  <img src="/media/landing-page/padel.png" alt="Padel Session" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Zap size={24} className="mb-2" />
                    <p className="font-black uppercase text-[10px] tracking-widest">Padel Sport</p>
                  </div>
                </motion.div>
                
                <div className="bg-[#640D14] rounded-[2rem] p-8 text-white shadow-xl">
                  <h4 className="text-2xl font-black mb-1 italic leading-tight">One Stop Active Living</h4>
                  <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] leading-tight mt-2 italic">Bergerak • Bersosialisasi • Recharge</p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6 pt-12">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl">
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Heart size={20} className="text-[#640D14]" />
                        <span className="text-[10px] font-black text-[#38040E] uppercase tracking-widest">Pilates & Yoga</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Coffee size={20} className="text-[#640D14]" />
                        <span className="text-[10px] font-black text-[#38040E] uppercase tracking-widest">Cafe & Lounge</span>
                      </div>
                   </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
                >
                  <img src="/media/landing-page/pilates.png" alt="Pilates Studio" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Heart size={24} className="mb-2" />
                    <p className="font-black uppercase text-[10px] tracking-widest">Wellness Center</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Final Statement Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#38040E] rounded-[2rem] text-center"
            >
              <p className="text-white font-black uppercase text-[10px] tracking-[0.3em]">
                "Ini Bukan Sekadar Olahraga. Ini Cara Hidup."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;