"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2} from 'lucide-react';
import { useState, useEffect } from 'react';
import { scheduleApi } from '@/services/pilatesSchedules';

export default function ClassModal({ isOpen, onClose, onSubmit, isLoading, editId }: any) {
  const [classes, setClasses] = useState([]);
  const [coaches, setCoachess] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  const [form, setForm] = useState({
    pilates_master_id: "",
    coach_id: "",
    class_type: "Reformer",
    class_level: "Beginner",
    class_room: "",
    credit_required: 1,
    duration_minutes: 0,
    date: "",
    start_time: "",
    end_time: "",
    quota: 10
  });

  // 1. Fetch Dependencies & Detail Data
  useEffect(() => {
    const fetchDependencies = async () => {
      if (!isOpen) return;
      setFetchingData(true);
      const token = localStorage.getItem("token");
      const headers = { 'Authorization': `Bearer ${token}`, 'X-Api-Key': 'X-Secret-Key' };
      
      try {
        const [resClasses, resCoaches] = await Promise.all([
          fetch('/api/pilates/masters/all', { headers }),
          fetch('/api/coaches/all', { headers })
        ]);
        
        const dataClasses = await resClasses.json();
        const dataCoaches = await resCoaches.json();
        
        if (dataClasses.code === 200) setClasses(dataClasses.data);
        if (dataCoaches.code === 200) setCoachess(dataCoaches.data);

        if (editId) {
          const resDetail = await scheduleApi.getById(editId);
          if (resDetail.code === 200) {
            const d = resDetail.data;
            setForm({
              pilates_master_id: d.pilates_master_id.toString(),
              coach_id: d.coach_id.toString(),
              class_type: d.class_type,
              class_level: d.class_level,
              class_room: d.class_room,
              credit_required: d.credit_required,
              duration_minutes: d.duration_minutes,
              date: d.date.split('T')[0],
              start_time: d.start_time.split('T')[1].substring(0, 5),
              end_time: d.end_time.split('T')[1].substring(0, 5),
              quota: d.quota
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchDependencies();
  }, [isOpen, editId]);

  // 2. Logika Hitung Durasi
  useEffect(() => {
    if (form.start_time && form.end_time) {
      const [sh, sm] = form.start_time.split(':').map(Number);
      const [eh, em] = form.end_time.split(':').map(Number);
      let diff = (eh * 60 + em) - (sh * 60 + sm);
      if (diff < 0) diff += 1440;
      setForm(prev => ({ ...prev, duration_minutes: diff }));
    }
  }, [form.start_time, form.end_time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...form,
      pilates_master_id: Number(form.pilates_master_id),
      coach_id: Number(form.coach_id),
      date: `${form.date}T00:00:00Z`,
      start_time: `${form.date}T${form.start_time}:00Z`,
      end_time: `${form.date}T${form.end_time}:00Z`,
      created_by: "admin"
    };
    onSubmit(formattedData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#38040E]/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                    <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                    {/* Master Class */}
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Pilates Class</label>
                      <select required className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#640D14]" value={form.pilates_master_id} onChange={(e) => setForm({...form, pilates_master_id: e.target.value})}>
                        <option value="">-- Choose Master --</option>
                        {classes.map((m: any) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                      </select>
                    </div>

                    {/* Coach & Level */}
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

                    {/* Date & Quota */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Session Date</label>
                      <input required type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quota</label>
                      <input required type="number" value={form.quota} onChange={(e) => setForm({...form, quota: parseInt(e.target.value)})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    {/* Start & End Time */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Time</label>
                      <input required type="time" value={form.start_time} onChange={(e) => setForm({...form, start_time: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Time</label>
                      <input required type="time" value={form.end_time} onChange={(e) => setForm({...form, end_time: e.target.value})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    {/* Credits & Room */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Credit Required</label>
                      <input required type="number" value={form.credit_required} onChange={(e) => setForm({...form, credit_required: parseInt(e.target.value)})} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Room Name</label>
                      <input required value={form.class_room} onChange={(e) => setForm({...form, class_room: e.target.value})} placeholder="Room A" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none"/>
                    </div>

                    {/* Duration Info */}
                    <div className="col-span-2 py-3 px-5 bg-[#640D14]/5 rounded-2xl border border-[#640D14]/10 flex justify-between items-center">
                       <span className="text-[10px] font-black text-[#640D14] uppercase tracking-widest">Calculated Duration</span>
                       <span className="text-sm font-black text-[#640D14]">{form.duration_minutes} Minutes</span>
                    </div>

                    <div className="col-span-2 mt-4">
                      <button 
                        type="submit" 
                        disabled={isLoading || form.duration_minutes <= 0} 
                        className="w-full h-16 bg-[#640D14] text-white font-bold rounded-[1.5rem] shadow-xl hover:shadow-[#640D14]/30 hover:bg-[#4d0a0f] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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