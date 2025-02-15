"use client";

import { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import { memberAPI } from "@/api/member";
import { Member } from "@/types/memberType";
import DetailMember from "../detail/DetailMember";

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null); // 선택된 회원 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMemberRow = async () => {
      try {
        const response = await memberAPI.getMemberRow(0);
        setMembers(response.data || []);
        console.log("회원 데이터:", response.data);
      } catch (error) {
        console.error("회원 데이터 조회 오류:", error);
      }
    };
    fetchMemberRow();
  }, []);

  const handleRowClick = async (customerId: number) => {
    console.log("선택된 customerId:", customerId);
    try {
      const memberDetail = await memberAPI.getCustomerDetail(customerId); // API 호출로 상세정보 가져오기
      console.log("상세 데이터의 data 필드:", memberDetail.data); // data 필드 확인

      // customerId를 포함하도록 데이터 가공
      const enrichedMember = { ...memberDetail.data, customerId };

      // 선택된 회원 정보 설정
      setSelectedMember(enrichedMember);
      setIsModalOpen(true);
    } catch (error) {
      console.error("회원 상세 조회 오류:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null); // 모달 닫기 시 초기화
  };
  // 상태 변화 확인
  useEffect(() => {
    console.log("selectedMember:", selectedMember);
  }, [selectedMember, isModalOpen]);

  return (
    <div className="grid grid-cols-1 rounded-xl gap-2 p-4 border border-gray-300  h-full overflow-y-auto">
      {members.map((member) => (
        <MemberRow
          key={member.customerId}
          member={member}
          onClick={handleRowClick}
        />
      ))}
      {/* 모달 */}
      {isModalOpen && selectedMember && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                닫기
              </button>
              <DetailMember member={selectedMember} onClose={closeModal} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberList;
