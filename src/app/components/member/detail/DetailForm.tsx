"use client";

import React, { useState } from "react";
import { CiCamera, CiCirclePlus } from "react-icons/ci";
import BasicButton from "../../ui/BasicButton";
import { CustomerDetailData } from "@/types/memberType";
import Dropdown from "../../ui/Dropdown";

interface DetailFormProps {
  member: CustomerDetailData;
  onSave: (updatedMember: CustomerDetailData) => void;
}

const DetailForm: React.FC<DetailFormProps> = ({ member, onSave }) => {
  const [formData, setFormData] = useState<CustomerDetailData>(member);
  const [progress, setProgress] = useState(member.progressList || []);

  const handleInputChange = (key: keyof CustomerDetailData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProgressChange = (index: number, key: string, value: string) => {
    setProgress((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addProgressRow = () => {
    setProgress((prev) => [...prev, { date: "", content: "" }]);
  };

  const handleSave = () => {
    onSave({ ...formData, progressList });
  };

  return (
    <div className="space-y-6 p-6">
      {/* 이미지 선택 */}
      <div className="flex flex-col items-center gap-4">
        <div className="image-selector">
          <div className="image-selector-background"></div>
          <div className="image-selector-content">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt={`${formData.name}의 프로필`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>
                <CiCamera />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 입력 폼 */}
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
            options={["남", "여"]}
            defaultValue={formData.gender === "MALE" ? "남" : "여"}
            onChange={(value) =>
              handleInputChange("gender", value === "남" ? "MALE" : "FEMALE")
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">생년월일</label>
          <input
            type="date"
            className="input-content w-full"
            // value={formData.birthDate}
            // onChange={(e) => handleInputChange("birthDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">전화번호</label>
          <input
            type="text"
            className="input-content w-full"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">주소</label>
          <input
            type="text"
            className="input-content w-full"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="col-span-2">
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
        <table className="w-full border text-sm mt-2">
          <thead>
            <tr>
              <th className="border p-2">회차</th>
              <th className="border p-2">날짜</th>
              <th className="border p-2">내용</th>
            </tr>
          </thead>
          <tbody>
            {progress.map((row, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">
                  <input
                    type="date"
                    className="input-content w-full"
                    value={row.date}
                    onChange={(e) =>
                      handleProgressChange(index, "date", e.target.value)
                    }
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="input-content w-full"
                    value={row.content}
                    onChange={(e) =>
                      handleProgressChange(index, "content", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-2 text-blue-500" onClick={addProgressRow}>
          + 진도 추가
        </button>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end gap-4 mt-4">
        <BasicButton size="large" color="secondary">
          취소
        </BasicButton>
        <BasicButton size="large" color="primary" onClick={handleSave}>
          저장
        </BasicButton>
      </div>
    </div>
  );
};

export default DetailForm;
