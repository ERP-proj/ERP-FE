"use client";

import { useForm } from "react-hook-form";
import BasicButton from "../../ui/BasicButton";
import React, { useEffect } from "react";

interface EditOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: { id: number; name: string; username: string; password: string };
}

interface FormValues {
  ownerName: string;
  username: string;
  password: string;
}

const EditOwnerModal: React.FC<EditOwnerModalProps> = ({
  isOpen,
  onClose,
  owner,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      ownerName: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (owner) {
      setValue("ownerName", owner.name);
      setValue("username", owner.username);
      setValue("password", "********");
    }
  }, [owner, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("📌 수정된 점주 정보:", data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[410px]">
        <h2 className="text-xl font-semibold mb-4">점주 수정</h2>

        {/* 점주 수정 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 점주명 (수정 불가능) */}
          <div>
            <label className="block text-sm font-medium">
              점주명 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("ownerName")}
              disabled
              className="w-full input-content bg-gray-100"
            />
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
              className="w-full input-content "
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
              className="w-full input-content "
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
              수정 완료
            </BasicButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOwnerModal;
