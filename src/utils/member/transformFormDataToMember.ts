import { FormData } from "@/types/memberType";

export const transformFormDataToMember = (
  formData: FormData,
  previewUrl: string
) => {
  const planNameMap: Record<number, string> = {
    1: "1시간 이용권",
    2: "6시간 이용권",
    3: "12시간 이용권",
    // 필요시 추가
  };

  const remainingTimeMap: Record<number, number> = {
    1: 5,
    2: 30,
    3: 60,
  };

  return {
    customerId: Date.now(), // 임시 ID
    name: formData.name,
    phone: formData.phone,
    gender: formData.gender,
    licenseType: formData.planPayment.licenseType || "TYPE_1",
    planName: planNameMap[formData.planId] || "",
    planType: formData.planPayment.planType || "TIME_BASED",
    courseType: formData.planPayment.courseType || "ACQUISITION",
    registrationDate: formData.planPayment.registrationAt,
    photoUrl: previewUrl || "https://via.placeholder.com/150",
    remainingTime: remainingTimeMap[formData.planId] || 0,
    usedTime: 0,
    absenceCount: 0,
    lateCount: 0,
    otherPaymentPrice: formData.otherPayment?.[0]?.price || 0,
    status: "ACTIVE",
  };
};
