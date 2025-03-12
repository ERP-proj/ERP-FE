// import { create } from "zustand";

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   isAuthenticated: boolean;
//   login: (accessToken: string, refreshToken: string) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken:
//     typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
//   refreshToken:
//     typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
//   isAuthenticated:
//     typeof window !== "undefined"
//       ? !!localStorage.getItem("accessToken")
//       : false,

//   login: (accessToken, refreshToken) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     set({ accessToken, refreshToken, isAuthenticated: true });
//   },

//   logout: () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     set({ accessToken: null, refreshToken: null, isAuthenticated: false });
//   },
// }));
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ✅ Zustand 인증 상태 관리
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

// ✅ Zustand 상태 관리 (localStorage 동기화 + persist 적용)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // ✅ 로그인 처리 (상태 및 localStorage 업데이트)
      login: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true });

        // localStorage에 저장
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      },

      // ✅ 로그아웃 처리
      logout: () => {
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });

        // localStorage에서 제거
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      },
    }),
    {
      name: "auth-storage", // ✅ Zustand persist 스토리지 키
      storage: createJSONStorage(() => localStorage),
    }
  )
);
