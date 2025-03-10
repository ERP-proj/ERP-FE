"use client";

import React, { useCallback, useEffect, useState } from "react";
import Accordion from "../../ui/Accordion";
import BasicButton from "../../ui/BasicButton";
import Modal from "../../ui/Modal";
import DetailForm from "./DetailForm";
import { FaRegCircleCheck } from "react-icons/fa6";
import PlanPaymentForm from "./PlanPaymentForm";
import { useAlertStore } from "@/store/useAlertStore";
import { getLabel } from "@/utils/mapping";
import useCustomerStore, {
  OtherPayment,
  convertToUpdateCustomerDetail,
} from "@/store/useCustomerStore";
import {
  CustomerDetailData,
  UpdateCustomerDetail,
} from "@/store/useCustomerStore";
import { useQueryClient } from "@tanstack/react-query";
interface DetailMemberProps {
  customerId: number;
  onClose: () => void;
}

const DetailMember: React.FC<DetailMemberProps> = ({ customerId, onClose }) => {
  const { showAlert } = useAlertStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const { customer, fetchCustomer, updateCustomer, updateCustomerStatus } =
    useCustomerStore();
  // ✅ 수정용 임시 상태 추가
  const [tempCustomer, setTempCustomer] = useState<Partial<
    CustomerDetailData & { otherPayment: OtherPayment[] }
  > | null>(null);
  const queryClient = useQueryClient(); //React Query 캐시 사용

  const loadCustomer = useCallback(() => {
    fetchCustomer(customerId);
  }, [customerId]);

  useEffect(() => {
    loadCustomer();
    console.log("상세데이터", tempCustomer);
  }, [loadCustomer]);

  useEffect(() => {
    if (customer) {
      setTempCustomer((prev) => ({
        ...prev!,
        ...customer,
        customerId: customer.customerId ?? prev?.customerId ?? customerId,
        otherPayment: customer.otherPayment ?? [],
      }));
      setIsModified(false);
    }
  }, [customer]);

  if (!tempCustomer) {
    return <div className="p-6 text-center">⏳ 고객 정보를 불러오는 중...</div>;
  }

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  // ✅ 수정 핸들러
  const handleModify = (
    updatedData: Partial<CustomerDetailData & UpdateCustomerDetail>
  ) => {
    setTempCustomer((prev) => ({
      ...prev!,
      ...updatedData,
      planPaymentStatus:
        updatedData.planPaymentStatus ?? prev?.planPaymentStatus ?? false,
      progressList: Array.isArray(updatedData.progressList)
        ? updatedData.progressList
        : prev?.progressList ?? [],
      // ✅ 기존 값 유지
      otherPayment: updatedData.otherPayment
        ? updatedData.otherPayment.map((payment, index) => ({
            ...prev?.otherPayment?.[index], // 기존 값 유지
            ...payment, // 변경된 값 적용
          }))
        : prev?.otherPayment ?? [],
    }));

    setIsModified(true);
  };

  // ✅ 저장 핸들러
  const handleSave = async () => {
    if (!tempCustomer) return;

    if (!tempCustomer.customerId) {
      console.error("customerId가 없습니다.");
      return;
    }
    // ✅ 빈 행을 필터링
    const filteredProgressList =
      tempCustomer.progressList?.filter(
        (item) => item?.date?.trim() !== "" && item?.content?.trim() !== ""
      ) ?? [];

    const filteredOtherPayment =
      tempCustomer.otherPayment?.filter(
        (item) => item?.content?.trim() !== "" && item?.price > 0
      ) ?? [];

    showAlert("변경된 정보를 저장하시겠습니까?", async () => {
      try {
        const updateData = {
          ...convertToUpdateCustomerDetail(tempCustomer as CustomerDetailData),
          progressList: filteredProgressList,
          otherPayment: filteredOtherPayment ?? [],
          planPaymentStatus: tempCustomer.planPaymentStatus,
        };
        console.log("📦 서버로 보낼 데이터:", updateData);
        await updateCustomer(updateData);
        // ✅ 최신 데이터 다시 불러오기
        setIsModified(false);
        fetchCustomer(customerId);
        onClose();
      } catch (error) {
        console.error("❌ 회원 정보 수정 실패:", error);
      }
    });
  };

  // ✅ 회원 삭제 핸들러
  const handleDelete = async () => {
    showAlert("정말 회원을 삭제하시겠습니까?", async () => {
      try {
        await updateCustomerStatus(customerId, "DELETED");
        // ✅ MemberList 데이터 다시 가져오기 (React Query 캐시 무효화)
        queryClient.invalidateQueries({ queryKey: ["members", "ACTIVE"] });
        onClose();
      } catch (error) {
        console.error("❌ 회원 삭제 실패:", error);
        alert("회원 삭제 중 오류가 발생했습니다.");
      }
    });
  };

  const handleOtherPaymentChange = (
    index: number,
    field: keyof OtherPayment,
    value: string | number | boolean
  ) => {
    if (!tempCustomer) return;

    const updatedOtherPayment = tempCustomer.otherPayment?.map((payment, i) =>
      i === index ? { ...payment, [field]: value } : payment
    );

    if (updatedOtherPayment) {
      handleModify({ otherPayment: updatedOtherPayment });
    }
  };

  const addPayment = () => {
    if (!tempCustomer) return;

    const newPayment: OtherPayment = {
      paymentsMethod: "CARD",
      otherPaymentMethod: "",
      registrationAt: new Date().toISOString(),
      content: "",
      price: 0,
      status: false,
    };

    handleModify({
      otherPayment: [...(tempCustomer.otherPayment ?? []), newPayment],
    });
  };

  const deletePayment = (index: number) => {
    if (!tempCustomer) return;

    const updatedOtherPayment = tempCustomer.otherPayment?.filter(
      (_, i) => i !== index
    );

    if (updatedOtherPayment) {
      handleModify({ otherPayment: updatedOtherPayment });
    }
  };

  return (
    <Modal
      isOpen={!!customer}
      onClose={onClose}
      leftChildren={
        <DetailForm customer={tempCustomer} onModify={handleModify} />
      }
      rightChildren={
        <div className="relative overflow-y-scroll h-full flex flex-col">
          <div className="flex-grow">
            {/* 이용권 결제 정보 */}

            <PlanPaymentForm customer={tempCustomer} onModify={handleModify} />
            {/* 기타 결제 정보 */}
            <Accordion
              title="기타 결제 내역"
              isOpen={isOpen}
              toggleOpen={toggleAccordion}
            >
              <div className="bg-white rounded-lg p-4 space-y-4">
                {tempCustomer.otherPayment?.map((payment, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded shadow-sm bg-gray-50"
                  >
                    {/* 결제 내용 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold">결제 내용</h4>
                      <input
                        type="text"
                        value={payment.content}
                        onChange={(e) =>
                          handleOtherPaymentChange(
                            index,
                            "content",
                            e.target.value
                          )
                        }
                        className="w-full input-content"
                      />
                    </div>

                    {/* 결제 금액 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold">결제 금액</h4>
                      <input
                        type="number"
                        value={payment.price}
                        onChange={(e) =>
                          handleOtherPaymentChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        min="0"
                        className="w-full input-content"
                      />
                    </div>

                    {/* 결제 방법 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold">결제 방법</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {["CASH", "CARD", "TRANSFER", "OTHER"].map((method) => (
                          <button
                            key={method}
                            className={`py-2 rounded-md text-sm font-semibold border ${
                              payment.paymentsMethod === method
                                ? "bg-[#3C6229] text-white"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                            onClick={() =>
                              handleOtherPaymentChange(
                                index,
                                "paymentsMethod",
                                method
                              )
                            }
                          >
                            {getLabel(method)}
                          </button>
                        ))}
                      </div>

                      {payment.paymentsMethod === "OTHER" && (
                        <input
                          type="text"
                          placeholder="기타 입력"
                          value={payment.otherPaymentMethod}
                          onChange={(e) =>
                            handleOtherPaymentChange(
                              index,
                              "otherPaymentMethod",
                              e.target.value
                            )
                          }
                          className="w-full mt-2 input-content"
                        />
                      )}
                    </div>

                    {/* 등록일 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold">등록일</h4>
                      <input
                        type="date"
                        value={payment.registrationAt.split("T")[0]}
                        onChange={(e) =>
                          handleOtherPaymentChange(
                            index,
                            "registrationAt",
                            e.target.value
                          )
                        }
                        className="w-full input-content"
                      />
                    </div>

                    {/* 결제 상태 */}
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        handleOtherPaymentChange(
                          index,
                          "status",
                          !payment.status
                        )
                      }
                    >
                      <FaRegCircleCheck
                        className={`w-5 h-5 ${
                          payment.status ? "text-[#3C6229]" : "text-gray-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          payment.status ? "text-[#3C6229]" : "text-gray-600"
                        }`}
                      >
                        {payment.status ? "결제 완료" : "미납"}
                      </span>
                    </div>

                    {/* 삭제 버튼 */}
                    <div className="mt-4">
                      <button
                        onClick={() => deletePayment(index)}
                        className="text-red-500 text-sm underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}

                {/* 추가 버튼 */}
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
