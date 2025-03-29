import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const auth = {
  login: async (account: string, password: string) => {
    try {
      const response = await apiClient.post("/api/account/login", {
        account,
        password,
      });

      if (response.data.code === "OK") {
        const { accessToken, refreshToken } = response.data.data;
        const { login } = useAuthStore.getState();

        // Zustand 상태 업데이트
        login(accessToken, refreshToken, false);
        return response.data;
      } else {
        throw new Error("로그인 실패. 다시 시도해주세요.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          // 관리자 로그인 시도 (세션 방식)
          const adminResponse = await apiClient.post("/api/admin/login", {
            identifier: account,
            password,
          });
          if (adminResponse.data.code === "OK") {
            useAuthStore.getState().login("", "", true);
            return adminResponse.data; // 세션 방식 로그인은 토큰 저장 불필요
          }
        } catch (adminError: any) {
          if (adminError.response && adminError.response.status === 401) {
            throw new Error("로그인 실패: 일반 및 관리자 계정 인증 실패.");
          } else {
            throw new Error(errorHandler(adminError));
          }
        }
      } else {
        throw new Error(errorHandler(error));
      }
    }
  },
};
