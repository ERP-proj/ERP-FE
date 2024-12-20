import SideBar from "@/app/components/SideBar";
import TopControls from "@/app/components/member/TopControls";
import MemberList from "@/app/components/member/MemberList";
import React from "react";

const mockData = [
  {
    photoUrl: null,
    name: "고객1",
    gender: "MALE",
    phone: "010-2412-1452",
    plans: "A 이용권",
    remainingTime: 5,
    usedTime: 10,
    registrationDate: "2024-12-20T02:12:51.678",
    tardinessCount: 2,
    absenceCount: 1,
  },
  {
    photoUrl: null,
    name: "고객2",
    gender: "FEMALE",
    phone: "010-1234-5678",
    plans: "B 이용권",
    remainingTime: 3,
    usedTime: 7,
    registrationDate: "2024-11-10T02:12:51.678",
    tardinessCount: 1,
    absenceCount: 0,
  },
];

export default function Page() {
  return (
    <div className="flex gap-4 justify-center align-middle h-screen">
      <div className="w-1/6 h-full bg-gray-200">
        <SideBar />
      </div>
      <div className="flex-[9_0_0] bg-gray-500 p-4">
        {/* Top Controls */}
        <TopControls />
        {/* Member List */}
        <MemberList members={mockData} />
      </div>
    </div>
  );
}
