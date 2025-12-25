import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";

export const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) return null; // O spinner

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};