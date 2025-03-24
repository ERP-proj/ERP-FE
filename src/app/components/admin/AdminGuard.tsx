"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { adminAPI } from "@/api/admin/institute";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await adminAPI.getInstitutes(); // 세션 확인용 API
        useAuthStore.getState().login("", "", true);
      } catch (error: any) {
        // if (error.message.includes("401")) {
        //   useAuthStore.getState().logout();
        //   router.replace("/"); // 홈(로그인)으로 리디렉션
        // }
      }
    };

    checkSession();
  }, []);

  return <>{children}</>;
}
