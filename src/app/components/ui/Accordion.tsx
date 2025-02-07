import React from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface Props {
  title: string;
  isOpen: boolean; // 아코디언 열림 여부
  toggleOpen?: () => void; // 아코디언 열림/닫힘 함수
  footer?: React.ReactNode; // 하단 내용
  children: React.ReactNode; // 아코디언 본문
}

const Accordion: React.FC<Props> = ({
  title,
  isOpen,
  toggleOpen,
  footer = null,
  children,
}) => {
  return (
    <div className="m-0 relative">
      {/* 아코디언 버튼 */}
      <button
        className="w-full bg-[#F2F8ED] flex justify-between items-center p-4 text-left text-lg font-bold mb-0.5 text-[#3C6229]"
        onClick={toggleOpen}
      >
        {title}
        <span>{isOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
      </button>

      {/* 아코디언 컨텐츠 */}
      {isOpen && (
        <div className="relative">
          <div className="overflow-y-auto h-[570px]">{children}</div>
          {footer && (
            <div className="absolute bottom-0 bg-white left-0 right-0 h-[130px] px-4 border-t border-t-1 flex justify-between items-center">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
