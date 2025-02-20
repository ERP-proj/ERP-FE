"use client";

import React, { useState } from "react";
import { getLabel } from "@/utils/mapping";
import Accordion from "../../ui/Accordion";
import useCustomerStore from "@/store/useCustomerStore";
import { CustomerDetailData } from "@/store/useCustomerStore";
import { FaRegCircleCheck } from "react-icons/fa6";

const PlanPaymentForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const { customer, updatePlanPaymentStatus } = useCustomerStore();

  if (!customer || !customer.planPayment) {
    return <div>회원 정보를 불러오는 중...</div>;
  }
  const { planPayment } = customer;

  // 결제 상태 변경 핸들러
  const handleToggle = async () => {
    await updatePlanPaymentStatus(!planPayment.status);
  };

  return (
    <Accordion
      title="이용권 결제"
      isOpen={isOpen}
      toggleOpen={toggleAccordion}
      footer={
        <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold">총 금액</h4>
            <p className="text-2xl font-bold text-[#DB5461]">
              {planPayment.planPrice - planPayment.discountPrice}원
            </p>
          </div>
          {/* 결제토글 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleToggle}
          >
            <FaRegCircleCheck
              className={`w-5 h-5 ${
                planPayment.status ? "text-[#3C6229]" : "text-gray-300"
              } transition-colors duration-200`}
            />
            <span
              className={`text-sm ${
                planPayment.status ? "text-[#3C6229]" : "text-gray-600"
              }`}
            >
              {planPayment.status ? "결제완료" : "미납"}
            </span>
          </div>
        </div>
      }
    >
      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="border rounded-lg shadow-sm p-4 bg-gray-50 space-y-2">
          <p>
            <strong>면허 종류:</strong> {getLabel(planPayment.licenseType)}
          </p>
          <p>
            <strong>수강 방식:</strong> {getLabel(planPayment.planType)}
          </p>
          <p>
            <strong>수강 목적:</strong> {getLabel(planPayment.courseType)}
          </p>
          <p>
            <strong>이용권 이름:</strong> {planPayment.planName}
          </p>
          <p>
            <strong>결제 방법:</strong> {getLabel(planPayment.paymentsMethod)}
          </p>
          {planPayment.paymentsMethod === "OTHER" && (
            <p>
              <strong>기타 결제 내용:</strong> {planPayment.otherPaymentMethod}
            </p>
          )}
          <p>
            <strong>등록일:</strong>{" "}
            {new Date(planPayment.registrationAt).toLocaleDateString()}
          </p>
          <p>
            <strong>이용권 가격:</strong> {planPayment.planPrice}원
          </p>
          <p>
            <strong>할인율:</strong> {planPayment.discountRate}%
          </p>
          <p>
            <strong>할인 상품명:</strong> {planPayment.discountName}
          </p>
          <p>
            <strong>할인 금액:</strong>
            {planPayment.discountPrice}원
          </p>
        </div>
      </div>
    </Accordion>
  );
};

export default PlanPaymentForm;
