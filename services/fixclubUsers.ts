const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    'Content-Type': 'application/json',
    'X-Api-Key': 'X-Secret-Key', // Ganti dengan key asli jika perlu
    'Authorization': `Bearer ${token}`
  };
};

export const adminApi = {
  getUsers: async (page = 1, search = "", limit = 10) => {
    // Menambahkan query search ke dalam URL
    const response = await fetch(`/api/users?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  },
};