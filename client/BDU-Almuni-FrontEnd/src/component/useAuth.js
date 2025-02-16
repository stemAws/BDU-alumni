import { useState, useEffect } from "react";
import AuthService from "../services/AuthService"; // Import AuthService for refreshing tokens

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

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
          setUserId(data.id || null);
        } else {
          // Try refreshing the token if expired
          await AuthService.refreshAccessToken();
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
        setRole(null);
        setUserId(null);
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated, role, userId };
};

export default useAuth;
