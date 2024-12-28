"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../ui/Dropdown";

export default function TopControls() {
  return (
    <div className="flex items-center mb-4 h-16 bg-[#f6f6f6] p-4 rounded-lg shadow">
      {/* 검색 */}
      <div className="relative flex-1 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="검색"
          className="border border-gray-300 rounded-lg p-2 pl-10 w-full bg-[#F2f8ed] focus:outline-none focus:ring-1 focus:ring-[#B4D89C]"
        />
      </div>
      <Dropdown
        options={["최신순", "이용 시간이 많은 순", "이용 시간이 적은 순"]}
        placeholder="정렬 기준 선택"
        defaultValue=""
        className="ml-4 w-[180px]"
      />
      <Dropdown
        options={[
          "이용 가능 회원 조회",
          "만료된 회원 조회",
          "삭제된 회원 조회",
          "전체 회원 조회",
        ]}
        placeholder="정렬 기준 선택"
        defaultValue=""
        className="ml-4 w-[200px]"
      />

      {/* 등록 버튼 */}
      <button className="ml-auto bg-[#3c6229] text-white rounded-lg px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        회원 등록
      </button>
    </div>
  );
}
