import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

interface ToggleProps {
  status: boolean;
  onToggle: () => Promise<void>;
}

const Toggle2: React.FC<ToggleProps> = ({ status, onToggle }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onToggle}>
      <FaRegCircleCheck
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

export default Toggle2;
