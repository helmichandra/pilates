
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <Link href="/" className="text-4xl font-black font-display text-primary mb-8 block tracking-tighter">Fixclub.</Link>
            <p className="text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">
              Spesialis Reformer Pilates Studio. Kami membantu Anda memperbaiki postur dan memperkuat inti tubuh dengan bimbingan instruktur lokal berpengalaman di area Kreo, Ciledug, dan sekitarnya.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.3em] text-primary">Navigasi</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Paket Pilates</Link></li>
              <li><Link href="/#booking" className="hover:text-white transition-colors">Reservasi Kelas</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.3em] text-primary">Lokasi Kami</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <span className="text-white block font-bold mb-1">Kreo - Larangan Area</span>
                Jl. AMD X No.35, Kreo, Kec. Larangan, <br/>Kota Tangerang, Banten 15516
              </li>
              <li className="text-white font-bold tracking-widest">+62 812 3456 7890</li>
              <li className="text-primary font-bold">hello@fixclub.id</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
          <p>&copy; 2026 Fixclub Pilates Studio. Semua Hak Dilindungi.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <span className="text-primary/40 italic">Serving Kreo, Ciledug, & Joglo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
