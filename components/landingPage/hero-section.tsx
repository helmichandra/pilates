"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from "next/image";

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
  primaryLink: string;
}

export default function Hero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      image: '/media/banner/Banner001.jpg',
      tagline: 'Fix Padel Court • International Standard',
      titlePart1: 'Play',
      titlePart2: 'Harder',
      titlePart3: 'One-Stop Sport.',
      description: 'Nikmati fasilitas Padel berstandar internasional dalam ruang yang modern dan penuh energi untuk pengalaman bermain tak terlupakan.',
      primaryBtn: 'Book Court',
      secondaryBtn: 'See Facility',
      primaryLink: 'https://ayo.co.id/v/fix-padel' 
    },
    {
      id: 2,
      image: '/media/banner/Banner002.jpg',
      tagline: 'Fix Pilates Studio • Reformer Specialist',
      titlePart1: 'Move',
      titlePart2: 'Better',
      titlePart3: 'Precise Movement.',
      description: 'Temukan keseimbangan hidup melalui gerakan presisi di studio reformer pilates kami yang dirancang untuk recharge total tubuh Anda.',
      primaryBtn: 'Book Session',
      secondaryBtn: 'Our Studio',
      primaryLink: '/dashboard-user/booking' 
    },
    {
      id: 3,
      image: '/media/banner/Banner003.jpg',
      tagline: 'Fix Cafe • Wellness Social Space',
      titlePart1: 'Rest',
      titlePart2: 'Smarter',
      titlePart3: 'Social Space.',
      description: 'Tempat sempurna untuk bersosialisasi dan menikmati asupan sehat setelah sesi latihan intens Anda di FixClub.',
      primaryBtn: 'Explore Menu',
      secondaryBtn: 'Visit Us',
      primaryLink: '/dashboard-user/booking' 
    }
  ];

  const handlePrimaryAction = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      router.push(link);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden bg-[#38040E]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={'fade'}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) => `<span class="${className} !bg-white/40 !w-8 sm:!w-12 !h-1 !rounded-full"></span>`,
        }}
        loop={true}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div className="absolute inset-0">
              <Image 
                src={slide.image} 
                alt={slide.tagline}
                fill
                priority={index === 0}
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38040E] via-[#38040E]/60 to-[#38040E]/20 z-10"></div>
            </div>

            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-24 sm:pt-20">
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div 
                    key={slide.id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="max-w-4xl"
                  >
                    {/* Tagline dioptimasi ukuran fontnya untuk mobile */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
                      <span className="font-sans text-[8px] sm:text-[10px] text-white/90 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/10">
                        {slide.tagline}
                      </span>
                    </motion.div>
                    
                    {/* Title dengan fluid font size untuk mencegah tabrakan di mobile */}
                    <motion.h1 
                      variants={itemVariants}
                      className="font-serif text-[44px] xs:text-5xl sm:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tighter uppercase italic mb-6 sm:mb-8"
                    >
                      {slide.titlePart1} <span className="text-[#640D14]">{slide.titlePart2}.</span><br />
                      <span className="not-italic text-white/90 text-xl xs:text-2xl sm:text-5xl lg:text-6xl block mt-2 sm:mt-4">
                        {slide.titlePart3}
                      </span>
                    </motion.h1>
                    
                    {/* Deskripsi diperkecil sedikit di mobile agar tidak menumpuk */}
                    <motion.p 
                      variants={itemVariants}
                      className="font-sans text-white/70 text-sm sm:text-lg max-w-xs sm:max-w-xl leading-relaxed font-medium mb-10 sm:mb-12"
                    >
                      {slide.description}
                    </motion.p>
                    
                    {/* Button Group: Stack di mobile, Row di desktop */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                      <button 
                        onClick={() => handlePrimaryAction(slide.primaryLink)}
                        className="w-full sm:w-auto font-sans bg-[#640D14] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-black uppercase text-[9px] sm:text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-black transition-all active:scale-95 cursor-pointer"
                      >
                        {slide.primaryBtn} <ArrowRight size={14} />
                      </button>
                      <button className="w-full sm:w-auto font-sans bg-white/5 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/10 hover:bg-white/10 transition-all font-black uppercase text-[9px] sm:text-[10px] tracking-[0.2em] backdrop-blur-sm cursor-pointer">
                        {slide.secondaryBtn}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}