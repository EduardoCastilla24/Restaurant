import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/supabase/supabase.config";
import { useAuthStore } from "@/store/auth.store";
import { AuthContext } from "./AuthContext";
import type { Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);

    const { setAuth, clearAuth, setLoading } = useAuthStore();

    // ============================
    // FETCH PROFILE
    // ============================
    const fetchProfile = useCallback(async (userId: string) => {
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
    }, []);

    // ============================
    // HANDLE SESSION
    // ============================
    const handleSession = useCallback(
        async (session: Session | null) => {
            if (!session?.user) {
                clearAuth();
                return;
            }

            // usuario inmediato (no bloquea navegación)
            setAuth(session, session.user, null);

            // perfil async
            const profile = await fetchProfile(session.user.id);
            if (profile) {
                setAuth(session, session.user, profile);
            }
        },
        [clearAuth, setAuth, fetchProfile]
    );

    // ============================
    // INIT AUTH
    // ============================
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            setLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            await handleSession(session);
            setLoading(false);
        };

        init();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                clearAuth();
                return;
            }

            if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                handleSession(session);
            }
        });

        return () => subscription.unsubscribe();
    }, [handleSession, clearAuth, setLoading]);

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
