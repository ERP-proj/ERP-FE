"use client";

import Image from "next/image";
import calendarIcon from "../../assets/sidebar/calendarIcon.png";
import passedIcon from "../../assets/sidebar/passedIcon.png";
import userIcon from "../../assets/sidebar/userIcon.png";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function SideBar() {
  const router = useRouter();

  const hadleNavigate = () => {
    router.push("/members/list");
  };
  const hadleNavigate2 = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col w-20 h-full justify-center gap-4">
      <Button className="py-6" onClick={hadleNavigate}>
        <Image src={userIcon} alt="userIcon" width="28" height="28" />
      </Button>
      <Button className="py-6" onClick={hadleNavigate2}>
        <Image src={calendarIcon} alt="calendarIcon" width="28" height="28" />
      </Button>
      <Button className="py-6">
        <Image src={passedIcon} alt="passedIcon" width="28" height="28" />
      </Button>
    </div>
  );
}

export default SideBar;
