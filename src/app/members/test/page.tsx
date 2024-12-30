"use client";

import BasicButton from "@/app/components/ui/BasicButton";
import Modal from "@/app/components/ui/Modal";
import React, { useState } from "react";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  false;

  return (
    <div className="space-y-4">
      {/* 버튼 - 테두리 있음 */}
      <BasicButton
        size="large"
        color="primary"
        border={false}
        onClick={() => alert("Clicked!")}
      >
        추가하기
      </BasicButton>

      {/* 버튼 - 테두리 없음 */}
      <BasicButton size="medium" color="secondary" border={true}>
        Secondary
      </BasicButton>

      {/* 버튼 - 테두리 있음 */}
      <BasicButton size="small" color="danger" border={true}>
        Danger
      </BasicButton>

      {/* 등록 버튼 */}
      <BasicButton
        size="medium"
        color="primary"
        border={false}
        onClick={() => setIsModalOpen(true)}
      >
        회원 등록
      </BasicButton>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* 모달 내부 콘텐츠 */}
        <div className="grid grid-cols-3 gap-6">
          {/* 이미지 선택 */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              이미지 선택
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#B4D89C] text-white rounded-md">
                준비
              </button>
              <button className="px-4 py-2 bg-[#F4C3C8] text-white rounded-md">
                촬영
              </button>
            </div>
          </div>

          {/* 입력 폼 */}
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="이름"
                className="w-full p-2 border rounded-md"
              />
              <select className="w-full p-2 border rounded-md">
                <option>성별</option>
                <option>남</option>
                <option>여</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="생년월일"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="전화번호"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <input
              type="text"
              placeholder="주소"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              placeholder="방문 경로"
              className="w-full p-2 border rounded-md"
            ></textarea>
            <textarea
              placeholder="메모"
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            취소
          </button>
          <button className="px-4 py-2 bg-[#3C6229] text-white rounded-md">
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
}
