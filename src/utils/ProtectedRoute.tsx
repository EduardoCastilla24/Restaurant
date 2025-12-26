import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import type { AppRole } from "@/types/auth.types";

interface ProtectedRouteProps {
  allowedRoles?: AppRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // perfil aún cargando → deja pasar
  if (!profile) {
    return <Outlet />;
  }

  if (!profile.is_active) {
    return <Navigate to="/inactive-user" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
