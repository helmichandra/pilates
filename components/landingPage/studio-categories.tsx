
import React from 'react';
import { Category, ServiceItem } from '../types';

const services: ServiceItem[] = [
  { id: '1', name: Category.REFORMER, ready: true, description: 'Latihan inti kami. Meningkatkan fleksibilitas dan kekuatan menggunakan reformer profesional.' },
  { id: '2', name: Category.CHAIR, ready: false, description: 'Latihan menantang pada Pilates Wunda Chair. Bagus untuk keseimbangan tubuh.' },
  { id: '3', name: Category.PRIVATE, ready: false, description: 'Sesi 1-on-1 yang dirancang khusus untuk kebutuhan tubuh dan target spesifik Anda.' },
  { id: '4', name: Category.POOL, ready: false, description: 'Hidroterapi dan aqua-based classes di fasilitas kolam renang privat premium.' },
];


const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold font-display text-gray-900 mb-4 tracking-tight uppercase">Studio Categories</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Pilih kategori yang sesuai dengan perjalanan kesehatan Anda.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`group p-10 rounded-[2.5rem] border-2 transition-all duration-500 relative h-full flex flex-col ${
                service.ready 
                  ? 'border-gray-50 bg-white shadow-lg hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2' 
                  : 'border-gray-100 bg-gray-50/50 grayscale opacity-60'
              }`}
            >
              <div className="mb-8 flex justify-between items-start">
                <div className={`p-4 rounded-2xl ${service.ready ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                   <span className="text-2xl">{service.name === Category.REFORMER ? '🧘' : service.name === Category.CHAIR ? '🪑' : service.name === Category.PRIVATE ? '👤' : '🏊'}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  service.ready ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-400'
                }`}>
                  {service.ready ? 'Ready' : 'Soon'}
                </span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 font-display ${service.ready ? 'text-gray-900' : 'text-gray-500'}`}>
                {service.name}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow">
                {service.description}
              </p>

              <div className="mt-auto">
                {service.ready ? (
                  <a href="#booking" className="text-primary font-bold text-sm flex items-center group/link">
                    Book Session
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                ) : (
                  <span className="text-gray-400 font-bold text-sm italic">Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
