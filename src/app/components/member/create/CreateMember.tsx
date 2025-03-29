"use client";

import React, { useEffect, useState } from "react";
import BasicButton from "../../ui/BasicButton";
import Modal from "../../ui/Modal";
import Accordion from "../../ui/Accordion";
import Toggle from "./Toggle";
import RegisterForm from "./RegisterForm";
import { memberAPI } from "@/api/member";
import Plan from "./Plan";
import { FormData } from "@/types/memberType";
import { getCurrentDate } from "@/utils/formatDate";
import { useQueryClient } from "@tanstack/react-query";
import { useRegisterMember } from "@/hooks/member/useRegisterMember";

const initialFormData: FormData = {
  planId: 0,
  name: "",
  photoUrl: "string",
  gender: "MALE",
  phone: "",
  address: "",
  visitPath: "",
  birthDate: "",
  memo: "",
  planPayment: {
    paymentsMethod: "CARD", // 기본값 설정
    otherPaymentMethod: "",
    registrationAt: new Date().toISOString(),
    discountName: "",
    discountRate: 0,
    status: false,
    licenseType: "",
    planType: "",
    courseType: "",
    planPrice: 0,
    planName: "",
    discountPrice: 0,
  },
  otherPayment: [
    {
      paymentsMethod: null, // 기본값 설정
      otherPaymentMethod: "",
      registrationAt: new Date().toISOString(),
      content: "",
      price: 0,
      status: false,
    },
  ],
  photoFile: null,
};

const CreateMember: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData = initialFormData, setFormData }) => {
  const queryClient = useQueryClient(); //React Query 캐시 사용
  // const registerMemberMutation = useRegisterMember();

  const handleInputChange = (key: string, value: any, index?: number) => {
    const keys = key.split(".");
    setFormData((prevData) => {
      const newData: FormData = { ...prevData };
      let obj: any = newData;

      keys.forEach((k, idx) => {
        if (idx === keys.length - 1) {
          // 날짜 변환 처리 (ISO 8601 형식)
          if (k.includes("registrationAt") && typeof value === "string") {
            value = new Date(value).toISOString();
          }
          // 배열 처리
          if (Array.isArray(obj) && index !== undefined) {
            obj[index][k] = value;
          } else {
            obj[k] = value;
          }
        } else {
          if (Array.isArray(obj) && index !== undefined) {
            obj = obj[index][k] || {};
          } else {
            obj = obj[k] || {};
          }
        }
      });
      // 할인율이 변경될 때마다 최종 금액 자동 계산
      if (key === "planPayment.discountRate") {
        handleDiscountChange({
          target: { value: String(value) },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      return newData;
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0);
  const [accordionOpenKey, setAccordionOpenKey] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<{
    [key: string]: string;
  }>({
    planPayment: "",
    otherPayment: "",
  });
  // 할인율 변경 시 자동으로 할인 가격을 계산
  useEffect(() => {
    const discountedPrice = Math.round(
      selectedPlanPrice * (1 - formData.planPayment.discountRate / 100)
    );
    setFormData((prev) => ({
      ...prev,
      planPayment: {
        ...prev.planPayment,
        discountPrice: discountedPrice,
      },
    }));
  }, [selectedPlanPrice, formData.planPayment.discountRate, setFormData]);

  // 할인율 입력 핸들러
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prevData) => ({
      ...prevData,
      planPayment: {
        ...prevData.planPayment,
        discountRate: value,
      },
    }));
  };

  // 아코디언 토글 함수
  const toggleAccordion = (key: string) => {
    setAccordionOpenKey(
      (prevKeys) =>
        prevKeys.includes(key)
          ? prevKeys.filter((item) => item !== key) // 이미 열려 있으면 닫기
          : [...prevKeys, key] // 닫혀 있으면 추가하여 열기
    );
  };
  const getPaymentMethod = (
    method: string
  ): "CARD" | "CASH" | "TRANSFER" | "OTHER" => {
    switch (method) {
      case "현금":
        return "CASH";
      case "카드":
        return "CARD";
      case "계좌이체":
        return "TRANSFER";
      default:
        return "OTHER";
    }
  };
  const handleMethodClick = (
    method: string,
    type: "planPayment" | "otherPayment"
  ) => {
    const paymentMethod = getPaymentMethod(method);

    setSelectedMethod((prev) => ({
      ...prev,
      [type]: prev[type] === method ? "" : method,
    }));

    setFormData((prevData) => {
      if (type === "planPayment") {
        return {
          ...prevData,
          planPayment: {
            ...prevData.planPayment,
            paymentsMethod: paymentMethod,
            otherPaymentMethod:
              method === "기타" ? prevData.planPayment.otherPaymentMethod : "",
          },
        };
      } else {
        return {
          ...prevData,
          otherPayment: prevData.otherPayment.map((item, idx) =>
            idx === 0
              ? {
                  ...item,
                  paymentsMethod: paymentMethod,
                  otherPaymentMethod:
                    method === "기타" ? item.otherPaymentMethod : "",
                }
              : item
          ),
        };
      }
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRegister = async () => {
    try {
      console.info("회원 등록 요청 데이터:", formData);
      if (
        formData.planPayment.paymentsMethod === "OTHER" &&
        !formData.planPayment.otherPaymentMethod
      ) {
        alert("기타 결제 방법을 입력해주세요.");
        return;
      }

      const formattedData = {
        ...formData,
        planPayment: {
          ...formData.planPayment,
          registrationAt:
            formData.planPayment.registrationAt || new Date().toISOString(),
        },
        otherPayment: Array.isArray(formData.otherPayment) // ✅ 배열 보장
          ? formData.otherPayment.map((payment) => ({
              ...payment,
              price: payment.price ? Number(payment.price) : 0, // ✅ 숫자로 변환
              registrationAt:
                payment.registrationAt || new Date().toISOString(),
            }))
          : [],
      };

      console.info("회원 등록 요청 데이터:", formattedData);
      const response = await memberAPI.registMember(formattedData);
      console.info("회원 등록 성공:", response);
      // ✅ MemberList 데이터 다시 가져오기 (React Query 캐시 무효화)
      // await registerMemberMutation.mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["members", "ACTIVE"] });
      closeModal();
    } catch (error) {
      console.error("회원 등록 실패:", error);
      alert("회원 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <BasicButton
        size="medium"
        color="primary"
        border={false}
        onClick={openModal}
        className="ml-auto"
      >
        회원 등록
      </BasicButton>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        leftChildren={
          <RegisterForm formData={formData} setFormData={setFormData} />
        }
        rightChildren={
          <div className="relative h-full flex flex-col overflow-y-scroll">
            <div className="flex-grow">
              <Accordion
                title="이용권 결제"
                isOpen={accordionOpenKey.includes("이용권결제")}
                toggleOpen={() => toggleAccordion("이용권결제")}
                footer={
                  <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold">총 금액</h4>
                      <p className="text-2xl font-bold text-[#DB5461]">
                        {formData.planPayment.discountPrice}원
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Toggle
                        formData={formData}
                        setFormData={setFormData}
                        keyPath="planPayment"
                      />
                    </div>
                  </div>
                }
              >
                <div className="bg-white rounded-lg h-[1100px] ">
                  <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                    이용권 정보
                  </h3>

                  <div className="mb-4">
                    <Plan
                      selectedPlanId={formData.planId}
                      onSelectPlan={(planId, planName, price) => {
                        handleInputChange("planId", planId);
                        setSelectedPlanPrice(price);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      할인
                    </h3>
                    <h4 className="text-sm font-bold pl-4 pt-4">할인 상품명</h4>
                    <div className="m-4">
                      <input
                        type="text"
                        value={formData.planPayment.discountName}
                        placeholder="할인 상품명"
                        onChange={(e) =>
                          handleInputChange(
                            "planPayment.discountName",
                            e.target.value
                          )
                        }
                        className="input-content"
                      />
                    </div>
                    <div className="flex gap-4 mt-4 px-4">
                      <div className="w-1/2">
                        <h4 className="text-sm font-bold mb-2">할인율 (%)</h4>
                        <input
                          type="number"
                          className="w-full input-content"
                          value={formData.planPayment.discountRate}
                          min="0"
                          onChange={handleDiscountChange}
                        />
                      </div>

                      <div className="w-1/2">
                        <h4 className="text-sm font-bold mb-2">
                          할인율 적용 금액
                        </h4>
                        <input
                          type="text"
                          placeholder="할인 금액"
                          className="w-full mb-2 input-content"
                          value={formData.planPayment.discountPrice}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      결제 정보
                    </h3>
                    <div className="p-4">
                      <div>
                        <h4 className="text-sm font-bold mb-2">결제 방법</h4>
                        <div className="grid grid-cols-2 gap-2 py-2">
                          {["현금", "카드", "계좌이체", "기타"].map(
                            (method, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleMethodClick(method, "planPayment")
                                }
                                className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border ${
                                  selectedMethod.planPayment === method
                                    ? "bg-[#3C6229] text-white border-[#3C6229]"
                                    : "bg-white text-gray-600 border-gray-300"
                                }`}
                              >
                                {method}
                              </button>
                            )
                          )}

                          {selectedMethod.planPayment === "기타" && (
                            <input
                              type="text"
                              placeholder="기타 입력"
                              value={formData.planPayment.otherPaymentMethod}
                              onChange={(e) =>
                                handleInputChange(
                                  "planPayment.otherPaymentMethod",
                                  e.target.value
                                )
                              }
                              className="w-full input-content"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-2 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            value={
                              formData.planPayment?.registrationAt?.split(
                                "T"
                              )[0] || getCurrentDate()
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "planPayment.registrationAt",
                                e.target.value
                              )
                            }
                            className="input-content"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion
                title="기타 결제"
                isOpen={accordionOpenKey.includes("기타결제")}
                toggleOpen={() => toggleAccordion("기타결제")}
                footer={
                  <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold">총 금액</h4>
                      <p className="text-2xl font-bold text-[#DB5461]">{}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Toggle
                        formData={formData}
                        setFormData={setFormData}
                        keyPath="otherPayment"
                        index={0}
                      />
                    </div>
                  </div>
                }
              >
                <div className="bg-white rounded-lg h-[700px] overflow-y-scroll">
                  <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                    결제 정보
                  </h3>

                  <div className="mb-4 px-4">
                    <h4 className="text-sm font-bold my-2">결제 내용</h4>
                    <input
                      type="text"
                      placeholder="결제내용 입력"
                      className="p-4 input-content"
                      value={formData.otherPayment[0]?.content}
                      onChange={(e) =>
                        handleInputChange(
                          "otherPayment.content",
                          e.target.value,
                          0
                        )
                      }
                    />
                  </div>

                  <div className="mb-4 px-4">
                    <h4 className="text-sm font-bold my-2">결제 금액</h4>
                    <input
                      type="text"
                      placeholder="결제금액 입력"
                      className="p-4 mb-4 input-content"
                      value={formData.otherPayment[0]?.price}
                      onChange={(e) =>
                        handleInputChange(
                          "otherPayment.price",
                          e.target.value,
                          0
                        )
                      }
                    />
                  </div>

                  <div className="mb-7">
                    <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                      결제 방법
                    </h3>
                    <div className="p-4">
                      <div>
                        <h4 className="text-sm font-bold mb-2">결제 방법</h4>
                        <div className="grid grid-cols-2 gap-2 py-2">
                          {["현금", "카드", "계좌이체", "기타"].map(
                            (method, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleMethodClick(method, "otherPayment")
                                }
                                className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border ${
                                  selectedMethod.otherPayment === method
                                    ? "bg-[#3C6229] text-white border-[#3C6229]"
                                    : "bg-white text-gray-600 border-gray-300"
                                }`}
                              >
                                {method}
                              </button>
                            )
                          )}

                          {selectedMethod.otherPayment === "기타" && (
                            <input
                              type="text"
                              placeholder="기타 입력"
                              value={
                                formData.otherPayment[0]?.otherPaymentMethod
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "otherPayment.otherPaymentMethod",
                                  e.target.value,
                                  0
                                )
                              }
                              className="input-content"
                            />
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold mb-3 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            value={
                              formData.otherPayment[0]?.registrationAt?.split(
                                "T"
                              )[0] || getCurrentDate()
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "otherPayment.0.registrationAt",
                                e.target.value
                              )
                            }
                            className="input-content"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>

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
