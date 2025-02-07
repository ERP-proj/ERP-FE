"use client";

import React, { useRef } from "react";

interface ModalProps {
  isOpen: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
  leftChildren?: React.ReactNode; // 왼쪽 섹션 콘텐츠
  rightChildren?: React.ReactNode; // 오른쪽 섹션 콘텐츠
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  // onClose,
  leftChildren,
  rightChildren,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
      <div
        ref={modalRef}
        className="bg-white w-[100%]  overflow-hidden max-w-[1100px] h-[80%] rounded-xl shadow-lg flex"
      >
        {/* 왼쪽 섹션 */}
        <div className="flex-1 overflow-y-auto rounded-l-lg bg-[#F6F6F6] p-4 max-h-full">
          {leftChildren}
        </div>

        {/* 오른쪽 섹션 */}
        <div className="flex-[0.4] ">{rightChildren}</div>
      </div>
    </div>
  );
};

export default Modal;
