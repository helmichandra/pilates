"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDF8F8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* MAPS & CONTACT SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Side: Text & Button */}
          <div className="max-w-md">
            <span className="font-sans text-[#640D14] font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">
              <span className="w-8 h-[1px] bg-[#640D14] inline-block mr-3 align-middle"></span>
              LOKASI KAMI
            </span>
            <h3 className="font-serif text-5xl lg:text-6xl font-bold text-[#38040E] tracking-tighter uppercase italic mb-8 leading-none">
              Visit Our <br/>
              <span className="text-[#640D14] not-italic">Sanctuary.</span>
            </h3>
            <p className="font-sans text-gray-500 font-medium mb-10 leading-relaxed text-sm italic border-l-2 border-[#640D14]/10 pl-6">
              Kunjungi kami di lokasi strategis Jakarta. Kami siap menyambut Anda untuk memulai gaya hidup sehat dengan fasilitas yang terkurasi.
            </p>
            <Link 
              href="https://maps.google.com" 
              target="_blank"
              className="font-sans inline-block bg-[#640D14] text-white px-10 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#640D14]/20 transform active:scale-95"
            >
              Buka di Google Maps
            </Link>
          </div>

          {/* Right Side: Maps Preview Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#640D14]/5 rounded-[3.5rem] blur-3xl transform group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative overflow-hidden rounded-[3rem] border-[12px] border-white shadow-2xl h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3033!2d106.81!3d-6.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMTIuMCJTIDEwNiw0OCczNi4wIkU!5e0!3m2!1sen!2sid!4v1" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="grayscale contrast-[1.1] brightness-[1.05] group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              ></iframe>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-200 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            {/* Branding */}
            <div className="space-y-4">
              <h4 className="font-serif text-4xl font-bold text-[#38040E] tracking-tighter uppercase italic leading-none">
                FIX<span className="text-[#640D14] not-italic">CLUB</span>
              </h4>
              <p className="font-sans text-gray-400 font-black text-[9px] uppercase tracking-[0.4em] leading-none">
                Gaya Hidup Sehat & Menyeluruh.
              </p>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-8">
              <Link href="https://instagram.com/fixclub.id" target="_blank" className="text-gray-400 hover:text-[#640D14] transition-all transform hover:-translate-y-1">
                <Instagram size={20} />
              </Link>
              <Link href="tel:+6281918007016" className="text-gray-400 hover:text-[#640D14] transition-all transform hover:-translate-y-1">
                <Phone size={20} />
              </Link>
              <Link href="mailto:hello@fixclub.id" className="text-gray-400 hover:text-[#640D14] transition-all transform hover:-translate-y-1">
                <Mail size={20} />
              </Link>
            </div>

            {/* Copyright */}
            <div className="md:text-right">
              <p className="font-sans text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">
                © 2026 FixClub Wellness.
              </p>
              <p className="font-sans text-[8px] font-bold text-gray-300 uppercase tracking-widest opacity-60">
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;