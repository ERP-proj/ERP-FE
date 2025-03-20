import React, { useEffect, useState } from "react";
import Table from "../../ui/Table";
import { adminAPI } from "@/api/admin/institute";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import EditStoreModal from "./EditStoreModal";

const storeColumns = [
  { name: "매장명", width: "45%" },
  { name: "영업시간", width: "50%" },
  { name: "수정", width: "15%" },
];

const MainTable: React.FC = () => {
  const [institutes, setInstitutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<any>(null); // 수정할 매장
  const router = useRouter();

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const data = await adminAPI.getInstitutes();
        // ✅ API 데이터 변환 (openTime, closeTime 조합)
        const formattedData = data.map((store: any) => ({
          아이디: store.id,
          매장명: store.name,
          영업시간: `${store.openTime.slice(0, 5)} ~ ${store.closeTime.slice(
            0,
            5
          )}`, // HH:MM 형식으로 변환
          수정: (
            <div className="flex justify-center items-center h-full">
              <MdModeEdit
                className="text-gray-500 text-xl cursor-pointer hover:text-[#3C6229] transition"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ 행 클릭과 수정 클릭 이벤트 분리
                  setSelectedStore(store); // 선택한 매장 정보 저장
                }}
              />
            </div>
          ),
        }));

        setInstitutes(formattedData);
      } catch (error) {
        console.error("매장 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  // ✅ 행 클릭 시 상세 페이지 이동
  const handleRowClick = (instituteId: number) => {
    router.push(`/admin/institute/${instituteId}`);
  };

  return (
    <div className="flex w-full max-w-6xl min-h-screen">
      <div className="w-full">
        {loading ? (
          <p className="text-center py-4">⏳ 데이터 불러오는 중...</p>
        ) : (
          <Table
            columns={storeColumns}
            data={institutes}
            selectable
            onRowClick={handleRowClick}
          />
        )}
        {/* 점주 수정 모달 */}
        {selectedStore && (
          <EditStoreModal
            isOpen={!!selectedStore}
            onClose={() => setSelectedStore(null)}
            store={selectedStore}
          />
        )}
      </div>
    </div>
  );
};

export default MainTable;
