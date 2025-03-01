"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Table from "@/app/components/ui/Table";
import BasicButton from "@/app/components/ui/BasicButton";
import OwnerRegisterButton from "@/app/components/admin/institute/OwnerRegisterButton";
import EditOwnerModal from "@/app/components/admin/institute/EditOwnerModal";

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
  { name: "점주명", width: "45%" },
  { name: "아이디", width: "50%" },
  { name: "수정", width: "15%" },
];

const InstituteDetailPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState<any>(null);
  const [selectedOwner, setSelectedOwner] = useState<any>(null); // 수정할 점주

  useEffect(() => {
    if (id === "6") {
      setStore(mockStoreDetails);
    }
  }, [id]);

  if (!store) {
    return <p className="text-center py-4">⏳ 데이터를 불러오는 중...</p>;
  }

  const formattedData =
    store?.owners?.map((owner: any) => ({
      점주명: owner.name,
      아이디: owner.username,
      수정: (
        <MdModeEdit
          className="text-gray-500 text-xl cursor-pointer hover:text-[#3C6229] transition"
          onClick={() => setSelectedOwner(owner)}
        />
      ),
    })) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{store.name}</h2>
      {/* 버튼 영역 */}
      <div className="flex justify-end mt-4 mb-4 gap-4">
        <OwnerRegisterButton />
        <BasicButton color="danger" size="medium" border>
          삭제
        </BasicButton>
      </div>
      {/* 점주 목록 테이블 */}
      <Table columns={columns} data={formattedData} selectable />
      {/* 점주 수정 모달 */}
      {selectedOwner && (
        <EditOwnerModal
          isOpen={!!selectedOwner}
          onClose={() => setSelectedOwner(null)}
          owner={selectedOwner}
        />
      )}
    </div>
  );
};

export default InstituteDetailPage;
