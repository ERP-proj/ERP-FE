"use client";

import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TopControls from "../components/member/list/TopControls";
import MemberList from "../components/member/list/MemberList";
import MemberRow from "../components/member/list/MemberRow";
import useCustomerStore from "@/store/useCustomerStore";
import DetailMember from "../components/member/detail/DetailMember";

export default function Page() {
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 상태
  const { fetchCustomer } = useCustomerStore();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (customerId: number) => {
    console.log("선택된 customerId:", customerId);
    fetchCustomer(customerId); // Zustand에서 API 호출
    setSelectedCustomerId(customerId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomerId(null); // 모달 닫기 시 초기화
  };
  return (
    <div className="flex items-center h-screen">
      <div className="h-full">
        <SideBar />
      </div>
      {/* 메인콘텐츠 */}
      <div className="relative h-[900px] flex-[8_0_0] bg-white rounded-xl p-4 max-w-[1500px] w-full">
        <TopControls setSearchResults={setSearchResults} />
        <div className="relative h-[790px]">
          {/* 검색결과가 있을경우 */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 rounded-xl gap-2 p-4 border border-gray-300 h-full overflow-y-auto">
              {searchResults.map((member, customerId) => (
                <MemberRow
                  key={customerId}
                  member={member}
                  onClick={() => handleRowClick(member.customerId)}
                />
              ))}
              {/* 모달 */}
              {isModalOpen && selectedCustomerId && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
                      <DetailMember
                        customerId={selectedCustomerId}
                        onClose={closeModal}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <MemberList />
          )}
        </div>
      </div>
    </div>
  );
}
