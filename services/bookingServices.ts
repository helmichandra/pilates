export const bookingApi = {
  getAllBookings: async (page = 1, search = "", limit = 10) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/bookings?page=${page}&search=${search}&limit=${limit}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "X-Secret-Key", // Ganti dengan key asli Anda
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.data?.error || result.status || "Failed to fetch bookings");
      }

      return result;
    } catch (error: any) {
      console.error("Booking Service Error:", error);
      throw error;
    }
  },

  createBooking: async (payload: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.data?.error || "Failed to create booking");
      
      return result;
    } catch (error: any) {
      throw error;
    }
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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings/id/${bookingId}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "X-Secret-Key",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.data?.error || "Failed to cancel booking");

      return result;
    } catch (error: any) {
      throw error;
    }
  }
};