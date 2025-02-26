import apiClient from "@/api/core/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Member } from "@/types/memberType";

// ✅ API 응답 타입 정의
interface MemberListResponse {
  data: Member[]; // `data` 속성 포함
}

// ✅ API에서 회원 목록을 가져오는 함수
const fetchMemberList = async ({
  pageParam = null,
  status,
}: {
  pageParam: number | null;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
}): Promise<MemberListResponse> => {
  const response = await apiClient.get("/api/customer/getCustomers", {
    params: {
      status,
      ...(pageParam ? { lastId: pageParam } : {}),
    },
  });

  return response.data; // ✅ API 응답 구조 유지
};

// ✅ useInfiniteQuery를 활용한 무한스크롤 훅
const usePaginatedMembers = (status: "ACTIVE" | "INACTIVE" | "DELETED") => {
  return useInfiniteQuery<
    MemberListResponse, // ✅ API 응답 타입
    Error, // ✅ 에러 타입
    MemberListResponse, // ✅ `TQueryFnData` → 정확한 타입 적용
    ["members", "ACTIVE" | "INACTIVE" | "DELETED"], // ✅ `TQueryKey`
    number | null // ✅ `TPageParam`
  >({
    queryKey: ["members", status], // ✅ 상태별로 다른 캐시 사용
    queryFn: async ({ pageParam = null }) =>
      fetchMemberList({ pageParam, status }),
    initialPageParam: null, // ✅ 초기 페이지 파라미터 설정 (필수)
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.data.length < 20) return null; // ✅ lastPage.data.length 사용
      return lastPage.data[lastPage.data.length - 1].customerId; // ✅ 마지막 요소 선택
    },
  });
};

export default usePaginatedMembers;
