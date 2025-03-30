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
      const response = await api.post(`/account/login`, { email, password });
  
      if (response.status === 200) {
        const { data } = response;
        const user = data?.data?.user || null;
        const accessToken = data?.data?.access_token; // Ensure backend sends this
  
        if (user && accessToken) {
          const userData = { ...user, token: accessToken }; // ✅ Attach token to user
  
          localStorage.setItem("access_token", accessToken);
          setUser(userData);
  
          console.log("✅ User logged in:", userData);
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
      });
  
      if (response.status === 201) {
        console.log("✅ Registration successful:", response.data.message);
        return response.data; // Return full response data
      } else {
        throw new Error(response.data?.message || "Unexpected response from server");
      }
    } catch (error: any) {
      console.error("❌ Registration Error:", error.response?.data || "Failed to register.");
      
      // Return the full error response instead of throwing an error
      return error.response?.data || { message: "Failed to register", status: "error" };
    }
  };
  
  
  

  // ✅ Logout Function
  const logout = async () => {
    try {
      await api.post(`/account/logout`);
    } catch (error) {
      console.error("❌ Logout failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };
  

  // ✅ Restore Login on Refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log("🔍 Token before request:", token);
  
        if (!token) {
          console.error("🚨 Token is missing! Cannot fetch user data.");
          setUser(null);
          return;
        }
  
        const response = await api.get(`/account/session`, {
          headers: { Authorization: `Token ${token}` } // ✅ Ensure token is sent in header
        });
  
        const { data } = response;
        const user = data?.data?.user || null;
        const accessToken = data?.data?.access_token; 
  
        if (user && accessToken) {
          localStorage.setItem("access_token", accessToken);
          setUser({ ...user, token: accessToken }); // ✅ Ensure `token` is attached to user object
          console.log("✅ User session restored:", { ...user, token: accessToken });
        } else {
          throw new Error("Invalid session response");
        }
      } catch (error) {
        console.error("❌ Failed to restore session:", error);
        setUser(null);
        localStorage.removeItem("access_token"); // ✅ Clear token if session invalid
      }
    };
  
    fetchUser();
  }, []);
  
  

  
  
  

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user && !!user.token,
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

