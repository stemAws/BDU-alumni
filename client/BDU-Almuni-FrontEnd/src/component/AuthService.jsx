const AuthService = {
  checkAuth: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      const data = await response.json();
      return { isAuthenticated: true, role: data.role, userId: data.id };
    } catch (error) {
      console.warn("Auth check failed, attempting token refresh...");
      const refreshed = await AuthService.refreshAccessToken();
      return refreshed
        ? await AuthService.checkAuth()
        : { isAuthenticated: false, role: null, userId: null };
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/refresh-token`,
        { method: "POST", credentials: "include" }
      );

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
};

export default AuthService;
