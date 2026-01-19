import Navbar from "@/components/landingPage/landing-navbar";
import HeroSection from "@/components/landingPage/hero-section";
import StatsSection from "@/components/landingPage/stats-section";
import AboutSection from "@/components/landingPage/about-section";
import ServicesSection from "@/components/landingPage/service-section";
import CTASection from "@/components/landingPage/cta-section";
import Footer from "@/components/landingPage/landing-footer";

export default function LandingPage() {
    return (
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </div>
    );
  }
  
  // Add to app/globals.css
  /*
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slide-left {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slide-right {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-20px) translateX(10px);
    }
  }
  
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.8s ease-out;
  }
  
  .animate-slide-down {
    animation: slide-down 0.4s ease-out;
  }
  
  .animate-slide-left {
    animation: slide-left 0.8s ease-out;
  }
  
  .animate-slide-right {
    animation: slide-right 0.8s ease-out;
  }
  
  .animate-scale-in {
    animation: scale-in 0.6s ease-out;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite 3s;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
  */