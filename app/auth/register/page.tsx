"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
// Import Select untuk Gender agar user experience lebih baik


export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    date_of_birth: "" // Format: YYYY-MM-DD
  })
  
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  
    if (id === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [id]: numericValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Format date_of_birth ke ISO string sesuai permintaan BE
    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth ? `${formData.date_of_birth}T00:00:00Z` : ""
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Api-Key': 'X-Secret-Key' 
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal melakukan registrasi");
      }

      router.push("/auth/login?status=registered");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF8F8] p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(100,13,20,0.1)] overflow-hidden flex flex-col md:flex-row-reverse min-h-[700px] border border-gray-100"
      >
        
        {/* SISI KANAN */}
        <div className="relative w-full md:w-5/12 min-h-[200px] md:min-h-full overflow-hidden">
          <Image
            src="/media/banner/banner-home.png" 
            alt="Fixclub Atmosphere"
            fill
            className="object-cover scale-110"
            priority
          />            
          <div className="absolute inset-0 bg-gradient-to-tl from-[#640D14]/90 via-[#640D14]/40 to-transparent"></div>
          <div className="absolute top-12 left-12 right-12 text-white hidden md:block">
            <h2 className="text-4xl font-black mb-4 leading-tight">Start Your <br/>Transformation.</h2>
            <p className="text-white/80 font-medium">Bergabunglah dengan komunitas kami dan capai goals Anda.</p>
          </div>
        </div>

        {/* SISI KIRI (Form) */}
        <div className="w-full md:w-7/12 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <Link href="/auth/login" className="inline-flex items-center text-sm font-bold text-[#640D14] mb-8 hover:gap-2 transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#38040E] mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm font-medium">Lengkapi data diri Anda untuk mendaftar</p>
            </div>

            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* First Name & Last Name */}
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">First Name</Label>
                <Input id="first_name" required className="h-12 px-5 bg-gray-50 rounded-xl" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Last Name</Label>
                <Input id="last_name" required className="h-12 px-5 bg-gray-50 rounded-xl" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
              </div>

              {/* Username & Phone */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Username</Label>
                <Input id="username" required className="h-12 px-5 bg-gray-50 rounded-xl" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  required 
                  type="tel" 
                  inputMode="numeric" // Memunculkan numpad di HP
                  className="h-12 px-5 bg-gray-50 rounded-xl focus:ring-[#640D14] focus:border-[#640D14]" 
                  placeholder="0812..." 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Date of Birth</Label>
                <Input id="date_of_birth" required type="date" className="h-12 px-5 bg-gray-50 rounded-xl" value={formData.date_of_birth} onChange={handleChange} />
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</Label>
                <Input id="email" required type="email" className="h-12 px-5 bg-gray-50 rounded-xl" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
              </div>

              {/* Password */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</Label>
                <div className="relative">
                  <Input id="password" required type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-12 px-5 bg-gray-50 rounded-xl" value={formData.password} onChange={handleChange} />
                  <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#640D14]" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="md:col-span-2 text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                  {error}
                </div>
              )}

              <Button type="submit" className="md:col-span-2 h-14 bg-gradient-to-r from-[#640D14] to-[#800E13] text-white text-lg font-bold rounded-2xl shadow-lg mt-4 cursor-pointer" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Now"}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}