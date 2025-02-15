import { useState, useEffect } from "react";

const AuthService = {
  useAuth: () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            setIsAuthenticated(true);
            setRole(data.role || null);
          } else {
            // Try refreshing the token
            await AuthService.refreshAccessToken();
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
          setIsAuthenticated(false);
          setRole(null);
        }
      };

      checkAuth();
    }, []);

    return { isAuthenticated, role };
  },

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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
};

export default AuthService;
