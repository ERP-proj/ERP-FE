"use client";

import { useForm } from "react-hook-form";
import BasicButton from "../../ui/BasicButton";
import React from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  ownerName: string;
  username: string;
  password: string;
}

const OwnerRegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      ownerName: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("📌 등록할 점주 정보:", data);
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[410px]">
        <h2 className="text-xl font-semibold mb-4">점주 등록</h2>

        {/* 점주 등록 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 점주명 입력 */}
          <div>
            <label className="block text-sm font-medium">
              점주명 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("ownerName", { required: "점주명을 입력해주세요." })}
              placeholder="점주명을 입력해주세요."
              className="w-full input-content"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ownerName.message}
              </p>
            )}
          </div>

          {/* 아이디 입력 */}
          <div>
            <label className="block text-sm font-medium">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username", {
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "아이디는 4자 이상이어야 합니다.",
                },
              })}
              placeholder="아이디를 입력해주세요."
              className="w-full input-content"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-sm font-medium">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다.",
                },
              })}
              placeholder="비밀번호를 입력해주세요."
              className="w-full input-content"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex justify-between items-center mt-6">
            <BasicButton
              color="secondary"
              size="large"
              border
              onClick={onClose}
            >
              취소
            </BasicButton>
            <BasicButton
              color={isValid ? "primary" : "gray"}
              type="submit"
              disabled={!isValid}
              size="large"
            >
              등록 완료
            </BasicButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerRegisterModal;
