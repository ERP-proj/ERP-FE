"use client";
import React from "react";
import Dropdown from "../../ui/Dropdown";
import { FormData } from "@/types/memberType";
import Camera from "./Camera";
export interface RegisterFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleInputChange = (key: keyof FormData, value: any) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };
  const handleCapture = (photoFile: File) => {
    setFormData((prevData) => ({ ...prevData, photoFile }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* 프로필 이미지와 기본 정보 */}
      <div className="flex gap-6">
        {/* 왼쪽 - 이미지 선택 */}
        <div className="flex flex-col items-center w-1/3">
          <Camera onCapture={handleCapture} />
        </div>

        {/* 오른쪽 - 이름, 성별, 생년월일, 전화번호 */}
        <div className="flex flex-col w-2/3 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">이름</label>
              <input
                type="text"
                placeholder="이름"
                className="input-content w-full mb-6"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                성별(필수)
              </label>
              <Dropdown
                options={[
                  { label: "여", value: "FEMALE" },
                  { label: "남", value: "MALE" },
                ]}
                placeholder="성별"
                defaultValue={formData.gender === "MALE" ? "남" : "여"}
                className="w-full"
                onChange={(value) => {
                  const mappedGender = value === "남" ? "MALE" : "FEMALE";
                  handleInputChange("gender", mappedGender);
                }}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                생년월일(필수)
              </label>
              <input
                type="date"
                placeholder="생년월일"
                className="input-content w-full"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                전화번호
              </label>
              <input
                type="text"
                placeholder="01012341234"
                className="input-content w-full"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 나머지 입력 폼 */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">주소</label>
          <input
            type="text"
            placeholder="주소를 입력해주세요."
            className="input-content w-full"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">방문 경로</label>
          <textarea
            placeholder="방문 경로를 입력해주세요."
            className="input-content w-full"
            value={formData.visitPath}
            onChange={(e) => handleInputChange("visitPath", e.target.value)}
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">메모</label>
          <textarea
            placeholder="메모할 내용을 입력해주세요."
            className="input-content w-full"
            value={formData.memo}
            onChange={(e) => handleInputChange("memo", e.target.value)}
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">약관</label>
          <textarea
            placeholder="약관약관약관"
            className="input-content w-full"
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
