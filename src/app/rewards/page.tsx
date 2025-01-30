"use client";

import React from "react";
import SideBar from "../components/SideBar";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      {/* 메인콘텐츠 */}
      <div className="flex flex-1 items-center justify-center">
        준비 중인 페이지입니다.
      </div>
    </div>
  );
}
