"use client";

import React, { useCallback, useEffect, useState } from "react";
import Accordion from "../../ui/Accordion";
import BasicButton from "../../ui/BasicButton";
import Modal from "../../ui/Modal";
import DetailForm from "./DetailForm";
import { FaRegCircleCheck } from "react-icons/fa6";
import PlanPaymentForm from "./PlanPaymentForm";
// import useAutoFocus from "@/hooks/plan/useAutoFocus";
import { useAlertStore } from "@/store/useAlertStore";
import { getLabel } from "@/utils/mapping";
import useCustomerStore, {
  convertToUpdateCustomerDetail,
} from "@/store/useCustomerStore";
import {
  CustomerDetailData,
  UpdateCustomerDetail,
} from "@/store/useCustomerStore";
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
  const [tempCustomer, setTempCustomer] =
    useState<Partial<CustomerDetailData> | null>(null);

  const loadCustomer = useCallback(() => {
    fetchCustomer(customerId);
  }, [customerId]);

  useEffect(() => {
    loadCustomer();
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
    console.log("🛠 수정된 데이터:", updatedData);

    setTempCustomer((prev) => {
      const newState = {
        ...prev!,
        ...updatedData,
        planPaymentStatus:
          updatedData.planPaymentStatus ?? prev?.planPaymentStatus,
        otherPayment: updatedData.otherPayment ?? prev?.otherPayment,
        progressList: Array.isArray(updatedData.progressList)
          ? updatedData.progressList
          : prev?.progressList ?? [],
      };

      console.log("✅ 업데이트된 tempCustomer:", newState);
      return newState;
    });

    setIsModified(true); // 변경 감지
  };

  // ✅ 저장 핸들러
  const handleSave = async () => {
    if (!tempCustomer) return;

    // ✅ tempCustomer가 CustomerDetailData 타입임을 보장
    if (!tempCustomer.customerId) {
      console.error("customerId가 없습니다.");
      return;
    }

    showAlert("변경된 정보를 저장하시겠습니까?", async () => {
      try {
        // ✅ tempCustomer를 CustomerDetailData로 타입 단언
        const updateData = convertToUpdateCustomerDetail(
          tempCustomer as CustomerDetailData
        );
        console.log("📦 서버로 보낼 데이터:", updateData);
        await updateCustomer(updateData);
        setIsModified(false); // 저장 후 변경 상태 초기화
        fetchCustomer(customerId); // 최신 데이터 다시 불러오기
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
        window.location.reload();
        onClose(); // 모달 닫기
      } catch (error) {
        console.error("❌ 회원 삭제 실패:", error);
        alert("회원 삭제 중 오류가 발생했습니다.");
      }
    });
  };
  // ✅ 기타 결제 수정
  const modifyOtherPayment = (index: number, key: string, value: any) => {
    setTempCustomer((prev) => {
      if (!prev) return prev;

      // ✅ 기존 상태를 복사하여 새로운 객체 생성 (강제 렌더링 유도)
      const updatedPayments = prev.otherPayment
        ? prev.otherPayment.map((payment, i) =>
            i === index ? { ...payment, [key]: value } : payment
          )
        : [];

      const newState = { ...prev, otherPayment: updatedPayments };

      console.log("🛠 기타 결제 수정됨 (강제 렌더링 유도):", newState);
      return { ...newState }; // 새로운 객체 반환
    });
  };
  // ✅ 기타 결제 추가
  const addPayment = () => {
    if (!tempCustomer) return;

    const newPayment = {
      paymentsMethod: "CASH",
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

  // ✅ 기타 결제 삭제
  const deletePayment = (index: number) => {
    if (!tempCustomer) return;

    const updatedPayments =
      tempCustomer.otherPayment?.filter((_, i) => i !== index) ?? [];

    handleModify({ otherPayment: updatedPayments });
  };

  return (
    <Modal
      isOpen={!!customer}
      onClose={onClose}
      leftChildren={
        <DetailForm customer={tempCustomer} onModify={handleModify} />
      }
      rightChildren={
        <div className="relative h-full flex flex-col">
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
                {customer?.otherPayment.map((payment, index) => (
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
                          modifyOtherPayment(index, "content", e.target.value)
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
                          modifyOtherPayment(
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
                            value={payment.paymentsMethod || ""}
                            onClick={() =>
                              modifyOtherPayment(
                                index,
                                "paymentsMethod",
                                method
                              )
                            }
                            className={`flex items-center justify-center py-2 rounded-md text-sm font-semibold border ${
                              payment.paymentsMethod === method
                                ? "bg-[#3C6229] text-white border-[#3C6229]"
                                : "bg-white text-gray-600 border-gray-300"
                            }`}
                          >
                            {getLabel(method)}
                            {/* {method === "CASH"
                              ? "현금"
                              : method === "CARD"
                              ? "카드"
                              : method === "TRANSFER"
                              ? "계좌이체"
                              : "기타"} */}
                          </button>
                        ))}
                      </div>

                      {payment.paymentsMethod === "OTHER" && (
                        <input
                          type="text"
                          placeholder="기타 입력"
                          value={payment.otherPaymentMethod || ""}
                          onChange={(e) =>
                            modifyOtherPayment(
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
                          modifyOtherPayment(
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
                        modifyOtherPayment(index, "status", !payment.status)
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
