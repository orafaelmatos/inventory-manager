import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await api.post("auth/token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setUser(jwtDecode(res.data.access));
  };

  const register = async (username, password) => {
  // Example: Call your backend API
  const response = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }
};

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
