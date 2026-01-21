"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock types if not imported
enum Category {
  PILATES = 'Pilates',
  PADEL = 'Padel',
  POOL = 'Swimming Pool'
}

const services = [
  { 
    id: '1', 
    name: Category.PILATES, 
    ready: true, 
    description: 'Latihan reformer profesional untuk meningkatkan fleksibilitas dan kekuatan inti tubuh Anda.',
    icon: '🧘'
  },
  { 
    id: '2', 
    name: Category.PADEL, 
    ready: true, 
    description: 'Nikmati permainan Padel yang seru di lapangan standar internasional kami.',
    icon: '🎾'
  },
  { 
    id: '3', 
    name: Category.POOL, 
    ready: false, 
    description: 'Fasilitas kolam renang privat premium untuk hidroterapi dan relaksasi.',
    icon: '🏊'
  },
];

const Services: React.FC = () => {
  const router = useRouter();

  const handleBooking = (serviceName: string) => {
    if (serviceName === Category.PILATES) {
      // Cek Token
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, arahkan ke login
        router.push('/auth/login?callback=/dashboard-user/booking');
      } else {
        // Jika ada, arahkan ke booking
        router.push('/dashboard-user/booking');
      }
    } else if (serviceName === Category.PADEL) {
      // Arahkan ke link eksternal
      window.open('https://ayo.co.id/', '_blank');
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#38040E] mb-4 tracking-tight uppercase">Studio Categories</h2>
          <div className="h-1.5 w-24 bg-[#640D14] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Pilih kategori yang sesuai dengan perjalanan kesehatan Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group p-10 rounded-[2.5rem] border-2 transition-all duration-500 relative h-full flex flex-col ${
                service.ready 
                  ? 'border-gray-50 bg-white shadow-lg hover:shadow-2xl hover:border-[#640D14]/20 hover:-translate-y-2' 
                  : 'border-gray-100 bg-gray-50/50 grayscale opacity-60'
              }`}
            >
              <div className="mb-8 flex justify-between items-start">
                <div className={`p-4 rounded-2xl ${service.ready ? 'bg-[#640D14]/10 text-[#640D14]' : 'bg-gray-200 text-gray-500'}`}>
                   <span className="text-2xl">{service.icon}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  service.ready ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-400'
                }`}>
                  {service.ready ? 'Ready' : 'Soon'}
                </span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${service.ready ? 'text-[#38040E]' : 'text-gray-500'}`}>
                {service.name}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow">
                {service.description}
              </p>

              <div className="mt-auto">
                {service.ready ? (
                  <button 
                    onClick={() => handleBooking(service.name)}
                    className="text-[#640D14] font-bold text-sm flex items-center group/link cursor-pointer"
                  >
                    Book Session
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                ) : (
                  <span className="text-gray-400 font-bold text-sm italic">Coming Soon</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;