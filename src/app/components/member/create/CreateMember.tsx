"use client";

import React, { useState, use } from "react";
import BasicButton from "../../ui/BasicButton";
import Modal from "../../ui/Modal";
import Accordion from "../../ui/Accordion";
import Toggle from "../../ui/Toggle";
import RegisterForm from "./RegisterForm";
import { memberAPI } from "@/api/member";
import Plan from "./Plan";
import { FormData } from "@/types/memberType";
import { getCurrentDate } from "@/utils/formatDate";
import useDiscount from "@/hooks/plan/useDiscount";

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
  },
  otherPayment: [
    {
      paymentsMethod: "CARD", // 기본값 설정
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
  const handleInputChange = (key: string, value: any, index?: number) => {
    const keys = key.split(".");
    setFormData((prevData) => {
      const newData: FormData = { ...prevData };
      let obj: any = newData;

      keys.forEach((k, idx) => {
        if (idx === keys.length - 1) {
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
  const [selectedPlanName, setSelectedPlanName] = useState<string>("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0);
  const [accordionOpenKey, setAccordionOpenKey] = useState<string | null>(null);
  const { discountRate, finalPrice, errorMessage, handleDiscountChange } =
    useDiscount(selectedPlanPrice);
  const [selectedMethod, setSelectedMethod] = useState<{
    [key: string]: string;
  }>({
    planPayment: "",
    otherPayment: "",
  });

  const toggleAccordion = (key: string) => {
    setAccordionOpenKey((prevKey) => (prevKey === key ? null : key));
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
      alert("회원 등록이 성공적으로 완료되었습니다!");
      window.location.reload();
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
          <div className="relative h-full flex flex-col">
            <div className="flex-grow">
              <Accordion
                title="이용권 결제"
                isOpen={accordionOpenKey === "이용권결제"}
                toggleOpen={() => toggleAccordion("이용권결제")}
                footer={
                  <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold">총 금액</h4>
                      <p className="text-2xl font-bold text-[#DB5461]">
                        {finalPrice}원
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
                      onSelectPlan={(planId, planName, price) => {
                        handleInputChange("planId", planId);
                        setSelectedPlanPrice(price);
                        setSelectedPlanName(planName);
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
                          placeholder="할인율 입력"
                          className="w-full input-content"
                          value={discountRate}
                          onChange={(e) => handleDiscountChange(e)}
                        />
                        {errorMessage && (
                          <p className="text-red-500 text-xs mt-1">
                            {errorMessage}
                          </p>
                        )}
                      </div>

                      <div className="w-1/2">
                        <h4 className="text-sm font-bold mb-2">
                          할인율 적용 금액
                        </h4>
                        <input
                          type="text"
                          placeholder="할인 금액"
                          className="w-full mb-2 input-content"
                          value={finalPrice}
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
                        <div className="mb-4">
                          <h4 className="text-sm font-bold mb-2 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            value={
                              formData.planPayment?.registrationAt ||
                              getCurrentDate()
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
                isOpen={accordionOpenKey === "기타결제"}
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

                        <div className="mb-4">
                          <h4 className="text-sm font-bold mb-3 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            value={
                              formData.otherPayment[0]?.registrationAt ||
                              getCurrentDate()
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
