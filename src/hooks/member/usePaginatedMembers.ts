import apiClient from "@/api/core/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";

// ✅ API에서 회원 목록을 가져오는 함수
const fetchMembers = async ({
  pageParam = null,
  status,
}: {
  pageParam: number | null;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
}) => {
  const response = await apiClient.get("/api/customer/getCustomers", {
    params: {
      status,
      ...(pageParam ? { lastId: pageParam } : {}), // lastId가 있을 경우에만 포함
    },
  });

  return response.data.data; // ✅ API 응답에서 `data` 속성 가져오기
};

// ✅ useInfiniteQuery를 활용한 무한스크롤 훅
const usePaginatedMembers = (status: "ACTIVE" | "INACTIVE" | "DELETED") => {
  return useInfiniteQuery<
    { customerId: number }[], // ✅ API 응답 데이터 타입 (배열)
    Error, // ✅ 에러 타입
    { customerId: number }[], // ✅ `TQueryFnData` (쿼리 함수의 반환 타입)
    ["members", "ACTIVE" | "INACTIVE" | "DELETED"], // ✅ `TQueryKey` (쿼리 키 타입)
    number | null // ✅ `TPageParam` (페이지 매개변수 타입)
  >({
    queryKey: ["members", status], // ✅ 상태별로 다른 캐시 사용
    queryFn: async ({ pageParam = null }) =>
      fetchMembers({ pageParam, status }), // ✅ `pageParam`을 명확히 지정
    initialPageParam: null, // ✅ 초기 페이지 파라미터 설정 (필수)
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 20) return null; // ✅ 20개보다 적으면 다음 페이지 없음
      return lastPage[lastPage.length - 1].customerId; // ✅ 마지막 회원 ID를 다음 요청의 lastId로 설정
    },
  });
};

export default usePaginatedMembers;
