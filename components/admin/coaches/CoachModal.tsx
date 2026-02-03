import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { coachApi } from "@/services/coachService";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function CoachModal({ isOpen, onClose, editId, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "Active" });

  useEffect(() => {
    if (isOpen && editId) {
      const getDetail = async () => {
        setLoading(true);
        try {
          const res = await coachApi.getById(editId);
          if (res.code === 200) setFormData({ name: res.data.name, status: res.data.status });
        } finally { setLoading(false); }
      };
      getDetail();
    } else {
      setFormData({ name: "", status: "Active" });
    }
  }, [isOpen, editId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, created_by: "admin", modified_by: "admin" };

    try {
      const res = editId ? await coachApi.update(editId, payload) : await coachApi.create(payload);
      if (res.code === 200 || res.status === "OK") {
        Swal.fire({ icon: "success", title: "Berhasil!", showConfirmButton: false, timer: 1500 });
        onSuccess();
        onClose();
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan sistem", "error");
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[3rem] p-10 border-none">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-[#38040E] uppercase tracking-tighter">
            {editId ? "Edit Coach" : "New Coach"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Coach</Label>
            <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-14 rounded-2xl bg-gray-50 border-none font-bold px-6" required />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</Label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full h-14 rounded-2xl bg-gray-50 border-none font-bold px-6 outline-none appearance-none">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <Button disabled={loading} className="w-full h-16 bg-[#640D14] hover:bg-[#38040E] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-[#640D14]/20 mt-4">
            {loading ? <Loader2 className="animate-spin" /> : editId ? "Update Data" : "Simpan Coach"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}