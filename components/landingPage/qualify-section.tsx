
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-offwhite overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-8 tracking-tight leading-tight">
              Reformer Pilates di <br/>
              <span className="text-primary italic underline decoration-primary/20">Kreo & Larangan.</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
              <p>
                Fixclub adalah studio spesialis Reformer Pilates yang berdedikasi untuk membantu warga <strong>Kreo, Larangan, dan sekitarnya</strong> mencapai mobilitas tubuh maksimal melalui metode yang terstruktur.
              </p>
              <p>
                Kami percaya pada keahlian <strong>Certified Local Instructors</strong>. Instruktur kami adalah ahli lokal yang siap membimbing Anda dari level pemula hingga mahir dengan perhatian personal yang mendalam.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
               <div className="flex items-start space-x-3">
                  <span className="text-primary text-xl font-bold">01</span>
                  <div>
                    <h5 className="font-bold text-gray-900">Spesialis Postur</h5>
                    <p className="text-sm text-gray-500">Perbaiki bungkuk & nyeri punggung.</p>
                  </div>
               </div>
               <div className="flex items-start space-x-3">
                  <span className="text-primary text-xl font-bold">02</span>
                  <div>
                    <h5 className="font-bold text-gray-900">Core Strength</h5>
                    <p className="text-sm text-gray-500">Perkuat otot perut & panggul.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 relative">
            <div className="space-y-8 pt-12">
              <div className="premium-card p-6 overflow-hidden group">
                <img 
                  src="/media/qualify1.avif" 
                  alt="Pilates Exercise" 
                  className="rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <h4 className="font-bold text-gray-900 mb-1">Low Impact</h4>
                <p className="text-gray-500 text-xs font-medium">Aman untuk sendi & pemulihan.</p>
              </div>
              <div className="premium-card p-8 bg-primary text-white shadow-2xl shadow-primary/30">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Expertise</p>
                <h4 className="text-xl font-bold mb-2">Sertifikasi Lokal</h4>
                <p className="text-white/80 text-sm leading-relaxed">Pelatih kami tersertifikasi untuk menjamin keamanan setiap gerakan Anda.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="premium-card p-8 bg-secondary text-white text-center flex flex-col justify-center aspect-square">
                <h3 className="text-5xl font-black mb-1 font-display">60'</h3>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest leading-none">Menit Sesi Intensif</p>
              </div>
              <div className="premium-card p-6">
                <img 
                  src="/media/facility5.jpeg" 
                  alt="Pilates Studio" 
                  className="rounded-2xl mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-1">Studio Nyaman</h4>
                <p className="text-gray-500 text-xs font-medium">Area tenang di Kreo untuk fokus maksimal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
