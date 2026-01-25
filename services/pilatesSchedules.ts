// Helper untuk mendapatkan header
const getHeaders = () => {
  // Pastikan kode berjalan di browser
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("token");

  // Debugging: Buka console browser untuk melihat apakah token ini muncul atau null
  console.log("Current Token:", token);

  const headers: any = {
    "Content-Type": "application/json",
    "X-Api-Key": "X-Secret-Key", // Pastikan key ini sama persis dengan yang di Postman
  };

  if (token && token !== "null" && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const scheduleApi = {
  // UPDATE: Menambahkan parameter filters
  getAll: async (params: { 
    page?: number; 
    limit?: number; 
    date?: string; 
    class_type?: string; 
    class_level?: string; 
    search?: string;
  }) => {
    // Membersihkan parameter kosong agar tidak terkirim ke URL
    const cleanParams: Record<string, string> = {};
    
    // Default values
    cleanParams.page = (params.page || 1).toString();
    cleanParams.limit = (params.limit || 10).toString();
    
    // Optional values (Hanya masukkan jika ada isinya)
    if (params.date) cleanParams.date = params.date;
    if (params.class_type && params.class_type !== "all") cleanParams.class_type = params.class_type;
    if (params.class_level && params.class_level !== "all") cleanParams.class_level = params.class_level;
    if (params.search) cleanParams.search = params.search;

    const queryString = new URLSearchParams(cleanParams).toString();
    
    const res = await fetch(`/api/pilates/schedules?${queryString}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`/api/pilates/schedules/id/${id}`, {
      headers: getHeaders()
    });
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`/api/pilates/schedules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: number, data: any) => {
    const res = await fetch(`/api/pilates/schedules/id/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: number) => {
    const res = await fetch(`/api/pilates/schedules/id/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  }
  
  // ... create, update, delete tetap sama ...
};