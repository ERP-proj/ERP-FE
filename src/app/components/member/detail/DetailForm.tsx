"use client";

import React, { useState } from "react";
import { UpdateCustomerDetail } from "@/types/memberType";
import Dropdown from "../../ui/Dropdown";
import Camera from "../create/Camera";
import { FaTrashAlt } from "react-icons/fa";
import { useProgressList } from "@/hooks/progress/useProgressList";

interface DetailFormProps {
  customerInfo: UpdateCustomerDetail;
  onModify: (key: keyof UpdateCustomerDetail, value: any) => void;
}

const DetailForm: React.FC<DetailFormProps> = ({ customerInfo, onModify }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // ✅ 사진 파일 저장
  const { rows, addRow, deleteRow, updateRow } = useProgressList({
    data: customerInfo,
    onModify,
    progressKey: "progressList", // ✅ 타입에 맞게 key를 지정하면 됨
  });

  const handleInputChange = (key: keyof UpdateCustomerDetail, value: any) => {
    onModify(key, value);
  };

  // const handleCapture = (photoFile: File) => {
  //   setCustomerInfo((prevData) => ({ ...prevData, photoFile }));
  //   onModify();
  // };

  return (
    <div className="space-y-6 p-6">
      <div className="flex gap-8 items-start">
        <div className="flex flex-col items-center w-1/3">
          <Camera
            onCapture={(file) => onModify("photoFile", file)}
            photoUrl={
              customerInfo.photoFile
                ? URL.createObjectURL(customerInfo.photoFile)
                : customerInfo.photoUrl
            }
          />
        </div>

        {/* 오른쪽: 입력 폼 */}
        <div className="w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">이름</label>
              <input
                type="text"
                className="input-content w-full"
                value={customerInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">성별</label>
              <Dropdown
                options={[
                  { label: "여", value: "FEMALE" },
                  { label: "남", value: "MALE" },
                ]}
                defaultValue={customerInfo.gender}
                onChange={(value) =>
                  handleInputChange(
                    "gender",
                    value === "남" ? "MALE" : "FEMALE"
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                생년월일
              </label>
              <input
                type="date"
                className="input-content w-full"
                value={customerInfo.birthDate || ""}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                전화번호
              </label>
              <input
                type="text"
                className="input-content w-full"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 추가 입력 필드 */}
      <div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">주소</label>
          <input
            type="text"
            className="input-content w-full mb-4"
            value={customerInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">방문 경로</label>
          <textarea
            className="input-content w-full"
            value={customerInfo.visitPath}
            onChange={(e) => handleInputChange("visitPath", e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">메모</label>
          <textarea
            className="input-content w-full"
            value={customerInfo.memo}
            onChange={(e) => handleInputChange("memo", e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* 진도표 */}
      <div>
        <label className="w-full block text-sm text-gray-600 mb-1 ">
          진도표
        </label>
        <div className="relative">
          <table className="w-full border text-sm mt-2 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border">회차</th>
                <th className="border">날짜 선택</th>
                <th className="border">내용</th>
                <th className="border p-2 text-center">삭제</th>{" "}
                {/* 삭제 컬럼 추가 */}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border text-center">{row.id}</td>
                  <td className="border">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        updateRow(row.id, "date", e.target.value)
                      }
                      className="input-content w-full border-gray-300"
                    />
                  </td>
                  <td className="border p-0">
                    <input
                      type="text"
                      value={row.content}
                      placeholder="내용 입력"
                      onChange={(e) =>
                        updateRow(row.id, "content", e.target.value)
                      }
                      className="input-content w-full border-gray-300"
                    />
                  </td>
                  <td className="border text-center">
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="text-gray-500 hover:text-red-600 transition duration-200"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="absolute w-8 h-8 border border-1 left-1/2 transform -translate-x-1/2 translate-y-0 text-gray-500 bg-white hover:text-[#3C6229] hover:border-[#3C6229] rounded-full shadow-md flex items-center justify-center"
            onClick={addRow}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
