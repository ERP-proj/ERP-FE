"use client";

import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={toggleCheck}
    >
      <FaRegCircleCheck
        className={`w-5 h-5 ${
          isChecked ? "text-[#3C6229]" : "text-gray-300"
        } transition-colors duration-200`}
      />
      <span
        className={`text-sm ${isChecked ? "text-[#3C6229]" : "text-gray-600"}`}
      >
        미납여부
      </span>
    </div>
  );
};

export default Toggle;
