// src/types/auth.types.ts
import { User } from "@supabase/supabase-js";

export type AppRole = "superadmin" | "admin" | "waiter" | "cashier" | "kitchen";

export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    role: AppRole;
    avatar_url?: string;
    is_active: boolean;
}

export interface AuthState {
    user: User | null; // El usuario nativo de Supabase (Auth)
    profile: UserProfile | null; // Tabla personalizada 'profiles'
    isAuthenticated: boolean;
    isLoading: boolean;
}
