export default function HeroBanner() {
  return (
    <div className="relative w-full h-48 md:h-74 overflow-hidden">
      {/* Background Image */}
      <img
        src="/media/banner/banner-home.png"
        alt="Fix Pilates Class"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay - Blue tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-500/60 to-purple-600/70"></div>
      
      {/* Bottom Blur Gradient - Fades to background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-gray-50"></div>
      
      {/* Content */}
      <div className="relative z-10 px-4 h-full flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white italic mb-2">
          Fix Pilates
        </h2>
        <p className="text-white/90 text-sm">Redefine your movement. Strengthen your core.</p>
        <p className="text-white/90 text-sm">Align your life.</p>
      </div>
    </div>
  );
}