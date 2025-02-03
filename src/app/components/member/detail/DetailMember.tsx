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
  member: CustomerDetailData | null;
  onClose: () => void;
}

const DetailMember: React.FC<DetailMemberProps> = ({ member, onClose }) => {
  const [accordionOpenKey, setAccordionOpenKey] = useState<number | null>(null);
  const [isModified, setIsModified] = useState(false); // 수정 여부 상태
  console.log("DetailMember Props:", member); // DetailMember
  const handleSave = async (updatedMember: UpdateCustomerDetail) => {
    const requestData: UpdateCustomerDetail = {
      customerId: member.customerId,
      photoUrl: updatedMember.photoUrl || "",
      name: updatedMember.name || "",
      gender: updatedMember.gender,
      birthDate: updatedMember.birthDate || "",
      phone: updatedMember.phone || "",
      address: updatedMember.address || "",
      visitPath: updatedMember.visitPath || "",
      memo: updatedMember.memo || "",
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

  if (!member) {
    return <div>데이터를 불러오는 중...</div>;
  }

  const toggleAccordion = (key: number) => {
    setAccordionOpenKey((prev) => (prev === key ? null : key));
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
              <div className="bg-white rounded-lg h-[1050px] ">
                <h3 className="text-md pl-4 bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                  이용권 정보
                </h3>
                <div className="gap-4 mt-4 px-4">
                  {/* 구분1 */}
                  <h4 className="text-sm font-bold mb-2">구분 1</h4>
                  <div className="flex gap-2 mb-4">
                    <button
                      className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.licenseType === "1종"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      1종
                    </button>
                    <button
                      className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.licenseType === "2종"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      2종
                    </button>
                  </div>

                  {/* 구분2 */}
                  <h4 className="text-sm font-bold mb-2">구분 2</h4>
                  <div className="flex gap-2 mb-4">
                    <button
                      className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.planType === "TIME_BASED"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      시간제
                    </button>
                    <button
                      className={`w-1/2 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.planType === "PERIOD_BASED"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      기간제
                    </button>
                  </div>

                  {/* 구분3 */}
                  <h4 className="text-sm font-bold mb-2">구분 3</h4>
                  <div className="flex gap-2 mb-4">
                    <button
                      className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.courseType === "ACQUISITION"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      취득
                    </button>
                    <button
                      className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.courseType === "REFRESHER"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      장롱
                    </button>
                    <button
                      className={`w-1/3 py-2 rounded-md text-sm font-semibold ${
                        member.planPayment.courseType === "STANDARD"
                          ? "bg-[#3C6229] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      일반
                    </button>
                  </div>
                  <h4 className="text-sm font-bold mb-2">이용권</h4>
                  <h4 className="input-content mb-4">
                    {member.planPayment.planName}
                  </h4>
                </div>
                <div className="mb-4">
                  <h3 className="text-md bg-[#F6F6F6] p-2 pl-4 m-0 text-[#0D0D0D] font-bold">
                    할인
                  </h3>
                  <div className="gap-4 mt-4 px-4">
                    <h4 className="text-sm font-bold mb-2">할인 상품명</h4>
                    <h4 className="input-content">
                      {member.planPayment.planName}
                    </h4>
                  </div>
                  <div className="flex gap-4 mt-4 px-4">
                    <div className="w-1/2">
                      <h4 className="text-sm font-bold mb-2 ">할인율 (%)</h4>
                      <h4 className="input-content">
                        {member.planPayment?.discountRate}
                      </h4>
                    </div>
                    <div className="w-1/2">
                      <h4 className="text-sm font-bold mb-2">
                        할인율 적용 금액
                      </h4>
                      <h4 className="input-content">
                        {member.planPayment.planPrice -
                          member.planPayment?.discountPrice}
                      </h4>
                    </div>
                  </div>
                </div>

                <h3 className="text-md bg-[#F6F6F6] p-2 pl-4 m-0 text-[#0D0D0D] font-bold">
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
                            className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border transition-colors ${
                              member.planPayment.paymentsMethod === method
                                ? "bg-[#3C6229] text-white border-[#3C6229]"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                          >
                            {method}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2 pt-4">등록일</h4>
                    <h4 className="input-content">
                      {new Date(
                        member.planPayment.registrationAt
                      ).toLocaleDateString()}
                    </h4>
                  </div>
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
                          <strong>결제 {index + 1}:</strong>{" "}
                          {payment.content || "내용 없음"}
                        </p>
                        <p>
                          <strong>결제 방법:</strong>{" "}
                          {payment.paymentsMethod || "N/A"}
                        </p>
                        <p>
                          <strong>등록일:</strong>{" "}
                          {new Date(
                            payment.registrationAt
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>금액:</strong> {payment.price}원
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
