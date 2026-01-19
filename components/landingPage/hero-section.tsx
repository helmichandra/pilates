import { Check } from 'lucide-react';

export default function Hero() {
    return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 animate-[fadeInLeft_0.8s_ease-out_forwards]">
            <div className="inline-block">
              <span className="text-xs text-red-600 font-semibold tracking-wide">⭐ JAKARTA'S BEST LOCAL EXPERTS</span>
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
          
          <div className="relative opacity-0 animate-[fadeInRight_0.8s_ease-out_forwards]">
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 sm:p-12 aspect-square flex items-end shadow-2xl transform hover:scale-[1.02] transition duration-500">
              <div className="bg-white rounded-2xl p-6 w-full transform hover:-translate-y-2 transition duration-300">
                <h3 className="font-bold text-xl mb-2">Expert Training</h3>
                <p className="text-gray-600 text-sm">
                    Private sessions with an immersive experience led by experienced local coaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};