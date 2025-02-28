"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md"; // 연필 아이콘
import Table from "@/app/components/ui/Table";
import BasicButton from "@/app/components/ui/BasicButton";

const mockStoreDetails = {
  id: 6,
  name: "매장 6",
  owners: [
    { id: 1, name: "점주 1", username: "aowkd123" },
    { id: 2, name: "점주 2", username: "aowkdaowkd12" },
    { id: 3, name: "점주 3", username: "maejang22" },
    { id: 4, name: "점주 4", username: "maejang567" },
    { id: 5, name: "점주 5", username: "maejang_1211" },
    { id: 6, name: "점주 6", username: "immaejang" },
    { id: 7, name: "점주 7", username: "owner88" },
    { id: 8, name: "점주 8", username: "hihi333" },
    { id: 9, name: "점주 9", username: "qwer12345" },
    { id: 10, name: "점주 10", username: "asdf111" },
  ],
};

const columns = [
  { name: "점주명", width: "40%" },
  { name: "아이디", width: "50%" },
  { name: "정보 수정", width: "10%" },
];

const InstituteDetailPage = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  //   const router = useRouter();
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    // ✅ API 대신 목데이터 적용
    if (id === "6") {
      setStore(mockStoreDetails);
    }
  }, [id]);

  const formattedData = store.owners.map((owner: any) => ({
    점주명: owner.name,
    아이디: owner.username,
    "정보 수정": <MdModeEdit className="text-gray-500 cursor-pointer" />,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{store.name}</h2>
      {/* 버튼 영역 */}
      <div className="flex justify-end mt-4 mb-4 gap-4">
        <BasicButton color="primary" size="medium">
          점주 등록
        </BasicButton>
        <BasicButton color="danger" size="medium" border>
          삭제
        </BasicButton>
      </div>
      {/* 점주 목록 테이블 */}
      <Table columns={columns} data={formattedData} selectable />
    </div>
  );
};

export default InstituteDetailPage;
