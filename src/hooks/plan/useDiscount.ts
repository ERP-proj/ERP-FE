// import { useEffect, useState } from "react";

// const useDiscount = (initialPrice: number) => {
//   const [discountRate, setDiscountRate] = useState<number>(0);
//   const [discountPrice, setDiscountPrice] = useState<number>(initialPrice);

//   useEffect(() => {
//     setDiscountPrice(Math.round(initialPrice * (1 - discountRate / 100)));
//   }, [initialPrice, discountRate]);

//   const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDiscountRate(parseFloat(e.target.value) || 0);
//   };

//   return { discountRate, discountPrice, handleDiscountChange };
// };

// export default useDiscount;
