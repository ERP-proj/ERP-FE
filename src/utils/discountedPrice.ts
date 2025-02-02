/**
 * 할인율을 적용하여 최종 가격을 계산하는 함수
 *
 * @param price - 원래 가격
 * @param discountRate - 할인율 (0 ~ 100)
 * @returns 할인 적용된 최종 가격
 */
export const DiscountedPrice = (
  price: number,
  discountRate: number
): number => {
  if (discountRate < 0 || discountRate > 100) {
    throw new Error("할인율은 0에서 100 사이여야 합니다.");
  }
  return price - (price * discountRate) / 100;
};
