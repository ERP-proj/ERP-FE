import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
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

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  const selectedLabel =
    options.find((option) => option.value === selected)?.label || placeholder;

  return (
    <div className={`relative dropdown ${className}`}>
      <div
        className={`w-full px-3 py-1.5 border rounded-lg cursor-pointer flex items-center justify-between ${
          selected
            ? "border-[#3c6229] text-[#3c6229]"
            : "border-[#d1d1d1] text-[#d1d1d1]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <SlArrowDown />
      </div>

      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value} // 고유한 key 설정
              className={`p-3 hover:bg-[#f1f1f1] cursor-pointer ${
                selected === option.value
                  ? "bg-[#f6f6f6] text-[#3c6229] font-bold"
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
