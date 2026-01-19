"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from "lucide-react"

interface TokenData {
  id: string;
  username: string;
  email: string;
  role: string;
  exp: number;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // ... (fungsi decodeToken, storeToken, dan handleLogin tetap sama seperti kode Anda)
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
      const userData = { id: decodedToken.id, username: decodedToken.username, email: decodedToken.email, role: decodedToken.role };
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
        storeToken(result.data.token);
        router.push("/dashboard-user/home");
      } else {
        throw new Error("Token not received");
      }
    } catch (err) {
      setError("Gagal login. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Wrapper Utama dengan background abu-abu muda halus
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] p-4 md:p-8">
      
      {/* Container Putih Utama (Card Besar) */}
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* SISI KIRI: Gambar (Hidden di mobile jika mau, atau tetap ada) */}
        <div className="relative w-full md:w-5/12 min-h-[300px] md:min-h-full">
          <Image
                src="/media/banner/banner-home.png" 
                alt="Team Meeting"
            fill
            className="object-cover"
            priority
          />

            
            {/* Gradient Overlay - Blue tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/70 via-gray-500/60 to-black-600/70"></div>
            
            {/* Bottom Blur Gradient - Fades to background color */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-gray-50"></div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="w-full md:w-7/12 flex flex-col items-center justify-center p-8 md:p-16 bg-white">
          
          {/* Logo Brand */}
          <div className="mb-10">
          <div className="flex-shrink-0">
            <span className="text-2xl font-black text-gray-900">Fixclub.</span>
          </div>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-center text-[#0f172a] mb-8">
              Masuk akun anda
            </h1>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-semibold">Email</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Username/Email" 
                  className="h-12 border-gray-200 focus:ring-[#049c94]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" title="Kata Sandi" className="font-semibold">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Kata Sandi"
                    className="h-12 pr-10 border-gray-200 focus:ring-[#049c94]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#0a1629] hover:bg-[#15233d] text-white text-lg font-semibold rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}