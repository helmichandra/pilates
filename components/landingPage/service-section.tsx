"use client";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Calendar,
    title: "Court Booking",
    description:
      "Easy online booking system. Reserve your preferred time slot with just a few clicks.",
    link: "Book Now",
  },
  {
    icon: Users,
    title: "Coaching",
    description:
      "Professional coaches available for private lessons and group training sessions.",
    link: "Learn More",
  },
  {
    icon: Trophy,
    title: "Tournaments",
    description:
      "Regular tournaments and events for players of all skill levels to compete and improve.",
    link: "View Schedule",
  },
];

export default function ServicesSection() {
  const router = useRouter();
  const handleBooking = () => {
    router.push("/dashboard-user/booking");
  };
  return (
    <section id="courts" className="py-20 bg-[#E7E5DB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-[#191A1E]/10 rounded-full mb-6">
            <span className="text-[#191A1E] text-sm font-semibold">
              OUR SERVICES
            </span>
          </div>
          <h3 className="text-5xl font-bold text-[#191A1E] mb-4">
            Everything You Need
            <br />
            <span className="text-[#491108] italic">In One Place</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-[#C8C2B7] rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-[#491108] rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-[#191A1E] mb-4">
                  {service.title}
                </h4>
                <p className="text-[#564838] leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button
                  onClick={handleBooking}
                  variant="link"
                  className="text-[#491108] p-0 h-auto font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer"
                >
                  {service.link}{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}