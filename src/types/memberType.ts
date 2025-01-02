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
