"use client";

import React, { useState } from "react";
import { CustomerDetailData, UpdateCustomerDetail } from "@/types/memberType";
import Dropdown from "../../ui/Dropdown";
import Camera from "../create/Camera";

interface DetailFormProps {
  member: CustomerDetailData;
  onSave: (updatedMember: UpdateCustomerDetail) => void;
  onModify: () => void;
}

const DetailForm: React.FC<DetailFormProps> = ({
  member,
  onSave,
  onModify,
}) => {
  const [formData, setFormData] = useState<CustomerDetailData>(member);
  const [progress, setProgress] = useState(member.progressList || []);
  const [rows, setRows] = useState([
    { id: 1, date: "", content: "" }, // 기본 1회차
  ]);

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, date: "", content: "" },
    ]);
    onModify();
  };
  const handleInputChange = (key: keyof UpdateCustomerDetail, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    onModify();
  };
  const handleCapture = (imageData: string) => {
    setFormData((prevData) => ({ ...prevData, photoUrl: imageData }));
    onModify();
  };

  return (
    <div className="space-y-6 p-6">
      {/* 상단 레이아웃: 프로필 이미지와 입력 폼 */}
      <div className="flex gap-8 items-start">
        {/* 왼쪽: 이미지 선택 */}
        <div className="flex flex-col items-center w-1/3">
          <Camera onCapture={handleCapture} />
        </div>

        {/* 오른쪽: 입력 폼 */}
        <div className="w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">이름</label>
              <input
                type="text"
                className="input-content w-full"
                value={formData.name}
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
                defaultValue={formData.gender === "MALE" ? "남" : "여"}
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
                value={formData.birthDate || ""}
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
                value={formData.phone}
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
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">방문 경로</label>
          <textarea
            className="input-content w-full"
            value={formData.visitPath}
            onChange={(e) => handleInputChange("visitPath", e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">메모</label>
          <textarea
            className="input-content w-full"
            value={formData.memo}
            onChange={(e) => handleInputChange("memo", e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* 진도표 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">진도표</label>
        <div className="relative">
          <table className="w-full border text-sm mt-2">
            <thead>
              <tr>
                <th className="border p-2">회차</th>
                <th className="border p-2">날짜 선택</th>
                <th className="border p-2">내용</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border p-0 text-center">{row.id}</td>
                  <td className="p-0">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        setRows((prevRows) =>
                          prevRows.map((r) =>
                            r.id === row.id ? { ...r, date: e.target.value } : r
                          )
                        )
                      }
                      className="input-content w-full"
                    />
                  </td>
                  <td className="p-0">
                    <input
                      type="text"
                      value={row.content}
                      placeholder="내용 입력"
                      onChange={(e) =>
                        setRows((prevRows) =>
                          prevRows.map((r) =>
                            r.id === row.id
                              ? { ...r, content: e.target.value }
                              : r
                          )
                        )
                      }
                      className="input-content w-full rounded-none"
                    />
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
