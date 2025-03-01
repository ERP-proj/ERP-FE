"use client";

import React from "react";
import { useForm } from "react-hook-form";
import BasicButton from "../../ui/BasicButton";

interface EditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: { name: string; openTime: string; closeTime: string };
}

const EditStoreModal: React.FC<EditStoreModalProps> = ({
  isOpen,
  onClose,
  store,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeName: store?.name || "",
      openTime: store?.openTime || "08:00",
      closeTime: store?.closeTime || "22:00",
    },
  });

  const onSubmit = (data: any) => {
    console.log("📌 수정할 매장 정보:", data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[410px]">
        <h2 className="text-xl font-semibold mb-4">매장 수정</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 매장명 (수정 불가) */}
          <div>
            <label className="block text-sm font-medium">매장명 *</label>
            <input
              {...register("storeName")}
              disabled
              className="w-full input-content bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* 영업 시간 */}
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
            <BasicButton color="primary" type="submit" size="large">
              수정 완료
            </BasicButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoreModal;
