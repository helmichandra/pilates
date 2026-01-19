import { Check } from 'lucide-react';

export default function Hero() {
    return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 animate-[fadeInLeft_0.8s_ease-out_forwards]">
            <div className="inline-block">
              <span className="text-xs text-red-600 font-semibold tracking-wide">Kreo • Ciledug • Joglo</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
              Move Better.<br />
              <span className="text-red-600 italic">Feel Stronger.</span><br />
              Live Fixed.
            </h1>
            
            <p className="text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
            FixClub. A Reformer Pilates studio specializing in posture improvement and enhancing your quality of life, guided by the best local instructors.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 text-white px-8 py-3.5 rounded-full hover:bg-red-700 transition transform hover:scale-105 shadow-lg hover:shadow-xl font-bold">
                Book a Class
              </button>
              <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full border-2 border-gray-200 hover:border-gray-900 transition font-bold">
                See Packages
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm text-gray-700">Certified Local Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm text-gray-700">Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="text-sm text-gray-700">Small Group</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-[4/5] bg-white p-4 rounded-[3.5rem] shadow-2xl relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
              <img 
                src="/media/landing-page/pilates-women.avif" 
                alt="Fixclub Reformer Pilates" 
                className="object-cover w-full h-full rounded-[3rem] transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                  <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-2">Exclusive Studio</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 font-display tracking-tight leading-none">Precise Movement</h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed mt-2">Dapatkan perhatian personal dari instruktur lokal tersertifikasi kami di Kreo.</p>
                </div>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};