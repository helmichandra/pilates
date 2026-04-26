"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scheduleApi } from '@/services/pilatesSchedules';

export default function ClassModal({ isOpen, onClose, onSubmit, isLoading, editId }: any) {
  const [classes, setClasses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  const [form, setForm] = useState({
    pilates_master_id: "",
    coach_id: "",
    class_type: "Reformer",
    class_level: "Beginner",
    class_room: "Pilates Room", // Default sudah terkunci
    credit_required: 1,
    duration_minutes: 0,
    startDate: "",
    endDate: "",
    start_time: "",
    end_time: "",
    quota: 10
  });

  // 1. Fetch Dependencies & Detail Data
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      setFetchingData(true);
      
      const token = localStorage.getItem("token");
      const headers = { 
        'Authorization': `Bearer ${token}`, 
        'X-Api-Key': 'X-Secret-Key',
        'Content-Type': 'application/json'
      };
      
      try {
        const [resClasses, resCoaches] = await Promise.all([
          fetch('/api/pilates/masters/all', { headers }),
          fetch('/api/coaches/all', { headers })
        ]);
        
        const dataClasses = await resClasses.json();
        const dataCoaches = await resCoaches.json();
        
        if (dataClasses.code === 200) setClasses(dataClasses.data);
        if (dataCoaches.code === 200) setCoaches(dataCoaches.data);

        if (editId) {
          const resDetail = await scheduleApi.getById(editId);
          if (resDetail.code === 200) {
            const d = resDetail.data;
            const formattedDate = d.date.split('T')[0];
            
            setForm({
              pilates_master_id: d.pilates_master_id.toString(),
              coach_id: d.coach_id.toString(),
              class_type: d.class_type,
              class_level: d.class_level,
              class_room: d.class_room || "Pilates Room", // Fallback ke default
              credit_required: d.credit_required,
              duration_minutes: d.duration_minutes,
              startDate: formattedDate,
              endDate: formattedDate,
              start_time: d.start_time.split('T')[1].substring(0, 5),
              end_time: d.end_time.split('T')[1].substring(0, 5),
              quota: d.quota
            });
          }
        } else {
          // Reset form untuk Create New
          setForm({
            pilates_master_id: "",
            coach_id: "",
            class_type: "Reformer",
            class_level: "Beginner",
            class_room: "Pilates Room",
            credit_required: 1,
            duration_minutes: 0,
            startDate: "",
            endDate: "",
            start_time: "",
            end_time: "",
            quota: 10
          });
        }
      } catch (error) {
        console.error("Error fetching modal dependencies:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [isOpen, editId]);

  // 2. Hitung Durasi Otomatis
  useEffect(() => {
    if (form.start_time && form.end_time) {
      const [sh, sm] = form.start_time.split(':').map(Number);
      const [eh, em] = form.end_time.split(':').map(Number);
      let diff = (eh * 60 + em) - (sh * 60 + sm);
      if (diff < 0) diff += 1440; 
      setForm(prev => ({ ...prev, duration_minutes: diff }));
    }
  }, [form.start_time, form.end_time]);

  // 3. Submit Handler
  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    
    const start = new Date(form.startDate);
    const end = form.endDate ? new Date(form.endDate) : start;

    if (end > start) {
      const bulkData = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split('T')[0];
        bulkData.push({
          pilates_master_id: Number(form.pilates_master_id),
          coach_id: Number(form.coach_id),
          class_type: form.class_type,
          class_level: form.class_level,
          class_room: form.class_room,
          credit_required: form.credit_required,
          duration_minutes: form.duration_minutes,
          date: `${dateStr}T00:00:00Z`,
          start_time: `${dateStr}T${form.start_time}:00Z`,
          end_time: `${dateStr}T${form.end_time}:00Z`,
          quota: form.quota,
          created_by: "admin"
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      onSubmit(bulkData);
    } else {
      const singleData = {
        pilates_master_id: Number(form.pilates_master_id),
        coach_id: Number(form.coach_id),
        class_type: form.class_type,
        class_level: form.class_level,
        class_room: form.class_room,
        credit_required: form.credit_required,
        duration_minutes: form.duration_minutes,
        date: `${form.startDate}T00:00:00Z`,
        start_time: `${form.startDate}T${form.start_time}:00Z`,
        end_time: `${form.startDate}T${form.end_time}:00Z`,
        quota: form.quota,
        created_by: "admin"
      };
      onSubmit(singleData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#38040E]/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              {fetchingData ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-[#640D14]" />
                  <p className="font-bold text-gray-400">Syncing data...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-[#38040E]">
                        {editId ? "EDIT SCHEDULE" : "NEW SCHEDULE"}
                      </h2>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pilates Management System</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitInternal} className="grid grid-cols-2 gap-5">
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Pilates Class</label>
                      <select required className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#640D14]" value={form.pilates_master_id} onChange={(e) => setForm({...form, pilates_master_id: e.target.value})}>
                        <option value="">-- Choose Master --</option>
                        {classes.map((m: any) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Coach</label>
                      <select required className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={form.coach_id} onChange={(e) => setForm({...form, coach_id: e.target.value})}>
                        <option value="">-- Choose Coach --</option>
                        {coaches.map((m: any) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Class Level</label>
                      <select className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={form.class_level} onChange={(e) => setForm({...form, class_level: e.target.value})}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">From Date</label>
                      <input required type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">To Date (Bulk)</label>
                      <input type="date" min={form.startDate} value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Time</label>
                      <input required type="time" value={form.start_time} onChange={(e) => setForm({...form, start_time: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Time</label>
                      <input required type="time" value={form.end_time} onChange={(e) => setForm({...form, end_time: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quota</label>
                      <input required type="number" value={form.quota} onChange={(e) => setForm({...form, quota: parseInt(e.target.value)})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Credit Required</label>
                      <input required type="number" value={form.credit_required} onChange={(e) => setForm({...form, credit_required: parseInt(e.target.value)})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    {/* Room Name - Disabled & Default */}
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Room Name</label>
                      <input 
                        disabled 
                        value={form.class_room} 
                        className="w-full h-14 px-5 bg-gray-100 border border-gray-200 rounded-2xl outline-none text-gray-400 font-bold cursor-not-allowed shadow-inner" 
                      />
                    </div>

                    <div className="col-span-2 py-3 px-5 bg-[#640D14]/5 rounded-2xl border border-[#640D14]/10 flex justify-between items-center">
                       <span className="text-[10px] font-black text-[#640D14] uppercase tracking-widest">Calculated Duration</span>
                       <span className="text-sm font-black text-[#640D14]">{form.duration_minutes} Minutes</span>
                    </div>

                    <div className="col-span-2 mt-4">
                      <button 
                        type="submit" 
                        disabled={isLoading || form.duration_minutes <= 0} 
                        className="w-full h-16 bg-[#640D14] text-white font-bold rounded-[1.5rem] shadow-xl hover:shadow-[#640D14]/30 hover:bg-[#4d0a0f] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : editId ? "UPDATE CHANGES" : "SAVE SCHEDULE"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}