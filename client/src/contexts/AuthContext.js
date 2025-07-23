import { createContext, useState, useEffect, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("skillhub-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
        localStorage.removeItem("skillhub-user");
      }
    }
    setInitialized(true);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("skillhub-user", JSON.stringify(userData));
    localStorage.setItem("skillhub-token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillhub-user");
    localStorage.removeItem("skillhub-token");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  if (!initialized) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
