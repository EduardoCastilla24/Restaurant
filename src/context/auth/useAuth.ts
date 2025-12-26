import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return {
        ...useAuthStore(),
        ...context,
    };
}
