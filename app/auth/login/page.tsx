"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, CheckCircle2, Loader2 } from "lucide-react" // Tambah ikon
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion" // Tambah AnimatePresence

interface TokenData {
  id: string;
  username: string;
  email: string;
  role: string;
  role_id: string; // Tambahkan ini
  exp: number;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false) // State baru untuk sukses
  const router = useRouter()

  const decodeToken = (token: string): TokenData | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
  };

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      const userData = { 
        id: decodedToken.id, 
        username: decodedToken.username, 
        email: decodedToken.email, 
        role: decodedToken.role,
        role_id: decodedToken.role_id // Simpan role_id ke localStorage
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': 'X-Secret-Key' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      
      if (result.data?.token) {
        const token = result.data.token;
        storeToken(token);
        
        // Decode token untuk mendapatkan role
        const decoded = decodeToken(token);
        setIsSuccess(true);
        
        // Tentukan rute berdasarkan role_id atau role
        // Jika role_id "1" atau role "Admin", arahkan ke dashboard-admin
        const targetRoute = (decoded?.role_id === "1" || decoded?.role === "Admin")
          ? "/dashboard-admin/home"
          : "/dashboard-user/home";
  
        // Delay 1.5 detik untuk animasi sukses
        setTimeout(() => {
          router.push(targetRoute);
        }, 1500);
        
      } else {
        throw new Error("Token not received");
      }
    } catch (err) {
      setError("Gagal login. Silakan cek kembali kredensial Anda.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF8F8] p-4 md:p-8 relative overflow-hidden">
      
      {/* ANIMASI OVERLAY SUKSES */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#640D14] to-[#38040E] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white/10 p-6 rounded-full mb-6 backdrop-blur-md">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-2">Login Successful!</h2>
              <p className="text-white/60 font-medium">Redirecting to your dashboard...</p>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-1 bg-white/30 w-48 mt-8 rounded-full overflow-hidden"
              >
                <div className="h-full bg-white w-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Container Utama */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isSuccess ? 0 : 1, y: isSuccess ? -20 : 0 }} // Menghilang saat sukses
        className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(100,13,20,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[650px] border border-gray-100"
      >
        
        {/* SISI KIRI: Banner Visual */}
        <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-full overflow-hidden">
          <Image
            src="/media/banner/banner-home.png" 
            alt="Fixclub Atmosphere"
            fill
            className="object-cover scale-110"
            priority
          />            
          <div className="absolute inset-0 bg-gradient-to-tr from-[#640D14]/90 via-[#640D14]/40 to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white hidden md:block">
            <h2 className="text-4xl font-black mb-4 leading-tight">Elevate Your <br/>Pilates Journey.</h2>
            <p className="text-white/80 font-medium">Join the most exclusive studio experience in the city.</p>
          </div>
        </div>

        {/* SISI KANAN: Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative">
          
          <div className="mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-20 h-20 md:w-24 md:h-24 mx-auto"
            >
              <Image
                src="/media/logo.jpeg" 
                alt="Fixclub Logo"
                fill
                className="object-contain rounded-2xl shadow-sm border border-gray-50"
                priority
              />
            </motion.div>
            <div className="mt-3 text-center">
              <span className="text-xl font-black tracking-tighter text-[#38040E]">
                FIXCLUB<span className="text-[#640D14]">.</span>
              </span>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-[#38040E] mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-sm font-medium">Silakan masuk ke akun Anda</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email / Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  required
                  placeholder="Enter your email" 
                  className="h-14 px-5 bg-gray-50 border-gray-100 rounded-2xl focus:ring-[#640D14] focus:border-[#640D14] transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" title="Kata Sandi" className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</Label>
                  <Link href="#" className="text-[11px] font-bold text-[#640D14] hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="h-14 px-5 bg-gray-50 border-gray-100 rounded-2xl focus:ring-[#640D14] focus:border-[#640D14] transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#640D14] transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                  {error}
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-[#640D14] to-[#800E13] hover:opacity-90 text-white text-lg font-bold rounded-2xl transition-all shadow-lg shadow-[#640D14]/20 active:scale-[0.98] cursor-pointer"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </div>
                ) : "Sign In"}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-4">Belum punya akun?</p>
              <Link href="/auth/register">
                <Button 
                  variant="outline" 
                  className="w-full h-14 border-2 border-[#640D14] text-[#640D14] font-bold rounded-2xl hover:bg-[#640D14] hover:text-white transition-all group cursor-pointer"
                >
                  Create New Account
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}