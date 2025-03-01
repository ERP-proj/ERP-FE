import React, { useEffect, useState } from "react";
import Table from "../../ui/Table";
import { adminAPI } from "@/api/admin/institute";
import { useRouter } from "next/navigation";

const storeColumns = [
  { name: "매장명", width: "70%" },
  { name: "영업시간", width: "40%" },
];

const MainTable: React.FC = () => {
  const [institutes, setInstitutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const data = await adminAPI.getInstitutes();
        // ✅ API 데이터 변환 (openTime, closeTime 조합)
        const formattedData = data.map((store: any) => ({
          매장명: store.name,
          영업시간: `${store.openTime.slice(0, 5)} ~ ${store.closeTime.slice(
            0,
            5
          )}`, // HH:MM 형식으로 변환
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
  const handleRowClick = (id: number) => {
    router.push(`/admin/institute/${id}`); // ✅ 동적 라우팅
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
      </div>
    </div>
  );
};

export default MainTable;
