"use client";

import React, { useState } from "react";
import Accordion from "../../ui/Accordion";
import BasicButton from "../../ui/BasicButton";
import { CustomerDetailData, UpdateCustomerDetail } from "@/types/memberType";
import Modal from "../../ui/Modal";
import DetailForm from "./DetailForm";
import { FaRegCircleCheck } from "react-icons/fa6";
import { memberAPI } from "@/api/member";

interface DetailMemberProps {
  member: CustomerDetailData;
  onClose: () => void;
}

const DetailMember: React.FC<DetailMemberProps> = ({ member, onClose }) => {
  const [accordionOpenKey, setAccordionOpenKey] = useState<number | null>(null);
  const [isModified, setIsModified] = useState(false);
  console.log("DetailMember Props:", member);
  const handleSave = async (updatedMember: UpdateCustomerDetail) => {
    const requestData: UpdateCustomerDetail = {
      customerId: member.customerId,
      name: updatedMember.name || "",
      gender: updatedMember.gender,
      birthDate: updatedMember.birthDate || "",
      phone: updatedMember.phone || "",
      address: updatedMember.address || "",
      visitPath: updatedMember.visitPath || "",
      memo: updatedMember.memo || "",
      photoFile: null,
      planPaymentStatus: updatedMember.planPaymentStatus || true,
      progressList: {
        addProgresses: updatedMember.progressList.addProgresses || [],
        updateProgresses: updatedMember.progressList.updateProgresses || [],
        deleteProgresses: updatedMember.progressList.deleteProgresses || [],
      },
      otherPayment: updatedMember.otherPayment.map((payment) => ({
        paymentsMethod: payment.paymentsMethod || "CASH", // 기본값 설정
        otherPaymentMethod: payment.otherPaymentMethod || "",
        registrationAt: payment.registrationAt,
        content: payment.content,
        price: payment.price,
        status: payment.status,
      })),
    };

    try {
      await memberAPI.updateCustomerDetail(requestData);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      setIsModified(false); // 저장 후 수정 상태 초기화
      onClose();
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
      console.log(JSON.stringify(requestData, null, 2));
    }
  };

  const toggleAccordion = (key: number) => {
    setAccordionOpenKey((prev) => (prev === key ? null : key));
  };

  // 매핑 함수
  const getLabel = (type: string) => {
    const mapping: { [key: string]: string } = {
      TYPE_1: "1종",
      TYPE_2: "2종",
      TIME_BASED: "시간제",
      PERIOD_BASED: "기간제",
      ACQUISITION: "취득",
      REFRESHER: "장롱",
      STANDARD: "일반",
      CARD: "카드",
      CASH: "현금",
      TRANSFER: "계좌이체",
      OTHER: "기타",
    };
    return mapping[type] || type;
  };

  return (
    <Modal
      isOpen={!!member}
      onClose={onClose}
      leftChildren={
        <DetailForm
          member={member}
          onSave={handleSave} // 저장 함수 전달
          onModify={() => setIsModified(true)}
        />
      }
      rightChildren={
        <div className="relative h-full flex flex-col">
          <div className="flex-grow">
            {/* 이용권 결제 정보 */}
            <Accordion
              title="이용권 결제"
              isOpen={accordionOpenKey === 0}
              toggleOpen={() => toggleAccordion(0)}
              footer={
                <div className="flex flex-col w-full gap-4 bg-gradient-to-t from-white via-white to-transparent px-4 py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold">총 금액</h4>
                    <p className="text-2xl font-bold text-[#DB5461]">
                      {member.planPayment.planPrice -
                        member.planPayment?.discountPrice}
                      원
                    </p>
                  </div>
                  {/* 미납 여부 */}
                  <div className="flex items-center gap-2">
                    <FaRegCircleCheck
                      className={`w-5 h-5 ${
                        member.planPayment.status
                          ? "text-[#3C6229]"
                          : "text-gray-300"
                      } transition-colors duration-200`}
                    />
                    <span
                      className={`text-sm ${
                        member.planPayment.status
                          ? "text-[#3C6229]"
                          : "text-gray-600"
                      }`}
                    >
                      {member.planPayment.status ? "결제 완료" : "미납"}
                    </span>
                  </div>
                </div>
              }
            >
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="border rounded-lg shadow-sm p-4 bg-gray-50 space-y-2">
                  <p>
                    <strong>면허 종류:</strong>{" "}
                    {getLabel(member.planPayment.licenseType)}
                  </p>
                  <p>
                    <strong>수강 방식:</strong>{" "}
                    {getLabel(member.planPayment.planType)}
                  </p>
                  <p>
                    <strong>수강 목적:</strong>{" "}
                    {getLabel(member.planPayment.courseType)}
                  </p>
                  <p>
                    <strong>이용권 이름:</strong> {member.planPayment.planName}
                  </p>
                  <p>
                    <strong>결제 방법:</strong>{" "}
                    {getLabel(member.planPayment.paymentsMethod)}
                  </p>
                  {member.planPayment.paymentsMethod === "OTHER" && (
                    <p>
                      <strong>기타 결제 내용:</strong>{" "}
                      {getLabel(member.planPayment.otherPaymentMethod)}
                    </p>
                  )}
                  <p>
                    <strong>등록일:</strong>{" "}
                    {new Date(
                      member.planPayment.registrationAt
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>이용권 가격:</strong> {member.planPayment.planPrice}
                    원
                  </p>
                  <p>
                    <strong>할인율:</strong> {member.planPayment.discountRate}%
                  </p>
                  <p>
                    <strong>할인 금액:</strong>{" "}
                    {member.planPayment.discountPrice}원
                  </p>
                </div>
              </div>
            </Accordion>

            {/* 기타 결제 정보 */}
            <Accordion
              title="기타 결제 내역"
              isOpen={accordionOpenKey === 1}
              toggleOpen={() => toggleAccordion(1)}
            >
              <div className="bg-white rounded-lg h-[600px] overflow-y-scroll">
                <h3 className="text-md bg-[#F6F6F6] p-2 pl-4  m-0 text-[#0D0D0D] font-bold">
                  결제 정보
                </h3>
                {member.otherPayment.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {member.otherPayment.map((payment, index) => (
                      <div
                        key={index}
                        className="border rounded-lg shadow-sm p-4 bg-gray-50"
                      >
                        <p>
                          <strong>결제 내용 {index + 1}:</strong>{" "}
                          {payment.content || ""}
                        </p>
                        <p>
                          <strong>결제 방법:</strong>{" "}
                          {getLabel(payment.paymentsMethod || "")}
                        </p>
                        {payment.paymentsMethod === "OTHER" && (
                          <p>
                            <strong>기타 결제 내용:</strong>{" "}
                            {getLabel(payment.otherPaymentMethod || "")}
                          </p>
                        )}

                        <p>
                          <strong>금액:</strong> {payment.price}원
                        </p>
                        <p>
                          <strong>등록일:</strong>{" "}
                          {new Date(
                            payment.registrationAt
                          ).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <FaRegCircleCheck
                            className={`w-5 h-5 ${
                              payment.status
                                ? "text-[#3C6229]"
                                : "text-gray-300"
                            } transition-colors duration-200`}
                          />
                          <span
                            className={`text-sm ${
                              payment.status
                                ? "text-[#3C6229]"
                                : "text-gray-600"
                            }`}
                          >
                            {payment.status ? "결제 완료" : "미납"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-gray-500">
                    기타 결제 내역이 없습니다.
                  </p>
                )}
              </div>
            </Accordion>
          </div>

          {/* 하단 버튼 */}
          <div className="sticky bottom-0 left-0 bg-white p-4 shadow-md flex justify-end gap-4 z-10">
            <BasicButton size="medium" color="danger" border={true}>
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
              onClick={() => handleSave(member)}
              disabled={!isModified} // 수정되지 않은 경우 비활성화
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
