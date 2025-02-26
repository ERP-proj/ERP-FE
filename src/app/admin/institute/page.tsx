"use client";
import SideBar from "@/app/components/admin/SideBar";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 items-center justify-center">
        이용권 관리 페이지입니다
      </div>
    </div>
  );
}
