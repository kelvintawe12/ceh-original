import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

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
      const response = await axios.post(`${API_URL}/account/login`, { email, password });

      console.log("Full Login Response:", response);
      console.log("Response Data:", response.data);

      if (response.status === 200) {
        const { data } = response; 
        console.log("Data Object:", data);

        if (data && data.data) {
            const user = data.data?.user || null;
            const accessToken = data.data?.access_token || null;
            const refreshToken = data.data?.refresh_token || null;

            console.log("Extracted User:", user);
            console.log("Extracted Access Token:", accessToken);
            console.log("Extracted Refresh Token:", refreshToken);


            if (user && accessToken && refreshToken) {
              try {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            
                console.log("🔹 User stored:", localStorage.getItem("user"));
                console.log("🔹 Access Token stored:", localStorage.getItem("accessToken"));
                console.log("🔹 Refresh Token stored:", localStorage.getItem("refreshToken"));
            
                setUser(user);
              } catch (error) {
                console.error("❌ Error saving to localStorage:", error);
              }
            } else {
              console.error("❌ Missing user, access token, or refresh token");
            }            
            return data;
      } else {
          console.error("Error: Data structure is incorrect", data);
          throw new Error("Unexpected response format");
      }
    } else {
      throw new Error("Invalid credentials");
  }
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error("Failed to login. Check credentials.");
    }
};

  // ✅ Register Function
  const registerUser = async (userData: RegisterUserData) => {
    try {
      const response = await axios.post(`${API_URL}/account/register`, {
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword,
        role: userData.role,
        institution: userData.institution,
      });

      console.log("Registration response:", response.data);
    } catch (error) {
      console.error("Registration Error:", error);
      throw new Error("Failed to register. Try again.");
    }
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // ✅ Restore Login on Refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, registerUser }}>
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
