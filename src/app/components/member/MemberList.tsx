import { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import { member } from "@/api/member";
import { Member } from "@/types/memberType";

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMemberRow = async () => {
      try {
        const data = await member.getMemberRow(0); // 0번째 페이지 데이터 가져오기
        setMembers(data.data); // 서버에서 받은 데이터 저장
        console.log("회원 데이터:", data);
      } catch (error) {
        console.error("회원 데이터 조회 오류:", error);
      }
    };
    fetchMemberRow();
  }, []);

  return (
    <div className="grid grid-cols-1 rounded-xl gap-4 p-4 border border-gray-300  h-full overflow-y-auto">
      {members.map((member, index) => (
        <MemberRow key={index} member={member} />
      ))}
    </div>
  );
};

export default MemberList;
