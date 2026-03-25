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
    description: "Nikmati pengalaman bermain padel standar internasional FIP dengan teknologi Super Flat Surface untuk pantulan bola presisi, pergerakan stabil, dan respons optimal di setiap rally. Fix Club Padel Menggunakan teknologi Super Flat Surface, setiap permainan terasa lebih presisi dengan pantulan bola yang konsisten, pergerakan yang stabil, dan respons yang optimal di setiap rally. Dirancang untuk semua level, dari pemula hingga berpengalaman — menghadirkan permainan yang smooth, kompetitif, dan berkelas dalam satu pengalaman.",
    image: "/media/landing-page/padel.png",
    icon: Zap,
    features: ["Standard FIP", "Super Flat Surface", "All Skill Levels"]
  },
  {
    id: "pilates",
    tagline: "Balance. Strength. Control.",
    title: "Pilates Studio",
    description: "Temukan keseimbangan tubuh melalui sesi reformer pilates yang dirancang untuk meningkatkan kekuatan, fleksibilitas, dan postur tubuh dipandu oleh instruktur profesional. Dipandu oleh instruktur profesional dalam ruang yang tenang dan eksklusif, setiap sesi memberikan pengalaman yang personal, fokus, dan menyeluruh — membantu Anda bergerak lebih baik dan merasa lebih optimal.",
    image: "/media/landing-page/pilates.png",
    icon: Heart,
    features: ["Professional Instructor", "Private Session", "Reformer Equipment"]
  },
  {
    id: "multipurpose",
    tagline: "Flexible. Private. Refined.",
    title: "Multipurpose Studio",
    description: "Ruang serbaguna eksklusif yang dirancang untuk menghadirkan fleksibilitas berbagai aktivitas mulai dari yoga, private session, hingga kelas komunitas. Dengan suasana yang tenang, desain modern, dan ambience yang eksklusif, studio ini memberikan pengalaman yang lebih personal, nyaman, dan fokus di setiap sesi. Dirancang untuk beradaptasi dengan berbagai kebutuhan, Multipurpose Studio di FIXCLUB menjadi ruang ideal untuk bergerak, berlatih, dan terhubung — dalam lingkungan yang berkelas dan terkurasi.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000&auto=format&fit=crop", 
    icon: Layout,
    features: ["Yoga & Meditation", "Community Class", "Private Events"]
  }
];

// VARIANT UNTUK ANIMASI HALUS
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.98 
  },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier untuk gerakan elegan
    }
  })
};

export default function ServicesSection() {
  const router = useRouter();

  return (
    <section id="services" className="py-24 bg-[#FDF8F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h3 className="text-4xl lg:text-6xl font-black text-[#38040E] tracking-tighter leading-[0.95] uppercase italic">
              Everything You Need <br/>
              <span className="text-[#640D14] not-italic text-3xl lg:text-5xl">In One Place.</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              // Optimization: Menggunakan willChange untuk akselerasi GPU
              style={{ willChange: "transform, opacity" }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[680px] flex flex-col"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-60 overflow-hidden shrink-0">
                <motion.img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute top-6 left-6 w-12 h-12 bg-[#640D14] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <service.icon size={24} />
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-8 pt-6 flex-grow flex flex-col">
                <span className="text-[9px] font-black text-[#640D14] uppercase tracking-[0.2em] mb-2">{service.tagline}</span>
                <h4 className="text-2xl font-black text-[#38040E] mb-4 uppercase italic tracking-tighter">{service.title}</h4>
                
                <div className="flex-grow">
                  <p className="text-gray-500 text-sm leading-relaxed font-medium tracking-tight">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map(feat => (
                      <span key={feat} className="text-[8px] font-bold text-[#38040E]/40 border border-gray-100 px-2 py-1 rounded-md uppercase">{feat}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => router.push("/dashboard-user/booking")} 
                    className="flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all"
                  >
                    Reserve Now <ArrowRight size={14} />
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