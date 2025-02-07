import { useState } from "react";

interface Progress {
  id: number;
  date: string;
  content: string;
}

interface UseProgressListProps<T> {
  data: T;
  onModify: (key: keyof T, value: any) => void;
  progressKey: keyof T; // 다른 타입에서도 적용 가능
}

export const useProgressList = <T extends Record<string, any>>({
  data,
  onModify,
  progressKey,
}: UseProgressListProps<T>) => {
  const progressList = data[progressKey];

  const [rows, setRows] = useState<Progress[]>(
    progressList?.updateProgresses?.length
      ? progressList.updateProgresses.map((p: any) => ({
          id: p.progressId,
          date: p.date,
          content: p.content,
        }))
      : [{ id: 1, date: "", content: "" }] // 기본 한 칸 유지
  );

  // 진도표 추가
  const addRow = () => {
    const newRow: Progress = {
      id: rows.length + 1,
      date: "",
      content: "",
    };
    setRows([...rows, newRow]);

    onModify(progressKey, {
      ...progressList,
      addProgresses: [
        ...(progressList?.addProgresses || []),
        { date: newRow.date, content: newRow.content },
      ],
    });
  };

  // 진도표 삭제
  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));

    const isExistingProgress = progressList.updateProgresses.some(
      (p: any) => p.progressId === id
    );

    if (isExistingProgress) {
      // 기존 데이터 삭제 → deleteProgresses 추가
      onModify(progressKey, {
        ...progressList,
        deleteProgresses: [
          ...progressList.deleteProgresses,
          { progressId: id },
        ],
        updateProgresses: progressList.updateProgresses.filter(
          (p: any) => p.progressId !== id
        ),
      });
    } else {
      // 새로 추가한 데이터 삭제 → addProgresses에서 제거
      onModify(progressKey, {
        ...progressList,
        addProgresses: progressList.addProgresses.filter(
          (_: any, index: number) => index !== rows.length - 1
        ),
      });
    }
  };

  // 진도표 수정
  const updateRow = (id: number, key: "date" | "content", value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    setRows(updatedRows);

    const existingProgress = progressList.updateProgresses.find(
      (p: any) => p.progressId === id
    );

    if (existingProgress) {
      // 기존 데이터 수정
      onModify(progressKey, {
        ...progressList,
        updateProgresses: progressList.updateProgresses.map((p: any) =>
          p.progressId === id ? { ...p, [key]: value } : p
        ),
      });
    } else {
      // 새 데이터 추가 (addProgresses에 반영)
      onModify(progressKey, {
        ...progressList,
        addProgresses: progressList.addProgresses.map((p: any, index: number) =>
          index === rows.length - 1 ? { ...p, [key]: value } : p
        ),
      });
    }
  };

  return { rows, addRow, deleteRow, updateRow };
};
