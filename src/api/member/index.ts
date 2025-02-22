import type { FormData } from "@/types/memberType";
import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";
/**
 * Base64 이미지를 Blob으로 변환하는 함수
 */
export const base64ToBlob = (base64: string) => {
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const memberAPI = {
  /**
   * 회원 등록 메서드
   * @param data 회원 등록 요청 데이터
   * @returns 등록된 회원 데이터
   */

  registMember: async (data: FormData) => {
    try {
      const formPayload = new FormData();

      // ✅ req 객체에서 photoFile 제거
      const { photoFile, ...reqData } = data;

      // ✅ JSON 데이터를 Blob으로 변환하여 FormData에 추가
      const reqBlob = new Blob([JSON.stringify(reqData)], {
        type: "application/json",
      });
      formPayload.append("req", reqBlob); // filename="blob" 문제 해결

      // ✅ file 필드에 photoFile 추가 (File 객체인지 확인)
      if (photoFile && photoFile instanceof File) {
        formPayload.append("file", photoFile);
      }

      const response = await apiClient.post(
        "api/customer/addCustomer",
        formPayload,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.info("회원 등록 성공:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("회원 등록 실패:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * 회원 상세정보 수정 메서드
   * @param data 회원 상세정보 데이터
   * @returns 수정된 회원 데이터
   */
  updateCustomerDetail: async (data: FormData) => {
    try {
      const response = await apiClient.put(
        "/api/customer/updateCustomer",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("회원 상세 수정 오류:", error);
      throw error;
    }
  },

  /**
   * 이용 중인 회원 조회 메서드
   * @returns 조회된 회원 데이터 리스트
   */
  getMemberRow: async (
    lastId: number | null,
    status: "ACTIVE" | "INACTIVE" | "DELETED"
  ) => {
    try {
      const response = await apiClient.get("/api/customer/getCustomers", {
        params: {
          status,
          ...(lastId ? { lastId } : {}), // lastId가 있을 경우에만 쿼리 추가
        },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },

  /**
   * 회원 검색 메서드
   * @param keyword 검색 키워드
   * @returns 검색 결과 리스트
   */
  searchCustomerName: async (customerName: string) => {
    if (!customerName.trim()) {
      throw new Error("검색어를 입력해 주세요.");
    }
    try {
      const response = await apiClient.get(
        `/api/customer/searchCustomer/${encodeURIComponent(customerName)}`
      );
      return response.data;
    } catch (error) {
      console.error("고객 검색 API 호출 오류:", error);
      throw new Error("고객 검색 API 호출 실패");
    }
  },

  /**
   * 회원 상세정보 가져오기
   * @param customerId 회원 ID
   * @returns 회원 상세정보
   */
  getCustomerDetail: async (customerId: number) => {
    try {
      const response = await apiClient.get(
        `/api/customer/getCustomerDetail/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.error("error fetching memberRow", error);
      throw error;
    }
  },

  //  회원 상태값 변경
  updateCustomerStatus: async (
    customerId: number,
    status: "ACTIVE" | "INACTIVE" | "DELETED"
  ) => {
    try {
      const response = await apiClient.put("/api/customer/updateStatus", {
        customerId,
        status,
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = errorHandler(error);
      throw new Error(errorMessage);
    }
  },
  /**
   * 이용권 조회 메서드
   * @param licenseType 라이선스 타입 (예: "TYPE_1", "TYPE_2")
   * @returns 조회된 이용권 데이터 리스트
   */
  getPlans: async (licenseType: string) => {
    try {
      const response = await apiClient.get(`/api/plan/getPlans/${licenseType}`);
      return response.data;
    } catch (error) {
      console.error("이용권 조회 API 호출 오류:", error);
      throw new Error("이용권 조회 API 호출 실패");
    }
  },
};
