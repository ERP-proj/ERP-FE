import { formatDate, getCurrentDate } from "@/utils/formatDate";

describe("formatDate 함수 테스트", () => {
  test("ISO 날짜 문자열을 yyyy/MM/dd 형식으로 변환", () => {
    expect(formatDate("2024-12-28T16:07:48.044")).toBe("2024/12/28");
    expect(formatDate("2023-01-01T00:00:00.000")).toBe("2023/01/01");
    expect(formatDate("2022-05-09T08:30:15.123")).toBe("2022/05/09");
  });

  test("유효하지 않은 날짜 입력 시 NaN 반환 방지", () => {
    expect(formatDate("")).toBe("NaN/NaN/NaN"); // 빈 문자열 입력 시 예상 결과
    expect(formatDate("invalid-date")).toBe("NaN/NaN/NaN"); // 잘못된 날짜 문자열
  });
});

describe("getCurrentDate 함수 테스트", () => {
  test("현재 날짜가 yyyy-MM-dd 형식으로 반환", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-01-15T10:00:00Z"));

    expect(getCurrentDate()).toBe("2024-01-15");

    // 타이머 원래 상태로 복원
    jest.useRealTimers();
  });
});
