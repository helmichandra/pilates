"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordModal({ open, onOpenChange }: any) {
  const [showPass, setShowPass] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none p-8">
        <DialogHeader>
          <div className="w-12 h-12 bg-[#640D14]/10 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="text-[#640D14]" size={24} />
          </div>
          <DialogTitle className="text-2xl font-black text-[#38040E] uppercase tracking-tighter">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6 mt-4">
          <div className="space-y-4">
            {["New Password", "Confirm Password"].map((label, i) => (
              <div key={i} className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:border-[#640D14] focus:ring-[#640D14] px-5 font-bold"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#640D14]">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest">
              Cancel
            </Button>
            <Button className="flex-1 h-14 bg-[#640D14] hover:bg-[#38040E] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#640D14]/20">
              Update Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}