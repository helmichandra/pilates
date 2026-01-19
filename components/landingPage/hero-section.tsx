"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    const handleBooking = () => {
        router.push("/dashboard-user/booking");
    };
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#191A1E] via-[#564838] to-[#191A1E]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#491108]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#564838]/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
          <div className="text-white space-y-6 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-[#491108]/20 rounded-full border border-[#491108] animate-fade-in">
              <span className="text-[#E7E5DB] text-sm font-semibold">
                PREMIUM PADEL COURTS
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold leading-tight">
              WHERE
              <br />
              <span className="text-[#E7E5DB] italic">PASSION</span>
              <br />
              MEETS THE
              <br />
              COURT.
            </h2>
            <p className="text-xl text-[#AD9E89] max-w-lg">
              Experience padel at its finest. Book your court, elevate your
              game, and join our vibrant community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleBooking}
                size="lg"
                className="bg-[#491108] hover:bg-[#491108]/90 text-white h-14 px-8 text-lg transition-transform hover:scale-105 duration-300 cursor-pointer"
              >
                Book a Court
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#E7E5DB] text-[#E7E5DB] hover:bg-[#E7E5DB] hover:text-[#191A1E] h-14 px-8 text-lg transition-all duration-300 cursor-pointer"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Image with Modern Effects */}
          <div className="relative animate-slide-left group">
            {/* Glow Effect Behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#491108] via-[#564838] to-[#491108] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Image Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              {/* Image */}
              <img
                src="/media/landing-page/landing-page2.jpg"
                alt="FIX Padel Court"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Dark Overlay for Better Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191A1E]/60 via-transparent to-transparent"></div>
              
              {/* Subtle Border */}
              <div className="absolute inset-0 border-2 border-[#E7E5DB]/10 rounded-3xl"></div>
            </div>
            
            {/* Decorative Corner Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#491108] rounded-3xl opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}