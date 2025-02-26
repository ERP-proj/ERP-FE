"use client";
import SideBar from "@/app/components/admin/SideBar";
import MainTable from "@/app/components/admin/institute/MainTable";
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
        <MainTable />
      </div>
    </div>
  );
}
