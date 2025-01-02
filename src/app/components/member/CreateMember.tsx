"use client";

import React, { useState } from "react";
import BasicButton from "../ui/BasicButton";
import Modal from "../ui/Modal";
import Dropdown from "../ui/Dropdown";
import Accordion from "../ui/Accordion";
import Toggle from "../ui/Toggle";
import Pay from "./Pay";
import RegisterForm from "./RegisterForm";
import { member } from "@/api/member";
import { FormData } from "@/types/memberType";

const CreateMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState<{
    [key: string]: boolean;
  }>({
    이용권결제: false,
    기타결제: false,
  });

  const [formData, setFormData] = useState<FormData>({
    planId: 1,
    name: "",
    gender: "MALE",
    phone: "",
    address: "",
    birthDate: "",
    memo: "",
    paymentsMethod: "CARD",
    planPayment: {
      registrationAt: new Date().toISOString(),
      discount: 0,
      status: true,
    },
    otherPayment: [],
  });

  const toggleAccordion = (key: string) => {
    setAccordionStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 회원 등록 API 호출
  const handleRegister = async () => {
    try {
      const response = await member.registMember(formData);
      console.log("회원 등록 성공:", response);
      alert("회원 등록이 성공적으로 완료되었습니다!");
      closeModal();
    } catch (error) {
      console.error("회원 등록 실패:", error);
      alert("회원 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* 회원 등록 버튼 */}
      <BasicButton
        size="medium"
        color="primary"
        border={false}
        onClick={openModal}
        className="ml-auto"
      >
        회원 등록
      </BasicButton>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        leftChildren={
          <RegisterForm formData={formData} setFormData={setFormData} />
        }
        rightChildren={
          <div className="relative h-full flex flex-col">
            <div className="flex-grow">
              {/* 이용권 결제 */}
              <Accordion
                title="이용권 결제"
                isOpen={accordionStates["이용권결제"]}
                toggleOpen={() => toggleAccordion("이용권결제")}
                footer={
                  <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                    {/* 총금액 */}
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold">총 금액</h4>
                      <p className="text-2xl font-bold text-[#DB5461]">
                        215,000
                      </p>
                    </div>

                    {/* 미납 여부 */}
                    <div className="flex items-center gap-2">
                      <Toggle />
                    </div>
                  </div>
                }
              >
                <div className="bg-white rounded-lg h-[950px] overflow-y-scroll">
                  <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                    이용권 정보
                  </h3>

                  {/* 구분 */}
                  <div className="mb-4 p-4">
                    <h4 className="text-sm font-bold mb-2">구분</h4>
                    <div className="flex gap-2">
                      <button className="w-1/2 py-2 rounded-md bg-[#3C6229] text-white text-sm font-semibold">
                        1종
                      </button>
                      <button className="w-1/2 py-2 rounded-md bg-gray-200 text-gray-600 text-sm font-semibold">
                        2종
                      </button>
                    </div>
                  </div>

                  {/* 이용권 */}
                  <div className="mb-4 px-4">
                    <h4 className="text-sm font-bold mb-2">이용권</h4>
                    <Dropdown
                      options={[
                        "10시간 이용권",
                        "15시간 이용권",
                        "20시간 이용권",
                        "1개월 이용권",
                      ]}
                      placeholder="이용권 선택"
                      defaultValue="10시간 이용권"
                      className="w-full p-2"
                    />
                  </div>

                  {/* 할인 */}
                  <div className="mb-4">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      할인
                    </h3>
                    <h4 className="text-sm font-bold pl-4 pt-4">할인 상품명</h4>
                    <Dropdown
                      options={[
                        "10시간 이용권",
                        "15시간 이용권",
                        "20시간 이용권",
                        "1개월 이용권",
                      ]}
                      placeholder="할인 상품 선택"
                      defaultValue="10시간 이용권"
                      className="w-full p-4"
                    />
                    <div className="flex gap-4 mt-4 px-4">
                      <div className="w-1/2">
                        <h4 className="text-sm font-bold mb-2">할인율 (%)</h4>
                        <input
                          type="text"
                          placeholder="할인율 입력"
                          className="w-full input-content"
                        />
                      </div>
                      <div className="w-1/2">
                        <h4 className="text-sm font-bold mb-2">
                          할인율 적용 금액
                        </h4>
                        <input
                          type="text"
                          placeholder="할인 금액 입력"
                          className="w-full mb-2 input-content"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 결제 정보 */}
                  <div className="mb-4">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      결제 정보
                    </h3>
                    <div className="p-4">
                      <Pay />

                      {/* 등록일 */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold mb-2 pt-4">등록일</h4>
                        <input
                          type="date"
                          defaultValue={getCurrentDate()}
                          className="input-content"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>

              {/* 기타 결제 */}
              <Accordion
                title="기타 결제"
                isOpen={accordionStates["기타결제"]}
                toggleOpen={() => toggleAccordion("기타결제")}
                footer={
                  <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                    {/* 총금액 */}
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold">총 금액</h4>
                      <p className="text-2xl font-bold text-[#DB5461]">
                        215,000
                      </p>
                    </div>

                    {/* 미납 여부 */}
                    <div className="flex items-center gap-2">
                      <Toggle />
                    </div>
                  </div>
                }
              >
                <div className="bg-white rounded-lg h-[600px] overflow-y-scroll">
                  <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                    결제 정보
                  </h3>

                  {/* 이용권 */}
                  <div className="mb-4 px-4">
                    <h4 className="text-sm font-bold my-2">결제 내용</h4>
                    <input
                      type="text"
                      placeholder="결제내용 입력"
                      className="p-4 mb-4 input-content"
                    />
                  </div>

                  {/* 결제 방법 */}
                  <div className="mb-7">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      결제 정보
                    </h3>
                    <div className="p-4">
                      <Pay />

                      {/* 등록일 */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold mb-3 pt-4">등록일</h4>
                        <input
                          type="date"
                          defaultValue={getCurrentDate()}
                          className="input-content"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>

            {/* 하단 버튼 */}
            <div className="sticky bottom-0 left-0 bg-white p-4 shadow-md flex justify-end gap-4 z-10">
              <BasicButton
                size="large"
                color="secondary"
                border={true}
                onClick={closeModal}
              >
                취소
              </BasicButton>
              <BasicButton
                size="large"
                color="primary"
                border={false}
                onClick={handleRegister}
              >
                저장
              </BasicButton>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CreateMember;
