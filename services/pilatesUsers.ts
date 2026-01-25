const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': 'X-Secret-Key',
      'Authorization': `Bearer ${token}` // Token diambil dari localStorage
    };
  };
// services/userService.ts
export const userApi = {
    getUsers: async (page = 1, search = "", limit = 10) => {
        const response = await fetch(`/api/users?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: getHeaders(),
          });
          return response.json();
        },
  };