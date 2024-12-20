import SideBar from "@/app/components/SideBar";
import TopControls from "@/app/components/member/TopControls";
import React from "react";

export default function Page() {
  return (
    <div className="flex gap-4 justify-center align-middle h-screen">
      <div className="w-1/6 h-full bg-gray-200">
        <SideBar />
      </div>
      <div className="flex-[9_0_0] bg-gray-500">
        {/* Top Controls */}
        <TopControls />

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
