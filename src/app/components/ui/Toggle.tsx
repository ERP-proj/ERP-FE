import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PlanPayment, OtherPayment } from "@/types/memberType";

interface ToggleProps {
  formData: { planPayment: PlanPayment; otherPayment: OtherPayment };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  keyPath: "planPayment" | "otherPayment"; // 상태를 구분하기 위한 키
}

const Toggle: React.FC<ToggleProps> = ({ formData, setFormData, keyPath }) => {
  const handleToggleChange = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      [keyPath]: {
        ...prevData[keyPath],
        status: !prevData[keyPath].status, // 동적으로 상태 변경
      },
    }));
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggleChange}
    >
      <FaRegCircleCheck
        className={`w-5 h-5 ${
          formData[keyPath].status ? "text-[#3C6229]" : "text-gray-300"
        } transition-colors duration-200`}
      />
      <span
        className={`text-sm ${
          formData[keyPath].status ? "text-[#3C6229]" : "text-gray-600"
        }`}
      >
        미납여부
      </span>
    </div>
  );
};

export default Toggle;
