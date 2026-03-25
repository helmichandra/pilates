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
  validity: string;
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
        
        {/* Header Section - Cormorant Garamond */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[#640D14] font-sans font-black uppercase text-[10px] tracking-[0.3em] mb-4">
            <span className="w-10 h-[1px] bg-[#640D14]"></span>
            Reservations
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl font-bold text-[#38040E] tracking-tighter leading-none uppercase italic">
            Booking & <span className="text-[#640D14] not-italic">Credits.</span>
          </h2>
          <div className="w-20 h-1 bg-[#640D14]/20 mx-auto mt-8 rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* LEFT: RESERVATION FORM */}
          <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(100,13,20,0.05)] p-10 lg:p-12 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-10 text-[#38040E] uppercase italic tracking-tight">Reserve Your Spot</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block font-sans text-[10px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Select Category</label>
                  <div className="bg-gray-50 px-6 py-5 rounded-[1.5rem] font-sans font-bold text-[#38040E] border border-gray-100 flex justify-between items-center group cursor-pointer hover:border-[#640D14]/30 transition-all">
                    Reformer (Group Class)
                    <span className="font-sans text-[9px] font-black bg-green-100 text-green-700 px-3 py-1.5 rounded-lg uppercase tracking-wider">Ready</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-[10px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Date</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] font-sans font-bold text-[#38040E] focus:ring-2 focus:ring-[#640D14]/10 focus:border-[#640D14] outline-none transition-all placeholder:text-gray-300"
                        placeholder="dd/mm/yyyy"
                      />
                      <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#640D14] transition-colors" size={18} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-sans text-[10px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">Time</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] font-sans font-bold text-[#38040E] focus:ring-2 focus:ring-[#640D14]/10 focus:border-[#640D14] outline-none transition-all"
                      />
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#640D14] transition-colors" size={18} />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-blue-50/50 rounded-[1.5rem] flex gap-4 items-start border border-blue-100/50">
                  <Info className="text-blue-500 shrink-0 mt-1" size={16} />
                  <p className="font-sans text-[11px] text-blue-700 leading-relaxed font-medium">
                    Jadwal kelas dapat berubah sewaktu-waktu. Pastikan saldo kredit Anda mencukupi sebelum melakukan reservasi.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 space-y-5">
              <button 
                onClick={handleBooking}
                className="w-full bg-[#640D14] text-white py-6 rounded-[1.5rem] font-sans font-black uppercase text-[11px] tracking-[0.2em] hover:bg-black transition-all transform active:scale-95 shadow-xl shadow-[#640D14]/20 cursor-pointer">
                Continue to Booking
              </button>
              
              <div className="flex items-center justify-center gap-2 font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" />
                Secure Checkout by Midtrans
              </div>
            </div>
          </div>
          
          {/* RIGHT: CREDIT PACKAGES */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(100,13,20,0.05)] p-10 lg:p-12 border border-gray-100">
              <h3 className="font-serif text-3xl font-bold mb-10 text-[#38040E] uppercase italic tracking-tight">Credit Packages</h3>
              
              <div className="space-y-5">
                {packages.map((pkg, idx) => (
                  <div 
                    key={idx}
                    className={`relative border-2 rounded-[1.5rem] p-8 transition-all duration-500 cursor-pointer ${
                      pkg.popular 
                        ? 'border-[#640D14] bg-[#FDF8F8] shadow-lg ring-1 ring-[#640D14]' 
                        : 'border-gray-50 bg-gray-50/50 hover:border-[#640D14]/20 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-serif text-3xl font-bold text-[#38040E] leading-none mb-2 italic">{pkg.sessions} <span className="text-xl not-italic font-sans font-black opacity-30">{pkg.label}</span></div>
                        <div className="font-sans text-[9px] font-black text-gray-400 uppercase tracking-widest">Validity: {pkg.validity}</div>
                        {pkg.save && (
                          <div className="font-sans text-[9px] bg-[#640D14] text-white font-black px-3 py-1 rounded-full mt-3 inline-block uppercase tracking-widest italic">
                            Save {pkg.save}!
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`font-serif text-3xl font-bold ${pkg.popular ? 'text-[#640D14]' : 'text-[#38040E]'}`}>
                          {pkg.price}
                        </div>
                        {pkg.popular && (
                          <div className="font-sans text-[9px] font-black text-[#640D14] uppercase tracking-[0.2em] mt-2">
                            Most Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-amber-50/50 rounded-[1.5rem] border border-amber-100/50">
                <p className="font-sans text-[10px] text-amber-800 leading-relaxed font-black uppercase tracking-[0.2em] mb-2">
                  Important Policy:
                </p>
                <p className="font-sans text-[10px] text-amber-700 leading-relaxed font-medium italic">
                  Credits are non-transferable between categories (Reformer / Chair / Private). Please check your class type before purchase.
                </p>
              </div>
            </div>
            
            {/* JOIN CARD */}
            <div className="bg-gradient-to-br from-[#38040E] to-[#640D14] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="font-serif text-3xl font-bold mb-4 uppercase italic tracking-tight">Join Fixclub</h3>
              <p className="font-sans text-white/70 mb-10 text-[13px] font-medium leading-[1.8] max-w-[85%]">
                Create an account to track your progress, manage credits, and get exclusive member notifications.
              </p>
              <button 
                onClick={handleRegister}
                className="w-full bg-white text-[#640D14] py-5 rounded-[1.5rem] font-sans font-black uppercase text-[11px] tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-lg cursor-pointer">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};