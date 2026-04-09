"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CreditCard,
  Loader2,
  Filter
} from "lucide-react";
import { transactionService } from "@/services/transactionService";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<any>({});

  const fetchTransactions = async () => {
    setLoading(true);
    const res = await transactionService.getTransactions(page, 10, search);
    if (res.code === 200) {
      setTransactions(res.data.data);
      setPagination(res.data.pagination);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-[#38040E] uppercase italic tracking-tighter">
            Transaction <span className="text-[#640D14]">History</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">
            Keep track of your credit purchases
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search Order ID..."
              className="w-full h-14 pl-12 pr-6 bg-white border border-gray-100 rounded-2xl outline-none focus:border-[#640D14] transition-all shadow-sm font-medium text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchTransactions()}
            />
          </div>
          <button 
            onClick={fetchTransactions}
            className="h-14 px-8 bg-[#38040E] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#640D14] transition-all active:scale-95 shadow-lg shadow-[#38040E]/10"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading History...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Info</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Package</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-[#38040E] text-sm">{trx.order_id}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                          {new Date(trx.created_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#640D14]/5 flex items-center justify-center text-[#640D14]">
                            <CreditCard size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#38040E] uppercase">{trx.class_type}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{trx.credit} Credits</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-[#640D14] italic">{formatCurrency(trx.gross_amount)}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusStyle(trx.status)}`}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {trx.status.toUpperCase() === "PENDING" && trx.midtrans_webhook_url && (
                          <button 
                            onClick={() => window.open(trx.midtrans_webhook_url, '_blank')}
                            className="text-[#640D14] text-[10px] font-black uppercase underline tracking-widest hover:text-[#38040E]"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {transactions.map((trx) => (
                <div key={trx.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{trx.order_id}</p>
                      <h4 className="text-lg font-black text-[#38040E] uppercase italic">{trx.class_type}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${getStatusStyle(trx.status)}`}>
                      {trx.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-500">{trx.credit} Credits</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {new Date(trx.created_date).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#640D14] italic">{formatCurrency(trx.gross_amount)}</p>
                      {trx.status.toUpperCase() === "PENDING" && (
                        <button className="text-[10px] font-black text-[#38040E] uppercase underline mt-1">Pay Now</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-10 px-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Showing {transactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-[#640D14] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="px-4 h-10 flex items-center justify-center rounded-xl bg-[#38040E] text-white text-xs font-black italic">
                  {page}
                </div>
                <button 
                  onClick={() => setPage(p => p + 1)}
                  disabled={transactions.length < 10}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-[#640D14] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}