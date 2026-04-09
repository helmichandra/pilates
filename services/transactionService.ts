export const transactionService = {
    getTransactions: async (page = 1, limit = 10, search = "") => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/users/transaction?page=${page}&limit=${limit}&search=${search}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "X-Secret-Key",
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!response.ok) throw new Error("Failed to fetch transactions");
        return await response.json();
      } catch (error) {
        console.error(error);
        return { code: 500, data: { data: [] } };
      }
    }
  };