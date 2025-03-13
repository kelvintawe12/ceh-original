import React, { useEffect, useState, createContext, useContext } from 'react';
// Test users with different roles
const TEST_USERS = [{
  id: '1',
  fullName: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  institution: 'ALU University',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  password: 'circularhub'
}, {
  id: '2',
  fullName: 'Sarah Smith',
  email: 'sarah@example.com',
  role: 'faculty',
  institution: 'ALU University',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  password: 'circularhub'
}, {
  id: '3',
  fullName: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  institution: 'ALU University',
  avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  password: 'circularhub'
}];
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
  role: string;
  institution: string;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, password: string) => {
    // Find user with matching credentials
    const matchedUser = TEST_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (matchedUser) {
      const {
        password: _,
        ...userWithoutPassword
      } = matchedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid email or password');
    }
  };
  const registerUser = async (userData: RegisterUserData) => {
    // Check if email already exists
    if (TEST_USERS.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    // In a real app, this would be an API call
    const newUser = {
      id: String(TEST_USERS.length + 1),
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    };
    // Add to test users (this is just for demo purposes)
    TEST_USERS.push({
      ...newUser,
      password: userData.password
    });
    // Log in the new user
    const {
      password: _,
      ...userWithoutPassword
    } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated: !!user,
    registerUser
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};