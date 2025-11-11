// src/routes/ProtectedRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem("admin_accessKey");

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
