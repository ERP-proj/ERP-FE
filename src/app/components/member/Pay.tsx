"use client";

import React, { useState } from "react";

const Pay = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleMethodClick = (method: string) => {
    setSelectedMethod(method === selectedMethod ? "" : method); // 선택된 방법을 토글
  };

  return (
    <div>
      <h4 className="text-sm font-bold mb-2">결제 방법</h4>
      <div className="grid grid-cols-2 gap-2 py-2">
        {/* 결제 방법 버튼 */}
        {["현금", "카드", "계좌이체", "기타"].map((method, index) => (
          <button
            key={index}
            onClick={() => handleMethodClick(method)}
            className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border ${
              selectedMethod === method
                ? "bg-[#3C6229] text-white border-[#3C6229]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {method}
          </button>
        ))}
      </div>

      {/* 기타 입력 필드 */}
      {selectedMethod === "기타" && (
        <input
          type="text"
          placeholder="기타 입력"
          className="w-full mt-2 p-2 rounded-md border border-gray-300 placeholder-gray-400 text-sm"
        />
      )}
    </div>
  );
};

export default Pay;
