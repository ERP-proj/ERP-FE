"use client";

import React from "react";
import { GoAlert } from "react-icons/go";
import BasicButton from "./BasicButton";
import { useAlertStore } from "@/store/useAlertStore";

const Alert = () => {
  const { message, onConfirm, closeAlert } = useAlertStore();

  if (!message) return null; // Alert이 없으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center flex flex-col items-center">
        <GoAlert className="text-yellow-500 text-4xl mb-2" />
        <p className="text-lg text-gray-800">{message}</p>
        <div className="flex justify-center gap-4 mt-4">
          <BasicButton onClick={closeAlert} color="secondary" border>
            취소
          </BasicButton>
          <BasicButton
            onClick={() => {
              if (onConfirm) onConfirm();
              closeAlert();
            }}
            color="primary"
          >
            확인
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default Alert;
