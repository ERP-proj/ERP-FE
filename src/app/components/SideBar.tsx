"use client";

import Image from "next/image";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function SideBar() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/members/");
  };
  const handleNavigate2 = () => {
    router.push("/");
  };
  return (
    <div className="flex w-[130px] flex-col h-full justify-center gap-4">
      <Button className="py-6" onClick={handleNavigate}>
        <Image
          src="/sidebar/userIcon.png"
          alt="userIcon"
          width="28"
          height="28"
        />
      </Button>
      <Button className="py-6" onClick={handleNavigate2}>
        <Image
          src="/sidebar/calendarIcon.png"
          alt="calendarIcon"
          width="28"
          height="28"
        />
      </Button>
      <Button className="py-6">
        <Image
          src="/sidebar/passedIcon.png"
          alt="passedIcon"
          width="28"
          height="28"
        />
      </Button>
      {/* <button/> */}
    </div>
  );
}

export default SideBar;
