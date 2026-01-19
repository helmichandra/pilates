// landing-page/page.tsx
import Navigation from "@/components/landingPage/landing-navbar";
import Hero from "@/components/landingPage/hero-section";
import StudioCategories from "@/components/landingPage/studio-categories";
import QualitySection from "@/components/landingPage/qualify-section";
import FacilitySection from "@/components/landingPage/facility-section";
import {BookingSection} from "@/components/landingPage/booking";
import {Testimonials} from "@/components/landingPage/testimoni";
import Footer from "@/components/landingPage/landing-footer";

export default function FixclubLanding() {
    return (
      <div className="min-h-screen bg-white">
        <style>{`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        
        <Navigation />
        <Hero />
        <StudioCategories />
        <QualitySection />
        <FacilitySection />
        <BookingSection />
        <Testimonials />
        <Footer />
      </div>
    );
  }