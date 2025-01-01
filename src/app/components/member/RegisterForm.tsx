import React, { useState } from "react";
import BasicButton from "../ui/BasicButton";
import Dropdown from "../ui/Dropdown";
import { CiCirclePlus, CiCamera } from "react-icons/ci";

const RegisterForm: React.FC = () => {
  const [rows, setRows] = useState([
    { id: 1, date: "", content: "" }, // 기본 1회차
  ]);

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, date: "", content: "" },
    ]);
  };

  return (
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
          <label className="block text-sm text-gray-600 mb-1">성별(필수)</label>
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
          <label className="block text-sm text-gray-600 mb-1">전화번호</label>
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
          <label className="block text-sm text-gray-600 mb-1">방문 경로</label>
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
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border p-0 text-center">{row.id}</td>
                  <td className="p-0">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        setRows((prevRows) =>
                          prevRows.map((r) =>
                            r.id === row.id ? { ...r, date: e.target.value } : r
                          )
                        )
                      }
                      className="input-content w-full"
                    />
                  </td>
                  <td className="p-0">
                    <input
                      type="text"
                      value={row.content}
                      placeholder="내용 입력"
                      onChange={(e) =>
                        setRows((prevRows) =>
                          prevRows.map((r) =>
                            r.id === row.id
                              ? { ...r, content: e.target.value }
                              : r
                          )
                        )
                      }
                      className="input-content w-full rounded-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-0 text-gray-500 bg-white hover:text-[#B4D89C] rounded-full shadow-md"
            onClick={addRow}
          >
            <CiCirclePlus size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
