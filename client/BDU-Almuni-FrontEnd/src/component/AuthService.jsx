const AuthService = {
  refreshAccessToken: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Access token refreshed.");
      } else {
        console.log("Failed to refresh access token.");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  },

  logout: async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Remove auth data from localStorage
      localStorage.removeItem("authData");

      // // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
};

export default AuthService;
