import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    userId: null,
  });

  // Check authentication on page load
  useEffect(() => {
    const initializeAuth = async () => {
      const result = await AuthService.checkAuth();
      setAuth(result);
    };

    initializeAuth();
  }, []);

  // Logout handler
  const logout = async () => {
    await AuthService.logout();
    setAuth({ isAuthenticated: false, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth
export const useAuth = () => useContext(AuthContext);
