"use client"
import { useEffect, useState } from 'react';
import { scheduleApi } from '@/services/pilatesSchedules';
import { ClassCard } from '@/components/admin/classes/classcard';
import ClassModal from '@/components/admin/classes/classmodal';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react'; // Tambahkan Search icon
import Swal from 'sweetalert2';
import { useDebounce } from "use-debounce";

export default function SchedulePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 1. Tambahkan state untuk parameter pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500); // Tunggu 500ms setelah user mengetik

  // 2. Update fetchData untuk menerima parameter
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Masukkan parameter sesuai dengan definisi getAll di service Anda
      const res = await scheduleApi.getAll({
        search: searchQuery,
        page: 1,
        limit: 10
      });
      
      if (res.code === 200) {
        setData(res.data?.data || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Trigger fetch saat debouncedSearch berubah
  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  const handleOpenEdit = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedId(null);
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
      Swal.fire({
        title: 'Action Failed',
        text: 'Something went wrong, please check your input.',
        icon: 'error',
        confirmButtonColor: '#640D14',
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#38040E]">Class Schedules</h1>
          <p className="text-gray-400 font-medium">Kelola jadwal harian pilates</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* 4. Input Search UI */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#640D14] transition-all"
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#640D14] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-[#640D14]/20 hover:scale-105 active:scale-95 transition-all"
          >
            + Create Schedule
          </button>
        </div>
      </div>

      {isLoading && data.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
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
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No schedules found</p>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <ClassModal 
            isOpen={isModalOpen} 
            editId={selectedId}
            onClose={handleCloseModal} 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}