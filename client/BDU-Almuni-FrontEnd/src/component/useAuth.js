import { useState, useEffect } from "react";
import AuthService from "./AuthService"; // For refreshing tokens

// Function to fetch and store authentication data
export const fetchAndStoreAuthData = async () => {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let data = await response.json();

    if (response.ok && data.success && data.id) {
      const authData = {
        isAuthenticated: true,
        role: data.role || null,
        userId: data.id,
      };
      localStorage.setItem("authData", JSON.stringify(authData));
      return authData;
    } else {
      // Try refreshing the token if expired
      const refreshed = await AuthService.refreshAccessToken();
      if (refreshed) {
        return await fetchAndStoreAuthData(); // Retry authentication after refresh
      }
      localStorage.removeItem("authData"); // Clear auth data if unsuccessful
      return { isAuthenticated: false, role: null, userId: null };
    }
  } catch (error) {
    console.error("Error during authentication check:", error);
    localStorage.removeItem("authData");
    return { isAuthenticated: false, role: null, userId: null };
  }
};

// Hook to read authentication data from localStorage
const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null,
    userId: null,
  });

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      setAuthState(JSON.parse(storedAuthData));
    }
  }, []);

  return authState; // Returns { isAuthenticated, role, userId }
};

export default useAuth;
