"use client";

import { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import { memberAPI } from "@/api/member";
import { Member } from "@/types/memberType";
import DetailMember from "./DetailMember";

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null); // 선택된 회원 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // setSelectedMember({
    //   photoUrl: null,
    //   name: "테스트 회원",
    //   gender: "FEMALE",
    //   phone: "01012345678",
    //   address: "서울특별시",
    //   planPayment: null,
    //   otherPayment: [],
    // });
    // setIsModalOpen(true);
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
      console.log("상세 데이터:", memberDetail); // 전체 응답 출력
      console.log("상세 데이터의 data 필드:", memberDetail.data); // data 필드 확인
      setSelectedMember(memberDetail.data); // 선택된 회원 정보 설정
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
    console.log("isModalOpen:", isModalOpen);
  }, [selectedMember, isModalOpen]);

  return (
    <div className="grid grid-cols-1 rounded-xl gap-4 p-4 border border-gray-300  h-full overflow-y-auto">
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
          {console.log("모달 렌더링 중")}
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

// import { useEffect, useState } from "react";
// import MemberRow from "./MemberRow";
// import { member } from "@/api/member";
// import { Member } from "@/types/memberType";
// import DetailMember from "./DetailMember";

// const MemberList = () => {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
//     null
//   ); // 타입을 number | null로 수정
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchMemberRow = async () => {
//       try {
//         const response = await member.getMemberRow(0); // 0번째 페이지 데이터 가져오기
//         setMembers(response.data.data); // 서버에서 받은 데이터 저장
//         console.log("회원 데이터:", response.data.data);
//       } catch (error) {
//         console.error("회원 데이터 조회 오류:", error);
//       }
//     };
//     fetchMemberRow();
//   }, []);

//   const handleRowClick = (customerId: number) => {
//     setSelectedCustomerId(customerId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCustomerId(null);
//   };

//   return (
//     <div className="grid grid-cols-1 rounded-xl gap-4 p-4 border border-gray-300 h-full overflow-y-auto">
//       {members.map((member) => (
//         <MemberRow
//           key={member.customerId}
//           member={member}
//           onClick={handleRowClick}
//         />
//       ))}
//       {isModalOpen && selectedCustomerId && (
//         <DetailMember customerId={selectedCustomerId} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default MemberList;
