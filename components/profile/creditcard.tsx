import { Card } from "@/components/ui/card";

interface CreditCardsProps {
  reformerCount?: number;
  chairCount?: number;
  privateCount?: number;
}

export default function CreditCards({
  reformerCount = 5,
  chairCount = 2,
  privateCount = 0,
}: CreditCardsProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Reformer Card */}
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#2d4db5] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-wide mb-2">Reformer</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-bold">{reformerCount}</span>
              <span className="text-white/80">credits</span>
            </div>
          </div>
        </Card>

        {/* Chair Card */}
        <Card className="bg-gradient-to-br from-[#1e3a8a] to-[#2d4db5] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-wide mb-2">Chair</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-bold">{chairCount}</span>
              <span className="text-white/80">credits</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Private Card - Full Width */}
      <Card className="bg-gradient-to-br from-[#C2B067] to-[#C0C0C0] text-white p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-wide mb-2">Private</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-bold">{privateCount}</span>
            <span className="text-white/80">credits</span>
          </div>
        </div>
      </Card>
    </div>
  );
}