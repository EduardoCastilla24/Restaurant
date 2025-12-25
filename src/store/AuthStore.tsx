import { create } from "zustand";
import { supabase } from "@/supabase/supabase.config";
import { AuthState, UserProfile } from "@/types/auth.types";

interface AuthActions {
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

// Combinamos el estado y las acciones
type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
    // Estado inicial
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,

    // --- Acciones ---

    // 1. Login con Email/Pass (Para todos: Admin, Mozos, etc.)
    signInWithEmail: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
    },

    // 2. Logout
    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null, isAuthenticated: false });
    },

    // 3. Inicializador
    initializeAuth: async () => {
        set({ isLoading: true });

        // Escuchar cambios en la sesión
        supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                // Si hay sesión, buscamos el rol en la tabla 'profiles'
                const profile = await fetchProfile(session.user.id);

                set({
                    user: session.user,
                    profile,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                // Si no hay sesión (Logout o expiró)
                set({
                    user: null,
                    profile: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            }
        });
    },
}));

// Helper fuera del store para mantenerlo limpio
async function fetchProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
    return data as UserProfile;
}