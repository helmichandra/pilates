// services/coachService.ts
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': 'X-Secret-Key',
      'Authorization': `Bearer ${token}`
    };
  };
  
  export const coachApi = {
    getAll: async (page = 1, search = "", limit = 10) => {
      const res = await fetch(`/api/coaches?page=${page}&limit=${limit}&search=${search}`, { headers: getHeaders() });
      return res.json();
    },
    getById: async (id: number) => {
      const res = await fetch(`/api/coaches/id/${id}`, { headers: getHeaders() });
      return res.json();
    },
    // POST: Create New Coach
    create: async (data: any) => {
      const res = await fetch(`/api/coaches`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    // PUT: Update Coach
    update: async (id: number, data: any) => {
      const res = await fetch(`/api/coaches/id/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    // DELETE: Remove Coach
    delete: async (id: number) => {
      const res = await fetch(`/api/coaches/id/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return res.json();
    }
  };