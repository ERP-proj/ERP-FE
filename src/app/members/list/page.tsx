import SideBar from "@/app/components/SideBar";
import TopControls from "@/app/components/member/TopControls";
import React from "react";
import MemberList from "@/app/components/member/MemberList";

const mockData = [
  {
    photoUrl: null,
    name: "1번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "2번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "2번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "2번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "3번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
    remainingTime: 0,
    remainingPeriod: 0,
    usedTime: 0,
    registrationDate: "2024-12-25T12:29:09.944",
    tardinessCount: 0,
    absenceCount: 0,
  },
  {
    photoUrl: null,
    name: "4번고객",
    gender: "MALE",
    phone: "010-0000-0000",
    licenseType: "TYPE_1",
    planName: "5시간 이용권",
    planType: "TIME_BASED",
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
