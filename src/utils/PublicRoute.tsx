// src/utils/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute = () => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Cargando...
            </div>
        );
    }

    // 🚀 SI YA ESTÁ LOGEADO → REDIRIGE
    if (user) {
        console.log("PublicRoute: usuario logeado, redirigiendo...");
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
