"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap, Heart, Layout } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    id: "padel",
    tagline: "Dynamic. Social. New Experience.",
    title: "Padel Court",
    description: "Nikmati pengalaman bermain padel standar internasional FIP dengan teknologi Super Flat Surface untuk pantulan bola presisi, pergerakan stabil, dan respons optimal di setiap rally. Dirancang untuk semua level, dari pemula hingga berpengalaman — menghadirkan permainan yang smooth, kompetitif, dan berkelas.",
    image: "/media/landing-page/services/ServicePadel.jpg",
    icon: Zap,
    features: ["Standard FIP", "Super Flat Surface", "All Skill Levels"],
    link: "https://ayo.co.id/v/fix-padel"
  },
  {
    id: "pilates",
    tagline: "Balance. Strength. Control.",
    title: "Pilates Studio",
    description: "Temukan keseimbangan tubuh melalui sesi reformer pilates yang dirancang untuk meningkatkan kekuatan, fleksibilitas, dan postur tubuh dipandu oleh instruktur profesional dalam ruang yang tenang dan eksklusif untuk pengalaman yang personal.",
    image: "/media/landing-page/services/ServicePilates.jpg",
    icon: Heart,
    features: ["Professional Instructor", "Private Session", "Reformer Equipment"],
    link: "/dashboard-user/booking"
  },
  {
    id: "multipurpose",
    tagline: "Flexible. Private. Refined.",
    title: "Multipurpose Studio",
    description: "Ruang serbaguna eksklusif yang dirancang untuk menghadirkan fleksibilitas berbagai aktivitas mulai dari yoga, private session, hingga kelas komunitas dengan ambience yang tenang dan desain modern yang terkurasi.",
    image: "/media/landing-page/services/ServiceMultipurpose.jpg",
    icon: Layout,
    features: ["Yoga & Meditation", "Community Class", "Private Events"],
    link: "/dashboard-user/booking"
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    }
  })
};

export default function ServicesSection() {
  const router = useRouter();

  const handleAction = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      router.push(link);
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FDF8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[#640D14] font-sans font-black uppercase text-[10px] tracking-[0.3em] mb-6">
              <span className="w-10 h-[2px] bg-[#640D14]"></span>
              Premium Services
            </div>
            <h3 className="font-serif text-5xl lg:text-7xl font-bold text-[#38040E] tracking-tighter leading-[0.9] uppercase italic">
              Everything You Need <br/>
              <span className="text-[#640D14] not-italic text-3xl lg:text-5xl block mt-2">In One Place.</span>
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 border-l-2 border-[#640D14]/20 pl-8"
          >
            <p className="font-sans text-gray-600 text-sm leading-relaxed font-medium">
              Kami menghadirkan rangkaian layanan yang dirancang untuk mendukung gaya hidup aktif secara menyeluruh — menggabungkan energi, keseimbangan, dan kenyamanan dalam satu pengalaman yang terintegrasi.
            </p>
            <p className="font-sans text-gray-500 text-xs leading-relaxed italic">
              Dari permainan yang dinamis hingga sesi yang menenangkan, setiap layanan di FIXCLUB dikurasi untuk memberikan kualitas, konsistensi, dan pengalaman berkelas dalam setiap kunjungan.
            </p>
          </motion.div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 min-h-[680px] flex flex-col"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <motion.img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute top-8 left-8 w-14 h-14 bg-[#640D14] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#640D14]/20">
                  <service.icon size={24} />
                </div>
              </div>

              <div className="p-10 pt-4 flex-grow flex flex-col">
                <span className="font-sans text-[9px] font-black text-[#640D14] uppercase tracking-[0.3em] mb-3">{service.tagline}</span>
                <h4 className="font-serif text-3xl font-bold text-[#38040E] mb-6 uppercase italic tracking-tighter leading-none">{service.title}</h4>
                
                <div className="flex-grow">
                  <p className="font-sans text-gray-500 text-[13px] leading-[1.8] font-medium tracking-tight">
                    {service.description}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="flex flex-wrap gap-2 mb-10">
                    {service.features.map(feat => (
                      <span key={feat} className="font-sans text-[8px] font-black text-[#38040E]/50 bg-gray-50 px-3 py-1.5 rounded-lg uppercase tracking-widest border border-gray-100">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleAction(service.link)} 
                    className="font-sans flex items-center gap-3 text-[#38040E] font-black uppercase text-[10px] tracking-[0.2em] group-hover:text-[#640D14] transition-all cursor-pointer"
                  >
                    Reserve Now <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}