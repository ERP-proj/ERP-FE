"use client";

import React from "react";
import BasicButton from "../components/ui/BasicButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/api/auth";
import { useRouter } from "next/navigation";

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

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await auth.login(data.account, data.password);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
          로그인
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            아이디
          </label>
          <input
            type="text"
            {...register("account", { required: "아이디를 입력하세요." })}
            className="w-full p-2 border rounded-lg mt-1"
          />
          {errors.account && (
            <p className="text-red-500 text-sm">{errors.account.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력하세요." })}
            className="w-full p-2 border rounded-lg mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <BasicButton type="submit" color="primary" className="mt-6 w-full">
          로그인
        </BasicButton>
      </form>
    </div>
  );
};

export default LoginPage;
