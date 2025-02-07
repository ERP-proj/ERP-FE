"use client";

import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TopControls from "../components/member/list/TopControls";
import MemberList from "../components/member/list/MemberList";
import MemberRow from "../components/member/list/MemberRow";

export default function Page() {
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 상태

  return (
    <div className="flex items-center h-screen">
      {/* 사이드바 */}
      <div className="flex">
        <SideBar />
      </div>
      {/* 메인콘텐츠 */}
      <div className="relative h-[900px] flex-[8_0_0] bg-white rounded-3xl p-4 max-w-[1500px] w-full">
        <TopControls setSearchResults={setSearchResults} />
        <div className="relative h-[790px]">
          {/* 검색결과가 있을경우 */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 rounded-xl gap-4 p-4 border border-gray-300 h-full overflow-y-auto">
              {searchResults.map((member, index) => (
                <MemberRow key={index} member={member} />
              ))}
            </div>
          ) : (
            <MemberList />
          )}
        </div>
      </div>
    </div>
  );
}
