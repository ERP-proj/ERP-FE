// 매핑 함수
export const getLabel = (type: string) => {
  const mapping: { [key: string]: string } = {
    TYPE_1: "1종",
    TYPE_1_AUTO: "1종 자동",
    TYPE_2: "2종",
    MALE: "남",
    FEMALE: "여",
    TIME_BASED: "시간제",
    PERIOD_BASED: "기간제",
    ACQUISITION: "취득",
    REFRESHER: "장롱",
    STANDARD: "일반",
    CARD: "카드",
    CASH: "현금",
    TRANSFER: "계좌이체",
    OTHER: "기타",
  };
  return mapping[type] || type;
};
