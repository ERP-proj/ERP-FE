"use client";

import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Image from "next/image";

const MemberRow = ({ member }: { member: any }) => {
  const [isPhoneHidden, setIsPhoneHidden] = useState<boolean>(true);

  // 전화번호 숨김/표시 토글 함수
  const togglePhoneVisibility = () => setIsPhoneHidden(!isPhoneHidden);

  // 전화번호 마스킹 처리
  const getMaskedPhone = (phone: string) => {
    if (isPhoneHidden) {
      return phone.replace(/(\d{3})-\d{4}-(\d{4})/, "$1-****-$2");
    }
    return phone;
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-[#F2F8ED] rounded-lg gap-4">
      {/* 프로필 사진 및 기본 정보 */}
      <div className="flex items-center gap-4 flex-1 min-w-[250px]">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#fff] rounded-full flex justify-center items-center text-white text-lg">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={`${member.name}의 프로필`}
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            "사진 없음"
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-gray-800 font-bold text-sm sm:text-[16px]">
              {member.name}
            </div>
            <div
              className={`px-2 py-1 text-xs sm:text-sm rounded ${
                member.gender === "남"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {member.gender}
            </div>
            <div
              className={`px-2 py-1 text-xs sm:text-sm rounded ${
                member.licenseType === "TYPE_1"
                  ? "bg-white text-gray-500"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {member.licenseType}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-gray-600 text-xs sm:text-sm">
              {getMaskedPhone(member.phone)}
            </div>
            <div onClick={togglePhoneVisibility} className="cursor-pointer">
              {isPhoneHidden ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          <div
            className={`px-2 w-12 sm:w-14 py-1 justify-center text-xs sm:text-sm rounded-full ${
              member.planType === "PERIOD_BASED"
                ? "bg-[#3C6229] text-white"
                : "bg-[#B4D89C] text-black"
            }`}
          >
            {member.planType}
          </div>
        </div>
      </div>

      {/* 이용권 종류 */}
      <div className="flex items-center justify-center font-medium flex-1 min-w-[150px]">
        <div className="text-xs sm:text-sm bg-[#f6f6f6] border border-[#d1d1d1] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[#3a3a3a]">
          {member.planName}
        </div>
      </div>
    </div>
  );
};

export default MemberRow;
