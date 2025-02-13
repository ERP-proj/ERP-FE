import React from "react";

interface BasicButtonProps {
  border?: boolean;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger" | "gray";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const BasicButton: React.FC<BasicButtonProps> = ({
  border = false,
  size = "medium",
  color = "primary",
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const sizeStyles = {
    small: "w-[58px] h-[34px] rounded-lg px-4 py-2 gap-2 text-sm",
    medium: "w-[114.67px] h-[38px] rounded-lg px-4 py-2 gap-2 text-lg",
    large: "w-[176px] h-[38px] rounded-lg px-4 py-2 gap-2 text-lg",
  };

  const colorStyles = {
    primary: "bg-[#3C6229] text-white hover:bg-[#3c5000]",
    secondary:
      "bg-[#fff] border border-1 border-[#3A3A3A] text-[#3A3A3A] hover:bg-[#F2F8ED] border border-1 border-[#3C6229]",
    danger:
      "bg-[#fff] border border-1 border-[#DB5461] text-[#DB5461] hover:bg-[#F4C3C8] border border-1 border-[#DB5461]",
    gray: "bg-[#D1D1D1] text-[#fff] hover:bg-[#3C6229]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex  justify-center items-center rounded-[8px] font-[600] ${
        sizeStyles[size]
      } ${colorStyles[color]} ${
        border ? "border" : "border-none"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default BasicButton;
