import React, { useEffect, useState, createContext, useContext } from "react";
import api from "../utils/axiosConfig";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  institution: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  registerUser: (userData: RegisterUserData) => Promise<void>;
};

type RegisterUserData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  institution: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Login Function
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/account/login`, { email, password }); // ✅ Use api instead of axios
  
      if (response.status === 200) {
        const { data } = response;
        const user = data?.data?.user || null;
  
        if (user) {
          setUser(user); // ✅ Set user state
        } else {
          throw new Error("Invalid response from server");
        }
      }
    } catch (error: any) {
      console.error("❌ Login Error:", error.response?.data?.message || "Failed to login.");
      throw new Error(error.response?.data?.message || "Failed to login.");
    }
  };

  // ✅ Register Function
  const registerUser = async (userData: RegisterUserData) => {
    try {
      const response = await api.post(`/account/register`, {
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword,
        role: userData.role,
        institution: userData.institution,
      }); // ✅ Use api instead of axios

      if (response.status === 201) {
        console.log("✅ Registration successful:", response.data.message);
        return response.data.message;
      } else {
        throw new Error(response.data?.message || "Unexpected response from server");
      }
    } catch (error: any) {
      console.error("❌ Registration Error:", error.response?.data?.message || "Failed to register.");
      throw new Error(error.response?.data?.message || "Failed to register.");
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await api.post(`/account/logout`); // ✅ Use api instead of axios
      setUser(null);
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  // ✅ Restore Login on Refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/account/profile`); // ✅ Fetch user from API
        setUser(response.data);
      } catch (error) {
        console.error("❌ Failed to restore session:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/account/session");
        setUser(response.data.user);
      } catch (err) {
        console.error("🚨 Not authenticated:", err);
        setUser(null);
      }
    };
  
    checkAuthStatus();
  }, []);
  

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      registerUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
