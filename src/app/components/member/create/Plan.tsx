"use client";

import React, { useState } from "react";
import Dropdown from "../../ui/Dropdown";

const Plan: React.FC = () => {
  const [selectedGroup1, setSelectedGroup1] = useState("1종");
  const [selectedGroup2, setSelectedGroup2] = useState("시간제");
  const [selectedGroup3, setSelectedGroup3] = useState("취득");

  return (
    <div className="mb-4 p-4">
      {/* 구분1 */}
      <h4 className="text-sm font-bold mb-2">구분 1</h4>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedGroup1("1종")}
          className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
            selectedGroup1 === "1종"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          1종
        </button>
        <button
          onClick={() => setSelectedGroup1("2종")}
          className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
            selectedGroup1 === "2종"
              ? "bg-[#3C6229] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          2종
        </button>
      </div>

      {/* 구분2 */}
      <h4 className="text-sm font-bold mb-2">구분 2</h4>
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
      <h4 className="text-sm font-bold mb-2">구분 3</h4>
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
        options={[
          "10시간 이용권",
          "15시간 이용권",
          "20시간 이용권",
          "1개월 이용권",
        ]}
        placeholder="이용권 선택"
        defaultValue="10시간 이용권"
        className="w-full"
      />
    </div>
  );
};

export default Plan;
