// Helper untuk mendapatkan header
const getHeaders = () => {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("token");

  const headers: any = {
    "Content-Type": "application/json",
    "X-Api-Key": "X-Secret-Key",
  };

  if (token && token !== "null" && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const scheduleApi = {
  getAll: async (params: { 
    page?: number; 
    limit?: number; 
    date?: string; 
    class_type?: string; 
    class_level?: string; 
    search?: string;
  }) => {
    const cleanParams: Record<string, string> = {};
    
    cleanParams.page = (params.page || 1).toString();
    cleanParams.limit = (params.limit || 10).toString();
    
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

  // Tambahkan Bulk Create
  createBulk: async (data: any[]) => {
    const res = await fetch(`/api/pilates/schedules/bulk`, {
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

  // Tambahkan Bulk Update
  updateBulk: async (data: any[]) => {
    const res = await fetch(`/api/pilates/schedules/bulk`, {
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