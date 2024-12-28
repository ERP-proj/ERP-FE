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
    <div className="flex gap-4 justify-center align-middle h-screen">
      <SideBar />
      <div className="flex-[9_0_0] bg-gray-500 p-4">
        {/* Top Controls */}
        <TopControls />
        {/* Member List */}
        <MemberList members={mockData} />
      </div>
    </div>
  );
}
