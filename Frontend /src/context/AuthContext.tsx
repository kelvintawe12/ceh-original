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

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/account/login`, { email, password });
  
      if (response.status === 200) {
        const { data } = response;
        const user = data?.data?.user || null;
  
        if (user) {
          setUser(user);
        } else {
          throw new Error("Invalid response from server");
        }
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to login.");
    }
  };

  const registerUser = async (userData: RegisterUserData) => {
    try {
      const response = await api.post(`/account/register`, {
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword,
        role: userData.role,
        institution: userData.institution,
      });

      if (response.status === 201) {
        return response.data.message;
      } else {
        throw new Error(response.data?.message || "Unexpected response from server");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to register.");
    }
  };

  const logout = async () => {
    try {
      await api.post(`/account/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/account/profile`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to restore session:", error);
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
        console.error("Not authenticated:", err);
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
