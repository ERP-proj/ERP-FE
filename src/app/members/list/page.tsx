import SideBar from "@/app/components/SideBar";
import React from "react";

export default function Page() {
  return (
    <div className="flex gap-4 justify-center align-middle h-screen">
      <div className="w-1/6 h-full bg-gray-200">
        <SideBar />
      </div>
      <div className="flex-[9_0_0] bg-gray-500">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4 h-20 bg-gray-300">
          {/* 검색 */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="검색"
              className="border rounded p-2 w-full"
            />
          </div>
          {/* 정렬 */}
          <div className="ml-4">
            <select className="border rounded p-2">
              <option value="최신순">최신순</option>
              <option value="오래된순">오래된순</option>
            </select>
          </div>
          {/* 필터 */}
          <div className="ml-4">
            <select className="border rounded p-2">
              <option value="전체">전체</option>
              <option value="이용 가능">이용 가능</option>
              <option value="제외 조치">제외 조치</option>
            </select>
          </div>
          {/* 추가 버튼 */}
          <button className="ml-4 bg-blue-500 text-white rounded px-4 py-2">
            회원 등록
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
          {/* Row */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white border rounded shadow-sm"
            >
              {/* 프로필 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-bold">이름</p>
                  <p>전화번호</p>
                </div>
              </div>

              {/* 이용권 정보 */}
              <div className="text-center">
                <p className="font-bold">1/2 중</p>
                <p>이용권</p>
              </div>

              {/* 기타 정보 */}
              <div className="text-right">
                <p>등록한 날짜</p>
                <p className="text-gray-500">2024-12-20</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
