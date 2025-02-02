"use client";

import Image from "next/image";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";

function SideBar() {
  const router = useRouter();

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

  return (
    <div className="flex w-[130px] flex-col h-full justify-center gap-4">
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
      {/* <button/> */}
    </div>
  );
}

export default SideBar;
