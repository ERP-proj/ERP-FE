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
  progressList: Progress[]; // 진도표 리스트
  planPayment: PlanPayment; // 이용권 결제 정보
  otherPayment: OtherPayment[];
}
// 진도표 리스트
export interface Progress {
  progressId: number;
  date: string;
  content: string;
}
export interface PlanPayment {
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
export interface OtherPayment {
  paymentsMethod?: "CARD" | "CASH" | "TRANSFER" | "OTHER" | null; // 결제 방법
  otherPaymentMethod: string; // 기타 결제 방법 설명
  registrationAt: string; // 등록일
  content: string; // 결제 내용
  price: number; // 결제 금액
  status: boolean; // 결제 상태
}

//회원상세정보 수정
export interface UpdateCustomerDetail
  extends Omit<
    CustomerDetailData,
    "planPayment" | "otherPayment" | "progressList"
  > {
  photoFile: File | null;
  progressList: {
    addProgresses: Omit<Progress, "progressId">[];
    updateProgresses: Progress[];
    deleteProgresses: Pick<Progress, "progressId">[];
  };
  planPaymentStatus: boolean;
  otherPayment: OtherPayment[];
}

//회원등록
export interface FormData
  extends Omit<
    CustomerDetailData,
    "progressList" | "customerId" | "planPayment"
  > {
  planId: number;
  photoFile: File | null;
  planPayment: PlanPayment;
  otherPayment: OtherPayment[];
}
