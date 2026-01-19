interface Category {
  icon: string;
  title: string;
  color: string;
  iconColor: string;
  description: string;
  available: boolean;
  label: string;
}

export const StudioCategories = () => {
  const categories: Category[] = [
    {
      icon: '🔄',
      title: 'Reformer',
      color: 'bg-red-50',
      iconColor: 'text-red-600',
      description: 'Core-focused training to enhance flexibility and strength using professional reformer equipment',
      available: true,
      label: 'ACTIVE'
    },
    {
      icon: '💺',
      title: 'Chair',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      description: 'Challenging workouts on the Pilates Wunda Chair to help you achieve active, precise technique',
      available: false,
      label: 'SOON'
    },
    {
      icon: '👤',
      title: 'Private',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      description: 'Personalized 1-on-1 sessions tailored to your individual needs and goals',
      available: false,
      label: 'SOON'
    },
    {
      icon: '🏊',
      title: 'Swimming Pool',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      description: 'Hydrotherapy and aqua fitness sessions in a premium private swimming pool',
      available: false,
      label: 'SOON'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">STUDIO CATEGORIES</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Select the category that suits your health journey.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-2xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] relative overflow-hidden group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {cat.label && (
                <span className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded ${cat.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                  {cat.label}
                </span>
              )}
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{cat.title}</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{cat.description}</p>
              {cat.available ? (
                <button className="text-red-600 font-bold text-sm hover:underline flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book Session <span>→</span>
                </button>
              ) : (
                <span className="text-gray-400 text-sm font-semibold">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};