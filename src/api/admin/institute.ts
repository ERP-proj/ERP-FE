import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const adminAPI = {
  /**
   * 전체 매장 조회 메서드
   * @returns 조회된 매장 데이터 리스트
   */
  getInstitutes: async () => {
    try {
      const response = await apiClient.get("/api/admin/getInstitutes", {
        withCredentials: true, // ✅ 쿠키 포함 요청
      });
      return response.data.data; // 서버 응답의 `data` 필드에 리스트가 포함됨
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },

  /**
   * 계정 조회 메서드
   * @param instituteId 매장 ID
   * @returns 조회된 계정 데이터 리스트
   */
  getAccounts: async (instituteId: number) => {
    try {
      const response = await apiClient.get("/api/admin/getAccounts", {
        params: { instituteId },
      });
      return response.data.data;
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },
};
