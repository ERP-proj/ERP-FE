import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAlertStore } from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { showAlert } = useAlertStore();
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

  // 쿠키에서 세션 쿠키 삭제하는 함수
  const deleteSessionCookie = () => {
    // 'JSESSIONID' 쿠키를 삭제하기 위한 코드
    document.cookie =
      "JSESSIONID=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0";
    // 쿠키를 만료시켜서 삭제
  };

  const handleLogout = () => {
    showAlert("정말 로그아웃하시겠습니까?", () => {
      logout(); // Zustand 상태에서 로그아웃
      deleteSessionCookie(); // 쿠키에서 세션 ID 삭제
      router.push("/"); // 홈 페이지로 리디렉션
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
        <button
          className="text-green-600 hover:underline"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
