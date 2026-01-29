export const bookingApi = {
    createBooking: async (payload: any) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings`, { // <--- PASTIKAN URL INI BENAR
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      

      return response.json();
    },
  
    getUserBookings: async (userId: number) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings?user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    },
  
    cancelBooking: async (bookingId: number) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings/id/${bookingId}/cancel`, {
        method: "POST", // Mengikuti standar hit cancel biasanya POST/PUT
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    }
  };