import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/auth.types";

interface AuthState {
  // Estado
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;

  // Acciones
  setAuth: (session: Session, user: User, profile: UserProfile | null) => void;

  clearAuth: () => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // =====================
  // STATE INICIAL
  // =====================
  session: null,
  user: null,
  profile: null,
  loading: true, // ⬅️ IMPORTANTE: true SOLO al iniciar app

  // =====================
  // ACTIONS
  // =====================
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

  setLoading: (value) =>
    set({
      loading: value,
    }),
}));
