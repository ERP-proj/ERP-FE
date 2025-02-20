/**
 * 전화번호 포맷팅 함수
 * @param phone - 포맷팅할 전화번호 (문자열)
 * @returns 포맷된 전화번호 (예: 010-2222-3222) 또는 "번호정보 없음"
 */
export const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) {
    return "번호정보 없음";
  }
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

/**
 * 전화번호 마스킹 처리 함수
 * @param phone - 포맷팅 및 마스킹할 전화번호 (문자열)
 * @param isHidden - 마스킹 여부 (true: 마스킹, false: 원본)
 * @returns 포맷팅 및 마스킹된 전화번호
 */
export const formatMaskedPhone = (
  phone: string | null | undefined,
  isHidden: boolean
): string => {
  const formattedPhone = formatPhone(phone); // 포맷 적용
  if (isHidden) {
    return formattedPhone.replace(/(\d{3})-\d{4}-(\d{4})/, "$1-****-****");
  }
  return formattedPhone;
};
