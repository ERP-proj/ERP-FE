import { defaultApi } from "../core/core";

export const member = {
  /**
   * 회원 등록 메서드
   * @param data 회원 등록 요청 데이터
   * @returns 등록된 회원 데이터
   */
  registMember: async (data: {
    planId: number;
    name: string;
    gender: "MALE" | "FEMALE";
    phone: string;
    address: string;
    birthDate: string;
    memo: string;
    paymentsMethod: "CARD" | "CASH" | "TRANSFER" | "OTHER";
    planPayment: {
      registrationAt: string;
      discount: number;
      status: boolean;
    };
    otherPayment: Array<{
      registrationAt: string;
      content: string;
      price: number;
      status: boolean;
    }>;
  }) => {
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
};
