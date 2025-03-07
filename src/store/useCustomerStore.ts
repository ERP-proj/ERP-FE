import { create } from "zustand";
import apiClient from "@/api/core/apiClient";
import { produce } from "immer";

export type {
  UpdateCustomerDetail,
  CustomerDetailData,
  PlanPayment,
  OtherPayment,
};

// ✅ PlanPayment 타입 (이용권 정보)
interface PlanPayment {
  licenseType: string;
  planType: string;
  courseType: string;
  planPrice: number;
  planName: string;
  discountName: string;
  discountRate: number;
  discountPrice: number;
  paymentsMethod: string;
  otherPaymentMethod: string;
  registrationAt: string;
  status: boolean;
}

// ✅ 기타 결제 내역 (OtherPayment)
interface OtherPayment {
  paymentsMethod?: string;
  otherPaymentMethod: string;
  registrationAt: string;
  content: string;
  price: number;
  status: boolean;
}

// ✅ 고객 상세 정보 (API 응답용)
interface CustomerDetailData {
  customerId: number;
  photoUrl: string;
  photoFile?: File | null;
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  phone: string;
  address: string;
  visitPath: string;
  memo: string;
  planPayment: PlanPayment;
  otherPayment: OtherPayment[];
  planPaymentStatus?: boolean;
  progressList: any[];
}

// ✅ 고객 정보 수정 요청 DTO
interface UpdateCustomerDetail {
  customerId: number;
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  phone: string;
  address: string;
  visitPath: string;
  memo: string;
  photoFile: File | null;
  photoUrl: string;
  planPaymentStatus: boolean;
  progressList: any[]; // ✅ 진도표 데이터는 필요할 때만 전달
  otherPayment: OtherPayment[];
}

export const convertToUpdateCustomerDetail = (
  data: CustomerDetailData
): UpdateCustomerDetail => {
  return {
    customerId: data.customerId,
    name: data.name,
    gender: data.gender,
    birthDate: data.birthDate,
    phone: data.phone,
    address: data.address,
    visitPath: data.visitPath,
    memo: data.memo,
    photoFile: data.photoFile || null,
    photoUrl: data.photoUrl,

    // ✅ GET에서는 planPayment 객체지만, PUT에서는 boolean 값만 필요
    planPaymentStatus: data.planPayment?.status ?? false,

    progressList: data.progressList.map((progress) => ({
      progressId: progress.progressId ?? null,
      date: progress.date,
      content: progress.content,
      deleted: progress.deleted ?? false,
    })),

    otherPayment: data.otherPayment.map((payment) => ({
      paymentsMethod: payment.paymentsMethod || "OTHER",
      otherPaymentMethod: payment.otherPaymentMethod || "",
      registrationAt: payment.registrationAt,
      content: payment.content,
      price: payment.price,
      status: payment.status,
    })),
  };
};

interface CustomerState {
  customers: CustomerDetailData[];
  customer: CustomerDetailData | null;
  fetchCustomers: () => Promise<void>;
  fetchCustomer: (customerId: number) => Promise<void>;
  updateCustomer: (updatedData: Partial<UpdateCustomerDetail>) => Promise<void>;
  updatePlanPaymentStatus: (status: boolean) => Promise<void>;
  updateCustomerStatus: (
    customerId: number,
    status: "ACTIVE" | "INACTIVE" | "DELETED"
  ) => Promise<void>;
}

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  customer: null,

  // ✅ 전체 회원 목록 가져오기
  fetchCustomers: async () => {
    try {
      const response = await apiClient.get(`/api/customer/getCustomerList`);
      set({ customers: response.data });
    } catch (error) {
      console.error("회원 목록 조회 실패", error);
    }
  },

  // ✅ 고객 상세 정보 조회
  fetchCustomer: async (customerId) => {
    try {
      const response = await apiClient.get(
        `/api/customer/getCustomerDetail/${customerId}`
      );
      const data = response.data.data;

      set(
        produce((state) => {
          state.customer = {
            ...data,
            photoFile: null, // 사진 파일 초기화
          };
        })
      );
    } catch (error) {
      console.error("고객 정보 조회 실패", error);
    }
  },

  // ✅ 고객 정보 수정 (진도표 필요할 때만 전달)
  updateCustomer: async (updatedData) => {
    try {
      const formData = new FormData();

      const requestData = {
        ...updatedData,
      };

      // ✅ 진도표 데이터가 있으면 추가
      if (updatedData.progressList) {
        requestData.progressList = updatedData.progressList.map((progress) => ({
          progressId: progress.progressId ?? null,
          date: progress.date,
          content: progress.content,
          deleted: progress.deleted ?? false,
        }));
      }

      formData.append(
        "req",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      if (updatedData.photoFile) {
        formData.append("file", updatedData.photoFile);
      }

      await apiClient.put("/api/customer/updateCustomer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set(
        produce((state) => {
          state.customer = { ...state.customer!, ...updatedData };
        })
      );

      console.log("✅ 고객 정보 수정 완료");
    } catch (error) {
      console.error("❌ 고객 정보 수정 실패", error);
    }
  },

  // ✅ **이용권 결제 상태만 업데이트**
  updatePlanPaymentStatus: async (status) => {
    const { customer, updateCustomer } = get();
    if (!customer) return;

    try {
      await updateCustomer({
        customerId: customer.customerId,
        planPaymentStatus: status,
      });

      set(
        produce((state) => {
          if (state.customer) {
            state.customer.planPaymentStatus = status;
          }
        })
      );

      console.log(`✅ 이용권 결제 상태 변경: ${status ? "결제 완료" : "미납"}`);
    } catch (error) {
      console.error("❌ 이용권 결제 상태 변경 실패", error);
    }
  },

  // ✅ 회원 상태값 변경 (삭제 포함)
  updateCustomerStatus: async (customerId, status) => {
    try {
      await apiClient.put("/api/customer/updateStatus", { customerId, status });

      // Zustand 상태 업데이트 (삭제된 회원 제거)
      set(
        produce((state) => {
          state.customers = state.customers.filter(
            (c: { customerId: number }) => c.customerId !== customerId
          );
          if (state.customer?.customerId === customerId) {
            state.customer = null;
          }
        })
      );

      console.log(`✅ 회원 상태 변경 성공: ${customerId} → ${status}`);
    } catch (error) {
      console.error("❌ 회원 상태 변경 실패", error);
    }
  },
}));

export default useCustomerStore;
