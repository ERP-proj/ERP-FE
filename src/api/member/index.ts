import { FormData, UpdateCustomerDetail } from "@/types/memberType";
import { defaultApi } from "../core/core";

export const memberAPI = {
  /**
   * 회원 등록 메서드
   * @param data 회원 등록 요청 데이터
   * @returns 등록된 회원 데이터
   */
  registMember: async (data: FormData) => {
    try {
      const response = await defaultApi.post("/customer/addCustomer", data);
      return response.data;
    } catch (error) {
      console.error("Error registering member:", error);
      throw error;
    }
  },

  /**
   * 이용 중인 회원 조회 메서드
   * @param page 페이지 번호
   * @returns 조회된 회원 데이터 리스트
   */

  getMemberRow: async (page: number) => {
    try {
      const response = await defaultApi.get(
        `/customer/currentCustomers/${page}`
      );
      return response.data;
    } catch (error) {
      console.error("error fetching memberRow", error);
      throw error;
    }
  },

  /**
   * 회원 검색 메서드
   * @param keyword 검색 키워드
   * @returns 검색 결과 리스트
   * @throws 검색 키워드가 비어 있거나 API 호출 실패 시 에러
   */
  searchCustomerName: async (keyword: string) => {
    if (!keyword.trim()) {
      throw new Error("검색어를 입력해 주세요.");
    }
    try {
      const response = await defaultApi.get(
        `/customer/searchCustomerName/${encodeURIComponent(keyword)}`
      );
      return response.data;
    } catch (error) {
      console.error("고객 검색 API 호출 오류:", error);
      throw new Error("고객 검색 API 호출 실패");
    }
  },

  //회원 상세정보 가져오기
  getCustomerDetail: async (customerId: number) => {
    try {
      const response = await defaultApi.get(
        `/customer/getCustomerDetail/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.error("error fetching memberRow", error);
      throw error;
    }
  },
  /**
   * 회원 상세정보 수정 메서드
   * @param data 회원 상세정보 데이터
   * @returns 수정된 회원 데이터
   */
  updateCustomerDetail: async (data: UpdateCustomerDetail) => {
    try {
      const response = await defaultApi.put("/customer/updateCustomer", data);
      return response.data;
    } catch (error) {
      console.error("회원 상세 수정 오류:", error);
      throw error;
    }
  },

  /**
   * 이용권 조회 메서드
   * @param licenseType 라이선스 타입 (예: "TYPE_1", "TYPE_2")
   * @returns 조회된 이용권 데이터 리스트
   */
  getPlans: async (licenseType: string) => {
    try {
      const response = await defaultApi.get(`/plan/getPlans/${licenseType}`);
      return response.data;
    } catch (error) {
      console.error("이용권 조회 API 호출 오류:", error);
      throw new Error("이용권 조회 API 호출 실패");
    }
  },
};
