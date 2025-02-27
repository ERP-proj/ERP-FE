"use client";

import React, { useState } from "react";
import BasicButton from "../../ui/BasicButton";
import Modal from "../../ui/Modal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [selectedType1, setSelectedType1] = useState<string | null>(null);
  const [selectedType2, setSelectedType2] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftChildren={
        <div className="p-6 w-[400px]">
          {/* 모달 제목 */}
          <h2 className="text-xl font-semibold mb-4">이용권 등록</h2>

          {/* 구분1 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">구분1</p>
            <div className="flex gap-2">
              <BasicButton
                color={selectedType1 === "1종" ? "primary" : "gray"}
                onClick={() => setSelectedType1("1종")}
              >
                1종
              </BasicButton>
              <BasicButton
                color={selectedType1 === "2종" ? "primary" : "gray"}
                onClick={() => setSelectedType1("2종")}
              >
                2종
              </BasicButton>
            </div>
          </div>

          {/* 구분2 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">구분2</p>
            <div className="flex gap-2">
              <BasicButton
                color={selectedType2 === "시간제" ? "primary" : "gray"}
                onClick={() => setSelectedType2("시간제")}
              >
                시간제
              </BasicButton>
              <BasicButton
                color={selectedType2 === "기간제" ? "primary" : "gray"}
                onClick={() => setSelectedType2("기간제")}
              >
                기간제
              </BasicButton>
            </div>
          </div>

          {/* 이용가능시간 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">이용가능시간</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="이용가능시간을 입력해주세요"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
            />
          </div>

          {/* 이용권이름 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">이용권이름</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="이용권 이름을 입력해주세요"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
          </div>

          {/* 금액 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">금액</p>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="이용권 금액을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-2">
            <BasicButton color="gray" onClick={onClose}>
              취소
            </BasicButton>
            <BasicButton
              color="primary"
              onClick={() => {
                console.log("등록 완료!", {
                  selectedType1,
                  selectedType2,
                  availableTime,
                  ticketName,
                  price,
                });
                onClose();
              }}
            >
              등록 완료
            </BasicButton>
          </div>
        </div>
      }
    />
  );
};

export default RegisterModal;
