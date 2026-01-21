export default function RevenueCard({ month, amount }: { month: string; amount: string }) {
    return (
      <div className="bg-gradient-to-br from-[#640D14] to-[#800E13] rounded-xl p-6 shadow-lg text-white">
        <p className="text-sm opacity-90 mb-2">REVENUE ({month})</p>
        <h1 className="text-4xl font-bold">{amount}</h1>
        <div className="mt-4 flex gap-2">
          <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
          <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }