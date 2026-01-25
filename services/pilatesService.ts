// Helper untuk mendapatkan header
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': 'X-Secret-Key',
      'Authorization': `Bearer ${token}` // Token diambil dari localStorage
    };
  };
  
  export const pilatesApi = {
    // Menampilkan semua data (GET)
    getAll: async (page = 1, limit = 10) => {
      // Akan di-rewrite ke: ${base}/pilates/masters?page=1&limit=10
      const response = await fetch(`/api/pilates/masters?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    },
  
    // Menambah data (POST)
    create: async (data: any) => {
      // Akan di-rewrite ke: ${base}/pilates/masters
      const response = await fetch(`/api/pilates/masters`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return response.json();
    },
  
    // Update data (PUT)
    update: async (id: number, data: any) => {
      // Akan di-rewrite ke: ${base}/pilates/masters/id/${id}
      const response = await fetch(`/api/pilates/masters/id/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return response.json();
    },
  
    // Delete data (DELETE)
    delete: async (id: number) => {
      // Akan di-rewrite ke: ${base}/pilates/masters/id/${id}
      const response = await fetch(`/api/pilates/masters/id/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return response.json();
    }
  };