import { useState, useEffect } from "react";

/**
 * 할인율을 적용하여 최종 가격을 계산하는 함수
 *
 * @param price - 원래 가격
 * @param discountRate - 할인율 (0 ~ 100)
 * @returns 할인 적용된 최종 가격
 */
const calculateDiscountedPrice = (
  price: number,
  discountRate: number
): number => {
  if (discountRate < 0 || discountRate > 100) {
    throw new Error("할인율은 0에서 100 사이여야 합니다.");
  }
  return price - (price * discountRate) / 100;
};

/**
 * 할인율과 적용 금액을 관리하는 커스텀 훅
 */
const useDiscount = (initialPrice: number) => {
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(initialPrice);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 할인율 변경 핸들러
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0 || value > 100) {
      setErrorMessage("할인율은 0~100 사이로 입력해주세요.");
    } else {
      setErrorMessage("");
      setDiscountRate(value);
    }
  };

  // 할인율 변경 시 가격 자동 계산
  useEffect(() => {
    const discounted = calculateDiscountedPrice(initialPrice, discountRate);
    console.log("🔥 초기 가격:", initialPrice);
    console.log("🔥 할인율:", discountRate);
    console.log("🔥 최종 가격:", discounted);
    setFinalPrice(discounted);
  }, [initialPrice, discountRate]);
  return {
    discountRate,
    finalPrice,
    errorMessage,
    handleDiscountChange,
  };
};

export default useDiscount;
