"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

export default function TopControls() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("이용 가능 회원 조회");

  const filters = [
    "전체 회원 조회",
    "이용 가능 회원 조회",
    "만료된 회원 조회",
    "삭제된 회원 조회",
  ];

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex items-center mb-4 h-16 bg-[#f6f6f6] p-4 rounded-lg shadow">
      {/* 검색 */}
      <div className="relative flex-1 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="검색"
          className="border border-gray-300 rounded-lg p-2 pl-10 w-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 정렬 */}
      <div className="ml-4">
        <select className="border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      {/* 필터 */}
      <div className="ml-4 relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {selectedFilter}
        </button>
        {isFilterOpen && (
          <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <ul className="py-2">
              {filters.map((filter, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterSelect(filter)}
                  className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedFilter === filter
                      ? "text-green-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {/* 체크 아이콘 */}
                  {selectedFilter === filter && (
                    <FaCheck className="text-green-500 mr-2" />
                  )}
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 등록 버튼 */}
      <button className="ml-auto bg-[#3c6229] text-white rounded-lg px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        회원 등록
      </button>
    </div>
  );
}
