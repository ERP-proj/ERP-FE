export interface Member {
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

export interface PlanPayment {
  registrationAt: string;
  discount: number;
  status: boolean;
}

export interface OtherPayment {
  registrationAt: string;
  content: string;
  price: number;
  status: boolean;
}

export interface FormData {
  planId: number;
  name: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  address: string;
  birthDate: string;
  memo: string;
  paymentsMethod: "CARD" | "CASH";
  planPayment: PlanPayment;
  otherPayment: OtherPayment[];
}
