import React from "react";
import BasicButton from "../components/ui/BasicButton";

interface LoginProps {
  accound: string;
  password: string;
}

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="w-96 bg-white rounded-xl shadow-lg antialiased bg-[##F2F8ED]">
        {/* 제목 */}
        <div className="text-xl font-bold text-gray-700 p-4 w-full bg-[#F2F8ED] rounded-t-xl text-center">
          로그인
        </div>

        {/* 아이디 입력 */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700">
            아이디
          </label>
          <input
            type="text"
            className="w-full input-content"
            placeholder="아이디"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            className="w-full input-content"
            placeholder="비밀번호"
          />
        </div>

        {/* 로그인 버튼 */}
        <div className="p-4">
          <BasicButton type="submit" color="primary" className="w-full">
            로그인
          </BasicButton>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
