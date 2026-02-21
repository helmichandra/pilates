import { jwtDecode } from 'jwt-decode';

export const packageService = {

    getPackages: async (page = 1, search = "", limit = 10) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/item_topup/masters?page=${page}&search=${search}&limit=${limit}`, {
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "X-Secret-Key",
              "Authorization": `Bearer ${token}`
            }
          });
      
          // Validasi apakah response beneran JSON/OK
          if (!response.ok) {
            const text = await response.text(); // Baca sebagai teks dulu untuk debug
            console.error("Server Error Response:", text);
            throw new Error(`Server returned ${response.status}`);
          }
      
          return await response.json();
        } catch (error) {
          console.error("Fetch Error:", error);
          // Kembalikan struktur kosong agar UI PackagesPage tidak crash
          return { code: 500, status: "Error", data: { data: [] } };
        }
      },

  // Get Detail by ID
  getPackageById: async (item_topup_id: string | number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/item_topup/masters/id/${item_topup_id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key", // Gunakan Key yang sama dengan getPackages
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Gagal mengambil detail");
      return await response.json();
    } catch (error) {
      console.error(error);
      return { code: 500, data: null };
    }
  },

  // Create New Package
  createPackage: async (packageData: any) => {
    const token = localStorage.getItem("token");
    
    // Decode token untuk mendapatkan nama admin secara dinamis
    let adminName = "admin";
    try {
      if (token) {
        const decoded: any = jwtDecode(token);
        adminName = decoded.name || decoded.username || "admin";
      }
    } catch (e) {
      console.error("Token decode error", e);
    }

    const body = {
      ...packageData,
      amount: Number(packageData.amount), // Pastikan numeric
      created_by: adminName
    };

    const response = await fetch('/api/item_topup/masters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "X-Secret-Key",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },

  // Update Package
  updatePackage: async (item_topup_id: string | number, packageData: any) => {
    const token = localStorage.getItem("token");
    
    let adminName = "admin";
    try {
      if (token) {
        const decoded: any = jwtDecode(token);
        adminName = decoded.name || decoded.username || "admin";
      }
    } catch (e) { /* fallback to admin */ }

    const body = {
      ...packageData,
      amount: Number(packageData.amount),
      created_by: adminName
    };

    const response = await fetch(`/api/item_topup/masters/id/${item_topup_id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "X-Secret-Key",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },
};