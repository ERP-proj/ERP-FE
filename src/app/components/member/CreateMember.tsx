"use client";

import React, { useState } from "react";
import BasicButton from "../ui/BasicButton";
import Modal from "../ui/Modal";
import { CiCirclePlus, CiCamera } from "react-icons/ci";
import Dropdown from "../ui/Dropdown";
import Accordion from "../ui/Accordion";
import Toggle from "../ui/Toggle";
import Pay from "./Pay";

const CreateMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState<{
    [key: string]: boolean;
  }>({
    이용권결제: false,
    기타결제: false,
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
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
          <div className="space-y-6 p-6">
            {/* 이미지 선택 */}
            <div className="flex flex-col items-center gap-4">
              <div className="image-selector">
                <div className="image-selector-background"></div>
                <div className="image-selector-content">
                  <span className="image-selector-icon">
                    <CiCamera />
                  </span>
                  <span className="image-selector-text">이미지 선택</span>
                </div>
              </div>
              <div className="flex gap-2">
                <BasicButton
                  size="small"
                  color="gray"
                  border={false}
                  onClick={() => alert("준비 클릭!")}
                >
                  준비
                </BasicButton>
                <BasicButton
                  size="small"
                  color="primary"
                  border={false}
                  onClick={() => alert("준비 클릭!")}
                >
                  촬영
                </BasicButton>
              </div>
            </div>

            {/* 입력 폼 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">이름</label>
                <input
                  type="text"
                  placeholder="이름"
                  className="input-content w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  성별(필수)
                </label>
                <Dropdown
                  options={["여", "남"]}
                  placeholder="성별"
                  defaultValue="여"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  생년월일(필수)
                </label>
                <input
                  type="date"
                  placeholder="생년월일"
                  className="input-content w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  전화번호
                </label>
                <input
                  type="text"
                  placeholder="01012341234"
                  className="input-content w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">주소</label>
                <input
                  type="text"
                  placeholder="주소를 입력해주세요."
                  className="input-content w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  방문 경로
                </label>
                <textarea
                  placeholder="방문 경로를 입력해주세요."
                  className="input-content w-full"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">메모</label>
                <textarea
                  placeholder="메모할 내용을 입력해주세요."
                  className="input-content w-full"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">약관</label>
                <textarea
                  placeholder="약관내용입니다."
                  className="input-content w-full"
                ></textarea>
              </div>
            </div>

            {/* 진도표 */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">진도표</label>
              <div className="relative">
                <table className="w-full border text-sm mt-2">
                  <thead>
                    <tr>
                      <th className="border p-2">회차</th>
                      <th className="border p-2">날짜 선택</th>
                      <th className="border p-2">내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-0 text-center">1</td>
                      <td className="p-0">
                        <input type="date" className="input-content w-full" />
                      </td>
                      <td className="p-0">
                        <input
                          type="text"
                          placeholder="내용 입력"
                          className="input-content w-full"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="absolute left-1/2 transform -translate-x-1/2 translate-y-0 text-gray-500 bg-white hover:text-[#B4D89C] rounded-full shadow-md">
                  <CiCirclePlus size={28} />
                </button>
              </div>
            </div>
          </div>
        }
        // 오른쪽섹션
        rightChildren={
          <div className="relative h-full flex flex-col">
            <div className="flex-grow ">
              <Accordion
                title="이용권 결제"
                isOpen={accordionStates["이용권결제"]}
                toggleOpen={() => toggleAccordion("이용권결제")}
                children={
                  <div className="bg-white rounded-lg h-[1000px] overflow-y-scroll">
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
                      <h4 className="text-sm font-bold pl-4 pt-4">
                        할인 상품명
                      </h4>
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
                        <h4 className="text-sm font-bold mb-2">결제 방법</h4>
                        <Pay />

                        {/* 등록일 */}
                        <div className="mb-4">
                          <h4 className="text-sm font-bold mb-2 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            defaultValue={getCurrentDate()}
                            className="input-content"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }
                children2={
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
              />
              <Accordion
                title="기타 결제"
                isOpen={accordionStates["기타결제"]}
                toggleOpen={() => toggleAccordion("기타결제")}
                children={
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

                    {/* 결제 정보 */}
                    <div className="mb-4">
                      <h3 className="text-md bg-[#F6F6F6] p-2 m-0 text-[#0D0D0D] font-bold">
                        결제 정보
                      </h3>
                      <div className="p-4">
                        <h4 className="text-sm font-bold mb-2">결제 방법</h4>
                        <Pay />

                        {/* 등록일 */}
                        <div className="mb-4">
                          <h4 className="text-sm font-bold mb-2 pt-4">
                            등록일
                          </h4>
                          <input
                            type="date"
                            defaultValue={getCurrentDate()}
                            className="input-content"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }
                children2={
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
              />
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
              <BasicButton size="large" color="primary" border={false}>
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
