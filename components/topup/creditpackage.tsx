interface CreditPackageProps {
    credits: number;
    name: string;
    price: string;
    badge?: string;
    promotion?: string;
    onClick?: () => void;
  }
  
  export default function CreditPackage({
    credits,
    name,
    price,
    badge,
    promotion,
    onClick,
  }: CreditPackageProps) {
    return (
      <button
        onClick={onClick}
        className="w-full bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1e3a8a] hover:shadow-md transition-all text-left relative"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#1e3a8a] mb-1">
              {credits} Credits
            </h3>
            <p className="text-gray-500 text-sm">{name}</p>
            {promotion && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-green-600 text-xs font-semibold">
                  {promotion}
                </span>
              </div>
            )}
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            {badge && (
              <div className="bg-[#1e3a8a] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {badge}
              </div>
            )}
            <p className="text-xl md:text-2xl font-bold text-[#1e3a8a] whitespace-nowrap">{price}</p>
          </div>
        </div>
      </button>
    );
  }