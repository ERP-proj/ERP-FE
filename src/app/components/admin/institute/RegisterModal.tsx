"use client";

import { useForm } from "react-hook-form";
import BasicButton from "../../ui/BasicButton";
import React from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  storeName: string;
  openTime: string;
  closeTime: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      storeName: "",
      openTime: "",
      closeTime: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const { storeName, openTime, closeTime } = data;
    const finalOpenTime = openTime || "08:00";
    const finalCloseTime = closeTime || "22:00";

    console.log("📌 등록할 매장 정보:", {
      매장명: storeName,
      영업시간: `${finalOpenTime} ~ ${finalCloseTime}`,
    });

    onClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[410px]">
        <h2 className="text-xl font-semibold mb-4">매장 등록</h2>

        {/* 매장 등록 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 매장명 입력 */}
          <div>
            <label className="block text-sm font-medium">
              매장명 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("storeName", { required: "매장명을 입력해주세요." })}
              placeholder="매장명을 입력해주세요."
              className="w-full input-content"
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>

          {/* 영업 시간 입력 */}
          <div>
            <label className="block text-sm font-medium">영업 시간</label>
            <div className="flex gap-2">
              <input
                type="time"
                {...register("openTime")}
                className="w-1/2 input-content"
              />
              <span className="text-gray-500 mt-2">~</span>
              <input
                type="time"
                {...register("closeTime")}
                className="w-1/2 input-content"
              />
            </div>
            <p className="text-red-500 text-sm mt-1">
              * 영업 시간을 입력하지 않으면 08:00 ~ 22:00으로 자동 지정됩니다.
            </p>
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
              color={watch("storeName") ? "primary" : "gray"}
              type="submit"
              disabled={!watch("storeName")}
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

export default RegisterModal;
