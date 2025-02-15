"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Dropdown, { DropdownOption } from "../../ui/Dropdown";
import CreateMember from "../create/CreateMember";
import { memberAPI } from "@/api/member";
import debounce from "lodash/debounce";
import { FormData } from "@/types/memberType";

const TopControls = ({ setSearchResults }: { setSearchResults: any }) => {
  const [keyword, setKeyword] = useState("");
  const [formData, setFormData] = useState<FormData>({
    planId: 0,
    photoUrl: "string",
    name: "",
    gender: "MALE",
    phone: "",
    address: "",
    visitPath: "",
    birthDate: "",
    memo: "",
    photoFile: null,
    planPayment: {
      paymentsMethod: "CARD",
      registrationAt: "",
      discountRate: 0,
      status: false,
      licenseType: "",
      planType: "",
      courseType: "",
      planPrice: 0,
      planName: "",
      discountName: "",
      discountPrice: 0,
      otherPaymentMethod: "",
    },
    otherPayment: [
      {
        paymentsMethod: null,
        otherPaymentMethod: "",
        registrationAt: "",
        content: "",
        price: 0,
        status: false,
      },
    ],
  });

  // 디바운싱된 검색 함수
  const debouncedSearch = useCallback(
    debounce(async (searchKeyword: string) => {
      try {
        if (!searchKeyword.trim()) {
          setSearchResults([]); // 검색어가 없으면 결과 초기화
          return;
        }
        const response = await memberAPI.searchCustomerName(searchKeyword);
        setSearchResults(response.data || []); // 결과 데이터를 부모 컴포넌트로 전달
      } catch (error) {
        console.error("검색 오류:", error);
      }
    }, 500),
    [setSearchResults]
  );
  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // ✅ 언마운트 시 debounce 취소
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };
  const sortingOptions: DropdownOption[] = [
    { label: "최신순", value: "latest" },
    { label: "이용 시간이 많은 순", value: "most_used" },
    { label: "이용 시간이 적은 순", value: "least_used" },
  ];

  const memberStatusOptions: DropdownOption[] = [
    { label: "이용 가능 회원 조회", value: "active" },
    { label: "만료된 회원 조회", value: "expired" },
    { label: "삭제된 회원 조회", value: "deleted" },
    { label: "전체 회원 조회", value: "all" },
  ];

  return (
    <div className="flex items-center mb-4 h-16 bg-[#f6f6f6] p-4 rounded-lg shadow">
      {/* 검색 */}
      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          placeholder="회원 검색"
          value={keyword}
          onChange={handleSearchChange}
          className="input-content"
        />
        <FiSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <Dropdown
        options={sortingOptions}
        placeholder="정렬 기준 선택"
        defaultValue=""
        className="ml-4 w-[180px]"
      />
      <Dropdown
        options={memberStatusOptions}
        placeholder="정렬 기준 선택"
        defaultValue=""
        className="ml-4 w-[200px]"
      />
      <div className="ml-auto">
        <CreateMember formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};
export default TopControls;
