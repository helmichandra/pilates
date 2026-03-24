"use client";
import { useState } from 'react';
import { Calendar, Clock, ChevronDown, ShieldCheck, Info } from 'lucide-react';
import { useRouter } from 'next/navigation'

interface Package {
  sessions: number;
  price: string;
  label: string;
  save?: string;
  popular?: boolean;
  validity: string; // Tambahan untuk penjelasan masa berlaku
}

export const BookingSection = () => {
  const [date, setDate] = useState('dd/mm/yyyy');
  const [time, setTime] = useState('08:00 AM');
  const router = useRouter()
  
  const handleRegister = () => {
    router.push("/auth/register");
  };

  const handleBooking = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) {
      router.push('/auth/login?callback=/dashboard-user/booking');
    } else {
      router.push('/dashboard-user/booking');
    }
  };

  const packages: Package[] = [
    { sessions: 1, price: 'Rp 180,000', label: 'SESSION', validity: '7 Days' },
    { sessions: 5, price: 'Rp 800,000', label: 'SESSIONS', save: 'Rp 100,000', popular: true, validity: '30 Days' },
    { sessions: 12, price: 'Rp 1,750,000', label: 'SESSIONS', save: 'Rp 410,000', validity: '60 Days' }
  ];

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF8F8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#38040E] tracking-tighter">BOOKING & CREDITS</h2>
          <div className="w-20 h-1.5 bg-[#640D14] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* LEFT: RESERVATION FORM */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(100,13,20,0.05)] p-10 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-8 text-[#38040E] uppercase tracking-tight">Reserve Your Spot</h3>
              
              <div className="space-y-7">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Select Category</label>
                  <div className="bg-gray-50 px-5 py-4 rounded-2xl font-bold text-[#38040E] border border-gray-100 flex justify-between items-center">
                    Reformer (Group Class)
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md uppercase">Ready</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-[#38040E] focus:ring-2 focus:ring-[#640D14]/10 focus:border-[#640D14] outline-none transition-all placeholder:text-gray-300"
                        placeholder="dd/mm/yyyy"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Time</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-[#38040E] focus:ring-2 focus:ring-[#640D14]/10 focus:border-[#640D14] outline-none transition-all"
                      />
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 items-start border border-blue-100">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                    Jadwal kelas dapat berubah sewaktu-waktu. Pastikan saldo kredit Anda mencukupi sebelum melakukan reservasi.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 space-y-4">
              <button 
                onClick={handleBooking}
                className="w-full bg-[#640D14] text-white py-5 rounded-[1.25rem] font-black uppercase text-sm tracking-widest hover:bg-black transition-all transform active:scale-95 shadow-xl shadow-[#640D14]/20 cursor-pointer">
                Continue to Booking
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" />
                Secure Checkout by Midtrans
              </div>
            </div>
          </div>
          
          {/* RIGHT: CREDIT PACKAGES */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(100,13,20,0.05)] p-10 border border-gray-100">
              <h3 className="text-2xl font-black mb-8 text-[#38040E] uppercase tracking-tight">Credit Packages</h3>
              
              <div className="space-y-4">
                {packages.map((pkg, idx) => (
                  <div 
                    key={idx}
                    className={`relative border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                      pkg.popular 
                        ? 'border-[#640D14] bg-[#FDF8F8] shadow-lg ring-1 ring-[#640D14]' 
                        : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-black text-[#38040E] leading-none mb-1">{pkg.sessions} {pkg.label}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Validity: {pkg.validity}</div>
                        {pkg.save && (
                          <div className="text-[10px] bg-[#640D14] text-white font-black px-2 py-0.5 rounded mt-2 inline-block uppercase tracking-tighter italic">
                            Save {pkg.save}!
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${pkg.popular ? 'text-[#640D14]' : 'text-[#38040E]'}`}>
                          {pkg.price}
                        </div>
                        {pkg.popular && (
                          <div className="text-[9px] font-black text-[#640D14] uppercase tracking-widest mt-1">
                            Most Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-800 leading-relaxed font-bold uppercase tracking-wide">
                  Important Policy:
                </p>
                <p className="text-[10px] text-amber-700 leading-relaxed mt-1 font-medium italic">
                  Credits are non-transferable between categories (Reformer / Chair / Private). Please check your class type before purchase.
                </p>
              </div>
            </div>
            
            {/* JOIN CARD */}
            <div className="bg-gradient-to-br from-[#38040E] to-[#640D14] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Join Fixclub</h3>
              <p className="text-white/70 mb-8 text-xs font-medium leading-relaxed max-w-[80%]">
                Create an account to track your progress, manage credits, and get exclusive member notifications.
              </p>
              <button 
                onClick={handleRegister}
                className="w-full bg-white text-[#640D14] py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition shadow-lg cursor-pointer">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};