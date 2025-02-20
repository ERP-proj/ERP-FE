import { create } from "zustand";
import apiClient from "@/api/core/apiClient";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

export type {
  UpdateCustomerDetail,
  CustomerDetailData,
  Progress,
  PlanPayment,
  OtherPayment,
};

// ✅ Progress 타입
interface Progress {
  progressId?: number;
  tempId?: string; // `addProgresses`에만 있는 임시 ID
  date: string;
  content: string;
}

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
  progressList: Progress[];
  planPayment: PlanPayment;
  otherPayment: OtherPayment[];
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
  progressList: {
    addProgresses: { tempId: string; date: string; content: string }[];
    updateProgresses: Progress[];
    deleteProgresses: { progressId: number }[];
  };
  otherPayment: OtherPayment[];
}

interface CustomerState {
  customers: CustomerDetailData[];
  customer: CustomerDetailData | null;
  fetchCustomers: () => Promise<void>;
  fetchCustomer: (customerId: number) => Promise<void>;
  updateCustomer: (updatedData: Partial<UpdateCustomerDetail>) => Promise<void>;
  updatePlanPaymentStatus: (status: boolean) => Promise<void>;
  // ✅ 진도표 관련 기능
  addProgressRow: () => void;
  updateProgressRow: (
    id: number | string,
    key: "date" | "content",
    value: string
  ) => void;
  deleteProgressRow: (id: number | string) => void;
  updateCustomerStatus: (
    customerId: number,
    status: "ACTIVE" | "INACTIVE" | "DELETED"
  ) => Promise<void>;
}

// ✅ `CustomerDetailData` → `UpdateCustomerDetail` 변환 함수
const convertToUpdateCustomerDetail = (
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
    photoFile: null, // 파일 업로드용
    photoUrl: data.photoUrl,
    planPaymentStatus: data.planPayment.status,
    progressList: {
      addProgresses: [],
      updateProgresses: data.progressList.map((progress) => ({
        progressId: progress.progressId!,
        date: progress.date,
        content: progress.content,
      })),
      deleteProgresses: [],
    },
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

const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  customer: null,
  // planPayment: null,
  // ✅ 전체 회원 목록 가져오기
  fetchCustomers: async () => {
    try {
      const response = await apiClient.get(`/api/customer/getCustomerList`);
      set({ customers: response.data });
    } catch (error) {
      console.error("회원 목록 조회 실패", error);
    }
  },

  // ✅ 고객 상세 정보 조회 (planPayment 포함)
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
            progressList: {
              addProgresses: [], // ✅ 추가된 진도 (초기 빈 배열)
              updateProgresses: data.progressList || [], // ✅ API에서 받은 진도를 업데이트 리스트로 사용
              deleteProgresses: [], // ✅ 삭제할 진도 (초기 빈 배열)
            },
            photoFile: null,
          };
        })
      );
    } catch (error) {
      console.error("고객 정보 조회 실패", error);
    }
  },

  // ✅ 고객 정보 수정
  updateCustomer: async (updatedData) => {
    try {
      const formData = new FormData();
      const requestData = {
        ...updatedData,
        progressList: {
          addProgresses: updatedData.progressList?.addProgresses || [],
          updateProgresses: updatedData.progressList?.updateProgresses || [],
          deleteProgresses: updatedData.progressList?.deleteProgresses || [],
        },
        otherPayment: updatedData.otherPayment?.map((payment) => ({
          ...payment,
          registrationAt: new Date(payment.registrationAt).toISOString(),
        })),
      };

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

      console.log("고객 정보 수정 완료");
    } catch (error) {
      console.error("고객 정보 수정 실패", error);
    }
  },

  // ✅ **이용권 결제 상태만 업데이트 (updateCustomer 내부적으로 사용)**
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

  // ✅ 새로운 진도 추가
  addProgressRow: () => {
    set(
      produce((state) => {
        if (state.customer) {
          state.customer.progressList.addProgresses.push({
            tempId: uuidv4(),
            date: new Date().toISOString().split("T")[0], // 오늘 날짜
            content: "",
          });
        }
      })
    );
  },
  // ✅ 기존 진도 업데이트 (progressId 또는 tempId 기준)
  updateProgressRow: (id, key, value) => {
    set(
      produce((state) => {
        if (!state.customer) return;

        if (typeof id === "number") {
          // 기존 진도 수정 (updateProgresses 배열 내 progressId 사용)
          const progress = state.customer.progressList.updateProgresses.find(
            (p: { progressId: number }) => p.progressId === id
          );
          if (progress) {
            progress[key] = value;
          }
        } else {
          // 새로 추가된 진도 수정 (addProgresses 배열 내 tempId 사용)
          const progress = state.customer.progressList.addProgresses.find(
            (p: { tempId: string }) => p.tempId === id
          );
          if (progress) {
            progress[key] = value;
          }
        }
      })
    );
  },

  // ✅ 진도 삭제 (tempId 또는 progressId로 구분)
  deleteProgressRow: (id) => {
    set(
      produce((state) => {
        if (!state.customer) return;

        if (typeof id === "number") {
          // 기존 진도는 삭제 요청 리스트에 추가
          state.customer.progressList.deleteProgresses.push({ progressId: id });

          // 기존 진도 리스트에서 제거
          state.customer.progressList.updateProgresses =
            state.customer.progressList.updateProgresses.filter(
              (p: { progressId: number }) => p.progressId !== id
            );
        } else {
          // 새로운 진도는 리스트에서 직접 삭제
          state.customer.progressList.addProgresses =
            state.customer.progressList.addProgresses.filter(
              (p: { tempId: string }) => p.tempId !== id
            );
        }
      })
    );
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
