import { createContext, useContext, useEffect, useRef } from "react";
import { supabase } from "@/supabase/supabase.config";
import type { UserProfile } from "@/types/auth.types";
import { useAuthStore } from "@/store/auth.store";

interface AuthContextType {
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);

    const {
        setAuth,
        clearAuth,
        setLoading,
    } = useAuthStore();

    // ============================
    // FETCH PROFILE
    // ============================
    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("fetchProfile:", error.message);
            return null;
        }

        return data as UserProfile;
    };

    // ============================
    // INIT AUTH (ONCE)
    // ============================
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            setLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.user) {
                clearAuth();
                return;
            }

            const profile = await fetchProfile(session.user.id);

            setAuth(session, session.user, profile);
        };

        init();

        // ============================
        // AUTH LISTENER
        // ============================
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_OUT") {
                    clearAuth();
                    return;
                }

                if (
                    event === "SIGNED_IN" ||
                    event === "TOKEN_REFRESHED"
                ) {
                    if (!session?.user) return;

                    const profile = await fetchProfile(session.user.id);
                    setAuth(session, session.user, profile);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // ============================
    // SIGN OUT
    // ============================
    const signOut = async () => {
        await supabase.auth.signOut();
        clearAuth();
    };

    return (
        <AuthContext.Provider value={{ signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// ============================
// HOOK
// ============================
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
