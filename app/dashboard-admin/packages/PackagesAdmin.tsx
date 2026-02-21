"use client";
import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, Edit3, Package as PackageIcon } from 'lucide-react';
import { packageService } from '@/services/packageService';
import PackageModal from '@/components/admin/packages/PackageModal';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [modal, setModal] = useState<{show: boolean, type: 'add' | 'edit', id: number | null}>({
    show: false, type: 'add', id: null
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await packageService.getPackages(page, search);
      if (res.code === 200) {
        setPackages(res.data.data);
        setTotalPages(Math.ceil((res.data.pagination?.total || 10) / 10)); 
      }
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => loadData(), 500);
    return () => clearTimeout(delayDebounce);
  }, [loadData]);

  const formatIDR = (val: any) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" placeholder="Search packages..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-[#640D14]/10 font-medium"
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button 
            onClick={() => setModal({ show: true, type: 'add', id: null })}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#640D14] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#640D14]/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" /> Add Package
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? [1,2,3].map(i => <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-[2.5rem]" />) : 
            packages.map((pkg) => (
              <div key={pkg.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-[#640D14]/20 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#640D14]/5 p-3 rounded-2xl text-[#640D14]">
                    <PackageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-100 rounded-full text-gray-500">
                    {pkg.class_type}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#38040E] mb-1">{pkg.description || 'No Description'}</h3>
                <p className="text-2xl font-black text-[#640D14] mb-4">{formatIDR(pkg.amount)}</p>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-xs font-bold text-gray-400">{pkg.credit_unit} Sessions</span>
                  <button 
                    onClick={() => setModal({ show: true, type: 'edit', id: pkg.id })}
                    className="p-2 hover:bg-[#640D14] hover:text-white rounded-xl transition-all text-gray-400"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <button 
            disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="p-3 bg-white rounded-xl shadow-sm disabled:opacity-30"
          ><ChevronLeft /></button>
          <div className="px-6 py-3 bg-[#640D14] text-white rounded-xl font-black text-xs">
            PAGE {page}
          </div>
          <button 
            disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
            className="p-3 bg-white rounded-xl shadow-sm disabled:opacity-30"
          ><ChevronRight /></button>
        </div>
      </main>

      <PackageModal 
        isOpen={modal.show} 
        type={modal.type} 
        selectedId={modal.id}
        onClose={() => setModal({ ...modal, show: false })}
        onSuccess={() => loadData()} // <--- TAMBAHKAN INI agar tidak error build
        />
    </div>
  );
}