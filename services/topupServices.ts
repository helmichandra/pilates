import { jwtDecode } from "jwt-decode";

export const topupApi = {
  postTopup: async (itemId: number | string) => {
    const token = localStorage.getItem("token");
    
    // LOG UNTUK DEBUGGING
    console.log("Token yang dikirim:", token);

    if (!token) throw new Error("Silahkan login kembali (Token tidak ditemukan)");

    const decoded: any = jwtDecode(token);
    const userName = decoded.name || decoded.username || "User";

    const response = await fetch(`/api/users/transaction/topup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'X-Secret-Key',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        item_id: itemId,
        created_by: userName,
        modified_by: userName
      })
    });

    const result = await response.json();

    // Validasi ketat status code 401 sesuai gambar Network Anda
    if (!response.ok || result.code === 401 || response.status === 401) {
      throw new Error(result.status || result.message || "Unauthorized: Sesi berakhir");
    }

    return result;
  }
};