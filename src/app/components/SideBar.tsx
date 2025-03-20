"use client";

import Image from "next/image";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "@/store/useAuthStore";
import { useAlertStore } from "@/store/useAlertStore";

function SideBar() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { showAlert } = useAlertStore();

  const handleNavigateUser = () => {
    router.push("/members/");
  };
  const handleNavigateUserCalendar = () => {
    router.push("/");
  };
  const handleNavigateReward = () => {
    router.push("/rewards/");
  };

  const pathname = usePathname()?.split("/")[1];

  const handleLogout = () => {
    showAlert("정말 로그아웃하시겠습니까?", () => {
      logout();
      router.push("/");
    });
  };

  return (
    <div className="flex flex-col h-full w-[130px] z-999">
      {/* 상단 버튼 그룹 */}
      <div className="flex flex-grow flex-col gap-4 justify-center">
        <Button className="py-6" onClick={handleNavigateUser}>
          <Image
            src={
              pathname === "members"
                ? "/sidebar/userFocusIcon.png"
                : "/sidebar/userIcon.png"
            }
            alt="userIcon"
            width="48"
            height="48"
          />
        </Button>
        <Button className="py-6" onClick={handleNavigateUserCalendar}>
          <Image
            src={
              pathname === ""
                ? "/sidebar/calendarFocusIcon.png"
                : "/sidebar/calendarIcon.png"
            }
            alt="calendarIcon"
            width="48"
            height="48"
          />
        </Button>
        <Button className="py-6" onClick={handleNavigateReward}>
          <Image
            src="/sidebar/rewardIcon.png"
            alt="rewardIcon"
            width="48"
            height="48"
          />
        </Button>
      </div>
      <Button
        className="flex flex-col text-gray-700 items-center mt-auto pb-12 hover:text-white transition-colors duration-300"
        onClick={handleLogout}
      >
        <div>
          <MdLogout style={{ width: "24px", height: "24px" }} />
        </div>
        <span>로그아웃</span>
      </Button>
    </div>
  );
}

export default SideBar;
