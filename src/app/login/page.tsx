"use client";

import React, { useEffect } from "react";
import BasicButton from "../components/ui/BasicButton";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { auth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface LoginFormInputs {
  account: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // ✅ 로그인 상태가 변경되면 자동으로 페이지 이동
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await auth.login(data.account, data.password);
      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 400) {
        try {
          // ✅ 일반 로그인 실패 시, 자동으로 관리자 로그인 시도
          await auth.adminLogin(data.account, data.password);
          router.push("/admin/institute"); // 성공 시 관리자 페이지 이동
        } catch (adminError: any) {
          alert("로그인 실패. 계정 정보를 확인하세요.");
        }
      } else {
        alert("로그인 실패. 네트워크 상태를 확인하세요.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white rounded-xl shadow-lg"
      >
        <div className="rounded-t-xl p-4 text-xl w-full h-full bg-[#F2F8ED] font-bold text-gray-700 text-center ">
          로그인
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700">
            아이디
          </label>
          <input
            type="text"
            {...register("account", { required: "아이디를 입력하세요." })}
            className="input-content"
          />
          {errors.account && (
            <p className="text-red-500 text-sm">{errors.account.message}</p>
          )}
        </div>

        <div className="px-6">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력하세요." })}
            className="input-content"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="px-6 pb-4">
          <BasicButton type="submit" color="primary" className="mt-6 w-full">
            로그인
          </BasicButton>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
