"use client";

import { useEffect, useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { userApi } from '@/services/userServices';
import Swal from 'sweetalert2';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  initialData?: any; // Ini berisi ringkasan data dari list
  onSuccess: () => void;
}

export default function UserModal({ isOpen, onClose, type, initialData, onSuccess }: UserModalProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  
  // State Form sesuai format body API
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    gender: "MALE",
    date_of_birth: "2000-01-20T00:00:00Z",
    password: ""
  });

  // Fetch Detail Data jika mode Edit
  useEffect(() => {
    if (isOpen && type === 'edit' && initialData?.id) {
      const getDetail = async () => {
        setFetching(true);
        try {
          const res = await userApi.getUserById(initialData.id);
          if (res.code === 200) {
            const d = res.data;
            setFormData({
              first_name: d.first_name || "",
              last_name: d.last_name || "",
              username: d.username || "",
              email: d.email || "",
              phone: d.phone || "",
              gender: d.gender || "MALE",
              date_of_birth: d.date_of_birth || "2000-01-20T00:00:00Z",
              password: "" // Kosongkan password kecuali ingin diganti
            });
          }
        } finally {
          setFetching(false);
        }
      };
      getDetail();
    } else {
      // Reset form jika mode Add
      setFormData({
        first_name: "", last_name: "", username: "", email: "", 
        phone: "", gender: "MALE", date_of_birth: "2000-01-20T00:00:00Z", password: ""
      });
    }
  }, [isOpen, type, initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res;
      if (type === 'edit') {
        res = await userApi.updateUser(initialData.id, formData);
      } else {
        //  res = await userApi.createUser(formData);
      }

      if (res.code === 200 || res.status === "OK") {
        // Animasi Sukses
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: `Data user berhasil ${type === 'edit' ? 'diperbarui' : 'ditambahkan'}.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: 'rounded-3xl' }
        });
        onSuccess();
        onClose();
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      // Animasi Gagal
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message || 'Terjadi kesalahan saat menyimpan data.',
        confirmButtonColor: '#640D14',
        customClass: { popup: 'rounded-3xl', confirmButton: 'rounded-xl' }
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-inter">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-2xl font-black text-[#38040E] uppercase tracking-tighter">
              {type === 'add' ? 'New Member' : 'Edit Profile'}
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fixclub Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5 max-h-[65vh] overflow-y-auto custom-scrollbar">
          {fetching ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading Data...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" placeholder="e.g. Helmi" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" placeholder="e.g. Kurniawan" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                <input 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  type="email" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm appearance-none"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                  <input 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    type="password" 
                    placeholder="••••••••"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#640D14]/10 outline-none font-bold text-sm" 
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-gray-50">
          <button 
            onClick={handleSubmit}
            disabled={loading || fetching}
            className="w-full bg-[#640D14] text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#38040E] transition-all shadow-xl shadow-[#640D14]/20 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm & Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}