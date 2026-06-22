"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthSessionDto, AuthUserDto } from "@/lib/api";

type AuthState = {
  user: AuthUserDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (session: AuthSessionDto) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setSession: (session) =>
        set({
          user: session.user,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "flux-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
