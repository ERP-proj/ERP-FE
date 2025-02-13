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
        login(accessToken, refreshToken);
        return response.data;
      } else {
        throw new Error("로그인 실패. 다시 시도해주세요.");
      }
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },
};
