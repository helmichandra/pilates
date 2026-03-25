"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, CreditCard, ShieldAlert, Timer } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
  icon: React.ElementType;
}

export const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "OPERATIONAL",
      icon: Clock,
      question: "Kapan Jam Operasional Studio?",
      answer: "Jam operasional Studio kami untuk menjawab pertanyaan Member adalah pukul 07.00 - 20.00 WIB. Pertanyaan yang masuk melewati jam tersebut akan dilayani pada hari berikutnya."
    },
    {
      category: "CREDITS",
      icon: CreditCard,
      question: "Bagaimana Ketentuan Kredit & Booking?",
      answer: (
        <ul className="list-disc ml-5 space-y-1">
          <li>Setiap kelas memiliki nilai credit tertentu.</li>
          <li>Credits akan otomatis terpotong saat booking berhasil.</li>
          <li>Reservasi dilakukan sesuai ketersediaan jadwal (Disarankan booking lebih awal).</li>
        </ul>
      )
    },
    {
      category: "SESSION",
      icon: Timer,
      question: "Berapa Lama Durasi Sesi & Apa Yang Harus Dibawa?",
      answer: "Setiap sesi berlangsung +/- 50 menit. Member WAJIB menggunakan kaos kaki dan sarung tangan anti-slip selama latihan serta menjaga protokol kesehatan."
    },
    {
      category: "POLICY",
      icon: ShieldAlert,
      question: "Kebijakan Pembatalan & Keterlambatan",
      answer: (
        <div className="space-y-3">
          <p><strong>Late Arrivals:</strong> Sesi dimulai dan selesai tepat waktu. Tidak ada penambahan waktu untuk keterlambatan.</p>
          <p><strong>Cancellation:</strong> Pembatalan/pergantian sesi dilakukan maksimal H-1. Jika melewati batas waktu, sesi otomatis terpotong.</p>
          <p><strong>Reschedule:</strong> Perubahan jadwal hanya bisa dilakukan satu (1) kali untuk setiap sesi.</p>
        </div>
      )
    },
    {
      category: "TERMS",
      icon: ShieldAlert,
      question: "Syarat & Ketentuan (Terms & Conditions)",
      answer: (
        <ul className="list-decimal ml-5 space-y-1">
          <li>Credits bersifat non-refundable dan non-transferable.</li>
          <li><strong>Zero Refund Policy:</strong> Paket yang sudah dibayar tidak bisa dibatalkan/refund.</li>
          <li>FIXCLUB berhak melakukan perubahan jadwal jika diperlukan.</li>
        </ul>
      )
    },
    {
      category: "VALIDITY",
      icon: Clock,
      question: "Berapa Lama Masa Berlaku Paket?",
      answer: (
        <ul className="list-disc ml-5 space-y-1 font-bold text-[#640D14]">
          <li>Paket 5 Credits → Berlaku 3 Minggu</li>
          <li>Paket 10 Credits → Berlaku 2 Bulan</li>
          <li>Paket 20 Credits → Berlaku 3 Bulan</li>
          <li className="text-gray-400 font-medium italic text-[10px]">Credits yang tidak digunakan akan hangus otomatis.</li>
        </ul>
      )
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-4">
            <span className="w-10 h-[1px] bg-[#640D14]"></span>
            Support Center
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#38040E] tracking-tighter uppercase italic mb-6">
            FAQ<span className="text-[#640D14] not-italic">S.</span>
          </h2>
          <p className="text-gray-500 font-medium italic">
            Frequently Asked Questions perihal layanan Pilates di FixClub.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <motion.div 
                key={idx}
                initial={false}
                className={`border-2 rounded-[2rem] transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#640D14] bg-[#FDF8F8] shadow-lg' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl transition-colors ${isOpen ? 'bg-[#640D14] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                      <faq.icon size={20} />
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-[#640D14] tracking-[0.2em] mb-1 uppercase">
                        {faq.category}
                      </span>
                      <h4 className={`text-sm sm:text-base font-black uppercase italic tracking-tight ${isOpen ? 'text-[#38040E]' : 'text-gray-600'}`}>
                        {faq.question}
                      </h4>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#640D14]' : 'text-gray-300'}`} 
                    size={20} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8 pt-2 ml-[60px] border-t border-gray-100/50">
                        <div className="text-sm text-gray-500 leading-relaxed font-medium">
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
        <div className="mt-16 p-8 bg-[#38040E] rounded-[2.5rem] text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-150 transition-transform duration-1000">
            <HelpCircle size={120} />
          </div>
          <h5 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Masih punya pertanyaan lain?</h5>
          <p className="text-white/60 text-xs font-medium mb-6 uppercase tracking-widest">Admin kami siap membantu Anda di jam operasional.</p>
          <button className="bg-white text-[#38040E] px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#640D14] hover:text-white transition-all transform active:scale-95 shadow-xl">
            Hubungi Admin Via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};