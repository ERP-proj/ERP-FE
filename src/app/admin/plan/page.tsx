"use client";
import Header from "@/app/components/admin/Header";
import SideBar from "@/app/components/admin/SideBar";
import React from "react";
import MainTable from "@/app/components/admin/plan/MainTable";
import { RegisterButton } from "@/app/components/admin/plan/RegisterButton";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      {/* 오른쪽 메인 레이아웃 */}
      <div className="flex flex-col flex-1">
        {/* 헤더 (고정, 가로 전체) */}
        <Header />

        {/* 메인 콘텐츠 (가운데 정렬) */}
        <div className="flex flex-1 flex-col items-center p-6">
          <div className="w-full max-w-5xl bg-white p-6 rounded-lg ">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-7">이용권 조회</h2>
              <RegisterButton />
            </div>

            <MainTable />
          </div>
        </div>
      </div>
    </div>
  );
}
