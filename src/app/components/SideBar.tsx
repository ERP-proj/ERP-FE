"use client";

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
    <div className="flex flex-col h-full justify-center px-4 gap-4">
      <Button className="py-6" onClick={hadleNavigate}>
        회원 관리
      </Button>
      <Button className="py-6" onClick={hadleNavigate2}>
        예약 관리
      </Button>
      <Button className="py-6">합격 관리</Button>
    </div>
  );
}

export default SideBar;
