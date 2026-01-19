import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#191A1E] via-[#491108] to-[#564838] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#491108]/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#564838]/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in">
        <h3 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to Play?
        </h3>
        <p className="text-xl text-[#E7E5DB] mb-8 max-w-2xl mx-auto">
          Join FIX Padel today and experience the finest padel facilities in
          town. Book your first session now!
        </p>
        <Button
          size="lg"
          className="bg-[#E7E5DB] text-[#191A1E] hover:bg-white h-16 px-12 text-lg font-bold transition-all duration-300 hover:scale-110"
        >
          Get Started Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}