import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { AppRole } from "@/types/auth.types";

interface ProtectedRouteProps {
  allowedRoles?: AppRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  const {
    user,
    profile,
    loading,
  } = useAuthStore();

  // 1️⃣ Auth aún inicializando
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  // 2️⃣ No autenticado
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // 3️⃣ Perfil no cargado (ERROR REAL)
  if (!profile) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-red-500">
        Error: perfil de usuario no disponible
      </div>
    );
  }

  // 4️⃣ Usuario desactivado
  if (!profile.is_active) {
    return <Navigate to="/inactive-user" replace />;
  }

  // 5️⃣ Control de roles
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 6️⃣ OK
  return <Outlet />;
};
