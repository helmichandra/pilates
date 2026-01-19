export const FacilitySection = () => {
    const studios = Array(8).fill(null).map((_, i) => `Studio Space ${i + 1}`);
    const bathrooms = Array(4).fill(null).map((_, i) => `Bathroom Vanity ${i + 1}`);
  
    return (
      <section id="facility" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Our Facility</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Pilates Studio</h3>
              <span className="text-xs text-gray-400 uppercase">Replace Images in Images Folder</span>
            </div>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Our studio is equipped with the latest reformers and props, designed for comfort and focus. Plenty of natural light to keep you inspired.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {studios.map((studio, idx) => (
                <div key={idx} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm hover:bg-gray-200 transition">
                  {studio}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Bathroom & Vanity</h3>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Refresh yourself after a session in our luxury shower rooms. We provide premium toiletries and fresh towels.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bathrooms.map((bathroom, idx) => (
                <div key={idx} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm hover:bg-gray-200 transition">
                  {bathroom}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };