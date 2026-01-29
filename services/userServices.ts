export const userApi = {
    getMyCredit: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/users/credits/my_credit', {
        headers: { 
            "Content-Type": "application/json",
            "X-Api-Key": "X-Secret-Key",
            "Authorization": `Bearer ${token}` }
      });
      return response.json();
    },
    
    getUpcomingBookings: async (userId: string) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings?user_id=${userId}`, {
        headers: { 
            "Content-Type": "application/json",
            "X-Api-Key": "X-Secret-Key",
            "Authorization": `Bearer ${token}` }
      });
      return response.json();
    },
    getProfile: async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/users/profile', {
            headers: { 
              "Content-Type": "application/json",
              "X-Api-Key": "X-Secret-Key",
              "Authorization": `Bearer ${token}` }
        });
        return response.json();
      }
  };