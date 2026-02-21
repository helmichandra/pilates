"use client";
import { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { packageService } from '@/services/packageService';
import Swal from 'sweetalert2';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  selectedId?: number | null;
  onSuccess: () => void;
}

export default function PackageModal({ isOpen, onClose, type, selectedId, onSuccess }: PackageModalProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState({
    class_type: "Reformer",
    description: "",
    credit_unit: 0,
    amount: ""
  });

  useEffect(() => {
    if (isOpen && type === 'edit' && selectedId) {
      fetchDetail();
    } else {
      setFormData({ class_type: "Reformer", description: "", credit_unit: 0, amount: "" });
    }
  }, [isOpen, type, selectedId]);

  const fetchDetail = async () => {
    setFetching(true);
    try {
      const res = await packageService.getPackageById(selectedId!);
      if (res.code === 200) {
        setFormData({
          class_type: res.data.class_type,
          description: res.data.description,
          credit_unit: res.data.credit_unit,
          amount: res.data.amount
        });
      }
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'add') {
        await packageService.createPackage(formData);
      } else {
        await packageService.updatePackage(selectedId!, formData);
      }
      
      Swal.fire({ icon: 'success', title: 'Saved!', showConfirmButton: false, timer: 1500 });
      onSuccess();
      onClose();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black text-[#38040E] uppercase tracking-tighter">
            {type === 'add' ? 'Create Package' : 'Edit Package'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {fetching ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#640D14]" /></div> : (
            <>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Class Type</label>
                <select 
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#640D14]/20 outline-none font-bold text-sm"
                  value={formData.class_type}
                  onChange={(e) => setFormData({...formData, class_type: e.target.value})}
                >
                  <option value="Reformer">Reformer</option>
                  <option value="Chair">Chair</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <input 
                  type="text" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="e.g. Starter Pack"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Credits</label>
                  <input 
                    type="number" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
                    value={formData.credit_unit} onChange={(e) => setFormData({...formData, credit_unit: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Amount (IDR)</label>
                  <input 
                    type="number" required className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit" disabled={loading}
                className="w-full bg-[#640D14] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#640D14]/20 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Package
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}