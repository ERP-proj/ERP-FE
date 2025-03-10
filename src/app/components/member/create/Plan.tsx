"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../ui/Dropdown";
import { memberAPI } from "@/api/member";

interface PlanOption {
  id: number;
  planType: string;
  licenseType: string;
  courseType: string;
  planName: string;
  price: number;
}

const Plan: React.FC<{
  selectedPlanId: number;
  onSelectPlan: (planId: number, planName: string, price: number) => void;
}> = ({ onSelectPlan, selectedPlanId }) => {
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PlanOption[]>([]);
  const [selectedGroup1, setSelectedGroup1] = useState("1종");
  const [selectedGroup2, setSelectedGroup2] = useState("시간제");
  const [selectedGroup3, setSelectedGroup3] = useState("취득");

  // API 호출
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        let licenseType = "";
        if (selectedGroup1 === "1종") licenseType = "TYPE_1";
        else if (selectedGroup1 === "1종 자동") licenseType = "TYPE_1_AUTO";
        else if (selectedGroup1 === "2종") licenseType = "TYPE_2";

        const response = await memberAPI.getPlans(licenseType);
        if (response && response.data) {
          setPlans(response.data);
          setFilteredPlans(response.data); // 초기값
        }
      } catch (error) {
        console.error("이용권 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPlans();
  }, [selectedGroup1]); // selectedGroup1 변경 시 API 호출

  // 구분 선택에 따라 필터링
  useEffect(() => {
    if (plans.length > 0) {
      const filtered = plans.filter((plan) => {
        const matchesPlanType =
          selectedGroup2 === "시간제"
            ? plan.planType === "TIME_BASED"
            : plan.planType === "PERIOD_BASED";

        const matchesCourseType =
          selectedGroup3 === "취득"
            ? plan.courseType === "ACQUISITION"
            : selectedGroup3 === "장롱"
            ? plan.courseType === "REFRESHER"
            : plan.courseType === "STANDARD";

        return matchesPlanType && matchesCourseType;
      });
      setFilteredPlans(filtered);
    }
  }, [selectedGroup2, selectedGroup3, plans]);

  return (
    <div className="mb-4 p-4">
      {/* 구분1 */}
      <h4 className="text-sm font-bold mb-2">면허 종류</h4>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedGroup1("1종")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup1 === "1종"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          1종
        </button>
        <button
          onClick={() => setSelectedGroup1("1종 자동")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup1 === "1종 자동"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          1종 자동
        </button>
        <button
          onClick={() => setSelectedGroup1("2종")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup1 === "2종"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          2종
        </button>
      </div>

      {/* 구분2 */}
      <h4 className="text-sm font-bold mb-2">수강 방식</h4>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedGroup2("시간제")}
          className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
            selectedGroup2 === "시간제"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          시간제
        </button>
        <button
          onClick={() => setSelectedGroup2("기간제")}
          className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
            selectedGroup2 === "기간제"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          기간제
        </button>
      </div>

      {/* 구분3 */}
      <h4 className="text-sm font-bold mb-2">수강 목적</h4>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedGroup3("취득")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup3 === "취득"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          취득
        </button>
        <button
          onClick={() => setSelectedGroup3("장롱")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup3 === "장롱"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          장롱
        </button>
        <button
          onClick={() => setSelectedGroup3("일반")}
          className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
            selectedGroup3 === "일반"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          일반
        </button>
      </div>

      <h4 className="text-sm font-bold mb-2">이용권</h4>
      <Dropdown
        options={filteredPlans.map((plan) => ({
          label: plan.planName,
          value: plan.id.toString(), // ID를 value로 사용
        }))}
        placeholder="이용권 선택"
        defaultValue={selectedPlanId ? selectedPlanId.toString() : ""}
        className="w-full"
        onChange={(selectedOption) => {
          const selectedPlan = filteredPlans.find(
            (plan) => plan.id.toString() === selectedOption
          );
          if (selectedPlan) {
            onSelectPlan(
              selectedPlan.id,
              selectedPlan.planName,
              selectedPlan.price
            );
          }
        }}
      />
    </div>
  );
};

export default Plan;
