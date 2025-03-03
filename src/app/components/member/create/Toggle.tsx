import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PlanPayment, OtherPayment } from "@/types/memberType";

interface ToggleProps {
  formData: { planPayment: PlanPayment; otherPayment: OtherPayment[] };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  keyPath: "planPayment" | "otherPayment"; // 상태를 구분하기 위한 키
  index?: number; // otherPayment 배열의 특정 항목을 식별하기 위한 인덱스
}

const Toggle: React.FC<ToggleProps> = ({
  formData,
  setFormData,
  keyPath,
  index,
}) => {
  const handleToggleChange = () => {
    if (keyPath === "planPayment") {
      // PlanPayment의 status 변경
      setFormData((prevData: any) => ({
        ...prevData,
        planPayment: {
          ...prevData.planPayment,
          status: !prevData.planPayment.status,
        },
      }));
    } else if (keyPath === "otherPayment" && typeof index === "number") {
      // OtherPayment 배열의 특정 항목의 status 변경
      setFormData((prevData: any) => ({
        ...prevData,
        otherPayment: prevData.otherPayment.map(
          (payment: OtherPayment, idx: number) =>
            idx === index ? { ...payment, status: !payment.status } : payment
        ),
      }));
    }
  };

  const status =
    keyPath === "planPayment"
      ? formData.planPayment.status
      : keyPath === "otherPayment" && typeof index === "number"
      ? formData.otherPayment[index]?.status
      : false;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggleChange}
    >
      <FaRegCircleCheck
        data-testid="toggle-icon"
        className={`w-5 h-5 ${
          status ? "text-[#3C6229]" : "text-gray-300"
        } transition-colors duration-200`}
      />
      <span
        className={`text-sm ${status ? "text-[#3C6229]" : "text-gray-600"}`}
      >
        {status ? "결제완료" : "미납"}
      </span>
    </div>
  );
};

export default Toggle;
