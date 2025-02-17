import { useState, useEffect } from "react";
import AuthService from "./AuthService"; // Import AuthService for refreshing tokens

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        let data = await response.json();

        if (response.ok && data.success) {
          setIsAuthenticated(true);
          setRole(data.role || null);
          setUserId(data.id || null);
        } else {
          // Try refreshing the token if expired
          const refreshed = await AuthService.refreshAccessToken();

          if (refreshed) {
            // Recheck authentication after refreshing the token
            response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            data = await response.json();

            if (response.ok && data.success && data.id) {
              setIsAuthenticated(true);
              setRole(data.role || null);
              setUserId(data.id); // Only set if `data.id` is not null
            } else {
              setIsAuthenticated(false);
              setRole(null);
              setUserId(null);
            }
          } else {
            setIsAuthenticated(false);
            setRole(null);
            setUserId(null);
          }
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
