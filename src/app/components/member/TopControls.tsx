"use client";

import React, { useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../ui/Dropdown";
import CreateMember from "./CreateMember";
import { member } from "@/api/member";
import debounce from "lodash/debounce";

export default function TopControls({
  setSearchResults,
}: {
  setSearchResults: any;
}) {
  const [keyword, setKeyword] = useState("");

  // 디바운싱된 검색 함수
  const debouncedSearch = useCallback(
    debounce(async (searchKeyword: string) => {
      try {
        if (!searchKeyword.trim()) {
          setSearchResults([]); // 검색어가 없으면 결과 초기화
          return;
        }
        const response = await member.searchCustomerName(searchKeyword);
        setSearchResults(response.data || []); // 결과 데이터를 부모 컴포넌트로 전달
      } catch (error) {
        console.error("검색 오류:", error);
      }
    }, 500), // 500ms 디바운싱
    []
  );

  // 입력 변경 시 디바운싱된 검색 호출
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value); // 디바운싱된 검색 함수 호출
  };

  return (
    <div className="flex items-center mb-4 h-16 bg-[#f6f6f6] p-4 rounded-lg shadow">
      {/* 검색 */}
      <div className="relative flex-1 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={handleSearchChange}
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
      <div className="ml-auto">
        <CreateMember />
      </div>
    </div>
  );
}
