import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAlertStore } from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthStore(); // ✅ 로그아웃 함수 가져오기
  const { showAlert } = useAlertStore(); // ✅ Alert 함수 가져오기

  // 현재 날짜를 YYYY-MM-DD (요일) 형식으로 변환하는 함수
  const getFormattedDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    return today.toLocaleDateString("ko-KR", options).replace(/\./g, "-");
  };

  const handleLogout = () => {
    showAlert("정말 로그아웃하시겠습니까?", () => {
      logout();
      router.push("/login");
    });
  };
  return (
    <header className="w-full bg-white py-5 px-6 flex justify-between items-center text-sm text-gray-700">
      <div className="w-1/2"></div>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex items-center space-x-4">
        {/* 날짜 */}
        <span className="text-gray-500">{getFormattedDate()}</span>

        {/* 관리자명 */}
        <span className="font-semibold">administrator</span>

        {/* 로그인 버튼 */}
        <button className="text-green-600 hover:underline">로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
