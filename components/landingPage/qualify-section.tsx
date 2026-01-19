import { Check } from 'lucide-react';

export const QualitySection = () => {
  const features = [
    'High-level personalized coaching',
    'Regular progress monitoring',
    'Safe and effective movement techniques',
    'Certified local instructors'
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            World-Class Quality,<br />
              <span className="text-red-600">Local Expertise.</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
                FixClub was founded on the belief that the best results come from instructors who truly understand their community. We combine modern training standards with local empathy, safety, and care.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
                Our studio is more than just a place to work out—it’s a space to grow (#FixIt), achieve your goals, and build strength through local expertise. Our certified local instructors provide personalized attention in every session, with intimate small groups and focused repetitions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" strokeWidth={3} />
                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 transform hover:scale-105 transition duration-300">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-bold text-lg mb-2">Posture Fix</h3>
              <p className="text-gray-700 text-sm">Improve posture through exercises tailored to your body’s specific needs</p>
            </div>
            
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 transform hover:scale-105 transition duration-300 shadow-lg">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="font-bold text-lg mb-2">Hygiene & Aman</h3>
              <p className="text-gray-700 text-sm">Equipment is fully sterilized between every training session</p>
            </div>
            
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 transform hover:scale-105 transition duration-300 shadow-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <h3 className="font-bold">Sarah</h3>
                  <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-semibold">BASI Certified</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Coach</strong></p>
              <p className="text-xs text-gray-500">Local rehabilitation & pre/postnatal specialists</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 text-center transform hover:scale-105 transition duration-300 shadow-xl">
              <div className="text-5xl font-black mb-2">15+</div>
              <div className="text-sm font-semibold tracking-wide">LOCAL EXPERTS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
