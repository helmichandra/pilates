import { Star } from 'lucide-react';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;
}

export const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      text: "Best reformer studio in town! The coaches really fix my lower back pain.",
      name: "Jessica W.",
      role: "REGULAR MEMBER",
      rating: 5
    },
    {
      text: "Clean facility and professional staff. I feel much stronger after 10 sessions.",
      name: "Budi Santoso",
      role: "ATHLETE",
      rating: 5
    },
    {
      text: "Love the small group vibe. Very personalized attention to every move.",
      name: "Maria G.",
      role: "BEGINNER",
      rating: 4
    },
    {
      text: "First-rehab training here is fantastic. Highly recommended for posture fix!",
      name: "Adrian K.",
      role: "PATIENT RECOVERY",
      rating: 5
    },
    {
      text: "Premium facility, great parking, and the showers are amazing!",
      name: "Larsa P.",
      role: "FITNESS ENTHUSIAST",
      rating: 5
    },
    {
      text: "Never thought Pilates was for men until I tried Fixclub. Game changer.",
      name: "Kevin T.",
      role: "ATHLETE",
      rating: 4
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">What Our Members Say</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-yellow-500 font-bold flex items-center justify-center gap-2">
            <Star className="fill-yellow-500" size={20} />
            4.9/5 from 120+ members
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};