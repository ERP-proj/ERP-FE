import { useState } from "react";
import { UpdateCustomerDetail } from "@/types/memberType";

interface UseProgressListProps {
  data: UpdateCustomerDetail;
  onModify: (key: keyof UpdateCustomerDetail, value: any) => void;
}

export const useProgressList = ({ data, onModify }: UseProgressListProps) => {
  const progressList = data.progressList ?? {
    addProgresses: [],
    updateProgresses: [],
    deleteProgresses: [],
  };

  const [rows, setRows] = useState(
    progressList.updateProgresses.length > 0 ||
      progressList.addProgresses.length > 0
      ? [
          ...progressList.updateProgresses,
          ...progressList.addProgresses.map((p, index) => ({
            progressId: index + 1,
            ...p,
          })),
        ]
      : [{ progressId: 1, date: "", content: "" }]
  );

  // ✅ 진도표 추가
  const addRow = () => {
    const newRow = { progressId: rows.length + 1, date: "", content: "" };
    setRows([...rows, newRow]);
    onModify("progressList", {
      ...progressList,
      addProgresses: [...progressList.addProgresses, { date: "", content: "" }],
    });
  };

  // ✅ 진도표 삭제 (최소 한 줄 유지)
  const deleteRow = (id: number) => {
    if (rows.length === 1) return;

    setRows(rows.filter((row) => row.progressId !== id));

    const isExistingProgress = progressList.updateProgresses.some(
      (p) => p.progressId === id
    );
    onModify("progressList", {
      ...progressList,
      deleteProgresses: isExistingProgress
        ? [...progressList.deleteProgresses, { progressId: id }]
        : progressList.deleteProgresses,
      updateProgresses: progressList.updateProgresses.filter(
        (p) => p.progressId !== id
      ),
      addProgresses: progressList.addProgresses.filter(
        (_, index) => index !== id - 1
      ),
    });
  };

  // ✅ 진도표 수정
  const updateRow = (id: number, key: "date" | "content", value: string) => {
    setRows(
      rows.map((row) =>
        row.progressId === id ? { ...row, [key]: value } : row
      )
    );

    const existingIndex = progressList.updateProgresses.findIndex(
      (p) => p.progressId === id
    );
    if (existingIndex !== -1) {
      const updatedProgresses = [...progressList.updateProgresses];
      updatedProgresses[existingIndex] = {
        ...updatedProgresses[existingIndex],
        [key]: value,
      };
      onModify("progressList", {
        ...progressList,
        updateProgresses: updatedProgresses,
      });
    } else {
      onModify("progressList", {
        ...progressList,
        addProgresses: progressList.addProgresses.map((p, index) =>
          index === id - 1 ? { ...p, [key]: value } : p
        ),
      });
    }
  };

  return { rows, addRow, deleteRow, updateRow };
};
