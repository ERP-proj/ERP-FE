import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlanPayment, OtherPayment } from "@/types/memberType";
import Toggle from "./Toggle";

describe("Toggle Component", () => {
  let mockSetFormData: jest.Mock;

  beforeEach(() => {
    mockSetFormData = jest.fn();
  });

  test("초기 렌더링 시 '미납' 상태를 표시해야 한다.", () => {
    const formData = {
      planPayment: { status: false } as PlanPayment,
      otherPayment: [] as OtherPayment[],
    };

    render(
      <Toggle
        formData={formData}
        setFormData={mockSetFormData}
        keyPath="planPayment"
      />
    );

    expect(screen.getByText("미납")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-icon")).toHaveClass("text-gray-300"); // 변경
  });

  test("'planPayment' 상태가 true일 때 '결제완료'가 표시되어야 한다.", () => {
    const formData = {
      planPayment: { status: true } as PlanPayment,
      otherPayment: [] as OtherPayment[],
    };

    render(
      <Toggle
        formData={formData}
        setFormData={mockSetFormData}
        keyPath="planPayment"
      />
    );

    expect(screen.getByText("결제완료")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-icon")).toHaveClass("text-[#3C6229]"); // 변경
  });

  test("'planPayment' 토글 클릭 시 상태가 변경되어야 한다.", () => {
    const formData = {
      planPayment: { status: false } as PlanPayment,
      otherPayment: [] as OtherPayment[],
    };

    render(
      <Toggle
        formData={formData}
        setFormData={mockSetFormData}
        keyPath="planPayment"
      />
    );

    fireEvent.click(screen.getByTestId("toggle-icon")); // 변경

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });

  test("'otherPayment' 토글 클릭 시 특정 인덱스의 상태가 변경되어야 한다.", () => {
    const formData = {
      planPayment: { status: false } as PlanPayment,
      otherPayment: [
        { status: false } as OtherPayment,
        { status: true } as OtherPayment,
      ],
    };

    render(
      <Toggle
        formData={formData}
        setFormData={mockSetFormData}
        keyPath="otherPayment"
        index={1}
      />
    );

    fireEvent.click(screen.getByTestId("toggle-icon")); // 변경

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });
});
