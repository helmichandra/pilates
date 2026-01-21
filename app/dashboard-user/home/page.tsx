"use client";

import { useEffect, useState } from "react";
import HomePage from "@/components/user/home/home-page";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
interface DecodedToken {
  id: string;
  username: string;
  email: string;
  role: string;
  role_id: string;
  exp: number;
}

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
            router.push('/auth/sign-in');
            return;
        }
    
        try {
          const decoded = jwtDecode<DecodedToken>(storedToken);

          
          // Cek apakah token sudah expired
          if (decoded.exp && decoded.exp < Date.now() / 1000) {
            console.warn('Token has expired');
            localStorage.removeItem('token');
            router.push('/auth/login');
            return;
          }
          const timeout = setTimeout(() => {
            toast.warning("Sesi Anda telah habis. Silakan login kembali.");
            localStorage.removeItem('token');
            setTimeout(() => {
              router.push('/auth/login');
            }, 2000);
          }, 60 * 60 * 1000);
      
          return () => clearTimeout(timeout); 
    
        } catch (error) {
          console.error('Failed to decode token:', error);
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      }, [router]);

  return <HomePage />;
}