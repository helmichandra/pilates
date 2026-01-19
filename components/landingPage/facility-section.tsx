
import React from 'react';

interface ImageItemProps {
  src: string;
  alt: string;
  caption: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, alt, caption }) => {
  return (
    <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-sm transition-all hover:shadow-2xl">
      <img 
        src={src} 
        alt={alt} 
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <span className="text-white text-xs font-bold uppercase tracking-widest">{caption}</span>
      </div>
    </div>
  );
};

const Facility: React.FC = () => {
  const facilityImages = [
    { src: '/media/facility1.avif', caption: 'Reformer Area' },
    { src: '/media/facility2.jpeg', caption: 'Core Workout Space' },
    { src: '/media/facility3.jpeg', caption: 'Props & Equipment' },
    { src: '/media/facility4.jpeg', caption: 'Warm up zone' },
  ];

  return (
    <section id="facility" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-6 tracking-tight uppercase">Studio Facility</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Kami menghadirkan peralatan Reformer profesional dengan standar keamanan tertinggi. Studio kami di area <b>Kreo - Ciledug</b> didesain untuk kenyamanan maksimal saat Anda berlatih memperbaiki postur dan kekuatan inti.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {facilityImages.map((img, i) => (
              <ImageItem key={i} src={img.src} alt={img.caption} caption={img.caption} />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-6">
            <div className="text-4xl">🚿</div>
            <div>
              <h4 className="font-bold text-gray-900">Kamar Mandi</h4>
              <p className="text-sm text-gray-500">Fasilitas kamar mandi yang bersih dan nyaman untuk kesegaran Anda.</p>
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex items-center space-x-6">
            <div className="text-4xl">🚗</div>
            <div>
              <h4 className="font-bold text-gray-900">Easy Parking</h4>
              <p className="text-sm text-gray-500">Area parkir yang memadai untuk kemudahan akses member.</p>
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex items-center space-x-6">
            <div className="text-4xl">🛋️</div>
            <div>
              <h4 className="font-bold text-gray-900">Member Lounge</h4>
              <p className="text-sm text-gray-500">Area bersantai yang nyaman untuk menunggu sesi kelas dimulai.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facility;
