"use client";

import React from "react";
import SideBar from "../components/SideBar";
import TopControls from "../components/member/TopControls";
import MemberList from "../components/member/MemberList";

export default function Page() {
  return (
    <div className="flex items-center h-screen">
      {/* 사이드바 */}
      <div className="flex">
        <SideBar />
      </div>
      {/* 메인콘텐츠 */}
      <div className="relative h-[900px] flex-[8_0_0] bg-white rounded-3xl p-4 max-w-[1500px] w-full">
        <TopControls />
        <div className="relative h-[790px]">
          <MemberList />
        </div>
      </div>
    </div>
  );
}
