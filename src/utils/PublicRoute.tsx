import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute = () => {
    const { user, loading } = useAuthStore();

    // Auth aún inicializando
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                Cargando...
            </div>
        );
    }

    // Ya autenticado → fuera de login
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    // Público OK
    return <Outlet />;
};
