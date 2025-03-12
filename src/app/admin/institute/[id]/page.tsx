"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Table from "@/app/components/ui/Table";
import BasicButton from "@/app/components/ui/BasicButton";
import OwnerRegisterButton from "@/app/components/admin/institute/OwnerRegisterButton";
import EditOwnerModal from "@/app/components/admin/institute/EditOwnerModal";
import Header from "@/app/components/admin/Header";
import SideBar from "@/app/components/admin/SideBar";
import { adminAPI } from "@/api/admin/institute";

const columns = [
  { name: "점주명", width: "45%" },
  { name: "아이디", width: "50%" },
  { name: "수정", width: "15%" },
];

const InstituteDetailPage = () => {
  const { instituteId } = useParams();
  const [store, setStore] = useState<any>(null);
  const [selectedOwner, setSelectedOwner] = useState<any>(null); // 수정할 점주

  useEffect(() => {
    const fetchInstituteDetails = async () => {
      try {
        const storeData = await adminAPI.getAccounts(Number(instituteId)); // ✅ API 호출
        setStore({
          ...storeData,
          owners: storeData.owners || [],
        });
      } catch (error) {
        console.error("매장 상세 정보 불러오기 실패:", error);
      }
    };

    if (instituteId) {
      fetchInstituteDetails();
    }
  }, [instituteId]);
  if (!store) {
    return <p className="text-center py-4">⏳ 데이터를 불러오는 중...</p>;
  }

  const formattedData =
    store?.owners?.map((owner: any) => ({
      점주명: owner.name,
      아이디: owner.identifier,
      수정: (
        <MdModeEdit
          className="text-gray-500 text-xl cursor-pointer hover:text-[#3C6229] transition"
          onClick={() => setSelectedOwner(owner)}
        />
      ),
    })) || [];

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="flex-shrink-0">
        <SideBar />
      </div>

      {/* 오른쪽 메인 레이아웃 */}
      <div className="flex flex-col flex-1">
        {/* 헤더 (고정, 가로 전체) */}
        <Header />

        {/* 버튼 영역 */}
        <div className="flex flex-1 flex-col items-center p-6">
          <div className="w-full max-w-5xl bg-white p-6 rounded-lg ">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-4">{store.name}</h2>
              <div className="flex gap-2">
                <OwnerRegisterButton />
                <BasicButton color="danger" size="medium" border>
                  삭제
                </BasicButton>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default InstituteDetailPage;
