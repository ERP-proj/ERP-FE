import React, { useState } from "react";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Column {
  name: string;
  width?: string; // 개별 열의 너비 지정
}

interface TableProps {
  columns: Column[]; // 열 정보 배열
  data: any[]; // 데이터 배열
  selectable?: boolean; // 체크박스 여부
  onRowClick?: (id: number) => void;
}

const Table: React.FC<TableProps> = ({
  onRowClick,
  columns,
  data,
  selectable = false,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-center border-collapse text-sm">
        {/* 테이블 헤더 */}
        <thead className="bg-[#F6F6F6] border text-gray-700 font-semibold">
          <tr>
            {selectable && <th className="p-4 text-center w-12"></th>}
            {columns.map((col, index) => (
              <th
                key={index}
                className="p-3 text-center border text-left"
                style={{ width: col.width || "auto" }} // 🌟 개별 열 너비 지정
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>

        {/* 테이블 바디 */}
        <tbody>
          {data.map((row, rowIndex) => {
            const isSelected = selectedRows.includes(rowIndex);
            return (
              <tr
                key={rowIndex}
                className={`border-b transition-colors duration-200 ${
                  isSelected ? "bg-[#F2F8ED]" : "hover:bg-[#F2F8ED]"
                }`}
                onClick={() => onRowClick && onRowClick(row.id)}
              >
                {selectable && (
                  <td className="p-3 border text-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleRow(rowIndex)}
                    >
                      {isSelected ? (
                        <MdCheckBox className="text-[#3C6229] text-2xl" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-gray-400 text-2xl" />
                      )}
                    </div>
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-3 border text-gray-900"
                    style={{ width: col.width || "auto" }} // 🌟 개별 열 너비 지정
                  >
                    {row[col.name]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
