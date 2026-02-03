"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userApi } from "@/services/userServices";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePasswordModal({ open, onOpenChange }: any) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      return toast.error("Konfirmasi password tidak cocok!");
    }

    setLoading(true);
    try {
      const res = await userApi.changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password
      });

      if (res.code === 200) {
        toast.success("Password berhasil diperbarui!");
        setFormData({ old_password: "", new_password: "", confirm_password: "" });
        onOpenChange(false);
      } else {
        toast.error(res.message || "Gagal mengganti password");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan pada koneksi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none p-0 overflow-hidden bg-white">
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8"
            >
              <DialogHeader>
                <motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-12 h-12 bg-[#640D14]/10 rounded-2xl flex items-center justify-center mb-4"
                >
                  <Lock className="text-[#640D14]" size={24} />
                </motion.div>
                <DialogTitle className="text-2xl font-black text-[#38040E] uppercase tracking-tighter">
                  Change Password
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div className="space-y-4">
                  {/* Old Password */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Old Password</Label>
                    <Input
                      required
                      type="password"
                      value={formData.old_password}
                      onChange={(e) => setFormData({...formData, old_password: e.target.value})}
                      className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:border-[#640D14] focus:ring-[#640D14] px-5 font-bold"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</Label>
                    <div className="relative">
                      <Input
                        required
                        type={showPass ? "text" : "password"}
                        value={formData.new_password}
                        onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:border-[#640D14] focus:ring-[#640D14] px-5 font-bold"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPass(!showPass)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#640D14] transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</Label>
                    <Input
                      required
                      type={showPass ? "text" : "password"}
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                      className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:border-[#640D14] focus:ring-[#640D14] px-5 font-bold"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => onOpenChange(false)} 
                    className="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={loading}
                    className="flex-1 h-14 bg-[#640D14] hover:bg-[#38040E] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#640D14]/20 transition-all active:scale-95"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}