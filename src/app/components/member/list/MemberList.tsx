"use client";

import { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import { memberAPI } from "@/api/member";
import { Member } from "@/types/memberType";
import DetailMember from "../detail/DetailMember";
import useCustomerStore from "@/store/useCustomerStore";

const MemberList = () => {
  const { customers, fetchCustomers, fetchCustomer } = useCustomerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

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
  // 상태 변화 확인
  // useEffect(() => {
  //   console.log("selectedMember:", selectedMember);
  // }, [selectedMember, isModalOpen]);

  return (
    <div className="grid grid-cols-1 rounded-xl gap-2 p-4 border border-gray-300  h-full overflow-y-auto">
      {customers.map((member) => (
        <MemberRow
          key={member.customerId}
          member={member}
          // onClick={handleRowClick}
          onClick={() => handleRowClick(member.customerId)}
        />
      ))}
      {/* 모달 */}
      {isModalOpen && selectedCustomerId && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                닫기
              </button>
              <DetailMember
                customerId={selectedCustomerId}
                onClose={closeModal}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberList;
