import React from "react";

export default function TopControls() {
  return (
    <div className="flex justify-between items-center mb-4 h-20 bg-gray-300 p-4">
      {/* 검색 */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="회원 검색"
          className="border rounded p-2 w-full"
        />
      </div>
      {/* 정렬 */}
      <div className="ml-8">
        <select className="border rounded p-2">
          <option value="">최신순</option>
          <option value="">오래된순</option>
        </select>
      </div>
      {/* 필터 */}
      <div className="ml-8">
        <select className="border rounded p-2">
          <option value="">전체 회원 조회</option>
          <option value="">이용 가능 회원 조회</option>
          <option value="">만료된 회원 조회</option>
          <option value="">삭제된 회원 조회</option>
        </select>
      </div>
      {/* 등록 버튼 */}
      <button className="ml-8 bg-yellow-300 rounded px-4 py-2 hover:bg-white hover:text-black">
        회원 등록
      </button>
    </div>
  );
}
