"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, CreditCard, ShieldAlert, Timer } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  icon: React.ElementType;
}

export const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      icon: Clock,
      question: "Kapan Jam Operasional Studio?",
      answer: "Jam operasional Studio kami untuk menjawab pertanyaan Member adalah pukul 07.00 - 20.00 WIB. Pertanyaan yang masuk melewati jam tersebut akan dilayani pada hari berikutnya."
    },
    {
      icon: CreditCard,
      question: "Bagaimana Ketentuan Kredit & Booking?",
      answer: (
        <ul className="list-disc ml-5 space-y-2 font-sans text-[13px]">
          <li>Setiap kelas memiliki nilai credit tertentu.</li>
          <li>Credits akan otomatis terpotong saat booking berhasil.</li>
          <li>Reservasi dilakukan sesuai ketersediaan jadwal (Disarankan booking lebih awal).</li>
        </ul>
      )
    },
    {
      icon: Timer,
      question: "Berapa Lama Durasi Sesi & Apa Yang Harus Dibawa?",
      answer: "Setiap sesi berlangsung +/- 50 menit. Member WAJIB menggunakan kaos kaki dan sarung tangan anti-slip selama latihan serta menjaga protokol kesehatan."
    },
    {
      icon: ShieldAlert,
      question: "Kebijakan Pembatalan & Keterlambatan",
      answer: (
        <div className="space-y-4 font-sans text-[13px]">
          <p><strong className="text-[#38040E]">Late Arrivals:</strong> Sesi dimulai dan selesai tepat waktu. Tidak ada penambahan waktu untuk keterlambatan.</p>
          <p><strong className="text-[#38040E]">Cancellation:</strong> Pembatalan/pergantian sesi dilakukan maksimal H-1. Jika melewati batas waktu, sesi otomatis terpotong.</p>
          <p><strong className="text-[#38040E]">Reschedule:</strong> Perubahan jadwal hanya bisa dilakukan satu (1) kali untuk setiap sesi.</p>
        </div>
      )
    },
    {
      icon: ShieldAlert,
      question: "Syarat & Ketentuan (Terms & Conditions)",
      answer: (
        <ul className="list-decimal ml-5 space-y-2 font-sans text-[13px]">
          <li>Credits bersifat non-refundable dan non-transferable.</li>
          <li><strong className="text-[#38040E]">Zero Refund Policy:</strong> Paket yang sudah dibayar tidak bisa dibatalkan/refund.</li>
          <li>FIXCLUB berhak melakukan perubahan jadwal jika diperlukan.</li>
        </ul>
      )
    },
    {
      icon: Clock,
      question: "Berapa Lama Masa Berlaku Paket?",
      answer: (
        <div className="font-sans">
          <ul className="list-disc ml-5 space-y-2 font-black text-[#640D14] text-[13px] uppercase tracking-wider">
            <li>Paket 5 Credits → Berlaku 3 Minggu</li>
            <li>Paket 10 Credits → Berlaku 2 Bulan</li>
            <li>Paket 20 Credits → Berlaku 3 Bulan</li>
          </ul>
          <p className="mt-4 text-gray-400 font-medium italic text-[11px]">Credits yang tidak digunakan akan hangus otomatis.</p>
        </div>
      )
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF8F8]">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER - Cormorant Garamond */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[#640D14] font-sans font-black uppercase text-[10px] tracking-[0.3em] mb-4">
            <span className="w-10 h-[1px] bg-[#640D14]"></span>
            Support Center
          </div>
          <h2 className="font-serif text-5xl lg:text-7xl font-bold text-[#38040E] tracking-tighter uppercase italic mb-6 leading-none">
            FAQ<span className="text-[#640D14] not-italic">S.</span>
          </h2>
          <p className="font-sans text-gray-500 font-medium italic text-sm border-l-2 border-[#640D14]/20 pl-6 inline-block">
            Frequently Asked Questions perihal layanan Pilates di FixClub.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-5">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <motion.div 
                key={idx}
                initial={false}
                className={`border-2 rounded-[2.5rem] transition-all duration-500 overflow-hidden ${
                  isOpen ? 'border-[#640D14] bg-[#FDF8F8] shadow-xl' : 'border-gray-50 bg-gray-50/50 hover:border-[#640D14]/20'
                }`}
              >
                <button
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-[#640D14] text-white shadow-lg shadow-[#640D14]/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                      <faq.icon size={22} />
                    </div>
                    <div>                  
                      <h4 className={`font-serif text-xl sm:text-2xl font-bold italic tracking-tight leading-tight transition-colors ${isOpen ? 'text-[#38040E]' : 'text-gray-600'}`}>
                        {faq.question}
                      </h4>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#640D14] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown 
                      className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div className="px-10 pb-10 pt-2 ml-[84px] border-t border-gray-100/50 mr-10">
                        <div className="font-sans text-[13px] text-gray-500 leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER CALL TO ACTION */}
        {/* <div className="mt-20 p-12 bg-[#38040E] rounded-[3rem] text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform duration-1000">
            <HelpCircle size={160} />
          </div>
          <div className="relative z-10">
            <h5 className="font-serif text-3xl font-bold uppercase italic mb-3 tracking-tight">Masih punya pertanyaan lain?</h5>
            <p className="font-sans text-white/60 text-[10px] font-bold mb-8 uppercase tracking-[0.3em]">Admin kami siap membantu Anda di jam operasional.</p>
            <button className="font-sans bg-white text-[#38040E] px-12 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#640D14] hover:text-white transition-all transform active:scale-95 shadow-2xl">
              Hubungi Admin Via WhatsApp
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};