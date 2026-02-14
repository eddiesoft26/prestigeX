// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation(); // 👈 Detects where the user is trying to go

  if (loading) {  
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // 1. Not logged in? Go to Login page
  if (!isAuthenticated()) {
    return <Navigate to="/auth" />;
  }

  // 2. Logged in as USER but trying to access /admin? Go to User Dashboard
  if (location.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
    console.warn("Access denied: User is not an Admin");
    return <Navigate to="/dashboard" />;
  }

  // 3. Everything is fine! Render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
