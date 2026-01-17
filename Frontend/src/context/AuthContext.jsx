import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("isProfileComplete");

    if (storedToken) {
      setToken(storedToken);
      setIsProfileComplete(storedProfile === "true");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        if (e.newValue) {
          setToken(e.newValue);
          const profile = localStorage.getItem("isProfileComplete");
          setIsProfileComplete(profile === "true");
        } else {
          setToken(null);
          setIsProfileComplete(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  const login = (jwtToken, profileStatus) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("isProfileComplete", profileStatus);
    setToken(jwtToken);
    setIsProfileComplete(profileStatus);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setIsProfileComplete(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isProfileComplete, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);