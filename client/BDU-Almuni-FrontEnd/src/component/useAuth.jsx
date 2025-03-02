import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    userId: null,
  });

  const [loading, setLoading] = useState(true); // Track auth loading

  useEffect(() => {
    const initializeAuth = async () => {
      const result = await AuthService.checkAuth();
      setAuth(result);
      setLoading(false); // Mark authentication check as complete
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    await AuthService.logout();
    setAuth({ isAuthenticated: false, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth
export const useAuth = () => useContext(AuthContext);
