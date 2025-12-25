import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { AppRole } from "@/types/auth.types";

interface ProtectedRouteProps {
  allowedRoles?: AppRole[]; // Roles permitidos para esta ruta
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, profile } = useAuthStore();

  if (isLoading) {
    // Puedes poner aquí un componente <LoadingSpinner /> bonito de Shadcn
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // 1. Si no está autenticado, fuera
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta requiere roles específicos y el usuario no lo tiene
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />; // O redirigir al dashboard
  }

  // 3. Todo OK
  return <Outlet />;
};