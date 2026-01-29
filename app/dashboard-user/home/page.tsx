"use client";

import { useEffect, useState } from "react";
import HomePage from "@/components/user/home/home-page";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner'; 
import { useRouter } from "next/navigation";
import { userApi } from "@/services/userServices"; 

interface DecodedToken {
  id: string;
  username: string;
  exp: number;
}

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({ fullName: "User", reformer: 0 });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      router.push('/auth/sign-in');
      return;
    }

    const fetchData = async () => {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        
        // Proteksi Token Expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        // Menggunakan Service untuk Fetch Data
        // Promise.all menjalankan kedua API secara paralel agar lebih cepat
        const [creditRes, bookingRes] = await Promise.all([
          userApi.getMyCredit(),
          userApi.getUpcomingBookings(decoded.id)
        ]);

        // Set Data Credit & Nama
        if (creditRes.code === 200) {
          setUserData({
            fullName: creditRes.data.full_name,
            reformer: creditRes.data.credit
          });
        }

        // Set Data Booking (Hanya yang berstatus 'Booked')
        if (bookingRes.code === 200 && bookingRes.data?.data) {
          const bookedOnly = bookingRes.data.data.filter(
            (b: any) => b.status === "Booked"
          );
          setUpcomingBookings(bookedOnly);
        }

      } catch (error) {
        console.error("Home Data Error:", error);
        toast.error("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Timer peringatan sesi (Opsional)
    const timeout = setTimeout(() => {
      toast.warning("Sesi Anda hampir habis, harap simpan aktivitas Anda.");
    }, 55 * 60 * 1000); // 55 menit
      
    return () => clearTimeout(timeout);

  }, [router]);

  return (
    <HomePage 
      userName={userData.fullName} 
      reformerCount={userData.reformer}
      upcomingSessions={upcomingBookings}
      isLoading={loading}
    />
  );
}