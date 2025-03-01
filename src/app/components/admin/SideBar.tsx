"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function SideBar() {
  const router = useRouter();

  const handleNavigatePlan = () => {
    router.push("/admin/plan");
  };

  const handleNavigateInstitute = () => {
    router.push("/admin/institute");
  };

  const pathname = usePathname()?.split("/")[2];
  console.log(pathname);

  return (
    <div className="flex flex-col h-full w-[130px] z-999 ">
      {/* 상단 버튼 그룹 */}
      <div className="flex flex-grow flex-col gap-4 justify-center">
        <Button className="py-6" onClick={handleNavigateInstitute}>
          <Image
            src={
              pathname === "Institute"
                ? "/admin/sidebar/branchFocusIcon.png"
                : "/admin/sidebar/branchIcon.png"
            }
            alt="branchIcon"
            width="48"
            height="48"
          />
        </Button>{" "}
        <Button className="py-6" onClick={handleNavigatePlan}>
          <Image
            src={
              pathname === "plan"
                ? "/admin/sidebar/planFocusIcon.png"
                : "/admin/sidebar/planIcon.png"
            }
            alt="planIcon"
            width="48"
            height="48"
          />
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
