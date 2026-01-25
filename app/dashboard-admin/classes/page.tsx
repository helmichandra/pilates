"use client"
import { useEffect, useState } from 'react';
import { scheduleApi } from '@/services/pilatesSchedules';
import { ClassCard } from '@/components/admin/classes/classcard';
import ClassModal from '@/components/admin/classes/classmodal';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react'; // <--- Tambahkan ini
import Swal from 'sweetalert2';

export default function SchedulePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Tambahkan state untuk menyimpan ID yang akan di-update
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await scheduleApi.getAll();
      if (res.code === 200) setData(res.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenEdit = (id: number) => {
    setSelectedId(id); // Set ID sebelum buka modal
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedId(null); // Reset ID saat tutup
    setIsModalOpen(false);
  };
  
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const res = selectedId 
        ? await scheduleApi.update(selectedId, formData) 
        : await scheduleApi.create(formData);
  
      if (res.code === 200 || res.status === "OK") {
        handleCloseModal();
        
        // Animasi Berhasil
        Swal.fire({
          title: selectedId ? 'Update Successful!' : 'Schedule Created!',
          icon: 'success',
          iconColor: '#640D14',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          background: '#fff',
          color: '#38040E',
        });
        
        fetchData();
      } else {
        throw new Error("API Response Error");
      }
    } catch (error) {
      // Animasi Gagal
      Swal.fire({
        title: 'Action Failed',
        text: 'Something went wrong, please check your input.',
        icon: 'error',
        confirmButtonColor: '#640D14',
        showClass: {
          popup: 'animate__animated animate__shakeX' // Animasi goyang jika error
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Hapus Jadwal?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#640D14',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    });

    if (result.isConfirmed) {
      try {
        const res = await scheduleApi.delete(id);
        if (res.code === 200) {
          Swal.fire('Terhapus!', 'Jadwal berhasil dihapus.', 'success');
          fetchData();
        }
      } catch (error) {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#38040E]">Class Schedules</h1>
          <p className="text-gray-400 font-medium">Kelola jadwal harian pilates</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#640D14] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#640D14]/20 hover:scale-105 active:scale-95 transition-all"
        >
          + Create Schedule
        </button>
      </div>

      {isLoading && data.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
        </div>
      ) : (
        <motion.div 
          layout // Animasi perpindahan posisi otomatis
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((item: any) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }} // Mulai dari bawah & transparan
              animate={{ opacity: 1, y: 0 }}    // Berakhir di posisi normal
              exit={{ opacity: 0, scale: 0.95 }} // Saat dihapus mengecil
              transition={{ duration: 0.3 }}
            >
              <ClassCard 
                item={item} 
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleOpenEdit(item.id)} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <ClassModal 
            isOpen={isModalOpen} 
            editId={selectedId} // Kirim selectedId sebagai editId ke modal
            onClose={handleCloseModal} 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}