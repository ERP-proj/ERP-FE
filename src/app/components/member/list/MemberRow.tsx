"use client";

import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { formatMaskedPhone } from "@/utils/formatPhone";
import { getLabel } from "@/utils/mapping";

const MemberRow = ({
  member,
  onClick,
}: {
  member: any;
  onClick?: (customerId: number) => void;
}) => {
  const [isPhoneHidden, setIsPhoneHidden] = useState<boolean>(true);

  // 전화번호 숨김/표시 토글 함수
  const togglePhoneVisibility = () => setIsPhoneHidden(!isPhoneHidden);

  return (
    <div
      className="flex flex-wrap items-center justify-between p-4 bg-[#F2F8ED] rounded-lg gap-4 cursor-pointer w-full max-h-[200px] mx-auto"
      onClick={() => onClick?.(member.customerId)}
    >
      {/* 프로필 사진 및 기본 정보 */}
      <div className="flex items-center gap-4 min-w-[250px]">
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
            <Image
              src="/reservationModal/noUser.png"
              alt="noUser"
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-gray-800 font-bold text-sm sm:text-[16px]">
              {member.name}
            </div>
            <div
              className={`px-2 py-1 text-xs sm:text-sm rounded ${member.gender === "남"
                ? "bg-blue-100 text-blue-600"
                : "bg-pink-100 text-pink-600"
                }`}
            >
              {getLabel(member.gender)}
            </div>
            <div
              className={`px-2 py-1 text-xs sm:text-sm rounded ${member.licenseType === "TYPE_1" || "TYPE_1_AUTO"
                ? "bg-white text-gray-500"
                : "bg-gray-300 text-gray-800"
                }`}
            >
              {getLabel(member.licenseType)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-gray-600 text-xs sm:text-sm">
              {formatMaskedPhone(member.phone, isPhoneHidden)}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                togglePhoneVisibility();
              }}
              className="cursor-pointer"
            >
              {isPhoneHidden ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          <div
            className={`px-2 w-12 sm:w-14 py-1 justify-center text-xs sm:text-sm rounded-full ${member.planType === "PERIOD_BASED"
              ? "bg-[#3C6229] text-white"
              : "bg-[#B4D89C] text-black"
              }`}
          >
            {getLabel(member.planType)}
          </div>
        </div>
      </div>

      {/* 이용권 종류 */}
      <div className="flex items-center justify-center font-medium flex-1 min-w-[130px]">
        <div className="text-xs sm:text-sm bg-[#f6f6f6] border border-[#d1d1d1] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[#3a3a3a]">
          {getLabel(member.planName)}
        </div>
      </div>

      {/* 남은 시간 */}
      <div className="flex flex-1 items-center justify-center gap-4 min-w-[200px]">
        {/* 사용시간 */}
        <div className="square border-red-500 ">
          <span className="text-gray-600 text-sm">사용시간</span>
          <span className="text-red-600 font-bold text-lg">
            {member.usedTime}H
          </span>
        </div>

        {/* 잔여시간 */}
        {member.planType === "PERIOD_BASED" ? null : (
          <div className="square border-red-500 ">
            <span className="text-gray-600 text-sm">잔여시간</span>
            <span className="text-red-600 font-bold text-lg">
              {member.remainingTime}H
            </span>
          </div>
        )}

        {/* 잔여기간 */}
        <div className="square border-red-500 ">
          <span className="text-gray-600 text-sm">잔여기간</span>
          <span className="text-red-600 font-bold text-lg">
            {member.remainingPeriod}D
          </span>
        </div>

        {/* 지각/결석 */}
        <div className="square ml-4 border-[#B4D89C]">
          <span className="text-gray-500 text-xs sm:text-sm leading-tight">
            지각/결석
          </span>
          <span className="text-gray-800 font-bold text-sm sm:text-lg">
            {member.lateCount}/{member.absenceCount}
          </span>
        </div>
      </div>

      {/* 등록일 및 기타 결제 */}
      <div className="flex flex-col items-end flex-1 min-w-[150px]">
        <div className="text-gray-500  sm:text-sm">
          {formatDate(member.registrationDate)}
        </div>
        <span className="text-[#888888]">기타 결제</span>
        <div
          className={`text-xl font-bold ${member.otherPaymentPrice > 0 ? "text-[#3464B2]" : "text-red-600"
            }`}
        >
          {member.otherPaymentPrice > 0
            ? `+${member.otherPaymentPrice}`
            : `${member.otherPaymentPrice}`}
        </div>
      </div>
    </div>
  );
};

export default MemberRow;
