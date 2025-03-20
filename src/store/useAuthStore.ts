import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean; // ✅ 관리자 여부 상태 추가
  login: (
    accessToken: string | null,
    refreshToken: string | null,
    isAdmin: boolean
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("accessToken")
      : false,
  isAdmin: false, // ✅ 기본값 설정

  login: (accessToken, refreshToken, isAdmin) => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      set({ accessToken, refreshToken, isAuthenticated: true, isAdmin });
    } else {
      set({ isAuthenticated: true, isAdmin: true }); // ✅ 관리자 로그인 시 isAdmin 설정
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },
}));
