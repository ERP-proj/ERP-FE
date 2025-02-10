"use client";

import React, { useState } from "react";
import Accordion from "../../ui/Accordion";
import BasicButton from "../../ui/BasicButton";
import { CustomerDetailData, UpdateCustomerDetail } from "@/types/memberType";
import Modal from "../../ui/Modal";
import DetailForm from "./DetailForm";
import { FaRegCircleCheck } from "react-icons/fa6";
import { memberAPI } from "@/api/member";
import PlanPaymentForm from "./PlanPaymentForm";

// ✅ `CustomerDetailData` → `UpdateCustomerDetail` 변환 함수
const convertToUpdateCustomerDetail = (
  data: CustomerDetailData
): UpdateCustomerDetail => {
  return {
    customerId: data.customerId,
    name: data.name,
    gender: data.gender,
    birthDate: data.birthDate,
    phone: data.phone,
    address: data.address,
    visitPath: data.visitPath,
    memo: data.memo,
    photoFile: null, // 파일은 새로 업로드하는 경우만 포함
    photoUrl: data.photoUrl,
    planPaymentStatus: data.planPayment.status,
    progressList: {
      addProgresses: [],
      updateProgresses: [],
      deleteProgresses: [],
    },
    otherPayment: data.otherPayment.map((payment) => ({
      paymentsMethod: payment.paymentsMethod,
      otherPaymentMethod: payment.otherPaymentMethod,
      registrationAt: payment.registrationAt,
      content: payment.content,
      price: payment.price,
      status: payment.status,
    })),
  };
};
interface DetailMemberProps {
  member: CustomerDetailData;
  onClose: () => void;
}

const DetailMember: React.FC<DetailMemberProps> = ({ member, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  // ✅ `CustomerDetailData` → `UpdateCustomerDetail`로 변환하여 상태 관리
  const [customerInfo, setCustomerInfo] = useState<UpdateCustomerDetail>(
    convertToUpdateCustomerDetail(member)
  );

  // ✅ 수정 핸들러
  const handleModify = (key: keyof UpdateCustomerDetail, value: any) => {
    setCustomerInfo((prev) => ({ ...prev, [key]: value }));
    setIsModified(true);
  };

  //✅ 저장 핸들러
  const handleSave = async () => {
    const formData = new FormData();

    const filteredAddProgresses =
      customerInfo.progressList.addProgresses.filter(
        (p) => p.date.trim() !== "" && p.content.trim() !== ""
      );
    const uniqueUpdateProgresses = Array.from(
      new Map(
        customerInfo.progressList.updateProgresses.map((p) => [p.progressId, p])
      ).values()
    );
    // 날짜 형식 변환
    const formattedOtherPayment = customerInfo.otherPayment.map((payment) => ({
      ...payment,
      registrationAt: new Date(payment.registrationAt).toISOString(),
    }));

    // JSON 데이터 Blob 변환
    const requestData = {
      customerId: customerInfo.customerId,
      name: customerInfo.name,
      gender: customerInfo.gender,
      birthDate: customerInfo.birthDate,
      phone: customerInfo.phone,
      address: customerInfo.address,
      visitPath: customerInfo.visitPath,
      memo: customerInfo.memo,
      planPaymentStatus: customerInfo.planPaymentStatus,
      progressList: {
        addProgresses: filteredAddProgresses,
        updateProgresses: uniqueUpdateProgresses,
        deleteProgresses: customerInfo.progressList.deleteProgresses,
      },
      otherPayment: formattedOtherPayment,
    };

    const jsonBlob = new Blob([JSON.stringify(requestData)], {
      type: "application/json",
    });
    formData.append("req", jsonBlob);

    // 파일 추가 (선택적)
    if (customerInfo.photoFile) {
      formData.append("file", customerInfo.photoFile);
    }

    try {
      await memberAPI.updateCustomerDetail(formData as any);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      setIsModified(false);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("❌ 회원 정보 수정 실패:", error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
  //✅ 회원삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 회원을 삭제하시겠습니까?")) return;

    try {
      await memberAPI.updateCustomerStatus(member.customerId, "DELETED");
      alert("회원이 삭제되었습니다.");
      onClose();
    } catch (error) {
      console.error("❌ 회원 정보 수정 실패:", error);
      alert("회원 삭제 중 오류가 발생했습니다.");
    }
  };

  const addPayment = () => {
    setCustomerInfo((prev) => ({
      ...prev,
      otherPayment: [
        ...prev.otherPayment,
        {
          paymentsMethod: "CASH",
          otherPaymentMethod: "",
          registrationAt: new Date().toISOString(),
          content: "",
          price: 0,
          status: false,
        },
      ],
    }));
    setIsModified(true);
  };

  const updatePayment = (
    index: number,
    key: keyof UpdateCustomerDetail["otherPayment"][0],
    value: any
  ) => {
    setCustomerInfo((prev) => {
      const updatedPayments = prev.otherPayment.map((payment, i) =>
        i === index ? { ...payment, [key]: value } : payment
      );
      return { ...prev, otherPayment: updatedPayments };
    });
    setIsModified(true);
  };
  const deletePayment = (index: number) => {
    setCustomerInfo((prev) => ({
      ...prev,
      otherPayment: prev.otherPayment.filter((_, i) => i !== index),
    }));
    setIsModified(true);
  };

  return (
    <Modal
      isOpen={!!member}
      onClose={onClose}
      leftChildren={
        <DetailForm customerInfo={customerInfo} onModify={handleModify} />
      }
      rightChildren={
        <div className="relative h-full flex flex-col">
          <div className="flex-grow">
            {/* 이용권 결제 정보 */}

            <PlanPaymentForm planPayment={member.planPayment} />
            {/* 기타 결제 정보 */}
            <Accordion
              title="기타 결제 내역"
              isOpen={isOpen}
              toggleOpen={toggleAccordion}
            >
              <div className="bg-white rounded-lg p-4 space-y-4">
                {customerInfo.otherPayment.map((payment, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded shadow-sm relative bg-gray-50"
                  >
                    <div className="mb-4">
                      <h4 className="text-sm font-bold my-2">결제 내용</h4>
                      <input
                        type="text"
                        value={payment.content}
                        onChange={(e) =>
                          updatePayment(index, "content", e.target.value)
                        }
                        className="p-4 input-content"
                      />
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-bold my-2">결제 금액</h4>
                      <input
                        type="text"
                        value={payment.price}
                        onChange={(e) =>
                          updatePayment(
                            index,
                            "price",
                            Number(e.target.value) || 0
                          )
                        }
                        className="p-4 mb-4 input-content"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold mb-2">결제 방법</h4>
                      <div className="grid grid-cols-2 gap-2 py-2">
                        {["CASH", "CARD", "TRANSFER", "OTHER"].map((method) => (
                          <button
                            key={method}
                            onClick={() =>
                              updatePayment(index, "paymentsMethod", method)
                            }
                            className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border ${
                              payment.paymentsMethod === method
                                ? "bg-[#3C6229] text-white border-[#3C6229]"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                          >
                            {method === "CASH"
                              ? "현금"
                              : method === "CARD"
                              ? "카드"
                              : method === "TRANSFER"
                              ? "계좌이체"
                              : "기타"}
                          </button>
                        ))}
                      </div>

                      {payment.paymentsMethod === "OTHER" && (
                        <input
                          type="text"
                          placeholder="기타 입력"
                          value={payment.otherPaymentMethod || ""}
                          onChange={(e) =>
                            updatePayment(
                              index,
                              "otherPaymentMethod",
                              e.target.value
                            )
                          }
                          className="input-content w-full mt-2 p-2 border rounded-md"
                        />
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 pt-4">등록일</h4>
                      <input
                        type="date"
                        value={payment.registrationAt.split("T")[0]}
                        onChange={(e) =>
                          updatePayment(
                            index,
                            "registrationAt",
                            new Date(e.target.value).toISOString()
                          )
                        }
                        className="input-content"
                      />
                    </div>
                    <div className="flex justify-center mt-4">
                      <BasicButton
                        size="large"
                        color="danger"
                        border={true}
                        onClick={() => deletePayment(index)}
                      >
                        기타 결제 삭제
                      </BasicButton>
                    </div>

                    {/* 미납 여부 */}
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        updatePayment(index, "status", !payment.status)
                      }
                    >
                      <FaRegCircleCheck
                        className={`w-5 h-5 ${
                          payment.status ? "text-[#3C6229]" : "text-gray-300"
                        } transition-colors duration-200`}
                      />
                      <span
                        className={`text-sm ${
                          payment.status ? "text-[#3C6229]" : "text-gray-600"
                        }`}
                      >
                        {payment.status ? "결제 완료" : "미납"}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <BasicButton color="gray" size="large" onClick={addPayment}>
                    기타 결제 추가
                  </BasicButton>
                </div>
              </div>
            </Accordion>
          </div>

          {/* 하단 버튼 */}
          <div className="sticky bottom-0 left-0 bg-white p-4 shadow-md flex justify-end gap-4 z-10">
            <BasicButton
              size="medium"
              color="danger"
              border={true}
              onClick={handleDelete}
            >
              회원 삭제
            </BasicButton>
            <BasicButton
              size="medium"
              color="secondary"
              border={true}
              onClick={onClose}
            >
              취소
            </BasicButton>
            <BasicButton
              size="medium"
              color={isModified ? "primary" : "gray"}
              border={true}
              onClick={handleSave}
              disabled={!isModified}
            >
              저장
            </BasicButton>
          </div>
        </div>
      }
    />
  );
};
export default DetailMember;
