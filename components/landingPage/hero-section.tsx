"use client";
import React, { useState } from 'react'; // Tambahkan useState
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; // Import tipe Swiper
import { ArrowRight, MapPin } from 'lucide-react';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface SlideData {
  id: number;
  image: string;
  tagline: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  category: string;
}

export default function Hero() {
  const router = useRouter();
  // State untuk melacak slide mana yang sedang aktif
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBooking = () => {
    router.push("/dashboard-user/booking");
  };

  const slides: SlideData[] = [
    {
      id: 1,
      image: '/media/landing-page/padel.png',
      tagline: 'Get Your FIX • Fix Padel Court', // Menggunakan Tagline baru
      titlePart1: 'Play',
      titlePart2: 'Harder',
      titlePart3: 'One-Stop Sport.',
      description: 'Lebih dari sekadar klub olahraga — nikmati fasilitas Padel berstandar internasional dalam ruang yang modern dan penuh energi.',
      primaryBtn: 'Book Court',
      secondaryBtn: 'See Facility',
      category: 'PANORAMIC'
    },
    {
      id: 2,
      image: '/media/landing-page/pilates.png',
      tagline: 'Get Your FIX • Fix Pilates Studio',
      titlePart1: 'Move',
      titlePart2: 'Better',
      titlePart3: 'Precise Movement.',
      description: 'Temukan keseimbangan hidup melalui gerakan yang presisi. Studio Pilates & Yoga kami dirancang untuk membantu Anda recharge total.',
      primaryBtn: 'Book Session',
      secondaryBtn: 'Our Studio',
      category: 'REFORMER'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2500&auto=format&fit=crop', 
      tagline: 'Get Your FIX • Fix Cafe',
      titlePart1: 'Rest',
      titlePart2: 'Smarter',
      titlePart3: 'Social Space.',
      description: 'Lengkapi gaya hidup aktif Anda di Café kami. Tempat sempurna untuk bersosialisasi dan menikmati healthy fuel setelah berlatih.',
      primaryBtn: 'Explore Menu',
      secondaryBtn: 'Visit Us',
      category: 'WELLNESS'
    }
  ];

  // VARIANTS BARU UNTUK TRANSISI YANG LEBIH SMOOTH
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={'fade'}
        speed={1200} // Sedikit diperlambat agar transisi lebih elegan
        autoplay={{
          delay: 5500, // Beri waktu lebih lama untuk membaca
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-white/40 !w-12 !h-1 !rounded-full custom-bullet"></span>`;
          },
        }}
        loop={true}
        // SOLUSI UTAMA: Update state activeIndex saat slide berubah
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 h-full w-full">
              <Image 
                src={slide.image} 
                alt={slide.tagline}
                fill
                priority={index === 0} // Priority hanya untuk slide pertama
                className="object-cover transition-transform duration-[12000ms] scale-110 active-slide-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[#38040E]/30 z-10"></div>
            </div>

            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center pt-24 pb-32">
              
              {/* Gunakan AnimatePresence agar teks slide lama bisa 'exit' dulu */}
              <AnimatePresence mode="wait">
                {/* Hanya render konten jika slide ini adalah activeIndex */}
                {activeIndex === index && (
                  <motion.div 
                    key={slide.id} // Key harus unik per slide
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="max-w-3xl space-y-8"
                  >
                    {/* TAGLINE */}
                    <motion.div variants={itemVariants} className="flex items-center gap-6">
                      <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">
                          {slide.tagline}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/50 text-xs font-bold uppercase tracking-widest">
                        <MapPin size={14} /> Kreo • Ciledug
                      </div>
                    </motion.div>
                    
                    {/* TITLE */}
                    <motion.h1 
                      variants={itemVariants}
                      className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic"
                    >
                      {slide.titlePart1} <span className="text-red-600">{slide.titlePart2}.</span><br />
                      <span className="not-italic text-white/90 text-4xl sm:text-6xl lg:text-7xl">
                        {slide.titlePart3}
                      </span>
                    </motion.h1>
                    
                    {/* DESCRIPTION */}
                    <motion.p 
                      variants={itemVariants}
                      className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed font-medium"
                    >
                      {slide.description}
                    </motion.p>
                    
                    {/* BUTTONS */}
                    <motion.div 
                      variants={itemVariants}
                      className="flex flex-wrap gap-5 pt-4"
                    >
                      <button 
                        onClick={handleBooking}
                        className="bg-[#640D14] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl shadow-[#640D14]/20 hover:bg-black transition-all transform active:scale-95 cursor-pointer"
                      >
                        {slide.primaryBtn} <ArrowRight size={16} />
                      </button>
                      <button className="bg-white/5 text-white px-10 py-4 rounded-full border border-white/10 hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest active:scale-95 cursor-pointer backdrop-blur-sm">
                        {slide.secondaryBtn}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLOATING LABEL (Tetap di luar AnimatePresence agar tidak ikut hilang)
              <div className="absolute bottom-20 right-8 lg:right-16 z-30 hidden md:block">
                <motion.div 
                  key={`label-${slide.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={activeIndex === index ? { opacity: 1, x: 0 } : {}}
                  transition={{delay: 0.6}}
                  className="p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-center w-32 shadow-2xl"
                >
                  <p className="text-red-600 font-black text-[9px] uppercase tracking-widest mb-1">FixClub Category</p>
                  <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none">{slide.category}</h3>
                </motion.div>
              </div> */}

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#640D14]/10 rounded-full filter blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#640D14]/10 rounded-full filter blur-[100px] z-0 pointer-events-none"></div>
    </section>
  );
}