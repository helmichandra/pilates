"use client";
import { useState } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation'

interface Package {
  sessions: number;
  price: string;
  label: string;
  save?: string;
  popular?: boolean;
}

export const BookingSection = () => {
  const [date, setDate] = useState('dd/mm/yyyy');
  const [time, setTime] = useState('08:00 AM');
  const router = useRouter()
  const handleRegister = () => {
    router.push("/auth/register");
  };
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/auth/login?callback=/dashboard-user/booking');
    } else {
      router.push('/dashboard-user/booking');
    }
  };
  const packages: Package[] = [
    { sessions: 1, price: 'Rp 180,000', label: 'SESSION' },
    { sessions: 5, price: 'Rp 800,000', label: 'SESSIONS', save: 'Rp 100,000', popular: true },
    { sessions: 12, price: 'Rp 1,750,000', label: 'SESSIONS', save: 'Rp 410,000' }
  ];

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">BOOKING & CREDITS</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <h3 className="text-2xl font-black mb-6">Reserve Your Spot</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Select Category</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg font-semibold">
                  Reformer (Ready Now)
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Date</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
                      placeholder="dd/mm/yyyy"
                    />
                    <Calendar className="absolute right-3 top-3.5 text-gray-400" size={20} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Time</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-400" size={20} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleBooking}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition transform hover:scale-105 shadow-lg cursor-pointer">
                Continue to Booking
              </button>
              
              <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                <Clock size={14} />
                SECURE PAYMENT VIA MIDTRANS
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <h3 className="text-2xl font-black mb-6">Credit Packages</h3>
              
              <div className="space-y-4">
                {packages.map((pkg, idx) => (
                  <div 
                    key={idx}
                    className={`border-2 rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                      pkg.popular 
                        ? 'border-red-600 bg-red-50 shadow-lg transform scale-105' 
                        : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-black">{pkg.sessions} {pkg.label}</div>
                        {pkg.save && (
                          <div className="text-xs text-red-600 font-bold mt-1">Save {pkg.save}!</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-red-600">{pkg.price}</div>
                        {pkg.popular && (
                          <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold mt-1 inline-block">
                            POPULAR
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                <strong>Important: Credits are valid for ONE category only (Reformer / Chair / Private / Pool). Credits cannot be transferred between categories. Please contact us if you have any questions.</strong>
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-3">Join Fixclub</h3>
              <p className="text-red-100 mb-6 text-sm">
                Sign up now to receive class notifications and track your progress.
              </p>
              <button 
                onClick={handleRegister}
                className="w-full bg-white text-red-900 py-3 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105 cursor-pointer">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};