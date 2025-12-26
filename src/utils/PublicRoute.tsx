// src/utils/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicRoute = () => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

