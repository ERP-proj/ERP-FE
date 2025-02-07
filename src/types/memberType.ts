//회원리스트
export interface Member {
  customerId: number;
  photoUrl: string | null;
  name: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  licenseType: "TYPE_1" | "TYPE_2";
  planName: string;
  planType: "PERIOD_BASED" | "TIME_BASED";
  remainingTime: number;
  remainingPeriod: number;
  usedTime: number;
  registrationDate: string;
  tardinessCount: number;
  absenceCount: number;
}

//회원상세
export interface CustomerDetailResponse {
  code: string;
  message: string;
  data: CustomerDetailData;
}

export interface CustomerDetailData {
  customerId: number;
  photoUrl: string; // 회원 사진 URL
  name: string; // 회원 이름
  gender: "MALE" | "FEMALE"; // 성별
  birthDate: string;
  phone: string; // 전화번호
  address: string; // 주소
  visitPath: string; // 방문 경로
  memo: string; // 메모
  progressList: Array<{
    progressId: number;
    date: string;
    content: string;
  }>; // 진도표 리스트
  planPayment: PlanPayment; // 이용권 결제 정보
  otherPayment: Array<{
    paymentsMethod: string;
    otherPaymentMethod: string;
    registrationAt: string;
    content: string;
    price: number;
    status: boolean;
  }>;
}
export interface PlanPayment {
  licenseType: string;
  planName: string;
  planType: string;
  courseType: string;
  planPrice: number;
  discountRate: number;
  discountPrice: number;
  paymentsMethod: string;
  otherPaymentMethod: string;
  registrationAt: string;
  paymentTotal: number;
  status: boolean;
}

//회원상세정보 수정
export interface UpdateCustomerDetail {
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
  progressList: {
    addProgresses: Array<{
      date: string;
      content: string;
    }>;
    updateProgresses: Array<{
      progressId: number;
      date: string;
      content: string;
    }>;
    deleteProgresses: Array<{
      progressId: number;
    }>;
  };
  planPaymentStatus: boolean;
  otherPayment: Array<{
    paymentsMethod: string;
    otherPaymentMethod: string;
    registrationAt: string;
    content: string;
    price: number;
    status: boolean;
  }>;
}

//회원추가
export interface PlanPayment2 {
  paymentsMethod: "CARD" | "CASH" | "TRANSFER" | "OTHER"; // 결제 방법
  otherPaymentMethod: string; // 기타 결제 방법 설명
  registrationAt: string; // 등록일 (ISO 형식)
  discountRate: number; // 할인율 (선택적)
  status: boolean; // 상태 (결제 여부)
}

// OtherPayment 타입 정의
export interface OtherPayment2 {
  paymentsMethod: "CARD" | "CASH" | "TRANSFER" | "OTHER"; // 결제 방법
  otherPaymentMethod: string; // 기타 결제 방법 설명
  registrationAt: string; // 등록일
  content: string; // 결제 내용
  price: number; // 결제 금액
  status: boolean; // 결제 상태
}
export interface FormData {
  planId: number;
  name: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  address: string;
  visitPath: string;
  birthDate: string;
  memo: string;
  photoFile: File | null;
  planPayment: PlanPayment2;
  otherPayment: OtherPayment2[];
}
