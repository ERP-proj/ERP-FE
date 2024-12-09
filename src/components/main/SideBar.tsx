import React from "react";
import { Button } from "../ui/button";

function SideBar() {
  return (
    <div className="flex flex-col h-full justify-center px-4 gap-4">
      <Button className="py-6">회원 관리</Button>
      <Button className="py-6">예약 관리</Button>
      <Button className="py-6">합격 관리</Button>
    </div>
  );
}

export default SideBar;
