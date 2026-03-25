"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ArrowUpRight, Heart, Zap, Coffee } from 'lucide-react';
import { useRouter } from "next/navigation";

const About: React.FC = () => {
  const missions = [
    "Menghadirkan pengalaman yang seamless, nyaman, dan premium — tetap dapat dinikmati oleh semua kalangan.",
    "Menciptakan ruang olahraga yang terpadu dan nyaman untuk semua usia.",
    "Mengubah cara orang melihat olahraga: bukan beban, tapi gaya hidup yang menyenangkan.",
    "Menumbuhkan komunitas aktif yang saling mendukung dalam perjalanan hidup sehat."
  ];
  const router = useRouter();


  return (
    <section id="about" className="py-24 bg-[#FDF8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT CONTENT: THE STORY */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Label - Plus Jakarta Sans */}
            <div className="inline-flex items-center gap-2 text-[#640D14] font-sans font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              <span className="w-10 h-[2px] bg-[#640D14]"></span>
              About Fixclub
            </div>
            
            {/* Heading - Cormorant Garamond */}
            <h2 className="font-serif text-5xl lg:text-7xl font-bold text-[#38040E] mb-8 tracking-tighter leading-[0.9] uppercase italic">
              Balance Your Body.<br/>
              <span className="text-[#640D14] not-italic text-3xl lg:text-5xl block mt-2">Elevate Your Life.</span>
            </h2>

            {/* Story Content - Plus Jakarta Sans */}
            <div className="space-y-6 text-gray-600 leading-relaxed font-sans text-base">
              <p className="font-serif text-[#38040E] text-xl font-medium italic border-l-4 border-[#640D14] pl-6 py-1">
                "Fixclub lahir dari pemahaman sederhana — bahwa hidup modern membutuhkan ruang untuk kembali seimbang."
              </p>
              <p className="font-medium">
                Di tengah ritme yang cepat, kami hadir sebagai <strong className="text-[#38040E]">One-Stop Sport & Lifestyle Club</strong>. Bukan sekadar tempat olahraga, FIXCLUB adalah destinasi terkurasi yang menggabungkan Padel, Pilates, dan gaya hidup sosial dalam satu ruang modern.
              </p>
            </div>
            
            {/* VISION & MISSION - Plus Jakarta Sans */}
            <div className="mt-12 grid sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="font-sans font-black text-[#38040E] uppercase text-[11px] tracking-[0.2em] flex items-center gap-2">
                  <Star size={16} className="text-[#640D14]" /> Visi
                </h4>
                <p className="font-sans text-gray-500 text-xs leading-relaxed font-medium">
                  Menjadi destinasi sport & lifestyle terdepan di Indonesia yang memberikan pengalaman olahraga lengkap, nyaman, dan menyenangkan bagi semua kalangan.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-sans font-black text-[#38040E] uppercase text-[11px] tracking-[0.2em] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#640D14]" /> Misi
                </h4>
                <ul className="space-y-3">
                  {missions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#640D14] mt-1.5 shrink-0" />
                        <p className="font-sans text-gray-500 text-xs leading-relaxed font-medium">
                          {item}
                        </p>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="mt-12 group flex items-center gap-3 text-[#640D14] font-sans font-black uppercase text-[10px] tracking-[0.2em] hover:gap-6 transition-all cursor-pointer"
                           onClick={() => router.push('/auth/login')} >
              Join The Community <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* RIGHT CONTENT: VISUAL GRID */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
              <div className="space-y-4 lg:space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
                >
                  <img src="/media/landing-page/padel.png" alt="Padel Session" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Zap size={20} className="mb-2 text-[#640D14]" />
                    <p className="font-sans font-black uppercase text-[10px] tracking-widest">Padel Sport</p>
                  </div>
                </motion.div>
                
                {/* Accent Card - Cormorant Garamond */}
                <div className="bg-[#640D14] rounded-[2rem] p-8 text-white shadow-xl shadow-[#640D14]/20">
                  <h4 className="font-serif text-2xl font-bold mb-1 italic leading-tight">One Stop Active Living</h4>
                  <p className="font-sans text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mt-2">Bergerak • Bersosialisasi • Recharge</p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6 pt-12">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl">
                   <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-3">
                        <Heart size={18} className="text-[#640D14]" />
                        <span className="font-sans text-[10px] font-black text-[#38040E] uppercase tracking-widest">Pilates & Yoga</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Coffee size={18} className="text-[#640D14]" />
                        <span className="font-sans text-[10px] font-black text-[#38040E] uppercase tracking-widest">Cafe & Lounge</span>
                      </div>
                   </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#640D14]/10 aspect-[4/5] relative"
                >
                  <img src="/media/landing-page/pilates.png" alt="Pilates Studio" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#38040E]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Heart size={20} className="mb-2 text-[#640D14]" />
                    <p className="font-sans font-black uppercase text-[10px] tracking-widest">Wellness Center</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Final Statement - Plus Jakarta Sans */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#38040E] rounded-[2rem] text-center shadow-2xl shadow-[#38040E]/20"
            >
              <p className="font-sans text-white font-black uppercase text-[10px] tracking-[0.4em]">
                "Bukan Sekadar Olahraga. Ini Cara Hidup."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;