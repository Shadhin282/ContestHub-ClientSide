import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';
export function ProtectedRoute({
  children,
  allowedRoles
}) {
  const {
    user,
    isLoading,
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>;
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role doesn't match
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}