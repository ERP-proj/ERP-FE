"use client";

import BasicButton from "@/app/components/ui/BasicButton";
import React from "react";

export default function page() {
  return (
    <div className="space-y-4">
      {/* 버튼 - 테두리 있음 */}
      <BasicButton
        size="large"
        color="primary"
        border={false}
        onClick={() => alert("Clicked!")}
      >
        추가하기
      </BasicButton>

      {/* 버튼 - 테두리 없음 */}
      <BasicButton size="medium" color="secondary" border={true}>
        Secondary
      </BasicButton>

      {/* 버튼 - 테두리 있음 */}
      <BasicButton size="small" color="danger" border={true}>
        Danger
      </BasicButton>

      <BasicButton size="small" color="gray" border={false}>
        Danger
      </BasicButton>
    </div>
  );
}
