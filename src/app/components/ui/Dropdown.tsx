import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

interface DropdownProps {
  options: string[]; // 드롭다운에 표시할 옵션
  placeholder?: string; // 초기 상태의 플레이스홀더
  defaultValue?: string; // 초기 선택 값
  onChange?: (value: string) => void; // 선택 시 호출되는 콜백
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "선택하세요",
  defaultValue = "",
  onChange,
  className = "",
}) => {
  const [selected, setSelected] = useState<string>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 기본값이 설정되지 않은 경우, 첫 번째 옵션을 기본값으로 설정
  useEffect(() => {
    if (!defaultValue && options.length > 0) {
      setSelected(options[0]);
    }
  }, [defaultValue, options]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 드롭다운 선택 영역 */}
      <div
        className={`w-full font-size-4 px-3 py-1.5 border-[1px] rounded-lg cursor-pointer flex items-center justify-between 
            ${
              selected
                ? "border-[#3c6229] text-[#3c6229]"
                : "border-[#d1d1d1] text-[#d1d1d1]"
            }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <SlArrowDown />
      </div>

      {/* 드롭다운 옵션 목록 */}
      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className={`p-3 hover:bg-[#f1f1f1] cursor-pointer ${
                selected === option
                  ? "bg-[#f6f6f6] text-[#3c6229] font-bold"
                  : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
