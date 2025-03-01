"use client";

import React, { useState } from "react";
import BasicButton from "../../ui/BasicButton";
import apiClient from "@/api/core/apiClient";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [licenseType, setLicenseType] = useState<string | null>(null);
  const [planType, setPlanType] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState("");
  const [planName, setPlanName] = useState("");
  const planOptions = [
    "5시간 이용권",
    "10시간 이용권",
    "15시간 이용권",
    "20시간 이용권",
  ];
  const [price, setPrice] = useState("");

  const handleRegister = async () => {
    if (!planType || !licenseType) {
      return;
    }

    const requestData = {
      planType,
      licenseType,
      courseType: "ACQUISITION",
      planName,
      price: Number(price),
      availableTime: Number(availableTime),
      availablePeriod: 30,
    };

    console.log("📤 API 요청 데이터:", requestData);

    try {
      const response = await apiClient.post("api/admin/addPlan", requestData);
      console.log("✅ API 응답:", response.data);

      if (response.status === 200) {
        console.log("🎉 등록 성공!");
      }
    } catch (error: any) {
      console.error("❌ API 요청 실패:", error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 w-[400px] rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 제목 */}
        <h2 className="text-xl font-semibold mb-4">이용권 등록</h2>

        {/* 구분1 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">구분1</p>
          <div className="flex gap-2">
            <BasicButton
              color={licenseType === "TYPE_1" ? "primary" : "gray"}
              onClick={() => setLicenseType("TYPE_1")}
            >
              1종
            </BasicButton>
            <BasicButton
              color={licenseType === "TYPE_2" ? "primary" : "gray"}
              onClick={() => setLicenseType("TYPE_2")}
            >
              2종
            </BasicButton>
          </div>
        </div>

        {/* 구분2 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">구분2</p>
          <div className="flex gap-2">
            <BasicButton
              color={planType === "TIME_BASED" ? "primary" : "gray"}
              onClick={() => setPlanType("TIME_BASED")}
            >
              시간제
            </BasicButton>
            <BasicButton
              color={planType === "PERIOD_BASE" ? "primary" : "gray"}
              onClick={() => setPlanType("PERIOD_BASE")}
            >
              기간제
            </BasicButton>
          </div>
        </div>

        {/* 이용가능시간 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">이용가능시간</p>
          <input
            type="text"
            className="w-full input-content"
            placeholder="이용가능시간을 입력해주세요"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
          />
        </div>

        {/* 이용권이름 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">이용권이름</p>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          >
            <option value="" disabled>
              이용권을 선택해주세요
            </option>
            {planOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* 금액 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">금액</p>
          <input
            type="number"
            className="w-full input-content"
            placeholder="이용권 금액을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2">
          <BasicButton color="secondary" size="large" border onClick={onClose}>
            취소
          </BasicButton>
          <BasicButton color="primary" size="large" onClick={handleRegister}>
            등록 완료
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
