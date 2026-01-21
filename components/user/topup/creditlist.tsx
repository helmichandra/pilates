import CreditPackage from "./creditpackage";

interface Package {
  credits: number;
  name: string;
  price: string;
  badge?: string;
  promotion?: string;
}

interface CreditPackageListProps {
  category: string;
  onPackageSelect: (pkg: Package) => void;
}

export default function CreditPackageList({
  category,
  onPackageSelect,
}: CreditPackageListProps) {
  const packages: Record<string, Package[]> = {
    reformer: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      {
        credits: 12,
        name: "Value Pack",
        price: "Rp 1.600.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
    chair: [
      { credits: 1, name: "Single Drop-in", price: "Rp 175.000" },
      { credits: 5, name: "Starter Pack", price: "Rp 850.000" },
      {
        credits: 12,
        name: "Value Pack",
        price: "Rp 1.600.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
    private: [
      { credits: 1, name: "Single Private", price: "Rp 850.000" },
      { credits: 5, name: "Private Pack", price: "Rp 4.100.000" },
      {
        credits: 12,
        name: "Pro Private",
        price: "Rp 9.000.000",
        badge: "BEST VALUE",
        promotion: "Buy 10 + 2 Free",
      },
    ],
  };

  const currentPackages = packages[category] || packages.reformer;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-base md:text-lg mb-6">
        Buying credits for{" "}
        <span className="text-[#1e3a8a] font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)} Class
        </span>
      </h2>

      <div className="space-y-4">
        {currentPackages.map((pkg, index) => (
          <CreditPackage
            key={index}
            {...pkg}
            onClick={() => onPackageSelect(pkg)}
          />
        ))}
      </div>
    </div>
  );
}