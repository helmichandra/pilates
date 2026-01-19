import { Trophy, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#C8C2B7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative animate-slide-left group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#491108] via-[#564838] to-[#491108] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="/media/landing-page/landing-page1.jpg"
                        alt="FIX Padel Court"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191A1E]/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 border-2 border-[#E7E5DB]/10 rounded-3xl"></div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#491108] rounded-3xl opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          <div className="space-y-6 animate-slide-left">
            <div className="inline-block px-4 py-2 bg-[#191A1E]/10 rounded-full">
              <span className="text-[#191A1E] text-sm font-semibold">
                ABOUT FIX PADEL
              </span>
            </div>
            <h3 className="text-5xl font-bold text-[#191A1E]">
              Your Premier
              <br />
              <span className="text-[#491108] italic">Padel Destination</span>
            </h3>
            <p className="text-lg text-[#564838] leading-relaxed">
              At FIX Padel, we've created more than just courts – we've built a
              community. Our state-of-the-art facilities, expert coaching, and
              vibrant atmosphere make us the perfect choice for players of all
              levels.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#491108] rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#191A1E] mb-1">
                    Professional Grade Courts
                  </h4>
                  <p className="text-[#564838]">
                    Top-tier surfaces and equipment for the best playing
                    experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#491108] rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#191A1E] mb-1">
                    Vibrant Community
                  </h4>
                  <p className="text-[#564838]">
                    Connect with fellow players and make lasting friendships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}