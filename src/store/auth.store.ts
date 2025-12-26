import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/auth.types";

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;

    setAuth: (session: Session, user: User, profile: UserProfile | null) => void;

    clearAuth: () => void;
    setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    profile: null,
    loading: true,

    setAuth: (session, user, profile) =>
        set({
        session,
        user,
        profile,
        loading: false,
        }),

    clearAuth: () =>
        set({
        session: null,
        user: null,
        profile: null,
        loading: false,
        }),

    setLoading: (value) => set({ loading: value }),
}));
