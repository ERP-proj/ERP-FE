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
  photoUrl: string | null; // 회원 사진 URL
  name: string; // 회원 이름
  gender: "MALE" | "FEMALE"; // 성별
  birthDate: string;
  phone: string; // 전화번호
  address: string; // 주소
  visitPath: string; // 방문 경로
  memo: string; // 메모
  progressList: ProgressList[]; // 진도표 리스트
  planPayment: PlanPayment; // 이용권 결제 정보
  otherPayment: OtherPayment[]; // 기타 결제 리스트
}

export interface ProgressList {
  progressId: number;
  date: string; // 날짜
  content: string; // 내용
}

export interface PlanPayment {
  paymentsMethod: "CARD" | "CASH" | "TRANSFER" | "OTHER"; // 결제 방법
  otherPaymentMethod: string; //기타결제
  registrationAt: string; // 등록 날짜
  licenseType: string; // 구분1
  planType: string; //구분2
  courseType: string; //구분3
  planName: string; // 이용권 이름
  planPrice: number; // 이용권 가격
  discountRate: number; // 할인율
  discountPrice: number; // 할인할 금액
  paymentTotal: number; // 총 결제 금액
  status: boolean; // 결제 상태
}

export interface OtherPayment {
  paymentsMethod: "CARD" | "CASH" | "TRANSFER" | "OTHER"; // 결제 방법
  registrationAt: string; // 등록 날짜
  content: string; // 결제 내용
  price: number; // 결제 가격
  status: boolean; // 결제 상태
}

//회원추가
export interface FormData {
  planId: number;
  name: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  address: string;
  visitPath: string;
  birthDate: string;
  memo: string;
  planPayment: PlanPayment;
  otherPayment: OtherPayment[];
}
