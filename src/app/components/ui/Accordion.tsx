import React from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface Props {
  title: string;
  isOpen: boolean; // 아코디언 열림 여부
  toggleOpen: () => void; // 아코디언 열림/닫힘 함수
  children?: React.ReactNode;
}

const Accordion: React.FC<Props> = ({
  title,
  isOpen,
  toggleOpen,
  children,
}) => {
  return (
    <div className="m-0">
      <button
        className="w-full bg-[#F2F8ED] flex justify-between items-center p-4 text-left text-lg font-bold mb-0.5 text-[#3C6229]"
        onClick={toggleOpen}
      >
        {title}
        <span>{isOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Accordion;
