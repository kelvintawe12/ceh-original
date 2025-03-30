import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  // ✅ Avoid redirecting while checking session
  if (user === null) {
    return <div>Loading...</div>; // 👀 Show a loading state instead of redirecting immediately
  }

  // 🚨 Redirect to sign-in if NOT authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
