// Helper untuk mendapatkan header
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': 'X-Secret-Key',
      'Authorization': `Bearer ${token}` // Token diambil dari localStorage
    };
  };
  
  export const scheduleApi = {
    getAll: async (page = 1, limit = 10) => {
      const res = await fetch(`/api/pilates/schedules?page=${page}&limit=${limit}`, {
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
  };