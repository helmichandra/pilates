interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: string;
  }
  
  interface TopUpHistoryProps {
    transactions?: Transaction[];
  }
  
  export default function TopUpHistory({ transactions = [] }: TopUpHistoryProps) {
    return (
      <div className="px-4 pb-24 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-[#1e3a8a] italic mb-4">Topup History</h3>
        {transactions.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 md:p-12 text-center">
            <p className="text-gray-400">No transaction history yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-[#1e3a8a]">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className="font-bold text-[#1e3a8a]">{transaction.amount} credits</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }