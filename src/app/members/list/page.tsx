import SideBar from "@/app/components/SideBar";
import TopControls from "@/app/components/member/TopControls";
import React from "react";
import MemberList from "@/app/components/member/MemberList";

const mockData = [
  {
    photoUrl: null,
    name: "김미정",
    gender: "여",
    phone: "010-0000-0000",
    licenseType: "1종",
    planName: "5시간 이용권",
    planType: "기간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "이민수",
    gender: "남",
    phone: "010-0000-0000",
    licenseType: "1종",
    planName: "5시간 이용권",
    planType: "시간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "김민찬",
    gender: "남",
    phone: "010-0000-0000",
    licenseType: "2종",
    planName: "5시간 이용권",
    planType: "시간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "이지은",
    gender: "여",
    phone: "010-0000-0000",
    licenseType: "2종",
    planName: "5시간 이용권",
    planType: "시간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "김민",
    gender: "남",
    phone: "010-0000-0000",
    licenseType: "1종",
    planName: "5시간 이용권",
    planType: "기간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "김찬",
    gender: "남",
    phone: "010-0000-0000",
    licenseType: "2종",
    planName: "5시간 이용권",
    planType: "기간제",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
];

export default function Page() {
  return (
    <div className="flex items-center h-screen">
      <div className="flex">
        <SideBar />
      </div>
      <div className="relative h-[900px] flex-[8_0_0] bg-white rounded-3xl p-4 max-w-[1600px] w-full">
        <TopControls />
        <div className="relative h-[790px]">
          <MemberList members={mockData} />
        </div>
      </div>
    </div>
  );
}
