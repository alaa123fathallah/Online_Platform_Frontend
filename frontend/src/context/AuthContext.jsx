import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);

        const role =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        setToken(storedToken);
        setUser({
          id:
            decoded.sub ||
            decoded.nameid ||
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          email:
            decoded.email ||
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          role,
        });
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // 🔐 Login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);

    const decoded = jwtDecode(newToken);

    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    setToken(newToken);
    setUser({
      id:
        decoded.sub ||
        decoded.nameid ||
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      email:
        decoded.email ||
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role,
    });
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role: user?.role || null,
        loading,
        isAuthenticated: !!token, // ✅ FIXED
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
