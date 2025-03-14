import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const adminAPI = {
  /**
   * 전체 매장 조회 메서드
   * @returns 조회된 매장 데이터 리스트
   */
  getInstitutes: async () => {
    try {
      const response = await apiClient.get("/api/admin/getInstitutes");
      return response.data.data; // 서버 응답의 `data` 필드에 리스트가 포함됨
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },
};
