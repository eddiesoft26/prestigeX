import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user info
  const [jwt, setJwt] = useState(null); // token
  const [loading, setLoading] = useState(true); // for checking persistent login

  // Load JWT and user info from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setJwt(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // done checking
  }, []);


  // Inside AuthProvider...
  const register = async (formData) => {
    try {
      // Cleaner URL: just the endpoint suffix
      const res = await api.post("/auth/register", formData);
      const { token, user } = res.data;

      setJwt(token);
      setUser(user);
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, user } = res.data;

      setJwt(token);
      setUser(user);
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    setJwt(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => !!jwt;

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        register,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
