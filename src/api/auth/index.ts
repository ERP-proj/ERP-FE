import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "../core/apiClient";

export const auth = {
  // ✅ 일반 로그인
  login: async (account: string, password: string) => {
    try {
      const response = await apiClient.post("/api/account/login", {
        account,
        password,
      });

      if (response.data.code === "OK") {
        return handleLoginSuccess(response);
      } else {
        throw new Error("로그인 실패. 다시 시도해주세요.");
      }
    } catch (error: any) {
      throw error; // ❌ 400 에러 발생 시, LoginPage에서 관리자 로그인 실행
    }
  },

  // ✅ 관리자 로그인
  adminLogin: async (account: string, password: string) => {
    try {
      const response = await apiClient.post("/api/admin/login", {
        identifier: account,
        password,
      });

      if (response.data.code === "OK") {
        return handleLoginSuccess(response);
      } else {
        throw new Error("관리자 로그인 실패.");
      }
    } catch (error: any) {
      throw error;
    }
  },
};

// ✅ 로그인 성공 처리 (일반 + 관리자 공통)
const handleLoginSuccess = (response: any) => {
  const { accessToken, refreshToken } = response.data.data;
  const { login } = useAuthStore.getState();

  login(accessToken, refreshToken); // ✅ Zustand 상태 업데이트
  return response.data;
};
